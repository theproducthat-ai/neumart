import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser, requireCurrentUser, assertAdmin } from "./helpers";

export const listMyOrders = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);
    return ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(20);
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const user = await requireCurrentUser(ctx);
    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) return null;
    return order;
  },
});

export const createOrder = mutation({
  args: {
    addressId: v.id("addresses"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      })
    ),
  },
  handler: async (ctx, { addressId, items }) => {
    const user = await getOrCreateUser(ctx);

    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    const products = await Promise.all(
      items.map((item) => ctx.db.get(item.productId))
    );

    let subtotal = 0;
    const resolvedItems = items.map((item, i) => {
      const product = products[i];
      if (!product || !product.isActive) {
        throw new ConvexError(`Product not available`);
      }
      subtotal += product.price * item.quantity;
      return {
        productId: item.productId,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const deliveryFee = 4000; // ₹40 in paise — updated to 0 for members in Phase 6+
    const total = subtotal + deliveryFee;
    const now = Date.now();

    const orderId = await ctx.db.insert("orders", {
      userId: user._id,
      addressId,
      status: "pending",
      subtotal,
      deliveryFee,
      total,
      createdAt: now,
      updatedAt: now,
    });

    await Promise.all(
      resolvedItems.map((item) =>
        ctx.db.insert("orderItems", { orderId, ...item })
      )
    );

    return orderId;
  },
});

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    return ctx.db.query("orders").order("desc").take(100);
  },
});

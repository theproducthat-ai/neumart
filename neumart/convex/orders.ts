import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser, assertAdmin } from "./helpers";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeOrderNumber(now: number): string {
  const d = new Date(now);
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const seq = String(now).slice(-6);
  return `NM-${date}-${seq}`;
}

// ── Customer queries ──────────────────────────────────────────────────────────

export const getUserOrders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return [];
    return ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(30);
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return null;
    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) return null;
    return order;
  },
});

export const getOrderDetail = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return null;

    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) return null;

    const [items, address] = await Promise.all([
      ctx.db
        .query("orderItems")
        .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
        .collect(),
      ctx.db.get(order.addressId),
    ]);

    return { order, items, address };
  },
});

// ── Place order without payment ───────────────────────────────────────────────

export const placeOrderWithoutPayment = mutation({
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

    // 1. Cart must not be empty
    if (items.length === 0) throw new ConvexError("Cart is empty");

    // 2. Address must belong to the current user
    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    // 3. Re-fetch all products from Convex — never trust frontend prices
    const productDocs = await Promise.all(
      items.map((item) => ctx.db.get(item.productId))
    );

    // 4. Validate products and stock; build snapshots
    let subtotal = 0;
    const resolvedItems = items.map((item, i) => {
      const product = productDocs[i];

      if (!product || !product.isActive) {
        throw new ConvexError(
          `"${product?.name ?? "A product"}" is no longer available`
        );
      }
      if (item.quantity <= 0) {
        throw new ConvexError("Quantity must be at least 1");
      }
      if (product.stockQuantity < item.quantity) {
        throw new ConvexError(
          `Insufficient stock for "${product.name}". Only ${product.stockQuantity} left`
        );
      }

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return {
        productId: item.productId,
        productNameSnapshot: product.name,
        productImageSnapshot: product.imageUrl,
        unitSnapshot: product.unit,
        priceSnapshot: product.price,
        quantity: item.quantity,
        lineTotal,
      };
    });

    // 5. Calculate totals (₹0 delivery for now — add rules in a later phase)
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;
    const now = Date.now();

    // 6. Create order
    const orderId = await ctx.db.insert("orders", {
      userId: user._id,
      addressId,
      orderNumber: makeOrderNumber(now),
      status: "placed",
      paymentStatus: "pending",
      paymentMethod: "pay_later",
      subtotal,
      deliveryFee,
      total,
      currency: "INR",
      itemCount: items.length,
      createdAt: now,
      updatedAt: now,
    });

    // 7. Create order item snapshots
    await Promise.all(
      resolvedItems.map((item) =>
        ctx.db.insert("orderItems", { orderId, ...item, createdAt: now })
      )
    );

    // 8. Reduce stock — runs last so rollback is safe if anything above fails
    await Promise.all(
      resolvedItems.map((item, i) =>
        ctx.db.patch(item.productId, {
          stockQuantity: productDocs[i]!.stockQuantity - item.quantity,
          updatedAt: now,
        })
      )
    );

    return orderId;
  },
});

// ── Admin queries ─────────────────────────────────────────────────────────────

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return ctx.db.query("orders").order("desc").take(100);
  },
});

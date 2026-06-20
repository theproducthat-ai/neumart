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

    // 8. Reduce stock and create audit records — runs last so rollback is safe
    await Promise.all(
      resolvedItems.map(async (item, i) => {
        const previousStock = productDocs[i]!.stockQuantity;
        const newStock = previousStock - item.quantity;

        await ctx.db.patch(item.productId, {
          stockQuantity: newStock,
          updatedAt: now,
          lastStockUpdatedAt: now,
        });

        await ctx.db.insert("stockMovements", {
          productId: item.productId,
          type: "order_placed",
          quantityChange: -item.quantity,
          previousStock,
          newStock,
          reason: `Order ${makeOrderNumber(now)}`,
          referenceType: "order",
          referenceId: orderId as string,
          createdBy: user._id as string,
          createdAt: now,
        });
      })
    );

    return orderId;
  },
});

// ── Admin queries ─────────────────────────────────────────────────────────────

// Status literals mirrored here so args can be validated at the boundary.
const ORDER_STATUS_VALIDATOR = v.union(
  v.literal("placed"),
  v.literal("confirmed"),
  v.literal("preparing"),
  v.literal("out_for_delivery"),
  v.literal("delivered"),
  v.literal("cancelled")
);
const PAYMENT_STATUS_VALIDATOR = v.union(
  v.literal("pending"),
  v.literal("paid"),
  v.literal("failed"),
  v.literal("refunded")
);

export const adminGetOrders = query({
  args: {
    status: v.optional(ORDER_STATUS_VALIDATOR),
    paymentStatus: v.optional(PAYMENT_STATUS_VALIDATOR),
    search: v.optional(v.string()),
  },
  handler: async (ctx, { status, paymentStatus, search }) => {
    await assertAdmin(ctx);

    // Use the right index so the DB filters before JS touches the data.
    // Each branch .take(500) after the index scan — far better than the
    // previous approach of taking 200 unfiltered rows and then filtering.
    let orders;
    if (status && paymentStatus) {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_status_paymentStatus", (q) =>
          q.eq("status", status).eq("paymentStatus", paymentStatus)
        )
        .order("desc")
        .take(500);
    } else if (status) {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .take(500);
    } else if (paymentStatus) {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_paymentStatus", (q) =>
          q.eq("paymentStatus", paymentStatus)
        )
        .order("desc")
        .take(500);
    } else {
      // No status/payment filter — full scan, newest first.
      orders = await ctx.db.query("orders").order("desc").take(500);
    }

    // orderNumber search runs in JS only on the already-filtered (small) set.
    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter((o) => o.orderNumber.toLowerCase().includes(q));
    }

    return Promise.all(
      orders.map(async (order) => {
        const user = await ctx.db.get(order.userId);
        return {
          ...order,
          customer: user
            ? { name: user.name ?? null, email: user.email }
            : null,
        };
      })
    );
  },
});

export const adminGetOrderDetail = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    await assertAdmin(ctx);

    const order = await ctx.db.get(orderId);
    if (!order) return null;

    const [items, address, user] = await Promise.all([
      ctx.db
        .query("orderItems")
        .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
        .collect(),
      ctx.db.get(order.addressId),
      ctx.db.get(order.userId),
    ]);

    return { order, items, address, user };
  },
});

export const adminUpdateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("placed"),
      v.literal("confirmed"),
      v.literal("preparing"),
      v.literal("out_for_delivery"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, { orderId, status }) => {
    await assertAdmin(ctx);
    const order = await ctx.db.get(orderId);
    if (!order) throw new ConvexError("Order not found");
    await ctx.db.patch(orderId, { status, updatedAt: Date.now() });
  },
});

export const adminGetOrderStats = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);

    // Each query uses its index partition — O(count_for_that_status) not O(all_orders).
    // This replaces the previous full-table collect(). Scales well up to ~100k per bucket.
    // For O(log n) counts at very high volume, migrate to @convex-dev/aggregate.
    const [
      placed,
      confirmed,
      preparing,
      outForDelivery,
      delivered,
      cancelled,
      pendingPayment,
    ] = await Promise.all([
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "placed"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "confirmed"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "preparing"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "out_for_delivery"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "delivered"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "cancelled"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_paymentStatus", (q) => q.eq("paymentStatus", "pending"))
        .collect(),
    ]);

    return {
      total:
        placed.length +
        confirmed.length +
        preparing.length +
        outForDelivery.length +
        delivered.length +
        cancelled.length,
      placed: placed.length,
      confirmed: confirmed.length,
      preparing: preparing.length,
      outForDelivery: outForDelivery.length,
      delivered: delivered.length,
      cancelled: cancelled.length,
      pendingPayment: pendingPayment.length,
    };
  },
});

// Keep for any existing references
export const adminListAll = adminGetOrders;

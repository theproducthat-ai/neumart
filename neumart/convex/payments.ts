import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { requireCurrentUser, assertAdmin } from "./helpers";

export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const user = await requireCurrentUser(ctx);

    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) {
      throw new ConvexError("Order not found");
    }

    return ctx.db
      .query("payments")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
  },
});

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    return ctx.db.query("payments").order("desc").take(100);
  },
});

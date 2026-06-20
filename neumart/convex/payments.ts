import { v } from "convex/values";
import { query } from "./_generated/server";
import { requireCurrentUser, assertAdmin } from "./helpers";

export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const user = await requireCurrentUser(ctx);
    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) return null;
    return ctx.db
      .query("payments")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .first();
  },
});

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return ctx.db.query("payments").order("desc").take(100);
  },
});

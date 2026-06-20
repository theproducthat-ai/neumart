import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { requireCurrentUser } from "./helpers";

export const listByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const user = await requireCurrentUser(ctx);

    const order = await ctx.db.get(orderId);
    if (!order || order.userId !== user._id) {
      throw new ConvexError("Order not found");
    }

    return ctx.db
      .query("orderItems")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .take(100);
  },
});

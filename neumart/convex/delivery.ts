import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";

// ── Admin query ───────────────────────────────────────────────────────────────

export const getDeliveryTaskByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    await assertAdmin(ctx);
    const task = await ctx.db
      .query("deliveryTasks")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    return task;
  },
});

// ── Customer query ────────────────────────────────────────────────────────────

export const getCustomerDeliveryStatus = query({
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

    const task = await ctx.db
      .query("deliveryTasks")
      .withIndex("by_orderId", (q) => q.eq("orderId", orderId))
      .unique();
    if (!task || task.userId !== user._id) return null;

    const address = await ctx.db.get(task.addressId);

    return {
      status: task.status,
      address,
    };
  },
});

// ── Admin mutations ───────────────────────────────────────────────────────────

export const assignDelivery = mutation({
  args: {
    deliveryTaskId: v.id("deliveryTasks"),
    assignedTo: v.string(),
    assignedContact: v.optional(v.string()),
  },
  handler: async (ctx, { deliveryTaskId, assignedTo, assignedContact }) => {
    await assertAdmin(ctx);

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!adminUser) throw new ConvexError("Admin user not found");

    const task = await ctx.db.get(deliveryTaskId);
    if (!task) throw new ConvexError("Delivery task not found");

    if (task.status !== "pending") {
      throw new ConvexError(
        "Cannot assign: delivery is already " + task.status + "."
      );
    }

    if (!assignedTo.trim()) {
      throw new ConvexError("Delivery person name is required to assign.");
    }

    const now = Date.now();
    await ctx.db.patch(deliveryTaskId, {
      status: "assigned",
      assignedTo,
      assignedContact,
      assignedAt: now,
      updatedAt: now,
      updatedBy: adminUser._id,
    });
  },
});

export const updateDeliveryStatus = mutation({
  args: {
    deliveryTaskId: v.id("deliveryTasks"),
    newStatus: v.union(
      v.literal("picked_up"),
      v.literal("out_for_delivery"),
      v.literal("delivered")
    ),
  },
  handler: async (ctx, { deliveryTaskId, newStatus }) => {
    await assertAdmin(ctx);

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!adminUser) throw new ConvexError("Admin user not found");

    const task = await ctx.db.get(deliveryTaskId);
    if (!task) throw new ConvexError("Delivery task not found");

    const VALID_TRANSITIONS: Record<string, string[]> = {
      assigned: ["picked_up"],
      picked_up: ["out_for_delivery"],
      out_for_delivery: ["delivered", "failed", "cancelled"],
    };

    const allowed = VALID_TRANSITIONS[task.status] ?? [];
    if (!allowed.includes(newStatus)) {
      throw new ConvexError(
        "Cannot set delivery to '" +
          newStatus +
          "' from current status '" +
          task.status +
          "'."
      );
    }

    const now = Date.now();
    await ctx.db.patch(deliveryTaskId, {
      status: newStatus,
      ...(newStatus === "picked_up" ? { pickedUpAt: now } : {}),
      ...(newStatus === "out_for_delivery" ? { outForDeliveryAt: now } : {}),
      ...(newStatus === "delivered" ? { deliveredAt: now } : {}),
      updatedAt: now,
      updatedBy: adminUser._id,
    });
  },
});

export const setFailedDelivery = mutation({
  args: {
    deliveryTaskId: v.id("deliveryTasks"),
    failedReasonCode: v.union(
      v.literal("customer_unavailable"),
      v.literal("wrong_address"),
      v.literal("customer_refused"),
      v.literal("delivery_person_unavailable"),
      v.literal("order_damaged"),
      v.literal("payment_issue"),
      v.literal("unable_to_contact"),
      v.literal("other")
    ),
    failedReasonNotes: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { deliveryTaskId, failedReasonCode, failedReasonNotes }
  ) => {
    await assertAdmin(ctx);

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!adminUser) throw new ConvexError("Admin user not found");

    const task = await ctx.db.get(deliveryTaskId);
    if (!task) throw new ConvexError("Delivery task not found");

    if (task.status !== "out_for_delivery") {
      throw new ConvexError(
        "Cannot set delivery to 'failed' from current status '" +
          task.status +
          "'."
      );
    }

    if (
      failedReasonCode === "other" &&
      (!failedReasonNotes || !failedReasonNotes.trim())
    ) {
      throw new ConvexError("Please add notes when selecting Other.");
    }

    const now = Date.now();
    await ctx.db.patch(deliveryTaskId, {
      status: "failed",
      failedReasonCode,
      failedReasonNotes,
      failedAt: now,
      updatedAt: now,
      updatedBy: adminUser._id,
    });
  },
});

export const cancelDelivery = mutation({
  args: {
    deliveryTaskId: v.id("deliveryTasks"),
    cancelledReason: v.optional(v.string()),
  },
  handler: async (ctx, { deliveryTaskId, cancelledReason }) => {
    await assertAdmin(ctx);

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!adminUser) throw new ConvexError("Admin user not found");

    const task = await ctx.db.get(deliveryTaskId);
    if (!task) throw new ConvexError("Delivery task not found");

    if (task.status === "delivered" || task.status === "failed") {
      throw new ConvexError(
        "Cannot cancel a delivery that is already " + task.status + "."
      );
    }

    const now = Date.now();
    await ctx.db.patch(deliveryTaskId, {
      status: "cancelled",
      cancelledAt: now,
      cancelledReason,
      updatedAt: now,
      updatedBy: adminUser._id,
    });
  },
});

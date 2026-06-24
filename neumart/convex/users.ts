import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin, getOrCreateUser, requireCurrentUser } from "./helpers";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
  },
});

export const ensureCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    return getOrCreateUser(ctx);
  },
});

// One-time bootstrap: sets caller as admin only if NO admin exists in the DB yet.
export const bootstrapAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();

    if (existingAdmin) throw new ConvexError("An admin already exists");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new ConvexError("User record not found — sign in first");

    await ctx.db.patch(user._id, { role: "admin" });
    return { success: true, userId: user._id };
  },
});

export const updateProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new ConvexError("User not found");

    await ctx.db.patch(user._id, {
      name: identity.name,
      email: identity.email ?? user.email,
    });
  },
});

export const generateQrCode = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);
    if (user.qrCodeId && user.customerCode) return;

    const allUsers = await ctx.db.query("users").collect();
    const seq = String(allUsers.length).padStart(6, "0");
    const customerCode = `CUST-${seq}`;
    const qrCodeId = crypto.randomUUID();

    await ctx.db.patch(user._id, {
      customerCode,
      qrCodeId,
      qrEnabled: true,
      qrCreatedAt: Date.now(),
    });
  },
});

export const getCustomerByQrCode = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

    return {
      name: user.name ?? null,
      customerCode: user.customerCode ?? null,
      qrEnabled: user.qrEnabled ?? true,
    };
  },
});

export const getCustomerByQrCodeAdmin = query({
  args: { qrCodeId: v.string() },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_qr_code_id", (q) => q.eq("qrCodeId", args.qrCodeId))
      .unique();

    if (!user) return null;

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const lastOrder = orders.sort((a, b) => b.createdAt - a.createdAt)[0];

    return {
      name: user.name ?? null,
      customerCode: user.customerCode ?? null,
      qrEnabled: user.qrEnabled ?? true,
      email: user.email ?? null,
      phone: user.phone ?? null,
      orderCount: orders.length,
      lastOrderDate: lastOrder?.createdAt ?? null,
      userId: user._id,
    };
  },
});

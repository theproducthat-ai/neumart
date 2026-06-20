import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser } from "./helpers";

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

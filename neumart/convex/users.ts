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

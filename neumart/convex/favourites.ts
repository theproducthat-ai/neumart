import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser, requireCurrentUser } from "./helpers";

export const listMyFavourites = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);

    const favs = await ctx.db
      .query("favourites")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .take(50);

    const products = await Promise.all(favs.map((f) => ctx.db.get(f.productId)));

    return favs
      .map((f, i) => ({ ...f, product: products[i] }))
      .filter((f) => f.product !== null);
  },
});

export const isFavourite = query({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) return false;

    const fav = await ctx.db
      .query("favourites")
      .withIndex("by_userId_and_productId", (q) =>
        q.eq("userId", user._id).eq("productId", productId)
      )
      .unique();

    return fav !== null;
  },
});

export const toggle = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const user = await getOrCreateUser(ctx);

    const existing = await ctx.db
      .query("favourites")
      .withIndex("by_userId_and_productId", (q) =>
        q.eq("userId", user._id).eq("productId", productId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { favourited: false };
    }

    await ctx.db.insert("favourites", { userId: user._id, productId });
    return { favourited: true };
  },
});

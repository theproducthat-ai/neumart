import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser } from "./helpers";
import type { QueryCtx } from "./_generated/server";

// ── Shared helper ─────────────────────────────────────────────────────────────

async function resolveUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();
}

// ── Customer queries ─────────────────────────────────────────────────────────

export const getUserFavourites = query({
  args: {},
  handler: async (ctx) => {
    const user = await resolveUser(ctx);
    if (!user) return [];

    const favs = await ctx.db
      .query("favourites")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(50);

    const products = await Promise.all(favs.map((f) => ctx.db.get(f.productId)));

    return favs
      .map((f, i) => ({ ...f, product: products[i] }))
      .filter((f) => f.product !== null);
  },
});

export const checkIfProductIsFavourite = query({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const user = await resolveUser(ctx);
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

// ── Customer mutations ────────────────────────────────────────────────────────

export const addFavourite = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const user = await getOrCreateUser(ctx);

    const existing = await ctx.db
      .query("favourites")
      .withIndex("by_userId_and_productId", (q) =>
        q.eq("userId", user._id).eq("productId", productId)
      )
      .unique();

    if (existing) return existing._id; // already a favourite — idempotent

    return ctx.db.insert("favourites", {
      userId: user._id,
      productId,
      createdAt: Date.now(),
    });
  },
});

export const removeFavourite = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new ConvexError("User not found");

    const existing = await ctx.db
      .query("favourites")
      .withIndex("by_userId_and_productId", (q) =>
        q.eq("userId", user._id).eq("productId", productId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const toggleFavourite = mutation({
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

    await ctx.db.insert("favourites", {
      userId: user._id,
      productId,
      createdAt: Date.now(),
    });
    return { favourited: true };
  },
});

import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";

// ── Customer queries ─────────────────────────────────────────────────────────

export const getActiveProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 50 }) => {
    return ctx.db
      .query("products")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .take(limit);
  },
});

export const getProductsByCategory = query({
  args: { categorySlug: v.string() },
  handler: async (ctx, { categorySlug }) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", categorySlug))
      .unique();

    if (!category) return [];

    return ctx.db
      .query("products")
      .withIndex("by_categoryId", (q) => q.eq("categoryId", category._id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .take(50);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const getProductById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    return ctx.db.get(productId);
  },
});

export const searchProducts = query({
  args: { query: v.string() },
  handler: async (ctx, { query: searchQuery }) => {
    if (!searchQuery.trim()) return [];
    return ctx.db
      .query("products")
      .withSearchIndex("search_by_name", (q) =>
        q.search("name", searchQuery).eq("isActive", true)
      )
      .take(30);
  },
});

// ── Admin queries ─────────────────────────────────────────────────────────────

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    return ctx.db.query("products").order("desc").take(100);
  },
});

// ── Admin mutations ───────────────────────────────────────────────────────────

export const adminCreate = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    categoryId: v.id("categories"),
    price: v.number(),
    unit: v.string(),
    imageUrl: v.optional(v.string()),
    stockQuantity: v.number(),
    isActive: v.boolean(),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);

    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new ConvexError("Slug already in use");

    const now = Date.now();
    return ctx.db.insert("products", { ...args, createdAt: now, updatedAt: now });
  },
});

export const adminUpdate = mutation({
  args: {
    productId: v.id("products"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    categoryId: v.id("categories"),
    price: v.number(),
    unit: v.string(),
    imageUrl: v.optional(v.string()),
    stockQuantity: v.number(),
    isActive: v.boolean(),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, { productId, ...fields }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);

    const product = await ctx.db.get(productId);
    if (!product) throw new ConvexError("Product not found");

    await ctx.db.patch(productId, { ...fields, updatedAt: Date.now() });
  },
});

export const adminDelete = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    await ctx.db.delete(productId);
  },
});

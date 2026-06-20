import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";

// ── Customer queries ─────────────────────────────────────────────────────────

export const getActiveCategories = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("categories")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

// ── Admin queries ─────────────────────────────────────────────────────────────

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    return ctx.db.query("categories").order("desc").take(100);
  },
});

// ── Admin mutations ───────────────────────────────────────────────────────────

export const adminCreate = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new ConvexError("Slug already in use");

    const now = Date.now();
    return ctx.db.insert("categories", { ...args, createdAt: now, updatedAt: now });
  },
});

export const adminUpdate = mutation({
  args: {
    categoryId: v.id("categories"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { categoryId, ...fields }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);

    const category = await ctx.db.get(categoryId);
    if (!category) throw new ConvexError("Category not found");

    await ctx.db.patch(categoryId, { ...fields, updatedAt: Date.now() });
  },
});

export const adminDelete = mutation({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, { categoryId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    await ctx.db.delete(categoryId);
  },
});

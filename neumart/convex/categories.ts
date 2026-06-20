import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .take(50);
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

export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);
    return ctx.db.query("categories").take(100);
  },
});

export const adminCreate = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
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

    return ctx.db.insert("categories", args);
  },
});

export const adminUpdate = mutation({
  args: {
    categoryId: v.id("categories"),
    name: v.string(),
    slug: v.string(),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, { categoryId, ...fields }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthenticated");
    assertAdmin(identity);

    const category = await ctx.db.get(categoryId);
    if (!category) throw new ConvexError("Category not found");

    await ctx.db.patch(categoryId, fields);
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

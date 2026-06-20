import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser, requireCurrentUser } from "./helpers";

// ── Queries ───────────────────────────────────────────────────────────────────

export const getUserAddresses = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);
    return ctx.db
      .query("addresses")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("asc")
      .collect();
  },
});

export const getDefaultAddress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return null;
    return ctx.db
      .query("addresses")
      .withIndex("by_userId_isDefault", (q) =>
        q.eq("userId", user._id).eq("isDefault", true)
      )
      .first();
  },
});

export const getAddressById = query({
  args: { addressId: v.id("addresses") },
  handler: async (ctx, { addressId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return null;
    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) return null;
    return address;
  },
});

export const hasAddress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) return false;
    const first = await ctx.db
      .query("addresses")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();
    return first !== null;
  },
});

// ── Mutations ─────────────────────────────────────────────────────────────────

export const createAddress = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    landmark: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    country: v.optional(v.string()),
    isDefault: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx);
    const now = Date.now();

    const existing = await ctx.db
      .query("addresses")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // First address always becomes default regardless of the flag
    const shouldBeDefault = existing.length === 0 || args.isDefault;

    if (shouldBeDefault && existing.length > 0) {
      await Promise.all(
        existing.map((a) => ctx.db.patch(a._id, { isDefault: false, updatedAt: now }))
      );
    }

    return ctx.db.insert("addresses", {
      ...args,
      userId: user._id,
      isDefault: shouldBeDefault,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateAddress = mutation({
  args: {
    addressId: v.id("addresses"),
    name: v.string(),
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    landmark: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    country: v.optional(v.string()),
    isDefault: v.boolean(),
  },
  handler: async (ctx, { addressId, ...fields }) => {
    const user = await getOrCreateUser(ctx);
    const now = Date.now();

    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    if (fields.isDefault) {
      const all = await ctx.db
        .query("addresses")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect();
      await Promise.all(
        all
          .filter((a) => a._id !== addressId)
          .map((a) => ctx.db.patch(a._id, { isDefault: false, updatedAt: now }))
      );
    }

    await ctx.db.patch(addressId, { ...fields, updatedAt: now });
  },
});

export const deleteAddress = mutation({
  args: { addressId: v.id("addresses") },
  handler: async (ctx, { addressId }) => {
    const user = await getOrCreateUser(ctx);
    const now = Date.now();

    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    const wasDefault = address.isDefault;
    await ctx.db.delete(addressId);

    if (wasDefault) {
      // Promote the most recently created remaining address as default
      const next = await ctx.db
        .query("addresses")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .order("desc")
        .first();
      if (next) {
        await ctx.db.patch(next._id, { isDefault: true, updatedAt: now });
      }
    }
  },
});

export const setDefaultAddress = mutation({
  args: { addressId: v.id("addresses") },
  handler: async (ctx, { addressId }) => {
    const user = await getOrCreateUser(ctx);
    const now = Date.now();

    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    const all = await ctx.db
      .query("addresses")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    await Promise.all(
      all.map((a) =>
        ctx.db.patch(a._id, { isDefault: a._id === addressId, updatedAt: now })
      )
    );
  },
});

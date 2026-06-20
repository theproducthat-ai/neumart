import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getOrCreateUser, requireCurrentUser } from "./helpers";

export const listMyAddresses = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx);
    return ctx.db
      .query("addresses")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const addAddress = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    isDefault: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx);

    if (args.isDefault) {
      const existing = await ctx.db
        .query("addresses")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect();
      await Promise.all(
        existing.map((addr) => ctx.db.patch(addr._id, { isDefault: false }))
      );
    }

    return ctx.db.insert("addresses", { ...args, userId: user._id });
  },
});

export const updateAddress = mutation({
  args: {
    addressId: v.id("addresses"),
    name: v.string(),
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    isDefault: v.boolean(),
  },
  handler: async (ctx, { addressId, ...fields }) => {
    const user = await getOrCreateUser(ctx);
    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }

    if (fields.isDefault) {
      const existing = await ctx.db
        .query("addresses")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect();
      await Promise.all(
        existing
          .filter((a) => a._id !== addressId)
          .map((a) => ctx.db.patch(a._id, { isDefault: false }))
      );
    }

    await ctx.db.patch(addressId, fields);
  },
});

export const deleteAddress = mutation({
  args: { addressId: v.id("addresses") },
  handler: async (ctx, { addressId }) => {
    const user = await getOrCreateUser(ctx);
    const address = await ctx.db.get(addressId);
    if (!address || address.userId !== user._id) {
      throw new ConvexError("Address not found");
    }
    await ctx.db.delete(addressId);
  },
});

export const setDefaultAddress = mutation({
  args: { addressId: v.id("addresses") },
  handler: async (ctx, { addressId }) => {
    const user = await getOrCreateUser(ctx);
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
        ctx.db.patch(a._id, { isDefault: a._id === addressId })
      )
    );
  },
});

import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin, getOrCreateUser, requireCurrentUser } from "./helpers";
import { computeCouponDiscount } from "./utils/coupon";

// ── Admin mutations ───────────────────────────────────────────────────────────

export const createCoupon = mutation({
  args: {
    code: v.string(),
    discountType: v.string(),
    discountValue: v.number(),
    minimumOrderValue: v.optional(v.number()),
    maximumDiscount: v.optional(v.number()),
    usageLimit: v.optional(v.number()),
    perUserLimit: v.optional(v.number()),
    startsAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    if (args.discountType !== "percentage") {
      throw new ConvexError("Only percentage discount coupons are supported.");
    }
    if (args.discountValue < 1 || args.discountValue > 100) {
      throw new ConvexError("Discount value must be between 1 and 100.");
    }
    if (args.maximumDiscount === undefined || args.maximumDiscount === null) {
      throw new ConvexError("Maximum discount cap is required for percentage coupons.");
    }
    if (args.startsAt && args.expiresAt && args.expiresAt <= args.startsAt) {
      throw new ConvexError("Expiry date must be after start date.");
    }

    const upperCode = args.code.toUpperCase().trim();
    const existing = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", upperCode))
      .unique();
    if (existing) {
      throw new ConvexError(`Coupon code "${upperCode}" already exists.`);
    }

    return ctx.db.insert("coupons", {
      ...args,
      code: upperCode,
      createdAt: Date.now(),
    });
  },
});

export const updateCoupon = mutation({
  args: {
    id: v.id("coupons"),
    code: v.string(),
    discountType: v.string(),
    discountValue: v.number(),
    minimumOrderValue: v.optional(v.number()),
    maximumDiscount: v.optional(v.number()),
    usageLimit: v.optional(v.number()),
    perUserLimit: v.optional(v.number()),
    startsAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await assertAdmin(ctx);

    const coupon = await ctx.db.get(id);
    if (!coupon) throw new ConvexError("Coupon not found.");

    if (fields.discountType !== "percentage") {
      throw new ConvexError("Only percentage discount coupons are supported.");
    }
    if (fields.discountValue < 1 || fields.discountValue > 100) {
      throw new ConvexError("Discount value must be between 1 and 100.");
    }
    if (fields.maximumDiscount === undefined || fields.maximumDiscount === null) {
      throw new ConvexError("Maximum discount cap is required for percentage coupons.");
    }
    if (fields.startsAt && fields.expiresAt && fields.expiresAt <= fields.startsAt) {
      throw new ConvexError("Expiry date must be after start date.");
    }

    const upperCode = fields.code.toUpperCase().trim();
    if (upperCode !== coupon.code) {
      const conflict = await ctx.db
        .query("coupons")
        .withIndex("by_code", (q) => q.eq("code", upperCode))
        .unique();
      if (conflict) {
        throw new ConvexError(`Coupon code "${upperCode}" already exists.`);
      }
    }

    await ctx.db.patch(id, { ...fields, code: upperCode });
  },
});

export const toggleCouponActive = mutation({
  args: { id: v.id("coupons") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx);
    const coupon = await ctx.db.get(id);
    if (!coupon) throw new ConvexError("Coupon not found.");
    await ctx.db.patch(id, { isActive: !coupon.isActive });
  },
});

// ── Admin queries ─────────────────────────────────────────────────────────────

export const listCoupons = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    const coupons = await ctx.db.query("coupons").order("desc").collect();

    return Promise.all(
      coupons.map(async (coupon) => {
        const usages = await ctx.db
          .query("couponUsages")
          .withIndex("by_couponId", (q) => q.eq("couponId", coupon._id))
          .collect();
        return { ...coupon, usageCount: usages.length };
      })
    );
  },
});

export const getCoupon = query({
  args: { id: v.id("coupons") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx);
    return ctx.db.get(id);
  },
});

// ── Customer mutation ─────────────────────────────────────────────────────────

export const validateCoupon = mutation({
  args: {
    couponCode: v.string(),
    subtotal: v.number(),
  },
  handler: async (ctx, { couponCode, subtotal }) => {
    const user = await getOrCreateUser(ctx);

    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", couponCode.toUpperCase().trim()))
      .unique();

    if (!coupon) return { valid: false as const, error: "COUPON_NOT_FOUND" as const };
    if (!coupon.isActive) return { valid: false as const, error: "COUPON_INACTIVE" as const };
    if (coupon.startsAt && Date.now() < coupon.startsAt) {
      return { valid: false as const, error: "COUPON_NOT_YET_ACTIVE" as const };
    }
    if (coupon.expiresAt && Date.now() > coupon.expiresAt) {
      return { valid: false as const, error: "COUPON_EXPIRED" as const };
    }

    if (coupon.usageLimit !== undefined) {
      const totalUsages = await ctx.db
        .query("couponUsages")
        .withIndex("by_couponId", (q) => q.eq("couponId", coupon._id))
        .take(coupon.usageLimit + 1);
      if (totalUsages.length >= coupon.usageLimit) {
        return { valid: false as const, error: "COUPON_EXHAUSTED" as const };
      }
    }

    if (coupon.perUserLimit !== undefined) {
      const userUsages = await ctx.db
        .query("couponUsages")
        .withIndex("by_couponId_and_userId", (q) =>
          q.eq("couponId", coupon._id).eq("userId", user._id)
        )
        .take(coupon.perUserLimit + 1);
      if (userUsages.length >= coupon.perUserLimit) {
        return { valid: false as const, error: "COUPON_PER_USER_LIMIT" as const };
      }
    }

    if (coupon.minimumOrderValue !== undefined && subtotal < coupon.minimumOrderValue) {
      return {
        valid: false as const,
        error: "COUPON_MINIMUM_NOT_MET" as const,
        minimumOrderValue: coupon.minimumOrderValue,
      };
    }

    const discountAmount = computeCouponDiscount({
      subtotal,
      discountValue: coupon.discountValue,
      maximumDiscount: coupon.maximumDiscount ?? subtotal,
    });

    return {
      valid: true as const,
      discountAmount,
      couponId: coupon._id,
      code: coupon.code,
      discountValue: coupon.discountValue,
      maximumDiscount: coupon.maximumDiscount ?? null,
      minimumOrderValue: coupon.minimumOrderValue ?? null,
    };
  },
});

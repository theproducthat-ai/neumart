/**
 * Pure discount calculation — kept standalone for reuse in placeOrder and
 * future Razorpay Phase 11 integration (DEP-COM-CART-COUPON-RAZORPAY-001).
 * All amounts in paise. Integer arithmetic only.
 */
export function computeCouponDiscount(params: {
  subtotal: number;
  discountValue: number;  // percentage, e.g. 10 for 10%
  maximumDiscount: number; // cap in paise
}): number {
  const computed = Math.floor((params.subtotal * params.discountValue) / 100);
  return Math.min(computed, params.maximumDiscount, params.subtotal);
}

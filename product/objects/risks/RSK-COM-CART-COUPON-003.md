---
object_id: "RSK-COM-CART-COUPON-003"
object_type: risk
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-impact)"
parent_object_id: "IMPACT-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
status: "active"

risk_title: "Discount amount exceeds cart subtotal — order placed at negative or zero total"
risk_category: "technical"
likelihood: 2
impact: 4
risk_score: 8
risk_level: "Medium"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Risk

**Risk ID:** `RSK-COM-CART-COUPON-003`
**Title:** Discount amount exceeds cart subtotal — order placed at negative or zero total
**Category:** Technical
**Status:** Active
**Risk Score:** 8 / 25 — Medium
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Risk Description

For percentage coupons with a `maximumDiscount` cap, the standard case is:
`discountAmount = min(subtotal * discountValue / 100, maximumDiscount)`

However, edge cases can produce unexpected results:
- If `subtotal < maximumDiscount` and the percentage is very high (e.g., 90% coupon on a ₹50 cart = ₹45 discount, subtotal still covered)
- If admin creates a percentage coupon with no `maximumDiscount` cap (violates the MVP rule that max cap is required) and the coupon value is >100% (data validation gap)
- Edge case: `discountAmount` somehow exceeds `subtotal` → `total = subtotal - discountAmount + deliveryFee` could produce `total < 0` or `total < deliveryFee`

---

## Likelihood: 2 / 5 (Unlikely)

MVP rule: `maximumDiscount` is required for all percentage coupons. Admin UI must enforce this. Server-side validation in `createCoupon` must enforce this. Two layers of protection reduce likelihood.

---

## Impact: 4 / 5 (Significant)

An order placed at `total = 0` or negative would be a financial data integrity issue. Payment record would record `amount = 0`. Customer would receive free goods.

---

## Mitigation Plan

1. **Server-side validation in `createCoupon`:** `maximumDiscount` is required for `discountType = "percentage"` — reject mutation if absent.
2. **Discount clamping in `placeOrder`:** `discountAmount = min(computedDiscount, subtotal)` — discount can never exceed the merchandise subtotal. Even if `maximumDiscount` is absent (should be prevented), the clamp ensures `total >= deliveryFee` (never negative).
3. **`total` floor:** Server must enforce `total = max(subtotal - discountAmount + deliveryFee, deliveryFee)` — total can never be less than delivery fee.
4. **Admin UI validation:** Coupon create/edit form must show `maximumDiscount` as a required field with clear labeling.

**PRD business rule:** Discount is always clamped to cart subtotal. `total >= deliveryFee` is a system invariant.

---

## Revisit Trigger

Resolved when PRD business rules include discount clamping, and QA tests confirm that discount = subtotal edge case produces correct total.

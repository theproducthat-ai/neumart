---
object_id: "RULE-COM-CART-COUPON-002"
object_type: Rule
rule_type: Business Rule
priority: Must Have
status: Active

feature_id: "FEATURE-COM-CART-COUPON"
prd_id: "PRD-COM-CART-COUPON-V1"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"

owner: "Product Lead"
created_by: "AI (Product OS V2 — /product-prd)"
created_at: "2026-06-25"
updated_at: "2026-06-25"
---

# Rule

**Rule ID:** `RULE-COM-CART-COUPON-002`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

`maximumDiscount` (the discount cap in paise) is **required** for all percentage-type coupons. A coupon creation or update that sets `discountType: "percentage"` but omits `maximumDiscount` must be rejected with a validation error.

This prevents uncapped percentage discounts (e.g., 50% on a ₹10,000 cart = ₹5,000 discount), which represent an unacceptable financial risk to the business.

## Enforcement Point

- Admin coupon form: `maximumDiscount` field shows as required (not optional) when discount type is percentage
- `createCoupon` and `updateCoupon` Convex mutations: reject if `maximumDiscount` is absent for percentage coupons

## Error Message

"Maximum discount cap is required for percentage coupons."

## Exception

This rule is only applicable in MVP where `discountType = "percentage"` is the only supported type. When fixed-amount coupons are added (Phase 2), this rule applies only to percentage coupons — fixed-amount coupons do not use `maximumDiscount`.

## Linked Risk

RSK-COM-CART-COUPON-003 — Discount exceeds cart subtotal.

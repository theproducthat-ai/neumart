---
object_id: "RULE-COM-CART-COUPON-001"
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

**Rule ID:** `RULE-COM-CART-COUPON-001`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

`discountType` must be `"percentage"` for all coupons created in MVP. The admin coupon creation form shows Discount Type as a read-only field set to "Percentage." Fixed-amount coupons (`discountType: "fixed"`) are deferred to Phase 2 (DEFERRED-COM-CART-COUPON-FIXED-001).

The `discountType` field is stored as a string enum — not a boolean — specifically to allow `"fixed"` to be added in Phase 2 without a schema redesign.

## Enforcement Point

- Admin coupon creation form (UI constraint — dropdown locked to "Percentage" in MVP)
- `createCoupon` and `updateCoupon` Convex mutations (server-side validation — reject any value other than `"percentage"`)

## Exception

None in MVP.

## Linked Decision

DEC-001 (REQUEST-COM-CART-COUPON-001) — confirmed by Product Owner.

## Related Deferred Item

DEFERRED-COM-CART-COUPON-FIXED-001

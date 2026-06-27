---
object_id: "RULE-COM-CART-COUPON-007"
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

**Rule ID:** `RULE-COM-CART-COUPON-007`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

Only one coupon can be applied per order. Coupon stacking (applying multiple codes to the same cart) is not supported in MVP.

When a coupon is already applied and the customer attempts to apply a second code, the first coupon is replaced (not stacked). The cart shows the new coupon's discount and the old discount is removed.

## Enforcement Point

- Zustand cart store: `appliedCoupon` is a single nullable field — assigning a new coupon replaces the previous one
- `placeOrder` mutation: accepts only one `couponCode` argument; stacking is architecturally impossible

## Exception

None in MVP. Multi-coupon stacking is out of scope (see PRD-COM-CART-COUPON-V1 Section 13, item 2).

---
object_id: "RULE-COM-CART-COUPON-004"
object_type: Rule
rule_type: Business Rule / Safety Constraint
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

**Rule ID:** `RULE-COM-CART-COUPON-004`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

`discountAmount` is clamped to `subtotal`. The coupon discount can never exceed the merchandise total. After applying the clamp, the order total must always be >= `deliveryFee`:

```
discountAmount = min(discountAmount, subtotal)
total = subtotal - discountAmount + deliveryFee
// Therefore: total >= deliveryFee always
```

This prevents a scenario where a coupon discount exceeds the merchandise value, resulting in a negative `total` — which is logically invalid and would break payment processing.

Note: The clamp to `subtotal` is already applied inside `computeCouponDiscount` (see RULE-COM-CART-COUPON-003). This rule is stated separately to make the safety invariant explicit for tech design and QA.

## Enforcement Point

- `computeCouponDiscount` function (third argument to `Math.min` = `subtotal`)
- `placeOrder` mutation — must verify `total >= deliveryFee` before writing the order

## Linked Risk

RSK-COM-CART-COUPON-003 — Discount exceeds cart subtotal (negative total possible).

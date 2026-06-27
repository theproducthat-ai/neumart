---
object_id: "RULE-COM-CART-COUPON-003"
object_type: Rule
rule_type: Business Rule / Calculation
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

**Rule ID:** `RULE-COM-CART-COUPON-003`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

The coupon discount amount is calculated as:

```
discountAmount = min(subtotal × discountValue / 100, maximumDiscount)
```

All values are in paise. Integer arithmetic only — use `Math.floor` for the percentage calculation before applying the cap.

```typescript
function computeCouponDiscount(params: {
  subtotal: number,
  discountValue: number,
  maximumDiscount: number,
}): number {
  const computed = Math.floor(params.subtotal * params.discountValue / 100);
  return Math.min(computed, params.maximumDiscount, params.subtotal);
}
```

**Example:** WELCOME10 (10%, max ₹100) on ₹650 cart:
- Computed: ₹650 × 10 / 100 = ₹65
- Cap: ₹100
- Result: min(65, 100) = ₹65

**Example:** 20% max ₹50 on ₹400 cart:
- Computed: ₹400 × 20 / 100 = ₹80
- Cap: ₹50
- Result: min(80, 50) = ₹50

## Enforcement Point

- `computeCouponDiscount` internal helper function (called from `validateCoupon` and `placeOrder`)
- Client-side cart display applies the same formula for display only — server result is authoritative

## Exception

None. This formula is the canonical calculation.

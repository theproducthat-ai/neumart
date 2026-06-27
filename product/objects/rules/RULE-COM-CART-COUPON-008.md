---
object_id: "RULE-COM-CART-COUPON-008"
object_type: Rule
rule_type: Business Rule / Security
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

**Rule ID:** `RULE-COM-CART-COUPON-008`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

Two distinct access controls apply:

**1. Admin functions (createCoupon, updateCoupon, listCoupons):**
All admin coupon management functions must be guarded by the existing `assertAdmin` utility. Customers cannot call these functions. The existing guard covers this — no new role type is needed.

**2. Usage limit enforcement:**
- `perUserLimit`: enforced by counting `couponUsages` rows where `couponId = X AND userId = Y`. If count >= `perUserLimit`, reject with `COUPON_PER_USER_LIMIT`.
- `usageLimit` (global): enforced by counting all `couponUsages` rows where `couponId = X`. If count >= `usageLimit`, reject with `COUPON_EXHAUSTED`.
- Both checks run inside the `placeOrder` mutation (Convex transaction), ensuring Convex OCC detects concurrent conflicting writes.
- `userId` is resolved server-side via `ctx.auth.getUserIdentity()` — NOT passed from the client.

## Enforcement Point

- `createCoupon`, `updateCoupon`, `listCoupons`: `assertAdmin` guard
- `validateCoupon`: authenticated session required; `userId` resolved from `ctx.auth`
- `placeOrder`: both limit checks + OCC atomicity

## Linked Risk

RSK-COM-CART-COUPON-002 — Race condition on usage-limited coupon.

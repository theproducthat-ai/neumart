---
object_id: "RULE-COM-CART-COUPON-005"
object_type: Rule
rule_type: UX Rule / Business Rule
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

**Rule ID:** `RULE-COM-CART-COUPON-005`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

When a coupon is applied in the cart and the customer subsequently removes items or reduces quantities, the cart subtotal is rechecked against the coupon's `minimumOrderValue` on every cart change. If `subtotal < minimumOrderValue`, the coupon is **automatically removed** from the Zustand cart state and a toast notification is displayed:

> "Coupon removed because cart value is below the minimum order value."

The cart total recalculates immediately without the discount. The customer is not penalised — they can re-enter the coupon code if they add more items.

**This check fires on every item quantity change — not deferred to checkout.**

## Enforcement Point

- Client-side Zustand cart store — `onQuantityChange` / `onItemRemove` handlers
- Cart component — triggers auto-remove check after every cart mutation

## Exception

If `minimumOrderValue` is null (not set for this coupon), no minimum applies and this rule does not trigger.

## Linked Decision

DEC-003 (REQUEST-COM-CART-COUPON-001) — confirmed by Product Owner: auto-remove with toast, not deferred to checkout.

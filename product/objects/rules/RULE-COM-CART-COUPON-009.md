---
object_id: "RULE-COM-CART-COUPON-009"
object_type: Rule
rule_type: Technical Rule / Architecture
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

**Rule ID:** `RULE-COM-CART-COUPON-009`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1

---

## Rule Statement

The Discount Coupon System MVP applies to **Pay Later orders only**. Razorpay integration with coupon discounts is a forward dependency (DEP-COM-CART-COUPON-RAZORPAY-001) addressed in Phase 11.

To ensure Phase 11 can consume the coupon calculation without duplicating logic, `computeCouponDiscount` must be implemented as a **standalone pure function** in a shared utility file (e.g., `convex/utils/coupon.ts`). It must not be inlined into `placeOrder`.

Phase 11 Razorpay integration will:
- Read `order.total` from the orders table (the post-discount total already written by `placeOrder`)
- Pass `order.total` to the Razorpay order creation API
- NOT recalculate the discount — the calculation is already done and stored

This means the coupon discount is automatically reflected in Razorpay payment collection as long as `total` is used (not `subtotal`).

## Enforcement Point

- `computeCouponDiscount` must be a separate file / exported function — enforced by code review
- `placeOrder` imports and calls `computeCouponDiscount` — not inlined
- Phase 11 tech design must reference `order.total`, not `order.subtotal`

## Linked Risk / Dependency

- RSK-PAY-COUPON-RAZORPAY-001 — Coupon not reflected in Razorpay payment
- DEP-COM-CART-COUPON-RAZORPAY-001 — Forward dependency on Phase 11

## Linked Decision

DEC-005 (REQUEST-COM-CART-COUPON-001) — confirmed by Product Owner.

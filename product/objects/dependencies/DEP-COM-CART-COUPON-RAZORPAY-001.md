---
object_id: "DEP-COM-CART-COUPON-RAZORPAY-001"
object_type: dependency
version: "1.0"
created_date: "2026-06-25"
updated_date: "2026-06-25"
created_by: "AI (Product OS V2 — /product-impact)"
parent_object_id: "IMPACT-COM-CART-COUPON-001"
source_request_id: "REQ-0010"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
status: "active"

dependency_type: "upstream-feature"
blocker_for_coupon_mvp: false
blocker_for_razorpay_phase11: true

blocked_object: "Phase 11 — Razorpay Integration"
blocked_by: "FEATURE-COM-CART-COUPON (coupon calculation reusability requirement)"
dependency_direction: "forward"

metadata:
  source_system: "Product OS"
  schema_version: "2.0"
---

# Dependency

**Dependency ID:** `DEP-COM-CART-COUPON-RAZORPAY-001`
**Type:** Forward Dependency (upstream-feature)
**Status:** Active
**Identified in:** IMPACT-COM-CART-COUPON-001

---

## Summary

The Discount Coupon System (FEATURE-COM-CART-COUPON) must expose a reusable coupon discount calculation function so that the Razorpay integration (Phase 11) can correctly compute the payable amount for Razorpay orders.

---

## Dependency Description

**What must happen:** Coupon MVP ships with a standalone `computeCouponDiscount` helper function (or equivalent). This function takes `{ subtotal, discountType, discountValue, maximumDiscount }` and returns `discountAmount`. It is called from `placeOrder`.

**Why Phase 11 depends on it:** When Razorpay integration ships, the amount passed to Razorpay's order creation API must be `order.total = subtotal - discountAmount + deliveryFee`. The `discountAmount` value must be computed using the same logic as the coupon MVP — not a duplicate calculation. The Phase 11 Dev Plan must explicitly reference this function.

---

## Does this block coupon MVP? NO

Coupon MVP ships independently. Only Pay Later orders in MVP — no Razorpay payment calls are made. The `order.total` field is correctly computed and stored.

---

## Does this block Razorpay Phase 11? YES (design constraint, not a hard blocker)

Phase 11 must read coupon discount from `order.total`, not recalculate it independently. The Razorpay integration team must:
1. Use `order.total` from the Convex `orders` table as the Razorpay payment amount
2. Not implement a second coupon calculation — use the stored `order.total`

If this is not followed, coupon-discounted orders will be charged the wrong amount via Razorpay.

---

## Implementation Note

`computeCouponDiscount` is an internal Convex helper function. It should be in a shared utility file (e.g., `convex/utils/coupon.ts`) imported by both `placeOrder` and, eventually, any Razorpay order creation mutation.

---

## Linked Risk

RSK-PAY-COUPON-RAZORPAY-001 — Coupon discount not reflected in Razorpay payment amount when Phase 11 ships.

---

## Resolution

**Status → resolved** when Phase 11 Razorpay integration is implemented and code review confirms:
- Razorpay payment amount = `order.total` (read from Convex `orders` table)
- No duplicate coupon discount calculation in Phase 11 code

---

## Change History

| Version | Date | Changed By | Notes |
|---|---|---|---|
| 1.0 | 2026-06-25 | AI (Product OS V2) | Created during impact assessment |

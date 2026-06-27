---
object_id: "REQ-SPEC-COM-CART-COUPON-008"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
acceptance_criteria: ["AC-COM-CART-COUPON-015", "AC-COM-CART-COUPON-016"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-008` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

The `placeOrder` Convex mutation accepts an optional `couponCode` string argument. If present, it validates the coupon server-side (active status, date range, per-user usage, global usage, minimum cart value) before writing the order. On validation failure, the mutation returns a structured error with a typed error code. The coupon validation runs within the same Convex transaction as the order write. `computeCouponDiscount` is a reusable internal helper callable from both `placeOrder` and future Razorpay integration. No order is written if coupon validation fails.

## Acceptance Criteria

- AC-COM-CART-COUPON-015
- AC-COM-CART-COUPON-016

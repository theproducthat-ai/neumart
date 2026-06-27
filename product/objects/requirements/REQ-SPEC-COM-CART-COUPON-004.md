---
object_id: "REQ-SPEC-COM-CART-COUPON-004"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-ADM"
acceptance_criteria: ["AC-COM-CART-COUPON-007", "AC-COM-CART-COUPON-008"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-004` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

A user with the admin role can toggle the `isActive` boolean on any coupon from the list view or edit form. An inactive coupon cannot be applied by customers — `validateCoupon` returns `COUPON_INACTIVE` error for any inactive coupon.

## Acceptance Criteria

- AC-COM-CART-COUPON-007
- AC-COM-CART-COUPON-008

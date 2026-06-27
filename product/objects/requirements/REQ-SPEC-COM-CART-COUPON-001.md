---
object_id: "REQ-SPEC-COM-CART-COUPON-001"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-ADM"
acceptance_criteria: ["AC-COM-CART-COUPON-001", "AC-COM-CART-COUPON-002"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-001` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

A user with the admin role can create a new coupon code by submitting a form with: `code` (unique string), `discountType` (`"percentage"`), `discountValue` (number 1–100), `minimumOrderValue` (optional paise), `maximumDiscount` (required for percentage coupons, paise), `perUserLimit` (optional), `usageLimit` (optional), `startsAt` (optional datetime), `expiresAt` (optional datetime), `isActive` (boolean). The coupon is written to the Convex `coupons` table. Non-admin users cannot access this function.

## Acceptance Criteria

- AC-COM-CART-COUPON-001
- AC-COM-CART-COUPON-002

---
object_id: "REQ-SPEC-COM-CART-COUPON-009"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
linked_decision: "DECISION-ORD-AMOUNT-FIELDS-001"
acceptance_criteria: ["AC-COM-CART-COUPON-017", "AC-COM-CART-COUPON-018"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-009` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

The Convex schema is updated with: (1) new `coupons` table (11 fields including `by_code` and `by_isActive` indexes); (2) new `couponUsages` table (5 fields including `by_couponId` and `by_couponId_userId` indexes); (3) 7 new optional fields on the `orders` table (`discountAmount`, `couponId`, `couponCodeSnapshot`, `couponDiscountTypeSnapshot`, `couponDiscountValueSnapshot`, `couponMaxDiscountSnapshot`, `couponAppliedAt`). All changes are additive. Existing `subtotal`, `total`, and `deliveryFee` fields on `orders` are unchanged per DECISION-ORD-AMOUNT-FIELDS-001. No data migration required.

## Acceptance Criteria

- AC-COM-CART-COUPON-017
- AC-COM-CART-COUPON-018

---
object_id: "REQ-SPEC-COM-CART-COUPON-014"
object_type: Requirement
priority: Nice to Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-ADM"
module_area_id: "MA-ADM-ORD"
acceptance_criteria: ["AC-COM-CART-COUPON-024"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-014` | **Priority:** Nice to Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

The admin order detail view shows coupon information for orders where a coupon was applied: coupon code, discount type, discount value, and discount amount. Uses the snapshot fields stored on the `orders` table (`couponCodeSnapshot`, `couponDiscountTypeSnapshot`, `couponDiscountValueSnapshot`, `discountAmount`).

## Acceptance Criteria

- AC-COM-CART-COUPON-024

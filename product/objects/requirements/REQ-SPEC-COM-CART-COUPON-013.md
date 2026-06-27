---
object_id: "REQ-SPEC-COM-CART-COUPON-013"
object_type: Requirement
priority: Nice to Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
module_area_id: "MA-COM-ORDHIS"
acceptance_criteria: ["AC-COM-CART-COUPON-023"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-013` | **Priority:** Nice to Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

In the customer order history detail view, orders placed with a coupon show a `Coupon discount: −₹XX` line item in the financial breakdown alongside the coupon code used. Data sourced from `order.couponCodeSnapshot` and `order.discountAmount`.

## Acceptance Criteria

- AC-COM-CART-COUPON-023

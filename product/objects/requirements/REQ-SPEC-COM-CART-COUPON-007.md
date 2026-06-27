---
object_id: "REQ-SPEC-COM-CART-COUPON-007"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
screen_id: "SCR-CUS-0003"
acceptance_criteria: ["AC-COM-CART-COUPON-013", "AC-COM-CART-COUPON-014"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-007` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

When a customer has a coupon applied and removes items or reduces quantities such that the cart subtotal drops below the coupon's `minimumOrderValue`, the coupon is automatically removed from Zustand cart state. A toast notification is shown immediately: "Coupon removed because cart value is below the minimum order value." The cart total recalculates immediately without the discount. This check fires on every item quantity change — not deferred to checkout.

## Acceptance Criteria

- AC-COM-CART-COUPON-013
- AC-COM-CART-COUPON-014

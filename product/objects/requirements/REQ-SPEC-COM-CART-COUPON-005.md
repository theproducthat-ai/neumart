---
object_id: "REQ-SPEC-COM-CART-COUPON-005"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
screen_id: "SCR-CUS-0003"
acceptance_criteria: ["AC-COM-CART-COUPON-009", "AC-COM-CART-COUPON-010"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-005` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

A logged-in customer can enter a coupon code in the cart input field and click Apply. If the coupon is valid, the cart displays a new discount line item (`Coupon discount: −₹XX`) and the cart total updates immediately to reflect `total = subtotal - discountAmount + deliveryFee`. The coupon code and computed discount are stored in Zustand cart state. A Remove button allows the customer to remove the coupon.

## Acceptance Criteria

- AC-COM-CART-COUPON-009
- AC-COM-CART-COUPON-010

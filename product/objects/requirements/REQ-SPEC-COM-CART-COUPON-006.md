---
object_id: "REQ-SPEC-COM-CART-COUPON-006"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
module_area_id: "MA-COM-CART"
screen_id: "SCR-CUS-0003"
acceptance_criteria: ["AC-COM-CART-COUPON-011", "AC-COM-CART-COUPON-012"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-006` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

When a customer applies a coupon that fails validation, an inline error is shown directly below the coupon input field (not as a toast). Error messages are specific to the failure reason:
- `COUPON_NOT_FOUND` → "This coupon code does not exist."
- `COUPON_INACTIVE` → "This coupon is no longer active."
- `COUPON_EXPIRED` → "This coupon has expired."
- `COUPON_NOT_YET_ACTIVE` → "This coupon is not yet valid."
- `COUPON_EXHAUSTED` → "This coupon has reached its maximum usage limit."
- `COUPON_PER_USER_LIMIT` → "You have already used this coupon."
- `COUPON_MINIMUM_NOT_MET` → "Your cart total is below the minimum required for this coupon (₹{minimumOrderValue/100})."

## Acceptance Criteria

- AC-COM-CART-COUPON-011
- AC-COM-CART-COUPON-012

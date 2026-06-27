---
object_id: "REQ-SPEC-COM-CART-COUPON-010"
object_type: Requirement
priority: Must Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-COM"
acceptance_criteria: ["AC-COM-CART-COUPON-019", "AC-COM-CART-COUPON-020"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-010` | **Priority:** Must Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

For all orders placed with a coupon: `total = subtotal - discountAmount + deliveryFee` (all in paise). `discountAmount = min(subtotal × discountValue / 100, maximumDiscount)`. `discountAmount` is clamped to `subtotal` — it can never exceed the merchandise total. `total` is always >= `deliveryFee`. For orders without a coupon, `discountAmount` is 0 (or absent) and the formula reduces to `total = subtotal + deliveryFee` — identical to existing behaviour.

## Acceptance Criteria

- AC-COM-CART-COUPON-019
- AC-COM-CART-COUPON-020

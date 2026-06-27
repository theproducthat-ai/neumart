---
object_id: "REQ-SPEC-COM-CART-COUPON-011"
object_type: Requirement
priority: Should Have
status: Active
prd_id: "PRD-COM-CART-COUPON-V1"
feature_id: "FEATURE-COM-CART-COUPON"
module_id: "MOD-ADM"
acceptance_criteria: ["AC-COM-CART-COUPON-021"]
created_at: "2026-06-25"
---

# Requirement

**ID:** `REQ-SPEC-COM-CART-COUPON-011` | **Priority:** Should Have
**PRD:** PRD-COM-CART-COUPON-V1 | **Feature:** FEATURE-COM-CART-COUPON

## Statement

The admin coupon list displays a usage count column showing `{used} / {limit}` (or `{used} / ∞` when no global limit is set). Count is derived from `couponUsages` table — query count of rows per `couponId`.

## Acceptance Criteria

- AC-COM-CART-COUPON-021

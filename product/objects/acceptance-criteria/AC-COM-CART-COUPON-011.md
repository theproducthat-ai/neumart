---
object_id: "AC-COM-CART-COUPON-011"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-006"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Error Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Customer enters a coupon code that does not exist in the database → inline error shown directly below the input field: "This coupon code does not exist." Error is not a toast. Cart total is unchanged.

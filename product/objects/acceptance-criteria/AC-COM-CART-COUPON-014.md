---
object_id: "AC-COM-CART-COUPON-014"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-007"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Edge Case
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Auto-remove fires immediately on item removal in cart — NOT at checkout initiation. Customer does not reach checkout with an invalid coupon state. If a coupon has no `minimumOrderValue`, removing items does not trigger auto-remove.

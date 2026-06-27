---
object_id: "AC-COM-CART-COUPON-021"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-011"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Should Have
created_at: "2026-06-25"
---

**AC:** Admin coupon list shows usage count `3 / 10` after 3 customers have redeemed a coupon with `usageLimit = 10`. For a coupon with no `usageLimit`, shows `3 / ∞`. Count updates in real time as new orders are placed.

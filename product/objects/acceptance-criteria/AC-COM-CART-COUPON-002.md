---
object_id: "AC-COM-CART-COUPON-002"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-001"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Error Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Admin submits coupon form with `discountType = "percentage"` but `maximumDiscount` omitted → form shows inline error "Maximum discount cap is required for percentage coupons." No coupon is written.

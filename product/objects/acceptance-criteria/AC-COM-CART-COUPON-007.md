---
object_id: "AC-COM-CART-COUPON-007"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-004"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Admin toggles coupon to Inactive → customer attempts to apply that coupon code in cart → `validateCoupon` returns error code `COUPON_INACTIVE` → cart shows inline error "This coupon is no longer active."

---
object_id: "AC-COM-CART-COUPON-023"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-013"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Nice to Have
created_at: "2026-06-25"
---

**AC:** Customer views order history detail for a past order where WELCOME10 was applied → financial breakdown shows "Coupon (WELCOME10): −₹65" line item sourced from `order.couponCodeSnapshot` and `order.discountAmount`. Orders without coupons show no coupon line.

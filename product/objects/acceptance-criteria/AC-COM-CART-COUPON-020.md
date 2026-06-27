---
object_id: "AC-COM-CART-COUPON-020"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-010"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Edge Case
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Coupon 50% off max ₹30 applied on ₹50 cart: computed = ₹25, cap = ₹30. `discountAmount = min(25, 30, 50) = ₹25`. `total = ₹50 − ₹25 + delivery = ₹25 + delivery`. Total is always >= deliveryFee — never goes negative.

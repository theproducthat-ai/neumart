---
object_id: "AC-COM-CART-COUPON-015"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-008"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Regression
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Order placed without any coupon code → `discountAmount` is 0 or absent on the stored order → `total = subtotal + deliveryFee` (unchanged from pre-coupon behaviour). No regression in the existing `placeOrder` path.

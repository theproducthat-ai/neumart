---
object_id: "AC-COM-CART-COUPON-024"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-014"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Nice to Have
created_at: "2026-06-25"
---

**AC:** Admin views order detail for an order where a coupon was applied → coupon section shows: "Coupon Applied: WELCOME10 | Type: Percentage | Value: 10% | Discount: −₹65." Data sourced from `couponCodeSnapshot`, `couponDiscountTypeSnapshot`, `couponDiscountValueSnapshot`, `discountAmount` on the order record.

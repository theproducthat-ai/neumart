---
object_id: "AC-COM-CART-COUPON-018"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-009"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Regression
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Existing order records created before the coupon feature deployment load correctly in admin and customer order history with no errors. New optional fields (`discountAmount`, `couponId`, etc.) are absent on old records — code handles `undefined` without crashing.

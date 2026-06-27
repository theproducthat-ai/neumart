---
object_id: "AC-COM-CART-COUPON-019"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-010"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** WELCOME10 coupon (10% off, max ₹100) applied on ₹650 cart: server computes `discountAmount = min(65, 100) = ₹65 (6500 paise)`. `total = 65000 - 6500 + deliveryFee`. Order stored with `discountAmount = 6500`, `couponCodeSnapshot = "WELCOME10"`, `couponDiscountValueSnapshot = 10`.

---
object_id: "AC-COM-CART-COUPON-016"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-008"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Error Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Customer applies valid coupon in cart; admin deactivates the coupon before customer places order → `placeOrder` returns `COUPON_INACTIVE` error → no order is written to the database → customer sees error message in cart/checkout UI. This test validates server re-validation at order time.

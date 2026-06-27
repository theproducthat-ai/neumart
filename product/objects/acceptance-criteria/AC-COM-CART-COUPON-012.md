---
object_id: "AC-COM-CART-COUPON-012"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-006"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Error Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Customer enters a coupon code with `expiresAt` in the past → inline error: "This coupon has expired." Each error code produces its specific message (COUPON_EXHAUSTED → "This coupon has reached its maximum usage limit."; COUPON_PER_USER_LIMIT → "You have already used this coupon."; COUPON_MINIMUM_NOT_MET → "Your cart total is below the minimum required for this coupon (₹{amount})." etc.)

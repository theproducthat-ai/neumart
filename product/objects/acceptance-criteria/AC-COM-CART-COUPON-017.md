---
object_id: "AC-COM-CART-COUPON-017"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-009"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Technical
priority: Must Have
created_at: "2026-06-25"
---

**AC:** `coupons` table and `couponUsages` table are present in the deployed Convex schema with all specified fields and indexes (`by_code`, `by_isActive` on `coupons`; `by_couponId`, `by_couponId_userId` on `couponUsages`). Admin can create a coupon and it persists correctly.

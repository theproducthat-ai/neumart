---
object_id: "AC-COM-CART-COUPON-013"
object_type: AcceptanceCriterion
requirement_id: "REQ-SPEC-COM-CART-COUPON-007"
prd_id: "PRD-COM-CART-COUPON-V1"
test_type: Happy Path
priority: Must Have
created_at: "2026-06-25"
---

**AC:** Customer has WELCOME10 (min ₹499) applied on a ₹650 cart → removes an item → new subtotal ₹400 (below ₹499 minimum) → coupon is auto-removed, discount line disappears, cart total recalculates immediately, toast shown: "Coupon removed because cart value is below the minimum order value."

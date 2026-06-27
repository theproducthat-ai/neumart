---
object_id: "TESTCASE-COM-CART-COUPON-015"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0025"
test_type: "Edge Case"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-015 — Backend: Discount cap clamping (maximumDiscount enforced)

**Story:** US-0025 — Backend: computeCouponDiscount
**Type:** Edge Case
**Area:** Discount calculation accuracy (BR-COUPON-003, BR-COUPON-004)

## Preconditions

- Coupon `CAPTEST` exists: 20% discount, maximumDiscount = ₹50 (5000 paise), no min cart, active
- Customer signed in with items totalling exactly ₹500 (computed 20% = ₹100 > cap ₹50)

## Steps

1. Navigate to `/cart` with subtotal exactly ₹500
2. Apply coupon `CAPTEST`
3. Observe the discount amount shown in the cart summary
4. Confirm calculation: `min(500 × 20%, 50)` = `min(100, 50)` = ₹50

## Expected Result

- Discount shown = ₹50.00 (NOT ₹100.00)
- Cart total = ₹500 − ₹50 = ₹450
- The cap (maximumDiscount) is correctly applied
- No error shown

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

---
object_id: "TESTCASE-COM-CART-COUPON-014"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0032"
test_type: "Edge Case"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-014 — Customer: Coupon auto-removed when cart drops below minimum

**Story:** US-0032 — Customer UI: Auto-remove coupon on cart drop below minimum
**Type:** Edge Case
**Area:** Customer cart — auto-remove on quantity change

## Preconditions

- Coupon `WELCOME10` is applied (min cart ₹500)
- Cart contains 2+ items with total ≥ ₹500
- Coupon discount is currently showing
- Cart page at `/cart`

## Steps

1. Confirm `WELCOME10` is applied and cart subtotal ≥ ₹500
2. Remove items or decrease quantity until cart subtotal drops BELOW ₹500
3. Observe UI response immediately after the change

## Expected Result

- Coupon is automatically removed without user action
- Toast notification appears: "Coupon removed — cart is below the minimum order value." (or similar)
- Discount line item disappears
- Cart total reflects subtotal with NO discount
- Coupon input field returns to default state

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

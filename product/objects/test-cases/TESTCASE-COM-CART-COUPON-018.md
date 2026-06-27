---
object_id: "TESTCASE-COM-CART-COUPON-018"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0033"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-018 — Checkout: Coupon discount line visible in order summary

**Story:** US-0033 — Customer UI: Checkout summary coupon discount line [Should Have]
**Type:** Happy Path
**Area:** Checkout page order summary

## Preconditions

- Coupon `WELCOME10` applied in cart (TC-006 state)
- Customer has a delivery address set
- Customer at `/checkout`

## Steps

1. From `/cart` with `WELCOME10` applied, click "Proceed to checkout"
2. Observe the Order Summary section on the right column of `/checkout`

## Expected Result

- Order Summary shows:
  1. `Subtotal (N items)  ₹XXX.XX`
  2. `Coupon (WELCOME10)  −₹XX.XX` (green text)
  3. `Delivery  Free`
  4. Separator
  5. `Total  ₹YYY.YY` (= subtotal − discount)
- Discount amount matches what was shown on the cart page
- No coupon input field on the checkout page (coupon was already applied)

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

---
object_id: "TESTCASE-COM-CART-COUPON-019"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0034"
test_type: "Happy Path"
priority: "Nice to Have"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-019 — Order history: Coupon discount displayed on order detail

**Story:** US-0034 — Customer UI: Order history coupon discount display [Nice to Have]
**Type:** Happy Path
**Priority:** Nice to Have
**Area:** Customer order detail page

## Preconditions

- An order has been placed with coupon `WELCOME10` (TC-016 completed)
- Customer signed in

## Steps

1. Navigate to `/orders`
2. Click on the order that was placed with `WELCOME10`
3. Observe the totals section

## Expected Result

- Order detail totals section shows:
  1. `Subtotal  ₹XXX.XX`
  2. `Coupon (WELCOME10)  −₹XX.XX` (green text)
  3. `Delivery  Free`
  4. Separator
  5. `Total  ₹YYY.YY`
- The coupon code snapshot (`WELCOME10`) is correctly displayed from the stored `couponCodeSnapshot` field

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

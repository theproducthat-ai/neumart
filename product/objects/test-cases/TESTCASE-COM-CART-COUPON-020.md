---
object_id: "TESTCASE-COM-CART-COUPON-020"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-ADM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0035"
test_type: "Happy Path"
priority: "Nice to Have"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-020 — Admin order detail: Coupon code and discount displayed

**Story:** US-0035 — Admin UI: Order detail coupon display [Nice to Have]
**Type:** Happy Path
**Priority:** Nice to Have
**Area:** Admin order detail page

## Preconditions

- An order has been placed with coupon `WELCOME10` (TC-016 completed)
- Signed in as admin

## Steps

1. Navigate to `/admin/orders`
2. Click on the order placed with `WELCOME10`
3. Observe the totals section in the left column (below the items table)

## Expected Result

- Order detail totals section shows:
  1. `Subtotal  ₹XXX.XX`
  2. `Coupon (WELCOME10)  −₹XX.XX` (green text)
  3. `Delivery  Free`
  4. Separator
  5. `Total  ₹YYY.YY`
- Coupon snapshot data (`couponCodeSnapshot`) correctly sourced from order record

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

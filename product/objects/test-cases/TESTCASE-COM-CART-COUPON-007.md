---
object_id: "TESTCASE-COM-CART-COUPON-007"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0027"
test_type: "Error Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-007 — Customer: Apply non-existent coupon code (COUPON_NOT_FOUND)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — coupon validation error

## Preconditions

- Customer signed in with items in cart
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Type `DOESNOTEXIST` in the coupon input field
3. Click `Apply`

## Expected Result

- Inline error shown below the input field: "This coupon code does not exist." (or equivalent COUPON_NOT_FOUND message)
- No discount applied
- Cart total unchanged
- Error displayed inline (NOT as a toast)

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

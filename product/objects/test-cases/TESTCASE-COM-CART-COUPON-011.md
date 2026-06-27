---
object_id: "TESTCASE-COM-CART-COUPON-011"
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

# TC-011 — Customer: Apply globally exhausted coupon (COUPON_EXHAUSTED)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — global usage limit exhausted

## Preconditions

- Coupon `MAXONE` exists with `usageLimit = 1`, active
- The coupon has already been used once (1 couponUsage record exists for it)
  - Place one order using `MAXONE` first to exhaust it
- Customer signed in with items in cart (different user, or second attempt)
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Type `MAXONE` in the coupon input field
3. Click `Apply`

## Expected Result

- Inline error shown: "This coupon has reached its maximum usage limit." (COUPON_EXHAUSTED)
- No discount applied
- Cart total unchanged

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

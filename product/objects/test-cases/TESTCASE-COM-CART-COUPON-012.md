---
object_id: "TESTCASE-COM-CART-COUPON-012"
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

# TC-012 — Customer: Apply coupon at per-user limit (COUPON_PER_USER_LIMIT)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — per-user limit exhausted

## Preconditions

- Coupon `WELCOME10` exists with `perUserLimit = 1` and `usageLimit = 50`
- The current signed-in customer has ALREADY used `WELCOME10` once (1 couponUsage record for this userId + couponId)
- Customer signed in and has items in cart
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Type `WELCOME10` in the coupon input field
3. Click `Apply`

## Expected Result

- Inline error shown: "You have already used this coupon the maximum number of times." (COUPON_PER_USER_LIMIT)
- No discount applied
- Cart total unchanged

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

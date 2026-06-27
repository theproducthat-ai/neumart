---
object_id: "TESTCASE-COM-CART-COUPON-009"
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

# TC-009 — Customer: Apply expired coupon (COUPON_EXPIRED)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — expired coupon

## Preconditions

- Coupon `EXPIRED10` exists with `expiresAt` set to a past datetime (e.g., 2026-01-01 00:00)
  - Create via admin with `Valid To` set to a past date
- Coupon must be `isActive = true`
- Customer signed in with items in cart
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Type `EXPIRED10` in the coupon input field
3. Click `Apply`

## Expected Result

- Inline error shown: "This coupon has expired." (COUPON_EXPIRED)
- No discount applied
- Cart total unchanged

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

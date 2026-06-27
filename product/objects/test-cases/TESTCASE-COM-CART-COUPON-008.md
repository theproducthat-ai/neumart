---
object_id: "TESTCASE-COM-CART-COUPON-008"
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

# TC-008 — Customer: Apply inactive coupon (COUPON_INACTIVE)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — inactive coupon

## Preconditions

- Coupon `DISABLED10` exists but `isActive = false`
  - Create via admin if needed: 10% off, max ₹100, toggle OFF before saving
- Customer signed in with items in cart
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Type `DISABLED10` in the coupon input field
3. Click `Apply`

## Expected Result

- Inline error shown: "This coupon is no longer active." (COUPON_INACTIVE)
- No discount applied
- Cart total unchanged

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

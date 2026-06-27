---
object_id: "TESTCASE-COM-CART-COUPON-010"
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

# TC-010 — Customer: Apply coupon when cart below minimum (COUPON_MINIMUM_NOT_MET)

**Story:** US-0027 — Backend: validateCoupon with structured error codes
**Type:** Error Path
**Area:** Customer cart — minimum order value not met

## Preconditions

- Coupon `WELCOME10` exists with `minimumOrderValue = ₹500` (40000 paise)
- Customer signed in with items in cart totalling LESS than ₹500 (e.g., ₹299)
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Confirm cart subtotal is below ₹500
3. Type `WELCOME10` in the coupon input field
4. Click `Apply`

## Expected Result

- Inline error shown: "Your cart total is below the minimum required for this coupon (₹500.00)." (COUPON_MINIMUM_NOT_MET, with amount parsed correctly from JSON error data)
- No discount applied
- Cart total unchanged
- Error is inline below input (NOT a toast)

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

## Notes

This test case specifically validates the fix applied in this session (ConvexError.data parsing in CouponInputField.tsx). The error must show the rupee amount, not a generic "Failed to apply coupon" message.

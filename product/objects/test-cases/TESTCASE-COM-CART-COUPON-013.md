---
object_id: "TESTCASE-COM-CART-COUPON-013"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0031"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-013 — Customer: Remove applied coupon from cart

**Story:** US-0031 — Customer UI: Cart coupon input + apply + discount line item + remove
**Type:** Happy Path
**Area:** Customer cart — coupon remove

## Preconditions

- Coupon `WELCOME10` is applied to cart (TC-006 completed successfully)
- Discount line item is visible in cart summary
- Cart page at `/cart`

## Steps

1. Confirm `WELCOME10` is applied — green applied state visible with ✕ button
2. Confirm discount line item visible in summary
3. Click the ✕ (remove) button next to the applied coupon
4. Observe UI response

## Expected Result

- Coupon input field returns to default empty state
- Discount line item disappears from cart summary
- Cart total reverts to original subtotal
- No error shown
- No toast shown
- Page does not reload

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

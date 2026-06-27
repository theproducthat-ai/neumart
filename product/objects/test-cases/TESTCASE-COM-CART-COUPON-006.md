---
object_id: "TESTCASE-COM-CART-COUPON-006"
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

# TC-006 — Customer: Apply valid coupon — discount shown in cart

**Story:** US-0031 — Customer UI: Cart coupon input + apply + discount line item + remove
**Type:** Happy Path
**Area:** Customer cart — coupon apply

## Preconditions

- Coupon `WELCOME10` exists: 10% off, max ₹150, min cart ₹500, active
- Customer signed in with items in cart totalling ≥ ₹500
- Cart page at `/cart`

## Steps

1. Navigate to `/cart`
2. Confirm subtotal is ≥ ₹500
3. Observe "Have a coupon?" section below item list
4. Type `WELCOME10` in the coupon input field
5. Click `Apply`
6. Observe UI response

## Expected Result

- Loading spinner shows briefly during validation
- Coupon input area transforms to "applied" state showing code in green with remove ✕ button
- Discount line item appears in the cart summary: `Coupon WELCOME10  −₹XX.XX`
- Cart total updates to: `subtotal − discount`
- Discount amount = `min(subtotal × 10%, 150)`
- No toast or error shown

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

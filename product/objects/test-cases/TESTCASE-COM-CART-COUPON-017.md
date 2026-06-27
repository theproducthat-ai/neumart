---
object_id: "TESTCASE-COM-CART-COUPON-017"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0028"
test_type: "Regression"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-017 — REGRESSION: Place order WITHOUT coupon — no regression

**Story:** US-0028 — placeOrder mutation extension
**Type:** Regression — RSK-COM-CART-COUPON-001
**Area:** Order placement without coupon (existing flow)

## Preconditions

- NO coupon applied to cart
- Customer has items in cart and a delivery address
- Customer signed in

## Steps

1. Navigate to `/cart` — confirm NO coupon applied, discount line NOT visible
2. Click "Proceed to checkout"
3. Confirm checkout summary shows: subtotal + delivery (free) = total (NO discount line)
4. Click "Place Order"
5. Confirm redirect to `/orders/{id}?placed=1`
6. On order detail: check totals — subtotal = total (no discount row)

## Expected Result

- Step 3: No discount line in checkout summary
- Step 4: Order placed successfully with no error
- Step 6: Order detail shows only Subtotal and Delivery rows; no coupon row; Total = Subtotal
- No `discountAmount`, `couponId`, or `couponCodeSnapshot` fields set on the order
- `placeOrderWithoutPayment` mutation succeeds exactly as before coupon feature was added

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

## Risk Note

RSK-COM-CART-COUPON-001: This test guards against regression in non-coupon order placement. If this test fails, the coupon feature has broken the existing order flow and constitutes a Critical bug.

---
object_id: "TESTCASE-COM-CART-COUPON-016"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0028"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-016 — Order: Place order with coupon — discount recorded + couponUsage written

**Story:** US-0028 — Backend: placeOrder mutation extension — coupon validation + couponUsage write
**Type:** Happy Path
**Area:** Order placement with coupon

## Preconditions

- Coupon `WELCOME10` applied in cart (TC-006 state)
- Customer has a delivery address set
- Cart subtotal ≥ ₹500
- Customer signed in

## Steps

1. Navigate to `/cart` with `WELCOME10` applied
2. Click "Proceed to checkout"
3. Confirm discount line item visible in checkout summary
4. Confirm total = subtotal − discount
5. Click "Place Order"
6. Confirm redirect to `/orders/{id}?placed=1`
7. On order detail page: check totals section
8. Admin: navigate to `/admin/orders/{id}` and check totals + coupon section

## Expected Result

- Step 3: Discount line item `Coupon (WELCOME10) −₹XX.XX` visible
- Step 5: Order placed successfully (no error toast)
- Step 6: Redirected to order detail with success banner
- Step 7 (Customer order detail): Shows `Coupon (WELCOME10)  −₹XX.XX` line in totals; Total reflects discount
- Step 8 (Admin order detail): Shows same coupon line; order total correct
- After order: `appliedCoupon` cleared from Zustand store; coupon input field empty on next cart visit
- In Convex: a `couponUsage` record exists for this order (verify via admin usage count increment)

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

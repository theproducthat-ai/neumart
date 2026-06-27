---
object_id: "TESTCASE-COM-CART-COUPON-004"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-ADM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0026"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-004 — Admin: Usage count increments after order placed with coupon

**Story:** US-0026 — Backend: listCoupons query + usage count aggregation
**Type:** Happy Path
**Area:** Admin coupon usage count

## Preconditions

- Coupon `WELCOME10` exists with `Usage Limit: 50` and current usage `0`
- Customer account exists with items in cart totalling ≥ ₹500

## Steps

1. Note the current usage count for `WELCOME10` on `/admin/coupons` (should be `0`)
2. Sign in as customer and add items to cart (subtotal ≥ ₹500)
3. Apply coupon `WELCOME10` and complete checkout (place order)
4. Return to admin at `/admin/coupons`
5. Observe usage count for `WELCOME10`

## Expected Result

- Usage count for `WELCOME10` increments from `0` to `1`
- No page refresh required (Convex real-time updates the query)

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

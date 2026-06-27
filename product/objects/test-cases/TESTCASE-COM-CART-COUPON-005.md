---
object_id: "TESTCASE-COM-CART-COUPON-005"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-ADM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0029"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-005 — Admin: Toggle coupon active/inactive

**Story:** US-0029 — Admin UI: Coupon List screen
**Type:** Happy Path
**Area:** Admin coupon toggle

## Preconditions

- Coupon `WELCOME10` exists and is currently Active
- Signed in as admin at `/admin/coupons`

## Steps

1. Navigate to `/admin/coupons`
2. Locate `WELCOME10` — Active toggle is ON
3. Click the Active toggle to deactivate
4. Observe UI update
5. As customer, attempt to apply `WELCOME10` in cart
6. Return to admin and re-activate the coupon (toggle ON)

## Expected Result

- Step 4: Toggle flips OFF immediately without page reload
- Step 5: Customer gets inline error `COUPON_INACTIVE` (or "This coupon is no longer active.")
- Step 6: Toggle flips ON; coupon becomes valid again for customers

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

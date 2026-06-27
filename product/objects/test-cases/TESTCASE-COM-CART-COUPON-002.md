---
object_id: "TESTCASE-COM-CART-COUPON-002"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-ADM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0030"
test_type: "Error Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-002 — Admin: Create coupon with missing maximumDiscount

**Story:** US-0030 — Admin UI: Coupon Create / Edit Form
**Type:** Error Path
**Area:** Admin coupon form validation

## Preconditions

- Signed in as admin at `/admin/coupons/new`
- TC-001 has been run (or any coupon form is accessible)

## Steps

1. Navigate to `/admin/coupons/new`
2. Enter `Code`: `BADCOUPON`
3. Enter `Discount Value`: `15`
4. Leave `Maximum Discount (₹)` empty
5. Click `Save`

## Expected Result

- Form does NOT submit
- Inline validation error shown: `Maximum discount is required for percentage coupons` (or similar)
- No coupon created
- User stays on the create form

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

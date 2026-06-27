---
object_id: "TESTCASE-COM-CART-COUPON-003"
object_type: test_case
parent_object_id: "TESTPLAN-COM-CART-COUPON-001"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-ADM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_story: "US-0030"
test_type: "Happy Path"
status: "Not Executed"
result: ""
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# TC-003 — Admin: Edit existing coupon

**Story:** US-0030 — Admin UI: Coupon Create / Edit Form
**Type:** Happy Path
**Area:** Admin coupon edit

## Preconditions

- Coupon `WELCOME10` exists (created in TC-001)
- Signed in as admin at `/admin/coupons`

## Steps

1. Navigate to `/admin/coupons`
2. Click `Edit` on the `WELCOME10` row (or click the row)
3. Confirm form is pre-filled with existing values
4. Change `Maximum Discount (₹)` from `100` to `150`
5. Click `Save`

## Expected Result

- Form saves without error
- Redirects to `/admin/coupons`
- `WELCOME10` row shows Max cap: ₹150.00
- All other fields unchanged

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

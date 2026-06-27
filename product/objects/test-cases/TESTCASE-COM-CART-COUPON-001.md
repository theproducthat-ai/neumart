---
object_id: "TESTCASE-COM-CART-COUPON-001"
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

# TC-001 — Admin: Create valid percentage coupon

**Story:** US-0030 — Admin UI: Coupon Create / Edit Form
**Type:** Happy Path
**Area:** Admin coupon management

## Preconditions

- Signed in as admin user at `/admin`
- At least one admin account exists
- `Coupons` entry visible in admin sidebar

## Steps

1. Navigate to `/admin/coupons`
2. Click "New Coupon" button
3. Enter `Code`: `WELCOME10`
4. Verify code auto-uppercases on input
5. Verify `Discount Type` reads "Percentage" (read-only)
6. Enter `Discount Value`: `10` (%)
7. Enter `Maximum Discount (₹)`: `100`
8. Enter `Minimum Cart Value (₹)`: `500`
9. Enter `Usage Limit`: `50`
10. Enter `Per User Limit`: `1`
11. Leave `Valid From` and `Valid To` empty
12. Toggle `Active` to ON
13. Click `Save`

## Expected Result

- Form submits without error
- Redirects to `/admin/coupons`
- `WELCOME10` appears in the coupon list with:
  - Discount: 10%
  - Max cap: ₹100.00
  - Min cart: ₹500.00
  - Usage: 0
  - Active toggle: ON

## Actual Result

_(to be recorded during test execution)_

## Status

Not Executed

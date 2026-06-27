---
object_id: "QA-COM-CART-COUPON-001"
object_type: qa_run
parent_object_id: "FEATURE-COM-CART-COUPON"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_devplan: "DEVPLAN-COM-CART-COUPON-001"
linked_test_plan: "TESTPLAN-COM-CART-COUPON-001"
qa_run_id: "QA-COM-CART-COUPON-001"

status: "Ready for Execution"
overall_result: ""
execution_status: "Not Executed"

test_cases_total: 20
test_cases_passed: 0
test_cases_failed: 0
test_cases_skipped: 0

bugs_found: []
regression_verified: false

qa_date: "2026-06-26"
qa_engineer: "TBD"

version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# QA Run — Discount Coupon System

**QA Run ID:** `QA-COM-CART-COUPON-001`
**Feature:** FEATURE-COM-CART-COUPON
**Test Plan:** TESTPLAN-COM-CART-COUPON-001
**PRD:** PRD-COM-CART-COUPON-V1
**Lane:** 3 — Standard Feature
**Status:** Ready for Execution
**Date Created:** 2026-06-26

---

## Execution Status

**Overall Result:** Not Executed — awaiting tester run

This QA run was created on 2026-06-26. Development is complete (all 6 phases implemented). The test plan and 20 test cases have been written. The run is ready for execution by a tester.

---

## Test Case Execution Log

| # | Test Case ID | Story | Type | Status | Result | Bug |
|---|---|---|---|---|---|---|
| 1 | TESTCASE-COM-CART-COUPON-001 | US-0030 | Happy Path | Not Executed | — | — |
| 2 | TESTCASE-COM-CART-COUPON-002 | US-0030 | Error Path | Not Executed | — | — |
| 3 | TESTCASE-COM-CART-COUPON-003 | US-0030 | Happy Path | Not Executed | — | — |
| 4 | TESTCASE-COM-CART-COUPON-004 | US-0026 | Happy Path | Not Executed | — | — |
| 5 | TESTCASE-COM-CART-COUPON-005 | US-0029 | Happy Path | Not Executed | — | — |
| 6 | TESTCASE-COM-CART-COUPON-006 | US-0031 | Happy Path | Not Executed | — | — |
| 7 | TESTCASE-COM-CART-COUPON-007 | US-0027 | Error Path | Not Executed | — | — |
| 8 | TESTCASE-COM-CART-COUPON-008 | US-0027 | Error Path | Not Executed | — | — |
| 9 | TESTCASE-COM-CART-COUPON-009 | US-0027 | Error Path | Not Executed | — | — |
| 10 | TESTCASE-COM-CART-COUPON-010 | US-0027 | Error Path | Not Executed | — | — |
| 11 | TESTCASE-COM-CART-COUPON-011 | US-0027 | Error Path | Not Executed | — | — |
| 12 | TESTCASE-COM-CART-COUPON-012 | US-0027 | Error Path | Not Executed | — | — |
| 13 | TESTCASE-COM-CART-COUPON-013 | US-0031 | Happy Path | Not Executed | — | — |
| 14 | TESTCASE-COM-CART-COUPON-014 | US-0032 | Edge Case | Not Executed | — | — |
| 15 | TESTCASE-COM-CART-COUPON-015 | US-0025 | Edge Case | Not Executed | — | — |
| 16 | TESTCASE-COM-CART-COUPON-016 | US-0028 | Happy Path | Not Executed | — | — |
| 17 | TESTCASE-COM-CART-COUPON-017 | US-0028 | Regression | Not Executed | — | — |
| 18 | TESTCASE-COM-CART-COUPON-018 | US-0033 | Happy Path | Not Executed | — | — |
| 19 | TESTCASE-COM-CART-COUPON-019 | US-0034 | Happy Path (Nice to Have) | Not Executed | — | — |
| 20 | TESTCASE-COM-CART-COUPON-020 | US-0035 | Happy Path (Nice to Have) | Not Executed | — | — |

---

## Test Summary

| Metric | Value |
|---|---|
| Total | 20 |
| Passed | 0 (awaiting execution) |
| Failed | 0 (awaiting execution) |
| Skipped | 0 (awaiting execution) |
| Must-Have (TC-001 to TC-018) | 18 |
| Nice-to-Have (TC-019, TC-020) | 2 |

---

## Bugs Found

None — run not yet executed.

---

## Regression Verification

| Regression Area | Test Case | Status |
|---|---|---|
| placeOrder without coupon | TC-017 | Not Executed |
| Cart state after coupon remove | TC-013 | Not Executed |
| Checkout flow | TC-016, TC-017, TC-018 | Not Executed |
| Order creation | TC-016, TC-017 | Not Executed |

---

## Known Issues at Time of Run Creation

The following bugs were found and fixed during development before this QA run was created:

| Issue | Fix Applied | Fixed In |
|---|---|---|
| `@/components/ui/switch` not installed — admin coupons page build error | Installed ShadCN Switch component via `npx shadcn@latest add switch` | 2026-06-26 (this session) |
| `ConvexError.data` not read in `parseErrorCode` — COUPON_MINIMUM_NOT_MET showed generic error | Fixed `parseErrorCode` in `CouponInputField.tsx` to read `err.data` before `err.message` | 2026-06-26 (this session) |

TC-010 specifically validates the ConvexError parsing fix.

---

## Environment

| Parameter | Value |
|---|---|
| App URL | http://localhost:3000 |
| Backend | Convex local dev server |
| Auth | Clerk (dev mode) |
| Branch | main |
| Dev server | Next.js 16.2.9 Webpack |

---

## How to Execute This Run

1. Open [TESTPLAN-COM-CART-COUPON-001](../test-plans/TESTPLAN-COM-CART-COUPON-001.md) for scope
2. Execute test cases TC-001 through TC-020 in order (they have dependencies)
3. Record `Actual Result` and `Status` (Pass/Fail/Skip) in each test case file
4. Update the execution log table above after each test
5. Create Bug Objects in `product/objects/bugs/` for any failures
6. Update `test_cases_passed / failed / skipped` counts in this file's frontmatter
7. Set `overall_result` to Passed / Failed / Conditionally Passed
8. Update `FEATURE-COM-CART-COUPON.md` `has_qa` field with this run ID
9. Update `QA_VIEW.md` with results
10. Run `/product-uat FEATURE-COM-CART-COUPON` after QA passes

---

## Pass/Fail Criteria

**Passed:** TC-001 to TC-018 all pass + zero Critical/High bugs open
**Conditionally Passed:** TC-001 to TC-018 pass + TC-019/TC-020 fail with Medium/Low bugs only
**Failed:** Any of TC-001 to TC-018 fail with Critical/High bug, OR TC-017 regression fails

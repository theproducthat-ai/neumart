---
object_id: "TESTPLAN-COM-CART-COUPON-001"
object_type: test_plan
parent_object_id: "FEATURE-COM-CART-COUPON"
source_request_id: "REQUEST-COM-CART-COUPON-001"
module_id: "MOD-COM"
related_feature_id: "FEATURE-COM-CART-COUPON"
linked_prd: "PRD-COM-CART-COUPON-V1"
linked_devplan: "DEVPLAN-COM-CART-COUPON-001"
linked_qa_run: "QA-COM-CART-COUPON-001"
status: "Active"
version: "1.0"
created_date: "2026-06-26"
updated_date: "2026-06-26"
---

# Test Plan — Discount Coupon System

**Test Plan ID:** `TESTPLAN-COM-CART-COUPON-001`
**Feature:** FEATURE-COM-CART-COUPON
**PRD:** PRD-COM-CART-COUPON-V1
**DevPlan:** DEVPLAN-COM-CART-COUPON-001
**QA Run:** QA-COM-CART-COUPON-001
**Created:** 2026-06-26
**Lane:** 3 — Standard Feature

---

## 1. Scope

This test plan covers all 12 user stories (US-0024 through US-0035) for the Discount Coupon System feature. It tests the complete end-to-end flow: admin coupon management → customer cart coupon application → order placement with discount → post-order display.

### In-Scope Stories

| Story | Description |
|---|---|
| US-0024 | Schema: coupons + couponUsages tables + orders fields |
| US-0025 | Backend: createCoupon / updateCoupon + computeCouponDiscount |
| US-0026 | Backend: listCoupons query + usage count aggregation |
| US-0027 | Backend: validateCoupon with 7 structured error codes |
| US-0028 | Backend: placeOrder extension — coupon validation + couponUsage write |
| US-0029 | Admin UI: Coupon List screen |
| US-0030 | Admin UI: Coupon Create / Edit Form |
| US-0031 | Customer UI: Cart coupon input, apply, discount line item, remove |
| US-0032 | Customer UI: Auto-remove coupon on cart drop below minimum |
| US-0033 | Customer UI: Checkout summary coupon discount line |
| US-0034 | Customer UI: Order history coupon discount display |
| US-0035 | Admin UI: Order detail coupon display |

### Out-of-Scope

- Fixed-amount coupons (`discountType: "fixed"`) — deferred to Phase 2
- Multi-coupon stacking
- Razorpay coupon integration — deferred (DEP-COM-CART-COUPON-RAZORPAY-001)
- Performance load testing

---

## 2. Test Types

| Type | Coverage |
|---|---|
| Happy Path | All must-have acceptance criteria — success flows |
| Error Path | All 7 coupon validation error codes; form validation failures |
| Edge Case | Discount cap clamping; coupon on minimum-value cart; concurrent exhaustion |
| Regression | placeOrder without coupon (no regression); cart state after coupon remove |

---

## 3. Environment

| Parameter | Value |
|---|---|
| App URL | http://localhost:3000 |
| Admin URL | http://localhost:3000/admin |
| Backend | Convex local dev server |
| Auth | Clerk (test accounts) |
| Database | Convex local (dev) |

### Required Test Data

1. **Admin account** with `assertAdmin` access
2. **Customer account** (regular user)
3. Coupons created during test run (see TC-001 setup)
4. At least 3 products in inventory with known prices

---

## 4. Test Case Summary

| Test Case ID | Story | Type | Area |
|---|---|---|---|
| TESTCASE-COM-CART-COUPON-001 | US-0030 | Happy Path | Admin: Create coupon |
| TESTCASE-COM-CART-COUPON-002 | US-0030 | Error Path | Admin: Create coupon validation |
| TESTCASE-COM-CART-COUPON-003 | US-0030 | Happy Path | Admin: Edit coupon |
| TESTCASE-COM-CART-COUPON-004 | US-0026 | Happy Path | Admin: Usage count |
| TESTCASE-COM-CART-COUPON-005 | US-0029 | Happy Path | Admin: Toggle active |
| TESTCASE-COM-CART-COUPON-006 | US-0031 | Happy Path | Customer: Apply valid coupon |
| TESTCASE-COM-CART-COUPON-007 | US-0027 | Error Path | Customer: COUPON_NOT_FOUND |
| TESTCASE-COM-CART-COUPON-008 | US-0027 | Error Path | Customer: COUPON_INACTIVE |
| TESTCASE-COM-CART-COUPON-009 | US-0027 | Error Path | Customer: COUPON_EXPIRED |
| TESTCASE-COM-CART-COUPON-010 | US-0027 | Error Path | Customer: COUPON_MINIMUM_NOT_MET |
| TESTCASE-COM-CART-COUPON-011 | US-0027 | Error Path | Customer: COUPON_EXHAUSTED |
| TESTCASE-COM-CART-COUPON-012 | US-0027 | Error Path | Customer: COUPON_PER_USER_LIMIT |
| TESTCASE-COM-CART-COUPON-013 | US-0031 | Happy Path | Customer: Remove coupon |
| TESTCASE-COM-CART-COUPON-014 | US-0032 | Edge Case | Customer: Auto-remove on cart drop |
| TESTCASE-COM-CART-COUPON-015 | US-0025 | Edge Case | Backend: Discount cap clamping |
| TESTCASE-COM-CART-COUPON-016 | US-0028 | Happy Path | Order: Place with coupon |
| TESTCASE-COM-CART-COUPON-017 | US-0028 | Regression | Order: Place without coupon |
| TESTCASE-COM-CART-COUPON-018 | US-0033 | Happy Path | Checkout: Discount in summary |
| TESTCASE-COM-CART-COUPON-019 | US-0034 | Happy Path | Order history: Discount display |
| TESTCASE-COM-CART-COUPON-020 | US-0035 | Happy Path | Admin order: Coupon display |

**Total test cases: 20**

---

## 5. Regression Risk Areas

Per IMPACT-COM-CART-COUPON-001 risk map:

| Area | Risk | Test Coverage |
|---|---|---|
| `placeOrderWithoutPayment` mutation | RSK-COM-CART-COUPON-001 — regression in non-coupon orders | TC-017 |
| Race condition on limited coupons | RSK-COM-CART-COUPON-002 | TC-011 (manual test, sequential only) |
| Discount exceeds subtotal | RSK-COM-CART-COUPON-003 | TC-015 |
| Client/server discount divergence | RSK-COM-CART-COUPON-004 | TC-016 (server recalculates) |
| Cart state management | HIGH per QA_VIEW regression areas | TC-013, TC-014 |
| Checkout flow | HIGH per QA_VIEW regression areas | TC-016, TC-017, TC-018 |
| Order creation | HIGH per QA_VIEW regression areas | TC-016, TC-017 |

---

## 6. Acceptance Criteria Coverage

All 24 acceptance criteria from PRD-COM-CART-COUPON-V1 are covered by the 20 test cases.

*Note: Individual user story files (US-0024 to US-0035) were not created in `product/objects/user-stories/` — test cases are derived from PRD requirements and USER_STORY_INDEX descriptions. [ACCEPTANCE CRITERIA INFERRED — create individual story files to enable fine-grained AC-level traceability.]*

---

## 7. Pass/Fail Criteria

**QA Passed if:**
- All 20 test cases pass
- Zero Critical or High severity bugs open
- Regression test (TC-017) passes — placeOrder without coupon unaffected

**QA Conditionally Passed if:**
- TC-019 and/or TC-020 (Nice to Have) fail with Medium/Low bugs
- All Must-Have test cases (TC-001 to TC-018) pass
- Product Owner acknowledges the open items

**QA Failed if:**
- Any of TC-001 to TC-018 fail with a Critical or High bug
- TC-017 regression fails (order placement broken for non-coupon orders)

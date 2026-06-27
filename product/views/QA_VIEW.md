# Nuemart Product OS — QA View

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

> **Migration Note:** This view extends `product/11-qa-testing/` files. The original QA documents are preserved in that folder and remain the source of truth for test case details and bug records.

---

## 1. Active QA Runs

| QA Run ID | Feature | Date Created | Status | Tests | Blocking |
|---|---|---|---|---|---|
| QA-COM-CART-COUPON-001 | FEATURE-COM-CART-COUPON | 2026-06-26 | Ready for Execution | 20 total, 0 executed | None |

---

## 2. Completed QA Runs

| QA Run ID | Legacy | Feature | Date | Result | Tests Run | Tests Passed | Bugs Found |
|---|---|---|---|---|---|---|---|
| QA-COM-PLP-CAROUSEL-RUN-001 | QA-0001 | FEATURE-COM-PLP-CAROUSEL | 2026-06-22 | Passed | 20 | 20 | 0 |

---

## 3. Planned QA Runs

| QA Run ID | Feature | Trigger | Prerequisite |
|---|---|---|---|
| QA-DEL-CORE-DELIVERY-MVP-RUN-001 | FEATURE-DEL-CORE-DELIVERY-MVP | After Delivery development is complete | Development of all 8 user stories (US-0001–US-0008) must be done |

---

## 4. Open Bugs

None currently.

---

## 5. Bug Register

Legacy bug register: `product/11-qa-testing/BUG_REGISTER.md`

When new bugs are found during QA, they should be:
1. Logged in the Bug Register with a BUG-{SEQ} ID
2. Linked to the relevant QA Run
3. Linked to the Feature Object they affect
4. Tracked to resolution before the QA run can be marked Passed

---

## 6. Regression Risk Areas

Areas that should always be tested when making changes to the codebase. Based on `product/11-qa-testing/REGRESSION_TEST_CHECKLIST.md`.

| Area | Risk Level | Reason |
|---|---|---|
| Product Listing Page (PLP) | High | Shared by all customers; carousel, search, filter all live here |
| Cart state management | High | Cart bugs directly block purchases |
| Checkout flow | High | Revenue-critical path |
| Admin product / inventory | Medium | Stock inconsistencies affect customer-facing PLP |
| Authentication (Clerk) | Medium | All protected routes depend on Clerk session |
| Order creation | High | Core transaction; must be atomic |
| Address management | Medium | Required for checkout; bugs block order placement |

---

## 7. QA Readiness Status

| Feature / Item | QA Ready? | Blockers |
|---|---|---|
| FEATURE-COM-PLP-CAROUSEL | QA Complete (Passed 20/20) | None — moving to UAT |
| FEATURE-DEL-CORE-DELIVERY-MVP | Not Ready | Development not yet started |
| Razorpay integration (Phase 11) | Not Ready | Development not yet started; blocked externally |
| MVP Phase 1–10 features | Not formally QA'd through Product OS | Pre-Product OS; no formal QA run IDs; tested ad hoc during development |

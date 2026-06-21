# QA-NNNN — [Feature Name]

> Copy this template when starting a QA run. Replace NNNN with the next QA ID from MASTER_REGISTRY.md. Save as `QA-NNNN.md`.
>
> **Auto-ID instruction:** Get the next QA ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID after creating this file.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| PRD | PRD-NNNN | `07-prd/approved-prds/PRD-NNNN.md` |
| DEVPLAN | DEVPLAN-NNNN | `09-development-planning/plans/DEVPLAN-NNNN.md` |
| User Stories | US-NNNN, US-NNNN | `08-user-stories/stories/US-NNNN.md` |
| UAT | UAT-NNNN | *(populated after UAT is run)* |

---

## Status

**QA Status:** In Progress / Passed / Failed / Conditional Pass  
**QA Tester:** [Name]  
**Date Started:** YYYY-MM-DD  
**Date Completed:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking QA from completing? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Fix BUG-0004 and retest checkout flow." or "QA passed — proceed to UAT.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | |
| Sub-module | |
| Secondary Modules | |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Tested? |
|---|---|---|---|
| SCR-xxx-NNNN | *(name)* | `/route` | ✅ / ❌ / Not applicable |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes / No / Partial | |
| Screenshots provided | Yes / No | |
| Existing workflow / SOP | Yes / No | |
| Excel / report / reference file | Yes / No | |
| Email / stakeholder notes | Yes / No | |
| Competitor references | Yes / No | |
| Missing references | — | |
| Assumptions due to missing references | — | |

---

## Test Environment

**Environment:** Local Dev / Staging / Production  
**URL:** *(dev URL)*  
**Browser:** *(Chrome version, Safari version)*  
**Device tested:** Desktop (1280px), Mobile (375px)  
**Convex deployment:** *(dev / preview / prod)*  
**Test user accounts used:** *(describe — do not put passwords here)*

---

## Test Scenarios

*(Run every test scenario from the user stories and DEVPLAN.)*

| # | Test Case | Steps | Expected | Actual | Pass / Fail |
|---|---|---|---|---|---|
| TC-1 | *(happy path)* | 1. *(step)* 2. *(step)* | *(expected)* | *(actual)* | ✅ / ❌ |
| TC-2 | *(error path)* | 1. *(step)* 2. *(step)* | *(expected)* | *(actual)* | ✅ / ❌ |
| TC-3 | *(edge case)* | 1. *(step)* 2. *(step)* | *(expected)* | *(actual)* | ✅ / ❌ |
| TC-4 | *(admin path)* | 1. *(step)* 2. *(step)* | *(expected)* | *(actual)* | ✅ / ❌ |

---

## Acceptance Criteria Verification

*(Verify each AC from the user stories.)*

| AC # | Criterion (summary) | Result | Note |
|---|---|---|---|
| AC-1 | *(summary)* | ✅ Pass / ❌ Fail | *(note)* |
| AC-2 | *(summary)* | ✅ Pass / ❌ Fail | *(note)* |

---

## Regression Checklist

*(Copy applicable items from REGRESSION_TEST_CHECKLIST.md.)*

- [ ] Home page loads correctly
- [ ] Cart add / remove / update works
- [ ] Checkout (Pay Later) completes
- [ ] Order visible in admin
- [ ] Stock deducted correctly
- [ ] Admin cannot be bypassed by URL

---

## Bugs Found

*(Log all bugs here and in BUG_REGISTER.md.)*

| Bug ID | Severity | Title | Status |
|---|---|---|---|
| BUG-NNNN | Critical / High / Medium / Low | *(title)* | Open / Fixed |

---

## Retest Status

*(After bugs are fixed, retest and update here.)*

| Bug ID | Fixed? | Retest Result |
|---|---|---|
| BUG-NNNN | Yes / No | ✅ Pass / ❌ Fail |

---

## QA Decision

**Decision:** QA Passed / QA Failed / Conditional Pass

**Rationale:**

> *(Explain why this decision was made. Reference any unresolved bugs.)*

---

*Last updated: YYYY-MM-DD*

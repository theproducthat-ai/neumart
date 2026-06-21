# UAT-NNNN — [Feature Name]

> Copy this template when starting a UAT session. Replace NNNN with the next UAT ID from MASTER_REGISTRY.md. Save as `UAT-NNNN.md`.
>
> **Auto-ID instruction:** Get the next UAT ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID after creating this file.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| PRD | PRD-NNNN | `07-prd/approved-prds/PRD-NNNN.md` |
| QA Run | QA-NNNN | `11-qa-testing/test-runs/QA-NNNN.md` |
| Release | REL-NNNN | *(populated after release)* |

---

## Status

**UAT Status:** In Progress / Passed / Failed / Conditional Pass  
**Business Owner:** [Name]  
**Date Started:** YYYY-MM-DD  
**Date Completed:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking UAT from completing? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Fix UAT defect UFB-0003 and retest." or "UAT passed — proceed to release planning.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | |
| Sub-module | |

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

## UAT Scenarios

*(Derived from PRD UAT Criteria and business intent. Not a repeat of QA test cases.)*

| # | Scenario | Business Goal Being Verified | Steps | Expected Business Outcome | Actual | Pass / Fail |
|---|---|---|---|---|---|---|
| UAT-1 | *(scenario name)* | *(business goal)* | 1. *(step)* | *(outcome)* | *(actual)* | ✅ / ❌ |
| UAT-2 | *(scenario name)* | *(business goal)* | 1. *(step)* | *(outcome)* | *(actual)* | ✅ / ❌ |

---

## Expected Outcomes

> *(What does the product owner expect to see? What does "good" look like? Write this before running UAT so there is no ambiguity.)*

---

## Business Feedback

> *(Business owner's observations and comments during UAT. Record verbatim where useful.)*

---

## Defects Found

*(Log all defects in UAT_FEEDBACK_REGISTER.md and link here.)*

| Feedback ID | Type | Title | Severity | Status |
|---|---|---|---|---|
| UFB-NNNN | Defect / Enhancement / Observation | *(title)* | Blocking / Non-blocking | Open / Resolved |

---

## Decision

**UAT Decision:** Passed / Failed / Conditional Pass

**Business Owner Statement:**

> *(The business owner's statement. One to three sentences.)*

---

## Conditions (if Conditional Pass)

| # | Condition | Owner | Due Date |
|---|---|---|---|
| 1 | *(condition)* | *(owner)* | YYYY-MM-DD |

---

## Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Business Owner | *(name)* | YYYY-MM-DD | UAT Passed / Failed / Conditional Pass |

---

*Last updated: YYYY-MM-DD*

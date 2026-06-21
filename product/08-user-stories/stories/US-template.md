# US-NNNN — [Story Title]

> Copy this template when writing a user story. Replace NNNN with the next US ID from MASTER_REGISTRY.md. Save as `US-NNNN.md`.
>
> **Auto-ID instruction:** Get the next US ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID in MASTER_REGISTRY.md. A single PRD usually generates multiple stories — register all story IDs before writing them.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| PRD | PRD-NNNN | `07-prd/approved-prds/PRD-NNNN.md` |
| Dev Plan | DEVPLAN-NNNN | *(populated after dev plan is written)* |
| QA | QA-NNNN | *(populated after QA is run)* |
| Related stories | US-NNNN, US-NNNN | *(list sibling stories from same PRD)* |

---

## Status

**Story Status:** Draft / Ready for Development / In Development / Dev Complete / QA Passed / Released  
**Owner:** [Name or role]  
**Story Points:** 1 / 2 / 3 / 5 / 8 / Needs Split  
**Date Created:** YYYY-MM-DD  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking this story from progressing? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Dev to pick up after DEVPLAN-0003 is written." or "Blocked on US-0004 being completed first.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | *(e.g. Customer Commerce)* |
| Sub-module | *(e.g. Checkout)* |
| Feature | *(e.g. Coupon Application)* |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Role |
|---|---|---|---|
| SCR-CUS-NNNN | *(name)* | `/route` | Customer |
| SCR-ADM-NNNN | *(name)* | `/admin/route` | Admin |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes / No / Partial | *(name and description)* |
| Screenshots provided | Yes / No | *(describe)* |
| Existing workflow / SOP | Yes / No | *(describe)* |
| Excel / report / reference file | Yes / No | *(describe)* |
| Email / stakeholder notes | Yes / No | *(describe)* |
| Competitor references | Yes / No | *(name competitors)* |
| Missing references | — | *(what is still needed)* |
| Assumptions due to missing references | — | *(list assumptions)* |

---

## User Story

```
As a [Customer / Admin / System],
I want to [describe the action],
So that [describe the benefit].
```

---

## Acceptance Criteria

*(Use Given / When / Then format. See ACCEPTANCE_CRITERIA_TEMPLATE.md.)*

- [ ] **AC-1 (Happy path):**  
  Given [context]  
  When [action]  
  Then [outcome]

- [ ] **AC-2 (Error path):**  
  Given [context]  
  When [action]  
  Then [outcome]

- [ ] **AC-3 (Edge case):**  
  Given [context]  
  When [action]  
  Then [outcome]

---

## Business Rules

*(Rules that apply specifically to this story. Reference PRD business rules by number if applicable.)*

| # | Rule |
|---|---|
| BR-1 | *(rule)* |

---

## Validation Rules

| Field | Rule | Error Message |
|---|---|---|
| *(field)* | *(rule)* | *(message)* |

---

## Dependencies

| Dependency | Status | Blocks This Story? |
|---|---|---|
| *(e.g. US-0003 — address selection must exist)* | Built / In Progress / Pending | Yes / No |

---

## Test Cases

*(Manual test cases for QA. One test case per row.)*

| # | Test Case | Steps | Expected Result | Pass / Fail |
|---|---|---|---|---|
| TC-1 | *(happy path)* | 1. Step, 2. Step | *(expected)* | — |
| TC-2 | *(error path)* | 1. Step, 2. Step | *(expected)* | — |
| TC-3 | *(edge case)* | 1. Step, 2. Step | *(expected)* | — |

---

## Definition of Done

- [ ] Backend Convex function written and tested
- [ ] Frontend component or page written
- [ ] Validated on local dev environment
- [ ] No TypeScript errors in affected files
- [ ] All acceptance criteria verified manually
- [ ] Admin and customer paths both tested (if applicable)
- [ ] No regression in existing features checked
- [ ] Ready for QA sign-off

---

*Last updated: YYYY-MM-DD*

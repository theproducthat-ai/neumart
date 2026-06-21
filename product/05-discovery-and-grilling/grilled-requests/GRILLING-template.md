# GRILLING-NNNN — [Request Title]

> Copy this template when starting a grilling session. Replace NNNN with the linked REQ ID number. Save as `GRILLING-NNNN.md`.
> 
> **Auto-ID instruction:** The GRILLING ID matches the REQ ID. No separate ID is generated. If REQ-0005 is being grilled, this file is GRILLING-0005.md.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| Evaluation | EVAL-NNNN | *(populated after grilling if evaluation needed)* |
| PRD | PRD-NNNN | *(populated after PRD is written)* |

---

## Status

**Grilling Status:** In Progress / Complete / Blocked  
**Owner:** [Name or role]  
**Date Opened:** YYYY-MM-DD  
**Date Completed:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(Describe what is blocking grilling from completing, if anything. If unblocked, write "None.")*

---

## Next Action

> *(What must happen next? Who is responsible? By when?)*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | *(e.g. Customer Commerce)* |
| Sub-module | *(e.g. Checkout)* |
| Secondary Modules | *(list all impacted modules)* |
| Classification | *(from REQUEST_CLASSIFICATION_MATRIX.md)* |
| Classification Confidence | High / Medium / Low |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Impact Type |
|---|---|---|---|
| SCR-CUS-XXXX | *(screen name)* | `/route` | Modified / New / Removed |
| — | *(proposed new screen)* | `/new-route` | New — needs Screen ID |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes / No / Partial | *(name and description)* |
| Screenshots provided | Yes / No | *(describe screenshots)* |
| Existing workflow / SOP | Yes / No | *(describe workflow)* |
| Excel / report / reference file | Yes / No | *(describe file)* |
| Email / stakeholder notes | Yes / No | *(describe notes)* |
| Competitor references | Yes / No | *(name competitors)* |
| Missing references | — | *(what is still needed)* |
| Assumptions due to missing references | — | *(list assumptions made)* |

---

## Problem Clarity

**Problem in one sentence:**

> *(Write the problem from the user's perspective in one sentence.)*

**Who experiences this problem:**

> Customer / Admin / Both / System

**Frequency:**

> Daily / Weekly / Occasional / Edge case

**Cost of not solving:**

> *(Revenue, operational friction, customer churn, compliance risk)*

**Current workaround:**

> *(What is being done today? Why is it insufficient?)*

---

## User Roles

| Role | How they interact with this feature |
|---|---|
| Customer | *(describe interaction)* |
| Admin | *(describe interaction)* |
| *(New role if any)* | *(describe)* |

---

## Current Flow

> *(Step-by-step description of how users accomplish this task TODAY, without the feature.)*

1. 
2. 
3. 

---

## Proposed Future Flow

> *(Step-by-step happy path for the proposed feature.)*

1. 
2. 
3. 

**Failure paths:**

- If [condition]: [what happens]
- If [condition]: [what happens]

---

## Business Rules

> *(Conditions, constraints, limits, approval steps that govern this feature.)*

| # | Rule |
|---|---|
| BR-1 | *(e.g. Coupon code must be unique across all coupons)* |
| BR-2 | *(e.g. Coupon cannot be applied if order total is below minimum)* |
| BR-3 | |

---

## Data Fields

> *(List new or changed data fields needed.)*

| Field | Type | Required | Notes |
|---|---|---|---|
| *(field name)* | string / number / boolean | Yes / No | *(description)* |

**New Convex tables required:**

- [ ] None
- [ ] *(table name)* — *(reason)*

**Existing tables affected:**

- `*(table name)*` — *(how: read / write / new field)*

---

## Validations

| Field | Validation Rule | Error Message |
|---|---|---|
| *(field name)* | *(rule)* | *(message)* |

---

## Edge Cases

| Edge Case | Expected Behaviour |
|---|---|
| *(describe edge case)* | *(what should happen)* |

---

## Reporting and Visibility

- [ ] Admin needs a report or summary view: *(describe)*
- [ ] Customer needs status or history: *(describe)*
- [ ] Audit trail required: *(describe)*
- [ ] Dashboard stat affected: *(describe)*
- [ ] Export needed: *(describe)*

---

## Permissions

| Action | Allowed Roles |
|---|---|
| *(action)* | Customer / Admin / *(role)* |

---

## Dependencies

| Dependency | Status | Blocks This? |
|---|---|---|
| *(e.g. Razorpay integration live)* | Built / Pending / Future Candidate | Yes / No |

---

## Screens Impacted

| Screen ID | Screen Name | Change Required |
|---|---|---|
| *(ID)* | *(name)* | *(description of change)* |

---

## Acceptance Criteria

> *(Draft acceptance criteria from grilling. These will be refined in the PRD and user stories.)*

- [ ] Given [context], when [action], then [expected outcome]
- [ ] Given [context], when [action], then [expected outcome]

---

## Open Questions

> *(Questions that remain unanswered after grilling. These must be resolved before PRD can be written.)*

| # | Question | Owner | Target Date |
|---|---|---|---|
| 1 | *(question)* | *(owner)* | YYYY-MM-DD |

---

## Suggested MVP Boundary

**Include in MVP:**

- *(feature or capability)*

**Defer to later iteration:**

- *(feature or capability)*

---

## Status After Grilling

- [ ] Grilling complete — proceed to Evaluation
- [ ] Grilling complete — proceed directly to PRD (if evaluation not needed)
- [ ] Grilling incomplete — blocked on open questions (list above)
- [ ] Grilling complete — request should be Parked (reason: )
- [ ] Grilling complete — request should be Rejected (reason: )

---

## Grilling Summary

> *(2–4 sentence summary of what was learned during grilling, any scope changes made, and the recommended next step.)*

---

*Last updated: YYYY-MM-DD*

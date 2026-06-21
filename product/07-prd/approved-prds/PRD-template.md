# PRD-NNNN — [Feature / Module Name]

> Copy this template when writing a PRD. Replace NNNN with the next PRD ID from MASTER_REGISTRY.md. Save as `PRD-NNNN.md`.
>
> **Auto-ID instruction:** Get the next PRD ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID in MASTER_REGISTRY.md after creating this file.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| Evaluation | EVAL-NNNN | `02-roadmap/evaluations/EVAL-NNNN.md` *(if applicable)* |
| Impact Assessment | IMPACT-NNNN | `06-assessment-and-impact/assessments/IMPACT-NNNN.md` |
| User Stories | US-NNNN+ | *(populated after stories are written)* |
| Dev Plan | DEVPLAN-NNNN | *(populated after dev plan is written)* |
| QA | QA-NNNN | *(populated after QA is run)* |
| UAT | UAT-NNNN | *(populated after UAT is run)* |
| Release | REL-NNNN | *(populated after release)* |

---

## Status

**PRD Status:** Draft / Under Review / Approved / In Development / Released  
**Owner:** [Name or role]  
**Date Created:** YYYY-MM-DD  
**Date Approved:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking this PRD from being approved or progressing? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Product owner to review and sign off by YYYY-MM-DD." or "Write user stories.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | *(e.g. Customer Commerce)* |
| Sub-module | *(e.g. Checkout)* |
| Secondary Modules | *(list all impacted modules)* |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-xxx-NNNN | *(name)* | `/route` | Modified / New / Deprecated |
| — | *(proposed screen)* | `/new-route` | New — assign ID before development |

---

## Reference Material

| Type | Provided? | Detail |
|---|---|---|
| Documents provided | Yes / No / Partial | *(name and description)* |
| Screenshots provided | Yes / No | *(describe)* |
| Existing workflow / SOP | Yes / No | *(describe)* |
| Excel / report / reference file | Yes / No | *(describe)* |
| Email / stakeholder notes | Yes / No | *(describe)* |
| Competitor references | Yes / No | *(name competitors or examples)* |
| Missing references | — | *(what is still needed)* |
| Assumptions due to missing references | — | *(list assumptions)* |

---

## Background

> *(Context: why does this feature need to exist? What is the history? What problem does it address?)*

---

## Problem Statement

> *(The specific, well-scoped problem this PRD solves. One to three sentences.)*

---

## Business Objective

> *(What measurable outcome do we expect? e.g. increase checkout completion rate, reduce manual admin effort, enable Razorpay go-live.)*

---

## Users / Personas

| Persona | Role | Goal |
|---|---|---|
| *(e.g. Grocery buyer)* | Customer | *(what they want to achieve)* |
| *(e.g. Store owner)* | Admin | *(what they want to achieve)* |

---

## Current Flow

> *(Step-by-step: how the user accomplishes this task TODAY without the feature.)*

1. 
2. 
3. 

---

## Proposed Flow

> *(Step-by-step: how the user will accomplish this task WITH the feature.)*

**Happy path:**

1. 
2. 
3. 

**Failure paths:**

| Scenario | Expected Behaviour |
|---|---|
| *(condition)* | *(what happens)* |

---

## In Scope

> *(Explicitly list everything this PRD covers.)*

- 
- 
- 

---

## Out of Scope

> *(Explicitly list everything this PRD does NOT cover. These are not rejected — they may be future iterations.)*

- 
- 
- 

---

## Functional Requirements

| # | Requirement | Priority | Notes |
|---|---|---|---|
| FR-1 | *(requirement)* | Must Have / Should Have / Nice to Have | *(notes)* |
| FR-2 | | | |

---

## Business Rules

| # | Rule |
|---|---|
| BR-1 | *(e.g. Coupon code must be unique across all coupons)* |
| BR-2 | *(e.g. Minimum order value must be met before coupon applies)* |

---

## Data Requirements

**New Convex tables:**

| Table | Purpose |
|---|---|
| *(table name)* | *(what it stores)* |

**Fields on existing tables:**

| Table | Field | Type | Purpose |
|---|---|---|---|
| *(table)* | *(field)* | *(type)* | *(purpose)* |

---

## Validations

| Field / Action | Validation Rule | Error Message |
|---|---|---|
| *(field)* | *(rule)* | *(message)* |

---

## Permissions

| Action | Customer | Admin | *(other role)* |
|---|---|---|---|
| *(action)* | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ |

---

## Screen Impact

| Screen ID | Screen Name | Route | Change Description |
|---|---|---|---|
| *(ID)* | *(name)* | `/route` | *(description)* |

---

## Edge Cases

| Edge Case | Expected Behaviour |
|---|---|
| *(describe case)* | *(what should happen)* |

---

## Dependencies

| Dependency | Status | Risk if Not Met |
|---|---|---|
| *(e.g. Razorpay integration live)* | Built / Pending / Future | *(risk)* |

---

## Reporting

> *(What visibility or reporting is needed for this feature? Admin dashboard, export, audit trail?)*

---

## Acceptance Criteria

> *(Given / When / Then format. These become the basis for QA test cases.)*

- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]

---

## UAT Criteria

> *(What must the product owner verify in UAT before sign-off?)*

- [ ] 
- [ ] 

---

## Rollout Plan

> *(How will this be deployed? Any phasing, feature flags, or staged rollout?)*

---

## Open Questions

| # | Question | Owner | Target Date |
|---|---|---|---|
| 1 | *(question)* | *(owner)* | YYYY-MM-DD |

---

## Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Product Owner | | | Approved / Changes Requested |
| Engineering Lead | | | Acknowledged |

---

*Last updated: YYYY-MM-DD*

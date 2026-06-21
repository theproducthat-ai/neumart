# DEVPLAN-NNNN — [Feature Name]

> Copy this template when writing a development plan. Replace NNNN with the next DEVPLAN ID from MASTER_REGISTRY.md. Save as `DEVPLAN-NNNN.md`.
>
> **Auto-ID instruction:** Get the next DEVPLAN ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID after creating this file.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| PRD | PRD-NNNN | `07-prd/approved-prds/PRD-NNNN.md` |
| User Stories | US-NNNN, US-NNNN | `08-user-stories/stories/US-NNNN.md` |
| Impact Assessment | IMPACT-NNNN | `06-assessment-and-impact/assessments/IMPACT-NNNN.md` |
| QA | QA-NNNN | *(populated after QA is run)* |
| Coding Prompt | DEVPLAN-NNNN-coding-prompt.md | `09-development-planning/plans/DEVPLAN-NNNN-coding-prompt.md` |

---

## Status

**Dev Plan Status:** Draft / Ready for Development / In Development / Dev Complete  
**Owner:** [Name or role]  
**Date Created:** YYYY-MM-DD  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking development? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Use coding prompt DEVPLAN-NNNN-coding-prompt.md to start development." or "Wait for DEVPLAN-NNNN to complete first.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | |
| Sub-module | |
| Secondary Modules | |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Change |
|---|---|---|---|
| SCR-xxx-NNNN | | `/route` | Modified / New |

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

## Objective

> *(One to three sentences: what this dev plan implements and why.)*

---

## Current App Context

> *(Describe the relevant current state of the app. What exists today that this plan builds on? What must not be broken?)*

---

## Files Likely Impacted

### Convex Backend

| File | Change Type | Description |
|---|---|---|
| `neumart/convex/[file].ts` | Create / Modify | *(what changes)* |

### Next.js Frontend

| File | Change Type | Description |
|---|---|---|
| `neumart/app/[route]/page.tsx` | Create / Modify | *(what changes)* |
| `neumart/components/[name].tsx` | Create / Modify | *(what changes)* |

### Schema

| File | Change | Notes |
|---|---|---|
| `neumart/convex/schema.ts` | Modify / No change | *(what changes, if any)* |

---

## Backend Changes (Convex)

### New Mutations / Queries / Actions

| Name | Type | Purpose |
|---|---|---|
| *(functionName)* | mutation / query / action / httpAction | *(what it does)* |

### Modified Existing Functions

| Name | File | Change |
|---|---|---|
| *(functionName)* | *(file)* | *(what changes)* |

---

## Frontend Changes (Next.js)

### New Pages / Components

| Name | Path | Purpose |
|---|---|---|
| *(PageName)* | `app/[route]/page.tsx` | *(what it renders)* |
| *(ComponentName)* | `components/[name].tsx` | *(what it renders)* |

### Modified Pages / Components

| Name | Path | Change |
|---|---|---|
| *(name)* | *(path)* | *(what changes)* |

---

## Schema Changes

*(List every table and field change in schema.ts. If no change, write "None.")*

| Table | Change | Field | Type | Notes |
|---|---|---|---|---|
| *(table)* | Add field / New table / Remove field | *(field)* | *(type)* | *(notes)* |

---

## Screen Impact

*(Which screens from SCREEN_REGISTRY.md are affected?)*

| Screen ID | Screen Name | Change |
|---|---|---|
| *(ID)* | *(name)* | *(description)* |

---

## Testing Plan

### Manual Test Scenarios

| # | Scenario | Steps | Expected Result |
|---|---|---|---|
| 1 | *(happy path)* | *(steps)* | *(result)* |
| 2 | *(error path)* | *(steps)* | *(result)* |

### Regression Areas to Check

- [ ] *(existing feature that could be affected)*
- [ ] *(existing feature that could be affected)*

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| *(risk)* | High / Medium / Low | High / Medium / Low | *(how to reduce)* |

---

## Rollback Plan

> *(If this deployment goes wrong in production, what exact steps are taken to roll back? Must be specific.)*

1. 
2. 
3. 

---

## Definition of Done

- [ ] All user stories in this DEVPLAN are complete
- [ ] All acceptance criteria verified
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Convex dev server running without errors: `npx convex dev`
- [ ] App builds without errors: `pnpm build`
- [ ] All new screens work on mobile (375px) and desktop (1280px)
- [ ] All payment-related changes tested end-to-end
- [ ] All admin and customer paths verified
- [ ] Regression check complete (no broken existing features)
- [ ] Ready for QA

---

*Last updated: YYYY-MM-DD*

# RELEASE-NNNN — [Feature Name]

> Copy this template when planning a release. Replace NNNN with the next REL ID from MASTER_REGISTRY.md. Save as `RELEASE-NNNN.md`.
>
> **Auto-ID instruction:** Get the next REL ID from `00-product-foundation/MASTER_REGISTRY.md`. Update Last Used ID and Next ID after creating this file.

---

## Linked IDs

| Type | ID | File |
|---|---|---|
| Request | REQ-NNNN | `04-request-management/requests/REQ-NNNN.md` |
| PRD | PRD-NNNN | `07-prd/approved-prds/PRD-NNNN.md` |
| UAT | UAT-NNNN | `12-uat/uat-runs/UAT-NNNN.md` |
| QA | QA-NNNN | `11-qa-testing/test-runs/QA-NNNN.md` |
| DEVPLAN | DEVPLAN-NNNN | `09-development-planning/plans/DEVPLAN-NNNN.md` |

---

## Status

**Release Status:** Planned / In Progress / Released / Rolled Back  
**Release Type:** Feature Release / Bug Fix / Hotfix / Schema Migration  
**Owner:** [Name or role]  
**Planned Release Date:** YYYY-MM-DD  
**Actual Release Date:** YYYY-MM-DD or —  
**Last Updated:** YYYY-MM-DD

---

## Current Blocker

> *(What is blocking this release? Write "None" if unblocked.)*

---

## Next Action

> *(e.g. "Deploy to production on YYYY-MM-DD. Run smoke test immediately after.")*

---

## Module Mapping

| Field | Value |
|---|---|
| Primary Module | |
| Sub-module | |

---

## Screen Mapping

| Screen ID | Screen Name | Route | Release Action |
|---|---|---|---|
| SCR-xxx-NNNN | *(name)* | `/route` | New screen / Modified / No change |

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

## Features in This Release

| Feature | PRD | Status |
|---|---|---|
| *(feature name)* | PRD-NNNN | Ready for Release |

---

## Bugs Fixed in This Release

| Bug ID | Title | Severity |
|---|---|---|
| BUG-NNNN | *(title)* | *(severity)* |

---

## Environment Variables

*(List ALL environment variables required. Confirm they are set in the deployment target.)*

| Variable | Purpose | Confirmed in Production? |
|---|---|---|
| *(VAR_NAME)* | *(what it does)* | Yes / No |

---

## Migration / Schema Changes

**Schema changed:** Yes / No  
**New tables:** *(list or "none")*  
**New fields:** *(list or "none")*  
**Migration required:** Yes / No  
**Migration tested in dev:** Yes / No  
**Notes:** *(describe)*

---

## Pre-deployment Checklist

- [ ] UAT signed off: UAT-NNNN
- [ ] All QA bugs resolved or accepted
- [ ] `pnpm build` passes on feature branch
- [ ] `npx tsc --noEmit` passes
- [ ] `npx convex deploy` tested in dev environment
- [ ] All environment variables confirmed in production
- [ ] Schema migration plan confirmed (if applicable)
- [ ] Rollback plan documented below
- [ ] Release notes written

---

## Deployment Steps

| # | Step | Command / Action | Done? |
|---|---|---|---|
| 1 | Merge feature branch to main | `git merge [branch]` | ✅ / ❌ |
| 2 | Deploy Convex backend | `npx convex deploy` | ✅ / ❌ |
| 3 | Push to main (triggers Vercel) | `git push origin main` | ✅ / ❌ |
| 4 | Monitor Vercel build log | Vercel dashboard | ✅ / ❌ |
| 5 | Verify deployment live | Open production URL | ✅ / ❌ |

---

## Smoke Test (Post-deployment)

*(Run immediately after deployment. These must pass before declaring release complete.)*

| # | Check | Expected | Pass / Fail |
|---|---|---|---|
| 1 | Home page loads | Products visible | ✅ / ❌ |
| 2 | Add to cart works | Cart count updates | ✅ / ❌ |
| 3 | Checkout completes (Pay Later) | Order created | ✅ / ❌ |
| 4 | Admin can view orders | Orders visible | ✅ / ❌ |
| 5 | *(feature-specific check)* | *(expected)* | ✅ / ❌ |

---

## Rollback Plan

> *(Copy and complete from ROLLBACK_PLAN_TEMPLATE.md. This must be written before deployment starts.)*

**Rollback trigger:** *(What would cause us to rollback?)*  
**Rollback type:** Code revert / Convex revert / Schema rollback  
**Rollback steps:**

1. 
2. 
3. 

---

## Release Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Product Owner | *(name)* | YYYY-MM-DD | Approved / Blocked |
| Developer | *(name)* | YYYY-MM-DD | Ready to deploy |

---

## Post-release Notes

*(Fill in after deployment.)*

**Actual release date/time:** YYYY-MM-DD HH:MM  
**Smoke test result:** Passed / Failed  
**Issues found after release:** *(describe or "none")*  
**Rollback triggered:** Yes / No — *(reason if yes)*

---

*Last updated: YYYY-MM-DD*

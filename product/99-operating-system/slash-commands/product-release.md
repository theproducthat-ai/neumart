# /product-release — Slash Command Definition

Create a release plan, release notes, and rollback plan for a feature that has passed QA and UAT.

---

## How to Use

```
/product-release QA-0003
/product-release REQ-0003
/product-release
```

If no ID is provided, Claude reads `ACTIVE_REQUESTS.md` to find the most recent request at `UAT Complete / Pending Release` stage.

---

## Purpose

Release management ensures features are deployed safely, with a documented rollback plan, a smoke test, and release notes. The request is only marked as `Released` when deployment is confirmed by the user.

---

## When to Use

- After UAT sign-off (G6 gate passed)
- Never before UAT sign-off
- Never without QA completion evidence

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Confirm QA ID and UAT ID and read all upstream documents |
| 2 | Read `RELEASE_PLAN_TEMPLATE.md`, `RELEASE_NOTES_TEMPLATE.md`, `ROLLBACK_PLAN_TEMPLATE.md`, `RELEASE-template.md` |
| 3 | Assign next RELEASE ID from `MASTER_REGISTRY.md` |
| 4 | Write pre-deployment checklist |
| 5 | Write ordered deployment steps |
| 6 | Write post-deployment smoke test |
| 7 | Write customer/admin-facing release notes |
| 8 | Write rollback plan |
| 9 | Create `RELEASE-NNNN.md` |
| 10 | Update `MASTER_REGISTRY.md` |
| 11 | Update `CHANGE_LOG.md` and `DEVELOPMENT_TRACKER.md` |
| 12 | Present release plan and await deployment confirmation from user |
| 13 | After deployment confirmation: update status to `Released` |
| 14 | Remove from `ACTIVE_REQUESTS.md` |

---

## What Claude Never Asks the User

- The RELEASE ID (Claude generates it)
- Which steps to include in the deployment checklist (Claude derives from dev plan)
- Whether a rollback plan is needed (always yes)
- The next step after release (Claude recommends post-release review)

---

## Critical Rule

**Claude must NOT update status to `Released` until the user explicitly confirms that:**
1. Deployment to production is complete
2. Smoke test passed
3. No critical issues observed post-deployment

---

## Rollback Trigger

If the user reports that deployment failed or caused issues:
- Update status to `Rolled Back`
- Add entry to `INCIDENT_LOG.md`
- Update `INCOMPLETE_WORK_TRACKER.md` with rollback reason
- Do not mark as `Released`

---

## Approval Gate

After presenting the release plan, Claude asks for deployment confirmation before updating any status to `Released`.

After release confirmation, Claude asks:
"Do you want me to schedule a post-release review?"

---

## Guardrails

- Do not change application code during release management
- Do not mark status as `Released` without explicit deployment confirmation
- Do not skip the smoke test section
- Do not release without a rollback plan
- Do not bundle unrelated changes without explicit user approval
- Do not remove from `ACTIVE_REQUESTS.md` until `Released` status is confirmed

---

## Output Files Created

| File | Path |
|---|---|
| Release plan and notes | `product/13-release-management/releases/RELEASE-NNNN.md` |

---

## Registers Updated

- `product/00-product-foundation/MASTER_REGISTRY.md`
- `product/04-request-management/REQUEST_REGISTER.md` — updated to `Released`
- `product/04-request-management/ACTIVE_REQUESTS.md` — remove entry on release
- `product/10-development-tracking/CHANGE_LOG.md`
- `product/10-development-tracking/DEVELOPMENT_TRACKER.md`
- `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md` (if blocked or rolled back)
- `product/14-post-release/INCIDENT_LOG.md` (if rollback executed)

---

*Last updated: 2026-06-21*

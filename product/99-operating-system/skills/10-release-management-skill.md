# Skill 10 — Release Management

## Skill Name
Release Management

## Purpose
Create a release plan, release notes, deployment checklist, smoke test plan, and rollback plan for a feature that has passed QA and UAT. Track the release through to production and mark the request as Released only when release evidence exists.

## When to Use
- After UAT sign-off (G6 gate passed)
- When invoked via `/product-release`
- Never before UAT sign-off. Never without QA completion.

## Inputs Expected
- QA ID (e.g. `QA-0003`)
- UAT ID (e.g. `UAT-0003`)
- DEVPLAN ID, PRD ID, REQ ID for traceability
- UAT sign-off confirmation from user

## Files to Read First
1. `product/09-development-planning/plans/DEVPLAN-NNNN.md`
2. `product/11-qa-testing/test-runs/QA-NNNN.md`
3. `product/12-uat/uat-runs/UAT-NNNN.md`
4. `product/13-release-management/RELEASE_PLAN_TEMPLATE.md`
5. `product/13-release-management/RELEASE_NOTES_TEMPLATE.md`
6. `product/13-release-management/ROLLBACK_PLAN_TEMPLATE.md`
7. `product/13-release-management/releases/RELEASE-template.md`
8. `product/14-post-release/POST_RELEASE_REVIEW_TEMPLATE.md`
9. `product/00-product-foundation/MASTER_REGISTRY.md`

## Auto-ID Rules
- Release documents use ID: `RELEASE-NNNN`
- Read `MASTER_REGISTRY.md` to get the next RELEASE ID
- Format: `RELEASE-NNNN` (4-digit zero-padded)
- One RELEASE document per release event
- Multiple requests can be bundled into one RELEASE if deployed together — note all REQ IDs in the header

## Reference Material Handling
- Release notes are derived from the PRD summary and QA outcomes
- Do not invent features in release notes that were not in the approved PRD
- Reference rollback plan from dev plan and supplement with release-specific steps

## Natural-Language Classification Rules
Not applicable. Release management is procedural, not classification.

## Module Hierarchy Mapping
- Note which modules are included in this release
- Note any modules that are NOT affected (for communication clarity)

## Screen ID Handling
- List all Screen IDs that are changed or newly available in this release
- Note any screens that should be tested as part of the smoke test

## Request Status Handling
- Update status to `Release In Progress` when release plan is created
- Update to `Released` ONLY after release evidence is confirmed (deployment confirmed, smoke test passed)
- Do not update to `Released` on plan creation — only on evidence
- Gate: post-release review should be scheduled (not required to block release)

## Incomplete Request Tracking
- If release is blocked by infrastructure or environment issues, update `INCOMPLETE_WORK_TRACKER.md`
- If rollback is executed: update status to `Rolled Back` and create incident log entry

## Output Files to Create
| File | Path |
|---|---|
| Release plan and notes | `product/13-release-management/releases/RELEASE-NNNN.md` |

## Registers to Update
| Register | What to Update |
|---|---|
| `MASTER_REGISTRY.md` | RELEASE row: Last Used ID, Next ID |
| `REQUEST_REGISTER.md` | Update status to `Released` (only after evidence) |
| `ACTIVE_REQUESTS.md` | Remove from active list once Released |
| `CHANGE_LOG.md` | Add entry for this release |
| `DEVELOPMENT_TRACKER.md` | Mark as Released |
| `INCOMPLETE_WORK_TRACKER.md` | Add if release is blocked or rolled back |
| `INCIDENT_LOG.md` | Add if rollback was executed |

## Stop Condition
Stop after presenting the release plan for review. Do not execute deployment steps — the release plan is a document for the operator to follow.

After deployment confirmation is provided by the user, update all registers to `Released`.

## Guardrails
- Do not change application code during release management
- Do not mark status as `Released` without explicit deployment confirmation from the user
- Do not skip smoke test steps
- Do not release without a rollback plan documented
- Do not release without listing the exact deployment steps in order
- Do not bundle unrelated changes into a release without explicit user approval

## Definition of Done
- [ ] UAT sign-off confirmed before release plan is created
- [ ] Release plan written with deployment checklist
- [ ] Release notes written (user-facing summary of changes)
- [ ] Smoke test plan written (critical paths to verify after deployment)
- [ ] Rollback plan written (how to revert if deployment fails)
- [ ] `RELEASE-NNNN.md` created in `product/13-release-management/releases/`
- [ ] `MASTER_REGISTRY.md` updated
- [ ] Deployment confirmed by user
- [ ] Smoke test confirmed by user
- [ ] `REQUEST_REGISTER.md` status updated to `Released`
- [ ] Request removed from `ACTIVE_REQUESTS.md`
- [ ] `CHANGE_LOG.md` updated
- [ ] Post-release review scheduled

---

## Release Document Required Sections

| Section | Content |
|---|---|
| Header | RELEASE ID, REQ IDs, PRD IDs, QA ID, UAT ID, date, environment |
| Release summary | What is being released and why |
| Modules affected | List of modules with changes |
| Screens affected | Screen IDs with changes |
| Pre-deployment checklist | Steps to complete before deployment |
| Deployment steps | Ordered steps for deployment (Convex deploy, frontend deploy, etc.) |
| Post-deployment smoke test | Critical user flows to verify immediately after deployment |
| Release notes | Customer/admin-facing summary of changes |
| Known limitations | Any known issues or workarounds |
| Rollback plan | Step-by-step rollback procedure if deployment fails |
| Release confirmation | Space for user to confirm deployment success and smoke test results |

---

## Release Status Flow

```
UAT Complete → Release Plan Created → Deployment Executed → Smoke Test Passed → Released
                                                          ↓ (if fails)
                                                    Rollback Executed → Rolled Back
```

---

*Last updated: 2026-06-21*

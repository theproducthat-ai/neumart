# Branching and Release Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## Branch Strategy

### Main Branches
- `main` — production-ready code. Every merge to main is a potential release.
- `staging` (optional) — pre-production integration branch

### Feature Branches
- Format: `feat/[story-id]-[brief-description]` (e.g., `feat/us-0024-add-search`)
- Created from: `main`
- Merged to: `main` via PR

### Bug Fix Branches
- Format: `fix/[bug-id]-[brief-description]` (e.g., `fix/bug-0001-cart-empty-state`)

### Hotfix Branches
- Format: `hotfix/[incident-id]-[brief-description]`
- Created from: `main` (current production state)
- Merged to: `main` (and `staging` if exists)

---

## Branch Rules

- Never commit directly to `main`
- PRs must have at least 1 approval before merge
- PRs must have passing CI/CD checks before merge
- Delete feature branches after merge (keep the repo clean)

---

## Release Process

### Standard Release
1. All stories in scope are `done` and merged to `main`
2. QA tests staging deployment (or `main` in staging environment)
3. QA signs off: `QA-XXXX` status → `passed`
4. UAT conducted (if required): `UAT-XXXX` status → `approved`
5. Release object `REL-XXXX` readiness checklist completed
6. Support handover completed
7. Feature flags set to correct state
8. Engineering Lead deploys to production
9. Post-deployment smoke test
10. Release object status → `released`

### Hotfix Release
1. Incident declared (`INC-XXXX`)
2. Hotfix branch created from `main`
3. Fix implemented and code reviewed (can skip full PR review process for P1 if needed — document exception)
4. Hotfix deployed to production
5. Incident status → `resolved`
6. RCA initiated

### Rollback
If a release causes issues:
1. Engineering Lead decides to rollback
2. Rollback plan from `objects/rollback-plans/` executed
3. Release status → `rolled-back`
4. Incident declared if users were affected
5. RCA after resolution

---

## Release Frequency

Target cadence: Deploy when ready (continuous delivery approach).  
Avoid deploying on:
- Friday afternoons (no monitoring over weekend)
- Before public holidays
- During known peak customer traffic windows

Emergency hotfixes can deploy any time.

---

## Feature Flags

Use feature flags for:
- Gradual rollouts (risk mitigation)
- A/B experiments
- Kill switches for high-risk features

Feature flag rules: `FEATURE_FLAG_RULES.md`

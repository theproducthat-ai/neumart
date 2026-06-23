# Nuemart Product OS — Product Release Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-release`

---

## Purpose
Create a complete release plan for a feature or set of features. Write release notes, define rollback procedures, specify monitoring signals, and produce the post-release review placeholder. The release interface ensures every deployment is traceable, reversible, and observable.

---

## Triggered By
- User types `/product-release <FEATURE-ID>` or `/product-release <UAT-RUN-ID>`.
- Automatically recommended by `/product-uat` when UAT sign-off is obtained.
- Product owner or tech lead initiates release planning.

---

## Pre-conditions
- UAT Run Object must exist with `sign_off_status: Signed Off` or `Signed Off with Limitations`.
- If UAT was explicitly waived: Decision Object documenting the waiver must exist.
- QA Run Object must exist with `overall_result: Passed` or `Conditionally Passed`.
- No open Critical or High severity bugs unless explicitly accepted with documentation.

---

## Inputs
- Feature Object ID or UAT Run Object ID
- Optional: release version number (if not auto-assigned)
- Optional: deployment date/window preference
- Optional: features to bundle into this release (multi-feature releases)
- Optional: environment-specific notes (staging vs production)

---

## AI Reasoning Steps

1. **Load all upstream artifacts.** Read: Feature Object, UAT Run, QA Run, all Bug Objects (especially open ones), Known Limitation Objects, PRD, all User Story Objects, Development Plan, Impact Assessment.

2. **Assign release version.** If not provided: follow semantic versioning (MAJOR.MINOR.PATCH). A new feature is a MINOR increment. A hotfix is a PATCH. A breaking change is a MAJOR increment.

3. **Determine release type.** New Feature / Hotfix / Patch / Major based on what is being shipped.

4. **Compile features shipped.** List all Feature Objects included in this release. For multi-feature releases, list each with its summary.

5. **Write Release Notes.** Structured sections:
   - What's New: user-facing feature description in plain language
   - What Changed: changes to existing behavior
   - Bug Fixes: resolved bugs included in this release
   - Known Limitations: documented limitations that persist in this release
   - Technical Notes: for dev/ops team (schema changes, config changes, migration notes)

6. **Create Rollback Plan.** For each significant change in this release:
   - Schema rollback procedure (if schema changes were deployed)
   - Feature flag disable procedure (if feature flags used)
   - Code revert procedure (git revert commit reference)
   - Data migration reversal (if data was transformed)
   - Monitoring trigger: at what signal should rollback be initiated?
   - Rollback decision owner: who can authorize rollback?

7. **Define Monitoring Signals.** For each user-facing behavior in this release:
   - What Convex dashboard metric confirms it's working?
   - What error rate would indicate a problem?
   - What user behavior metric would confirm adoption?
   - Are there any Clerk auth metrics to watch?
   - Are there any Razorpay payment metrics to watch?

8. **Document open bugs.** If any Medium or Low bugs remain open at release: list them explicitly with their severities and accepted status. These must be tracked for the next release.

9. **Create Post-Release Review placeholder.** Schedule a review 7 days post-release. Define what questions to answer: Did the feature meet its business objective? Were monitoring signals healthy? Were known limitations a problem in practice?

10. **Create the Release Object.** Write complete release record to `product/objects/releases/`.

11. **Create the Rollback Plan Object.** Write to `product/objects/rollback-plans/`.

12. **Update the Feature Object.** Mark as `Shipped`. Record release version and date.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Release Object | `product/objects/releases/` | Created |
| Release Notes | Embedded in Release Object | Created |
| Rollback Plan Object | `product/objects/rollback-plans/` | Created |
| Known Limitations | `product/objects/limitations/` | Carried forward from UAT |
| Monitoring Signals | Embedded in Release Object | Created |
| Post-release Review placeholder | Embedded in Release Object | Created |
| Feature Object | `product/objects/features/` | Updated (status → Shipped) |

---

## Required Relationships Established

- `Release → ships → Feature Object`
- `Release → follows → UAT Run Object`
- `Release → has_qa_evidence → QA Run Object`
- `Release → has_rollback → Rollback Plan Object`
- `Feature Object → shipped_in → Release`
- `Release → acknowledges → Known Limitation Objects`

---

## Required Metadata Populated

On the Release Object:
- `release_id` — semantic ID
- `release_version` — MAJOR.MINOR.PATCH
- `release_type` — New Feature / Hotfix / Patch / Major
- `linked_features` — list of Feature Object IDs
- `linked_qa_runs` — list of QA Run Object IDs
- `linked_uat_runs` — list of UAT Run Object IDs
- `release_date` — target or actual date
- `release_notes_ref` — embedded or linked
- `rollback_plan_ref` — Rollback Plan Object ID
- `known_limitations` — list of Known Limitation Object IDs
- `monitoring_signals` — list
- `post_release_review_status` — Pending
- `open_bugs_at_release` — list of Bug Object IDs (if any)

On the Feature Object (updated):
- `maturity` → `Shipped`
- `shipped_in` → Release ID
- `shipped_date` → release date

---

## Definition of Done

- [ ] Release version assigned following semantic versioning
- [ ] Release type determined
- [ ] All features in release listed
- [ ] Release notes written (What's New, What Changed, Bug Fixes, Known Limitations, Technical Notes)
- [ ] Rollback plan written for every schema change and integration change
- [ ] Monitoring signals defined for all user-facing behaviors
- [ ] Post-release review placeholder created with review date and questions
- [ ] Open bugs at release documented (if any)
- [ ] Release Object written to `product/objects/releases/`
- [ ] Rollback Plan Object written to `product/objects/rollback-plans/`
- [ ] Feature Object updated to `Shipped` status

---

## Output Format

```
RELEASE PLAN COMPLETE
=====================
Release ID:       [RELEASE-...]
Version:          [MAJOR.MINOR.PATCH]
Type:             [New Feature | Hotfix | Patch | Major]
Target Date:      [YYYY-MM-DD]

FEATURES SHIPPED ({n}):
- [FEATURE-...] — [title]
- [FEATURE-...] — [title]

QA EVIDENCE:
- [QARUN-...] — Passed on [date]

UAT EVIDENCE:
- [UATRUN-...] — Signed Off on [date]

RELEASE NOTES SUMMARY:
  What's New: [1–2 sentences]
  What Changed: [1–2 sentences or None]
  Bug Fixes: {n} bugs resolved
  Known Limitations: {n} documented

TECHNICAL NOTES:
- Schema changes: [YES — details | NO]
- Config changes: [YES — details | NO]
- Migration required: [YES — procedure | NO]

ROLLBACK PLAN:
→ See: product/objects/rollback-plans/{slug}.md
  Trigger signal: [what triggers rollback consideration]
  Decision owner: [who authorizes rollback]
  Estimated rollback time: [n minutes]

MONITORING SIGNALS:
1. [metric] — healthy: [threshold] | alert: [threshold]
2. [metric] — healthy: [threshold] | alert: [threshold]

OPEN BUGS AT RELEASE ({n}):
- [BUG-XXXX] — [summary] — Severity: Medium/Low — Accepted by: [PO]
(or: None — all bugs resolved)

POST-RELEASE REVIEW:
  Scheduled: [7 days post-release = YYYY-MM-DD]
  Questions:
  1. Did the feature meet its business objective?
  2. Were monitoring signals healthy for 7 days?
  3. Were known limitations a real problem in practice?

NEXT ACTION:
→ Deploy to production | Monitor signals for 7 days | Run post-release review

Files written:
- product/objects/releases/{slug}.md
- product/objects/rollback-plans/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| Release plan complete | Deploy to production, then monitor |
| Post-release review due | `/product-resume` to surface review action item |
| Monitoring signals trigger alert | Execute rollback plan, then create new Request Object for the issue |
| Known limitation becomes a real problem | Create new Request Object (Enhancement) |

---

## Failure Conditions

- **UAT sign-off missing:** AI blocks and states the pre-condition. If waiver is needed, user must create the Decision Object first.
- **Critical bugs still open:** AI blocks release and lists the open bugs. Requires explicit product owner acknowledgment with written waiver to proceed.
- **Schema migration not defined despite schema changes:** AI flags this as a blocking risk. Release cannot proceed without a migration procedure.
- **Multiple features bundled with conflicting rollback procedures:** AI surfaces the conflict and recommends separating into independent releases or creating a compound rollback procedure.

---
id: ""                               # e.g. RELEASE-COM-PLP-CAROUSEL-001
object_type: Release
title: ""
status: ""                           # Planned | In Progress | Released | Rolled Back
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric

---
# Release

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting any planned production release — feature release, sprint release, or milestone release.
**Do not use this when:** Emergency hotfixes that bypass the normal release cycle (use RELEASE_HOTFIX_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/releases/`
**Related templates:** RELEASE_HOTFIX_TEMPLATE.md, BUILD_OBJECT_TEMPLATE.md, QA_RUN_OBJECT_TEMPLATE.md

---


# Nuemart Product OS — Release Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Release Objects created by `/product-release`. A Release Object captures everything about a production deployment: what shipped, the evidence trail, rollback procedures, monitoring signals, and post-release review. File location: `product/objects/releases/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. RELEASE-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Release

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Nuemart v1.2.0 — Carousel Feature Release"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
modules_included: []                 # List of MOD-XXX IDs for modules in this release
module_areas_included: []            # List of MA-XXX-YYY IDs for module areas in this release
feature_ids: []                      # List of FEAT-XXX IDs shipped in this release

# ─────────────────────────────────────────────
# RELEASE SPECIFIC FIELDS
# ─────────────────────────────────────────────
release_version: ""                  # Semantic version — MAJOR.MINOR.PATCH
release_type: ""                     # Feature | Hotfix | Patch | Major
release_date: ""                     # YYYY-MM-DD (target or actual)
release_status: ""                   # Planned | In Progress | Released | Rolled Back

# ─────────────────────────────────────────────
# WHAT'S IN THIS RELEASE
# ─────────────────────────────────────────────
linked_features: []                  # FEATURE-... IDs shipped in this release
linked_qa_runs: []                   # QARUN-... IDs providing QA evidence
linked_uat_runs: []                  # UATRUN-... IDs providing UAT evidence

# ─────────────────────────────────────────────
# KNOWN LIMITATIONS AT RELEASE
# ─────────────────────────────────────────────
known_limitations: []                # LIM-... IDs carried into this release
open_bugs_at_release: []             # BUG-... IDs accepted as open at release time

# ─────────────────────────────────────────────
# ROLLBACK
# ─────────────────────────────────────────────
rollback_plan_ref: ""                # ROLLBACK-... Object ID
rollback_trigger_signal: ""          # What metric or event would trigger rollback
rollback_decision_owner: ""          # Who can authorize rollback

# ─────────────────────────────────────────────
# MONITORING
# ─────────────────────────────────────────────
monitoring_signals: []               # List of monitoring signal descriptions

# ─────────────────────────────────────────────
# POST-RELEASE REVIEW
# ─────────────────────────────────────────────
post_release_review_status: Pending  # Pending | Scheduled | Complete
post_release_review_date: ""         # YYYY-MM-DD (7 days after release)

# ─────────────────────────────────────────────
# TECHNICAL DETAILS
# ─────────────────────────────────────────────
schema_changed: false                # Was a schema change deployed?
migration_required: false            # Was a data migration required?
config_changes: []                   # List of config or env var changes
commit_refs: []                      # Git commit hashes for this release

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  ships: []                          # FEATURE-... IDs
  follows_uat: []                    # UATRUN-... IDs
  has_qa_evidence: []                # QARUN-... IDs
  has_rollback: ""                   # ROLLBACK-... ID
  acknowledges_limitations: []       # LIM-... IDs

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""
created_by: ""
created_at: ""
updated_at: ""
released_by: ""                      # Who triggered the production deployment

# ─────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────
metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: ""
---
```

---

## 1. Release Summary

**Release ID:** `{object_id}`
**Version:** {release_version}
**Type:** {release_type}
**Status:** {release_status}
**Target Date:** {release_date}
**Released By:** {released_by}

---

## 2. Features Shipped

| Feature ID | Feature Name | Type | QA Run | UAT Run |
|---|---|---|---|---|
| {FEATURE-...} | {name} | {feature_type} | {QARUN-...} | {UATRUN-...} |

---

## 3. QA / UAT Evidence

| Type | Object ID | Date | Result | Conducted By |
|---|---|---|---|---|
| QA Run | {QARUN-...} | {date} | Passed | {QA engineer} |
| UAT Run | {UATRUN-...} | {date} | Signed Off | {product owner} |

---

## 4. Release Notes

### What's New
> User-facing description of new capabilities in this release. Written for a non-technical audience.

{what's new description — plain language, no technical jargon}

### What Changed
> Changes to existing behavior that users or operators should know about.

{what changed description, or: "No changes to existing behavior."}

### Bug Fixes
> Bugs resolved in this release.

| Bug ID | Summary | Severity |
|---|---|---|
| {BUG-...} | {description} | {severity} |

*(or: No bug fixes included in this release.)*

### Known Limitations
> Behaviors that are suboptimal but accepted for this release.

| Limitation ID | Description | Expected Resolution |
|---|---|---|
| {LIM-...} | {description} | {next release / TBD} |

*(or: None.)*

### Technical Notes
> Notes for the engineering and operations team.

- Schema changes: {YES — {details} | NO}
- Migration required: {YES — {procedure} | NO}
- Config changes: {list any environment variable or configuration changes}
- Convex deployment: {actions taken in Convex dashboard}
- Clerk changes: {YES — {details} | NO}

---

## 5. Open Bugs at Release

> Bugs that remain open at release time. These must be acknowledged and accepted.

| Bug ID | Summary | Severity | Accepted By | Next Release Target |
|---|---|---|---|---|
| {BUG-...} | {summary} | Medium | {product owner} | {version} |

*(or: None — all bugs resolved before release.)*

---

## 6. Rollback Plan

> See detailed rollback procedures in `product/objects/rollback-plans/{slug}.md`

**Rollback Plan Reference:** {rollback_plan_ref}
**Rollback Trigger:** {rollback_trigger_signal}
**Decision Owner:** {rollback_decision_owner}
**Estimated Rollback Time:** {n minutes}

**Quick Summary:**
1. {rollback step 1 — brief}
2. {rollback step 2 — brief}
3. {rollback step 3 — brief}

---

## 7. Monitoring Signals

> Metrics and signals to monitor post-release to confirm health.

| Signal | Healthy Threshold | Alert Threshold | Monitoring Tool |
|---|---|---|---|
| {metric name} | {healthy value} | {alert value} | {Convex Dashboard / Vercel / etc.} |
| {metric name} | {healthy value} | {alert value} | |

**Monitoring period:** 7 days post-release
**Primary monitor:** {who is responsible for monitoring}

---

## 8. Post-Release Review

**Review Status:** {post_release_review_status}
**Review Date:** {post_release_review_date} (7 days after {release_date})

**Questions to answer at review:**
1. Did this feature meet its stated business objective?
2. Were monitoring signals healthy throughout the 7-day window?
3. Did known limitations cause user problems in practice?
4. Are there any bugs filed post-release that need immediate attention?
5. Are there any future candidates to promote to active requests?

**Review Notes:** _(To be completed at review date)_

{review notes — empty until review date}

---

## 9. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Release plan created via /product-release |
| 1.1 | {YYYY-MM-DD} | {who} | Released to production |

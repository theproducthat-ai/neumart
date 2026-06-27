---
id: ""                               # e.g. UATRUN-COM-PLP-CAROUSEL-001
object_type: UATRun
title: ""
status: ""                           # Not Started | In Progress | Signed Off | Rejected | Conditional
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

---
# UATRun

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A user acceptance test run conducted by the Product Owner or stakeholder to formally sign off on a feature before release.
**Do not use this when:** Engineer or QA-led testing (use QA_RUN_OBJECT_TEMPLATE.md). Smoke tests (use QA_SMOKE_TEST_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/uat-runs/`
**Related templates:** QA_RUN_OBJECT_TEMPLATE.md, RELEASE_OBJECT_TEMPLATE.md, FEATURE_OBJECT_TEMPLATE.md

---


# Nuemart Product OS — UAT Run Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for UAT Run Objects created during `/product-uat`. A UAT Run records the human validation session, product owner feedback, and sign-off decision for a feature before release. File location: `product/objects/uat-runs/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. UATRUN-COM-PLP-CAROUSEL-001
legacy_id: ""                        # e.g. UAT-0002
object_type: UATRun

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel Feature — UAT Run 1"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# UAT RUN SPECIFIC FIELDS
# ─────────────────────────────────────────────
uat_run_number: 1                    # Increment for re-runs
linked_feature: ""                   # FEATURE-... ID
linked_qa_run: ""                    # QARUN-... ID that preceded this UAT
linked_prd: ""                       # PRD-... ID

# ─────────────────────────────────────────────
# SCENARIO STATISTICS
# ─────────────────────────────────────────────
scenarios_total: 0
scenarios_passed: 0
scenarios_failed: 0

# ─────────────────────────────────────────────
# SIGN-OFF
# ─────────────────────────────────────────────
sign_off_status: ""                  # Signed Off | Signed Off with Limitations | Not Signed Off
sign_off_date: ""                    # YYYY-MM-DD
sign_off_by: ""                      # Product owner name or role
product_owner_feedback: ""           # Free-text summary of overall product owner feedback

# ─────────────────────────────────────────────
# KNOWN LIMITATIONS
# ─────────────────────────────────────────────
known_limitations: []                # LIM-... IDs (accepted limitations documented here)

# ─────────────────────────────────────────────
# WAIVER (if UAT bypassed)
# ─────────────────────────────────────────────
uat_waived: false                    # true only if UAT explicitly waived
waiver_reason: ""                    # Required if uat_waived: true
waiver_approved_by: ""               # Required if uat_waived: true
waiver_decision_ref: ""              # DECISION-... ID documenting the waiver

# ─────────────────────────────────────────────
# NEW BUGS FOUND IN UAT
# ─────────────────────────────────────────────
new_bugs_found: []                   # BUG-... IDs for bugs discovered during UAT (not in QA)

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  validates: ""                      # FEATURE-... ID
  follows: ""                        # QARUN-... ID
  has_feedback: []                   # FEEDBACK-... IDs
  has_limitations: []                # LIM-... IDs
  followed_by_release: ""            # RELEASE-... ID (populated after release)

# ─────────────────────────────────────────────
# EXECUTION
# ─────────────────────────────────────────────
uat_date: ""                         # YYYY-MM-DD
environment: ""                      # staging | production
participants: []                     # List of names/roles who participated

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""
created_by: ""
created_at: ""
updated_at: ""

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

## 1. UAT Run Summary

**UAT Run ID:** `{object_id}` | **Run #:** {uat_run_number}
**Feature:** {linked_feature}
**QA Run Reference:** {linked_qa_run}
**Date:** {uat_date}
**Environment:** {environment}
**Participants:** {participants}

---

## 2. UAT Context

> What was tested in this UAT session, and what was the context for the product owner?

**Feature being validated:** {feature description in plain language}
**QA pre-check result:** {QARUN-...} — {Passed/Conditionally Passed}
**Known conditions entering UAT:** {any conditions from QA that carried into UAT}

---

## 3. UAT Scenarios Table

> UAT scenarios are written in plain language from the user's perspective. Not technical test steps — real user journeys.

| # | Scenario Description | User Role | Result | Feedback |
|---|---|---|---|---|
| 1 | {plain language user journey} | {role} | PASS | {feedback or "—"} |
| 2 | {plain language user journey} | {role} | PASS | {feedback or "—"} |
| 3 | {plain language user journey} | {role} | FAIL | {what was wrong} |
| 4 | {plain language user journey} | {role} | PASS | {minor note} |

**Scenario Summary:**
- Total: {scenarios_total}
- Passed: {scenarios_passed}
- Failed: {scenarios_failed}

---

## 4. Product Owner Feedback

> All feedback captured during the UAT session. Categorized by type.

| Feedback ID | Summary | Category | Action |
|---|---|---|---|
| {FEEDBACK-...} | {feedback description} | {Bug/Enhancement/Wording/Design/Out of Scope/Clarification} | {Fix now / Defer / Accept / Create Request} |

**Overall product owner impression:**
{product_owner_feedback — free text summary}

---

## 5. New Bugs Found in UAT

> Bugs found during UAT that were NOT caught in QA. These are notable for QA process improvement.

| Bug ID | Summary | Severity | Scenario | Status |
|---|---|---|---|---|
| {BUG-...} | {summary} | {Critical/High/Medium/Low} | {scenario #} | Open |

*(or: None — QA coverage was complete; no new bugs found during UAT)*

---

## 6. Known Limitations

> Behaviors that do not fully match the ideal experience but are accepted for this release.

| Limitation ID | Description | Impact | Accepted By | Will Be Addressed In |
|---|---|---|---|---|
| {LIM-...} | {description} | {Low/Medium} | {product owner} | {next release / TBD / Not planned} |

*(or: None — all behaviors meet expectations)*

---

## 7. Sign-off Status

**SIGN-OFF STATUS: {SIGNED OFF | SIGNED OFF WITH LIMITATIONS | NOT SIGNED OFF}**

**Sign-off Date:** {sign_off_date}
**Product Owner:** {sign_off_by}

**Conditions on sign-off** (if any):
- {condition 1}
- {condition 2}

**UAT Waiver** (if applicable):
- Waived: {YES/NO}
- Waiver reason: {waiver_reason}
- Approved by: {waiver_approved_by}
- Decision reference: {waiver_decision_ref}

---

## 8. Next Action

**Recommended next step:**
→ {/product-release to create release plan | Fix UAT failures [BUG-...] and re-run UAT}

**Next action owner:** {product owner / developer / both}

---

## 9. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | UAT Run created and executed |

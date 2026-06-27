---
id: ""                               # e.g. BUG-COM-PLP-CAROUSEL-001
object_type: Bug
title: ""
status: ""                           # Open | In Progress | Fixed | Verified | Closed | Deferred
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
# Bug

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Defects affecting user flows, payments, orders, authentication, data integrity, or any critical user-facing feature. All P0/P1 bugs.
**Do not use this when:** Cosmetic defects — wrong copy, minor layout issues, low-impact visual glitches (use BUG_MINOR_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/bugs/`
**Related templates:** BUG_MINOR_TEMPLATE.md, INCIDENT_OBJECT_TEMPLATE.md, RCA_TEMPLATE.md

---


# Nuemart Product OS — Bug Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Bug Objects. Bugs are created during `/product-qa` for each failing test case, and during `/product-uat` for issues found by the product owner that were not caught in QA. Each bug is fully traceable to its source story, acceptance criterion, and test case. File location: `product/objects/bugs/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. BUG-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Bug

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel crashes when only 1 banner exists"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# HIERARCHY REFERENCES (V2)
# ─────────────────────────────────────────────
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
module_area_id: ""                   # MA-COM-PLP | MA-COM-CHK | MA-ADM-ORD | etc.
feature_id: ""                       # FEAT-XXX (which feature this bug is in)
subfeature_id: ""                    # SUBFEATURE-XXX (if in a sub-feature)
component_id: ""                     # CMP-XXXX (if bug is in a specific component)

# ─────────────────────────────────────────────
# BUG CLASSIFICATION
# ─────────────────────────────────────────────
severity: ""                         # Critical | High | Medium | Low
bug_type: ""                         # Functional | UI | Performance | Security | Data | Regression

# ─────────────────────────────────────────────
# DISCOVERY CONTEXT
# ─────────────────────────────────────────────
found_in_qa_run: ""                  # QARUN-... ID (if found in QA)
found_in_uat_run: ""                 # UATRUN-... ID (if found in UAT)
found_in_test_case: ""               # TESTCASE-... ID (if found during test case execution)
found_date: ""                       # YYYY-MM-DD
found_by: ""                         # Tester name, role, or "AI"

# ─────────────────────────────────────────────
# TRACEABILITY
# ─────────────────────────────────────────────
linked_story: ""                     # US-XXXX ID of the story the bug is in
linked_feature: ""                   # FEATURE-... ID
linked_requirement: ""               # REQ-... ID (if bug violates a specific requirement)
linked_acceptance_criterion: ""      # ACC-... ID (if bug fails a specific criterion)

# ─────────────────────────────────────────────
# FIX TRACKING
# ─────────────────────────────────────────────
fix_status: Open                     # Open | In Progress | Fixed | Verified | Won't Fix | Deferred
fix_assigned_to: ""                  # Developer responsible for the fix
fix_date: ""                         # YYYY-MM-DD (when fix was implemented)
fix_verified_by: ""                  # Name or role who verified the fix
fix_verified_date: ""                # YYYY-MM-DD
fix_commit_ref: ""                   # Git commit hash or PR reference for the fix
fix_notes: ""                        # Brief description of what was changed to fix

# ─────────────────────────────────────────────
# ENVIRONMENT
# ─────────────────────────────────────────────
environment: ""                      # local | staging | production
device: ""                           # desktop | mobile | tablet
browser: ""                          # Chrome | Safari | Firefox | all

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  found_in: ""                       # QARUN-... or UATRUN-... ID
  blocks: ""                         # FEATURE-... if bug is a blocker
  linked_to_story: ""                # US-XXXX ID
  linked_to_feature: ""              # FEATURE-... ID

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

## 1. Bug Summary

**Bug ID:** `{object_id}`
**Severity:** {severity}
**Type:** {bug_type}
**Status:** {fix_status}
**Feature:** {linked_feature}
**Story:** {linked_story}
**Found In:** {found_in_qa_run} (QA) or {found_in_uat_run} (UAT)
**Found Date:** {found_date}
**Found By:** {found_by}

---

## 2. Bug Title

> One clear sentence stating what is broken.

**{object_id}:** {canonical_name}

---

## 3. Steps to Reproduce

> Numbered, atomic steps that reproduce the bug every time. Written so any developer can follow them without guidance.

**Preconditions:**
- {precondition 1 — system state required before reproducing}
- {precondition 2}

**Steps:**
1. {precise action}
2. {precise action}
3. {precise action}
4. {observe the result}

**Reproducibility:** {Always | Intermittent | Only in specific conditions}

---

## 4. Expected Behavior

> What should happen according to the acceptance criterion or requirement?

{expected behavior — precise and reference the specific requirement or criterion if possible}

**References:** {ACC-... criterion} or {REQ-...} or {PRD section}

---

## 5. Actual Behavior

> What actually happens instead?

{actual behavior — specific, precise, observable}

---

## 6. Severity Assessment

| Factor | Rating | Rationale |
|---|---|---|
| Severity | {Critical/High/Medium/Low} | {why this severity was assigned} |
| User Impact | {High/Medium/Low} | {how many users affected, how severely} |
| Frequency | {Always/Frequent/Occasional/Rare} | {how often this occurs} |
| Blocker? | {YES/NO} | {does this block QA, UAT, or release?} |

**Severity Definitions:**
- **Critical:** Data loss, security breach, payment failure, complete feature unusable, or blocks all further testing
- **High:** Core user journey broken, significant user impact, no workaround
- **Medium:** Feature works but with noticeable issues, workaround exists
- **Low:** Minor UI/UX issue, cosmetic, low frequency, easy workaround

---

## 7. Environment Details

| Setting | Value |
|---|---|
| Environment | {local / staging / production} |
| Device | {desktop / mobile / tablet} |
| Browser | {Chrome / Safari / Firefox} |
| Screen Size | {if relevant} |
| Auth State | {logged in as role X / logged out} |
| Data State | {relevant data conditions at time of bug} |

---

## 8. Traceability

| Object Type | Object ID | Relationship |
|---|---|---|
| Story | {US-XXXX} | Bug is in this story's scope |
| Feature | {FEATURE-...} | Bug affects this feature |
| Requirement | {REQ-...} | Bug violates this requirement |
| Acceptance Criterion | {ACC-...} | Bug causes this criterion to fail |
| Test Case | {TESTCASE-...} | Bug was found in this test case |

---

## 9. Fix Details

> _(Completed when bug is fixed and verified)_

**Fix Status:** {fix_status}
**Assigned To:** {fix_assigned_to}
**Fix Date:** {fix_date}
**Fix Commit:** {fix_commit_ref}
**Fix Description:** {fix_notes}

**Verification:**
- Verified By: {fix_verified_by}
- Verified Date: {fix_verified_date}
- Verification method: {how the fix was confirmed — test case re-run, manual check, etc.}

---

## 10. Won't Fix / Deferred Decision

> _(Complete only if status = Won't Fix or Deferred)_

**Decision:** {Won't Fix / Deferred}
**Reason:** {rationale — why fixing this is not worthwhile or not now}
**Approved By:** {who made this decision}
**Decision Reference:** {DECISION-... ID}

---

## 11. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Bug created during QA/UAT run |
| 1.1 | {YYYY-MM-DD} | {developer} | Fix implemented |
| 1.2 | {YYYY-MM-DD} | {QA} | Fix verified |

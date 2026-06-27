---
id: ""                               # e.g. REQ-COM-PLP-CAROUSEL-001
object_type: Requirement
title: ""
status: ""                           # Draft | Approved | Implemented | Verified | Deprecated
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
# Requirement

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Requirement object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/requirements/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Nuemart Product OS — Requirement Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Requirement Objects created during `/product-prd`. Each requirement represents a single testable statement about what the system must do. File location: `product/objects/requirements/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. REQ-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: Requirement

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# REQUIREMENT-SPECIFIC FIELDS
# ─────────────────────────────────────────────
requirement_type: ""                 # Functional | Non-functional | Business Rule | Data | Integration
priority: ""                         # Must Have | Should Have | Nice to Have
must_have: false                     # true if this is a Must Have requirement
source_prd: ""                       # PRD-... ID this requirement belongs to
source_section: ""                   # PRD section this came from (e.g. "Section 5 — Functional Requirements")

# ─────────────────────────────────────────────
# ACCEPTANCE CRITERIA
# ─────────────────────────────────────────────
acceptance_criteria_refs: []         # List of ACC-... IDs

# ─────────────────────────────────────────────
# TEST COVERAGE
# ─────────────────────────────────────────────
test_coverage_required: []           # Happy Path | Error Path | Edge Case | Regression | Performance | Mobile | Security
test_case_refs: []                   # List of TESTCASE-... IDs (populated during QA)

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: Draft                        # Draft | Approved | In Development | Tested | Verified | Deprecated

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  specified_in: ""                   # PRD-... ID
  delivers: ""                       # FEATURE-... ID
  implemented_by: []                 # US-XXXX IDs
  validated_by: []                   # ACC-... IDs

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

## 1. Requirement Summary

**Requirement ID:** `{object_id}`
**Type:** {requirement_type}
**Priority:** {priority}
**Must Have:** {YES/NO}
**Source PRD:** {source_prd}
**Status:** {status}

---

## 2. Requirement Statement

> Write as a single, testable, unambiguous statement. Use active voice. Avoid "should" — use "must" for Must Have, "shall" for Should Have.

**{object_id}:** {requirement statement}

**Example format:** "The system must display a minimum of 3 and maximum of 8 promotional banner items in the carousel."

---

## 3. Rationale

> Why does this requirement exist? What business need or user need does it address?

{rationale — 1–3 sentences}

---

## 4. Acceptance Criteria

> Numbered list of testable conditions that, when all met, confirm this requirement is satisfied.

| ACC ID | Criterion | Test Type |
|---|---|---|
| {ACC-...} | {criterion text} | {Happy Path/Error Path/Edge Case} |
| {ACC-...} | {criterion text} | {Happy Path/Error Path/Edge Case} |

**Minimum:** 2 acceptance criteria per requirement.
**Maximum:** 7 acceptance criteria (if more needed, split the requirement).

---

## 5. Out-of-Scope Clarifications

> What does this requirement explicitly NOT cover, even if it might seem implied?

- {what is out of scope} — Reason: {why}
- (or: None — requirement statement is sufficiently bounded)

---

## 6. Constraints and Assumptions

> Any constraints on how this requirement must be implemented, or assumptions made when writing it.

**Constraints:**
- {constraint}

**Assumptions:**
- {assumption — if incorrect, requirement may need to change}

---

## 7. Dependencies

> Other requirements or features that must be in place for this requirement to be implementable.

| Depends On | Type | Reason |
|---|---|---|
| {object_id} | {Requirement/Feature/External} | {why dependent} |

---

## 8. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | {YES/NO} | |
| Error Path | {YES/NO} | {what error scenarios} |
| Edge Case | {YES/NO} | {what edge cases} |
| Regression | {YES/NO} | {what existing behavior to protect} |
| Performance | {YES/NO} | {what threshold} |
| Mobile | {YES/NO} | |
| Security | {YES/NO} | {what security aspect} |

---

## 9. Related Requirements

| Requirement ID | Relationship |
|---|---|
| {REQ-...} | {Conflict / Supports / Extends / Replaces} |

---

## 10. AI Reasoning Notes

**Generated by:** `/product-prd`
**Why this was written as a separate requirement:** {reason}
**Confidence:** {High/Medium/Low}

---

## 11. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial creation via /product-prd |

---

## Definition of Done

- [ ] Requirement written as a single testable statement
- [ ] Requirement type classified
- [ ] Priority set (Must Have / Should Have / Nice to Have)
- [ ] must_have field set (true/false)
- [ ] Minimum 2 acceptance criteria written and linked
- [ ] Test coverage requirements identified
- [ ] Source PRD linked
- [ ] Feature Object linked
- [ ] Out-of-scope clarifications noted (or explicitly "None")
- [ ] Status set to `Draft` (changes to `Approved` when PRD is approved)

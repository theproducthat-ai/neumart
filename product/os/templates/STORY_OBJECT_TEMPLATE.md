# Nuemart Product OS — Story Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for User Story Objects created by `/product-stories`. Each story is a single unit of user-facing or system behavior with clear acceptance criteria and test coverage requirements. File location: `product/objects/stories/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. US-0015
legacy_id: ""                        # Same as object_id for stories — US-XXXX
object_type: Story

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""                         # Position in delivery sequence (e.g. 1, 2, 3...)
version: "1.0"
canonical_name: ""                   # e.g. "Customer views promotional banner carousel"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# STORY-SPECIFIC FIELDS
# ─────────────────────────────────────────────
story_type: ""                       # User-facing | System | Background | Admin
story_format: ""                     # "As a [role], I want [goal], so that [benefit]"
role: ""                             # The user role in the story
goal: ""                             # What the user wants to do
benefit: ""                          # Why the user wants to do it

# ─────────────────────────────────────────────
# ACCEPTANCE CRITERIA
# ─────────────────────────────────────────────
acceptance_criteria:
  - id: ""                           # ACC-... ID
    criterion: ""                    # Testable criterion text
    test_type: ""                    # Happy Path | Error Path | Edge Case | Regression | Mobile

# ─────────────────────────────────────────────
# TEST COVERAGE
# ─────────────────────────────────────────────
test_coverage_required: []           # Happy Path | Error Path | Edge Case | Regression | Mobile | Performance | Security
test_case_refs: []                   # TESTCASE-... IDs (populated during /product-qa)

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
linked_requirement: ""               # REQ-... ID this story implements
linked_feature: ""                   # FEATURE-... ID
linked_prd: ""                       # PRD-... ID
dev_task_refs: []                    # Task IDs from dev plan (populated during /product-devplan)
depends_on: []                       # US-XXXX IDs that must be done before this story

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: Draft                        # Draft | Approved | In Development | Done | Verified

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

## 1. Story Summary

**Story ID:** `{object_id}`
**Type:** {story_type}
**Sequence:** {sequence} in delivery order
**Status:** {status}
**Source Requirement:** {linked_requirement}
**Feature:** {linked_feature}
**PRD:** {linked_prd}

---

## 2. User Story

> **As a** {role},
> **I want** {goal},
> **so that** {benefit}.

---

## 3. Context

> Why does this story exist? What user need or business rule does it address? This is the "why" behind the story format.

{context — 1–3 sentences drawing from the PRD or discovery session}

---

## 4. Acceptance Criteria

> All criteria must be testable, specific, and unambiguous. Written so that a QA engineer can execute them without asking for clarification.

| # | Criterion | Test Type |
|---|---|---|
| 1 | {criterion — specific, measurable, unambiguous} | Happy Path |
| 2 | {criterion} | Error Path |
| 3 | {criterion} | Edge Case |
| ... | ... | ... |

**Minimum:** 2 criteria. **Maximum:** 7 criteria.

---

## 5. Development Notes

> Notes for the developer implementing this story. Not acceptance criteria — hints, gotchas, and pointers.

**Primary files affected:**
- {file path or component name}
- {file path or component name}

**Key implementation notes:**
- {implementation hint or constraint}
- {known gotcha or edge case to handle}

**Schema change required:** {YES — {details} | NO}
**API change required:** {YES — {details} | NO}
**Convex function affected:** {function name or N/A}
**Clerk interaction:** {YES — {details} | NO}
**Razorpay interaction:** {YES — {details} | NO}

---

## 6. Test Coverage Requirements

| Test Type | Required | Notes |
|---|---|---|
| Happy Path | {YES/NO} | |
| Error Path | {YES/NO} | {specific error scenarios} |
| Edge Case | {YES/NO} | {boundary conditions} |
| Regression | {YES/NO} | {what existing behavior to verify} |
| Mobile | {YES/NO} | {specific mobile considerations} |
| Performance | {YES/NO} | {threshold} |
| Security | {YES/NO} | {what to check} |

---

## 7. Dependencies

> Stories that must be completed before this story can begin.

| Story ID | Title | Reason for Dependency |
|---|---|---|
| {US-XXXX} | {title} | {why this must be done first} |
| (or: None — this story has no upstream dependencies) | | |

---

## 8. Definition of Done Checklist

- [ ] Implementation matches acceptance criteria (all criteria pass)
- [ ] Code reviewed and merged
- [ ] No new linting errors introduced
- [ ] Mobile responsiveness verified (if UI story)
- [ ] Error states handled (if applicable)
- [ ] Test cases written and passing in `/product-qa`
- [ ] Story status updated to `Done`

---

## 9. AI Reasoning Notes

**Generated by:** `/product-stories`
**Sequence rationale:** {why this story is in this position in the delivery sequence}
**Split/merge decisions:** {if this story was split or merged from a candidate story, explain here}

---

## 10. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial creation via /product-stories |

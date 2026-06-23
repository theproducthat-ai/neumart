# Nuemart Product OS — PRD Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Product Requirements Document Objects created by `/product-prd`. The PRD is the formal specification that bridges product decisions and engineering execution. File location: `product/objects/prds/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. PRD-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: PRD

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
prd_version: "1.0"                  # Independently tracked PRD version
canonical_name: ""
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# PRD-SPECIFIC FIELDS
# ─────────────────────────────────────────────
source_request: ""                   # REQUEST-... ID
linked_feature: ""                   # FEATURE-... ID
approval_status: Draft               # Draft | Pending Approval | Approved | Superseded
approver: ""                         # Name or role of approver
approval_date: ""                    # YYYY-MM-DD (populated when approved)

# ─────────────────────────────────────────────
# CONTENT METRICS
# ─────────────────────────────────────────────
requirements_count: 0
must_have_count: 0
acceptance_criteria_count: 0
rules_count: 0
stories_linked: []                   # US-XXXX IDs (populated after /product-stories)

# ─────────────────────────────────────────────
# TECHNICAL FLAGS
# ─────────────────────────────────────────────
schema_change_required: false
payment_flow_affected: false
auth_affected: false

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: Draft                        # Draft | Pending Approval | Approved | In Development | Delivered | Superseded

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  specifies: ""                      # FEATURE-... ID
  sourced_from: ""                   # REQUEST-... ID
  incorporates: ""                   # Discovery Session ID
  has_requirements: []               # REQ-... IDs
  has_stories: []                    # US-XXXX IDs
  has_decisions: []                  # DECISION-... IDs
  addresses_questions: []            # QUESTION-... IDs (resolved)

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

## 1. Document Header

**PRD ID:** `{object_id}` | **Version:** {prd_version}
**Feature:** {linked_feature}
**Source Request:** {source_request}
**Status:** {approval_status}
**Last Updated:** {updated_at}
**Approver:** {approver} | **Approval Date:** {approval_date}

---

## 2. Background

> What is the broader product context for this requirement? What is happening in the product, the market, or with users that makes this relevant now?

{background — 2–4 sentences}

---

## 3. Problem Statement

> What is the specific user or business problem being solved? Written from the perspective of the person experiencing the problem.

{problem statement}

---

## 4. Business Objective

> What measurable business outcome will this feature deliver? Ideally quantified.

**Objective:** {business objective}
**Success Metric:** {how will we know this objective was achieved?}

---

## 5. Users and Personas

> Who is affected by this feature? What is each role's relationship to it?

| Role | Description | What Changes For Them |
|---|---|---|
| {role name} | {brief role description} | {what this feature changes for them} |
| {role name} | {brief role description} | {what this feature changes for them} |

---

## 6. Scope

### In-Scope
- {in-scope item}
- {in-scope item}

### Out-of-Scope
- {out-of-scope item} — Reason: {rationale}
- {out-of-scope item} — Reason: {rationale}

---

## 7. Feature Requirements

> Each requirement is testable, unambiguous, and assigned a priority. Must Have requirements are the non-negotiable delivery baseline.

### 7.1 Must Have

**{REQ-XXXX}:** {requirement statement}
- Priority: Must Have
- Type: {Functional/Non-functional/Business Rule/Data/Integration}

**{REQ-XXXX}:** {requirement statement}
- Priority: Must Have

### 7.2 Should Have

**{REQ-XXXX}:** {requirement statement}
- Priority: Should Have

### 7.3 Nice to Have

**{REQ-XXXX}:** {requirement statement}
- Priority: Nice to Have

---

## 8. Data Requirements

> Data entities, fields, schema changes, and validation rules.

### 8.1 Entities Affected

| Entity | Operations | Fields Added/Changed | Schema Change? |
|---|---|---|---|
| {entity} | {CRUD} | {field list} | {YES/NO} |

### 8.2 Schema Changes (if applicable)

```
// New field on entity {EntityName}:
{fieldName}: v.{type}()     // {description, default, validation}
```

### 8.3 Validation Rules

| Field | Rule | Error Message |
|---|---|---|
| {field} | {validation rule} | {user-facing error} |

---

## 9. UX / UI Requirements

> For each affected screen: what does the user see, and how does the interaction work?

### {Screen Name} (e.g. PLP — Product Listing Page)

**Behavior:** {describe expected user-facing behavior}

**States to handle:**
- Default state: {description}
- Empty state: {description}
- Loading state: {description}
- Error state: {description}

### {Screen Name 2}

{same structure}

---

## 10. Business Rules

> Rules that govern how the feature behaves under specific conditions.

| Rule ID | Rule Statement | Priority | Exception |
|---|---|---|---|
| BR-{SLUG}-001 | {rule} | Must Have | {exception} |
| BR-{SLUG}-002 | {rule} | Should Have | {exception} |

---

## 11. Non-functional Requirements

| Category | Requirement | Target |
|---|---|---|
| Performance | {performance requirement} | {target — e.g. < 200ms} |
| Mobile | {mobile requirement} | {target} |
| Accessibility | {accessibility requirement} | {standard} |
| Error Handling | {error handling requirement} | {behavior} |
| Offline Behavior | {offline requirement} | {behavior or N/A} |

---

## 12. Acceptance Criteria

> Complete list of all acceptance criteria across all requirements. These become the test targets.

| ACC ID | Requirement | Criterion | Test Type |
|---|---|---|---|
| {ACC-...} | {REQ-...} | {criterion} | {Happy Path/Error Path/Edge Case} |
| {ACC-...} | {REQ-...} | {criterion} | |

---

## 13. Out of Scope

> Comprehensive list of everything discussed but explicitly excluded from this PRD.

| # | Out-of-Scope Item | Rationale | Future Candidate? |
|---|---|---|---|
| 1 | {item} | {reason} | {YES — see Future Considerations / NO} |
| 2 | {item} | {reason} | {YES/NO} |

---

## 14. Decision Log

> Record of all significant decisions made during grilling and PRD creation.

| Decision ID | Decision | Made By | Date | Rationale |
|---|---|---|---|---|
| {DECISION-...} | {decision statement} | {who} | {date} | {rationale} |

---

## 15. Open Questions

> Questions that remain unresolved at PRD creation time. These are flagged but do not block PRD creation.

| # | Question | Impact if Unanswered | Assigned To |
|---|---|---|---|
| 1 | {question} | {impact} | {who can answer} |

---

## 16. Future Considerations

> Features or enhancements that could logically follow this PRD in a future release.

- {future consideration} — Source: {where this idea came from}
- {future consideration}

---

## 17. AI Reasoning Notes

**Generated by:** `/product-prd`
**Upstream inputs used:**
- {Request Object}
- {Discovery Session}
- {Impact Assessment}

---

## 18. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Initial draft via /product-prd |

---

## Definition of Done

- [ ] Background, Problem Statement, Business Objective written
- [ ] All users and personas identified
- [ ] In-scope and out-of-scope defined
- [ ] All Must Have requirements written as testable statements
- [ ] Every requirement has at least 2 acceptance criteria
- [ ] Data requirements specified (schema changes documented with field names)
- [ ] All affected screens described with states
- [ ] Business rules written as Rule Objects and listed here
- [ ] Non-functional requirements stated
- [ ] Out-of-scope section complete
- [ ] Decision Log populated
- [ ] Feature Object linked
- [ ] Status set to `Draft`
- [ ] Product owner has reviewed and approved (status → `Approved`)

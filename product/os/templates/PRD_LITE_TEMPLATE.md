---
id: ""                               # e.g. PRD-COM-PLP-SORT-LITE-001
object_type: PRD
title: ""
status: ""                           # Draft | Approved | Superseded

priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""
linked_request: ""
linked_risks: []
linked_decisions: []

owner: ""
created_by: ""
created_date: ""
updated_date: ""
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# PRD Lite: [Title]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** A small enhancement or configuration change that needs a product brief but doesn't warrant a full PRD (no new schema, ≤3 stories, low risk, no UAT required).
**Do not use this when:** The change introduces a new user-visible capability, requires schema changes, cross-module coordination, UAT, or has a client commitment. Use PRD_OBJECT_TEMPLATE.md.
**Source-of-truth folder:** `product/objects/prds/`
**Related templates:** PRD_OBJECT_TEMPLATE.md, REQUEST_QUICK_TEMPLATE.md

---

## Problem

[What user pain or product gap does this solve? One paragraph.]

## Proposed Solution

[What we are building. Be specific — what will the user see or experience?]

## Scope

**In scope:**
- [Specific change 1]
- [Specific change 2]

**Out of scope:**
- [What this change explicitly does NOT include]

## Acceptance Criteria

- [ ] [Criterion 1 — verifiable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Stories

| Story ID | Title | Points |
|---|---|---|
| US-XXXX | [story title] | [SP] |

## Risks and Assumptions

| Item | Type | Mitigation |
|---|---|---|
| [risk or assumption] | risk \| assumption | [mitigation] |

## Approval

| Approver | Role | Status |
|---|---|---|
| [Name] | Product Manager | pending \| approved |

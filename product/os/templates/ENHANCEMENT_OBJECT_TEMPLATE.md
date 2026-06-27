---
id: ""                               # e.g. ENH-COM-PLP-001
object_type: Enhancement
title: ""
status: ""                           # candidate | planned | in-development | shipped | deferred | rejected

priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID of the feature being enhanced
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# Enhancement Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Improving an existing shipped feature with a change that is too small for a new FEATURE object but too meaningful to be a simple bug fix. Typically 1–3 stories, no new schema changes.
**Do not use this when:** The change introduces a new capability that did not exist before (create a FEATURE object) or fixes a defect (create a BUG object).
**Source-of-truth folder:** `product/objects/enhancements/`
**Related templates:** FEATURE_OBJECT_TEMPLATE.md, BUG_OBJECT_TEMPLATE.md, REQUEST_OBJECT_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| Enhancement ID | ENH-NNN |
| Title | [Short label for this enhancement] |
| Parent Feature | [FEATURE-... ID of the feature being enhanced] |
| Type | ux \| performance \| accessibility \| copy \| configuration \| workflow |
| Status | candidate \| planned \| in-development \| shipped \| deferred \| rejected |
| Work Lane | Lane 2 — Small Enhancement |
| Story Count | [number of user stories] |
| Schema Change | yes \| no |

## Problem / Opportunity

[What specific friction or gap in the existing feature does this enhancement address?]

## Proposed Change

[What changes? Be specific about what the user will experience differently.]

## Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Effort Estimate

```
story_points:   [estimated SP total]
engineering:    [S | M | L — relative effort]
design_needed:  yes | no
qa_needed:      yes | no
```

## Success Signal

[How do we know this enhancement is an improvement? What metric or user signal confirms it worked?]

## Linked Objects

```
linked_feature:     FEATURE-...
linked_request:     REQUEST-...
linked_stories:     []           # US-... IDs
linked_prd:         ""           # Optional — only for complex enhancements
```

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```

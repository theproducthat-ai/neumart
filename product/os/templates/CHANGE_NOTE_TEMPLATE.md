---
id: ""                               # e.g. CHN-001
object_type: ChangeNote
title: ""
status: ""                           # draft | reviewed | applied | rejected
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
# ChangeNote

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A midstream note capturing a substantive change in approach, design, or scope that is significant enough to document but does not require full scope-change approval.
**Do not use this when:** Major scope changes requiring stakeholder approval (use SCOPE_CHANGE_TEMPLATE.md). Tiny notes (use CHANGE_NOTE_LITE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/change-notes/`
**Related templates:** CHANGE_NOTE_LITE_TEMPLATE.md, SCOPE_CHANGE_TEMPLATE.md

---


# Change Note: [CHN-NNN]

## Core Fields
```
change_note_id:      CHN-NNN
title:               [Short title for what changed]
status:              [draft | reviewed | applied | rejected]
change_type:         [clarification | minor-addition | scope-change | new-subfeature | new-feature | separate-request | bug | risk | blocker]
discovered_at_stage: [prd | design | development | qa | uat | release | post-release]
raised_by:           [Name / role]
raised_date:         YYYY-MM-DD
```

## Linked Object
```
parent_object_type:  [prd | feature | story | design | release | roadmap-item]
parent_object_id:    [Object ID]
```

## Change Description
```
original_state:      |
  [What was agreed or assumed before this change]
new_pointer:         |
  [What new information, requirement, or constraint was discovered]
change_summary:      |
  [What needs to change as a result]
change_reason:       |
  [Why this change is being made — not just what]
```

## Impact Check
```
impact_check_id:     [IMP-NNN or pending]
impacted_areas:
  prd:               [yes | no | unknown]
  user_stories:      [yes | no | unknown]
  design:            [yes | no | unknown]
  technical_design:  [yes | no | unknown]
  data_model:        [yes | no | unknown]
  api:               [yes | no | unknown]
  qa:                [yes | no | unknown]
  uat:               [yes | no | unknown]
  release:           [yes | no | unknown]
  support_ops:       [yes | no | unknown]
  roadmap:           [yes | no | unknown]
```

## Recommended Action
```
recommendation:      [update-current-object | create-new-version | create-child-request | create-change-request | park-for-later | reject-from-scope]
reasoning:           [Why this recommendation]
resulting_object:    [Object ID if created]
approval_required:   [yes | no]
approved_by:         [Name or N/A]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

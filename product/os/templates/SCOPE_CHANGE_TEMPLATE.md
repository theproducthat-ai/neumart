---
id: ""                               # e.g. SCH-001
object_type: ScopeChange
title: ""
status: ""                           # proposed | reviewed | approved | rejected
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
# ScopeChange

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A material change to feature scope, timeline, or budget that requires stakeholder re-approval and formal documentation.
**Do not use this when:** Small midstream notes or minor direction changes that don't affect scope or need re-approval (use CHANGE_NOTE_LITE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/scope-changes/`
**Related templates:** CHANGE_NOTE_LITE_TEMPLATE.md, CHANGE_NOTE_TEMPLATE.md, IMPACT_CHECK_TEMPLATE.md

---


# Scope Change: [SCH-NNN]

## Core Fields
```
scope_change_id:     SCH-NNN
title:               [Short title for the scope change]
status:              [proposed | reviewed | approved | rejected]
change_type:         [addition | removal | modification | split | merge]
triggered_by:        [CHN-NNN | DSN-NNN | REQ-NNN | stakeholder | discovery]
raised_by:           [Name / role]
raised_date:         YYYY-MM-DD
```

## Affected Object
```
object_type:         [prd | feature | story | sprint | release]
object_id:           [Object ID]
object_title:        [Object title]
current_version:     [vX.Y]
```

## Change Description
```
original_scope:      |
  [What was agreed before this change]
proposed_change:     |
  [What is being added, removed, or modified]
change_reason:       |
  [Why this change is necessary or justified]
```

## Impact
```
impact_check_id:     IMP-NNN
effort_delta:        [increase | decrease | neutral | unknown]
timeline_impact:     [yes | no | unknown]
cost_impact:         [yes | no | unknown]
quality_impact:      [yes | no | unknown]
impacted_objects:    []
```

## Decision
```
approval_required:   [yes | no]
approver:            [Name / role]
approval_date:       YYYY-MM-DD
decision:            [approved | rejected]
rejection_reason:    [If rejected]
resulting_action:    [update-object | create-version | defer | reject]
resulting_object:    [Object ID if a new object was created]
```

## Version History
```
new_version:         [vX.Y]
previous_version:    [vX.Y]
version_note:        [Brief description of what changed in this version]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

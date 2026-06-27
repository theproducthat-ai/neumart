---
id: ""                               # e.g. DEF-001
object_type: DeferredItem
title: ""
status: ""                           # deferred | backlog | cancelled
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
# DeferredItem

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Deferred Item object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/deferred-items/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Deferred Item: [DEF-NNN]

## Core Fields
```
deferred_item_id: DEF-NNN
title:            [Short descriptive title]
status:           [deferred | backlog | cancelled]
deferred_date:    YYYY-MM-DD
deferred_by:      [Name]
source_type:      [request | feature | story | bug | idea | other]
source_id:        [Source object ID]
parent_batch_id:  [BATCH-YYYYMMDD-NNN if applicable]
```

## Original Request
```
raw_user_input:   [Verbatim from original input if available]
extracted_request: [Cleaned summary]
classification:   [feature | bug | enhancement | research | ops | other]
lane:             [product | engineering | design | data | ops | support]
```

## Deferral Reason
```
defer_reason:     [phase-2 | dependency | resource | priority | timing | strategic | other]
defer_notes:      [Why this was deferred]
blocking_dependency: [What must happen first]
```

## Target Reactivation
```
target_quarter:   [Q1-YYYY | after-release-X | TBD]
reactivation_trigger: [Event or condition that reactivates this item]
owner:            [Name responsible for reactivating]
```

## Linked Objects
```
module_id:        [MOD-NNN or N/A]
feature_id:       [FEA-NNN or N/A]
linked_requests:  []
required_artifacts: []
next_action:      [What happens when reactivated]
```

## Audit
```
created_date:    YYYY-MM-DD
created_by:      [Human | AI]
last_updated:    YYYY-MM-DD
```

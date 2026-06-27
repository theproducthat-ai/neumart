---
id: ""                               # e.g. BLI-001
object_type: BacklogItem
title: ""
status: ""                           # backlog | ready | in-progress | done | cancelled
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
# BacklogItem

**Template status:** Active
**Schema version:** 2.0
**Use this when:** An item in the execution queue — work that is accepted, estimated, and ready (or nearly ready) to be picked up in the next sprint.
**Do not use this when:** Strategic horizon items still under discussion (use ROADMAP_ITEM_TEMPLATE.md). Incoming requests not yet triaged (use REQUEST_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/backlog-items/`
**Related templates:** ROADMAP_ITEM_TEMPLATE.md, USER_STORY_OBJECT_TEMPLATE.md, EPIC_OBJECT_TEMPLATE.md

---


# Backlog Item: [BLI-NNN]

## Core Fields
```
backlog_item_id:  BLI-NNN
title:            [Short descriptive title]
status:           [backlog | ready | in-progress | done | cancelled]
priority:         [critical | high | medium | low]
source_type:      [request | idea | bug | tech-debt | internal | client]
source_id:        [REQ-XXXX or other source object ID]
parent_batch_id:  [BATCH-YYYYMMDD-NNN if from a batch, else N/A]
```

## Request Summary
```
raw_user_input:   [Verbatim from original input if available]
extracted_request: [Cleaned, specific statement of what is needed]
classification:   [feature | bug | enhancement | tech-debt | research | ops | other]
lane:             [product | engineering | design | data | ops | support]
```

## Context
```
business_goal:    [Why this matters]
target_user:      [Who benefits]
expected_value:   [What outcome is expected]
effort_estimate:  [XS | S | M | L | XL | unknown]
```

## Readiness
```
blocking_reasons: [Why this is in backlog, not active]
ready_criteria:   [What needs to be true before this can move to active]
target_quarter:   [Q1-YYYY | TBD]
```

## Linked Objects
```
owner:            [Name]
module_id:        [MOD-NNN or N/A]
feature_id:       [FEA-NNN or N/A]
required_artifacts: []
next_action:      [What happens when this moves to ready]
```

## Audit
```
created_date:    YYYY-MM-DD
created_by:      [Human | AI]
last_updated:    YYYY-MM-DD
```

---
id: ""                               # e.g. RMD-001
object_type: RoadmapDecision
title: ""
status: ""                           # draft | final | superseded
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
# RoadmapDecision

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Roadmap Decision object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/roadmap-decisions/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Roadmap Decision: [RMD-NNN]

## Core Fields
```
decision_id:         RMD-NNN
parent_roadmap_item: RMI-NNN
title:               [Short decision title]
status:              [pending | decided | implemented | reversed]
decided_by:          [Name / role]
decision_date:       YYYY-MM-DD
```

## Decision
```
outcome:             [proceed | defer | reject | needs-more-discovery]
selected_option:     [RMO-NNN | N/A — no options were compared]
summary:             |
  [What was decided and why]
```

## Rationale
```
key_factors:
  - 
trade_offs_accepted:
  - 
rejected_alternatives:
  - [RMO-NNN] — [why rejected in one line]
```

## Next Steps
```
next_action:         [create-feature | create-request | create-discovery | defer | archive]
resulting_object:    [FEA-NNN | REQ-NNN | N/A]
target_quarter:      [Q1-YYYY | TBD]
owner:               [Name]
```

## Reversal
```
reversed:            [yes | no]
reversal_date:       YYYY-MM-DD
reversal_reason:     [If reversed, why]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

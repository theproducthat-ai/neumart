---
id: ""                               # e.g. OPQ-001
object_type: OpenQuestion
title: ""
status: ""                           # open | answered | parked | obsolete
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
# OpenQuestion

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Open Question object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/open-questions/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Open Question: [OPQ-NNN]

## Core Fields
```
question_id:         OPQ-NNN
title:               [Short title for the question]
status:              [open | answered | parked | obsolete]
question:            |
  [The exact question that needs to be answered]
raised_by:           [Name / role]
raised_date:         YYYY-MM-DD
```

## Context
```
why_it_matters:      |
  [What decision or work is blocked or constrained by this question?]
raised_at_stage:     [intake | prd | design | development | qa | uat | release]
```

## Linked Object
```
parent_object_type:  [prd | feature | story | roadmap-item | design | release]
parent_object_id:    [Object ID]
```

## Urgency
```
blocks_progress:     [yes | no | partial]
answer_needed_by:    [YYYY-MM-DD or milestone]
owner:               [Name responsible for answering]
```

## Answer
```
answered_by:         [Name]
answered_date:       YYYY-MM-DD
answer:              |
  [Full answer, decision, or resolution]
resulting_action:    [update-object | create-change-note | no-change | defer]
resulting_object:    [CHN-NNN | DSN-NNN | N/A]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

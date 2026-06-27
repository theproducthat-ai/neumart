---
id: ""                               # e.g. BATCH-20260624-001
object_type: IntakeBatch
title: ""
status: ""                           # pending | in-progress | complete
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
# IntakeBatch

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Intake Batch object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/intake-batchs/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Intake Batch: [BATCH-YYYYMMDD-NNN]

## Core Fields
```
batch_id:         BATCH-YYYYMMDD-NNN
created_date:     YYYY-MM-DD
raw_input:        |
  [Full verbatim user input that contained multiple requests]
submitted_by:     [Person or channel that submitted the input]
intake_source:    [chat | email | meeting | slack | support | other]
```

## Decomposition
```
request_count:    [Number of distinct requests detected]
decomposition_status: [pending | in-progress | complete]
```

## Child Requests
| # | Request ID | Extracted Request Summary | Type | Status |
|---|-----------|--------------------------|------|--------|
| 1 | REQ-XXXX | | | |
| 2 | REQ-XXXX | | | |

## Unresolved Requests
List any inputs that could not be cleanly mapped to a child request:
-

## Decomposition Notes
[How the batch was split; any ambiguities resolved; assumptions made]

## AI Classification Summary
```
input_type:          [bundled-independent | parent-child | mixed-types | unclear]
clarification_needed: [yes | no]
clarification_question: [If yes, what was asked]
```

## Audit
```
created_by:      [Human | AI]
last_updated:    YYYY-MM-DD
```

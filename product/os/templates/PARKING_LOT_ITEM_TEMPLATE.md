---
id: ""                               # e.g. PLT-001
object_type: ParkingLotItem
title: ""
status: ""                           # parked | backlog | archived
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
# ParkingLotItem

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Parking Lot Item object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/parking-lot-items/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Parking Lot Item: [PLT-NNN]

## Core Fields
```
parking_lot_id:   PLT-NNN
title:            [Short descriptive title]
status:           [parked | backlog | archived]
parked_date:      YYYY-MM-DD
parked_by:        [Name]
source_type:      [request | idea | stakeholder | client | meeting | other]
source_id:        [REQ-XXXX or BATCH-YYYYMMDD-NNN if applicable]
```

## Original Input
```
raw_user_input:   [Verbatim from original input if available]
extracted_idea:   [Cleaned summary of the idea or request]
classification:   [feature | bug | enhancement | research | strategic | unclear]
```

## Why Parked
```
park_reason:      [not-enough-context | too-early | needs-validation | no-owner | out-of-scope | other]
park_notes:       [Brief explanation]
```

## Conditions to Promote
```
promote_trigger:  [What would make this ready to evaluate]
review_date:      [YYYY-MM-DD or periodic]
```

## Linked Objects
```
module_id:        [MOD-NNN or N/A]
linked_requests:  []
linked_features:  []
```

## Audit
```
created_date:    YYYY-MM-DD
created_by:      [Human | AI]
last_reviewed:   YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

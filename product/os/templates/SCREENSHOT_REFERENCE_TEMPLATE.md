---
id: ""                               # e.g. SCT-001
object_type: Screenshot
title: ""
status: ""                           # active | archived
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
# Screenshot

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Screenshot Reference object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/screenshot-references/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Screenshot Reference: [SCT-NNN]

## Core Fields
```
screenshot_id:       SCT-NNN
title:               [Descriptive title, e.g. "Product Listing — empty state bug"]
type:                [bug-evidence | design-reference | competitive-example | uat-evidence | current-state | other]
captured_by:         [Name / role]
captured_date:       YYYY-MM-DD
```

## File Location
```
file_url:            [Direct URL or shared drive link]
file_path:           [Local or repo path if stored in assets]
file_name:           [Original file name]
```

## Context
```
description:         |
  [What does this screenshot show? What is its purpose?]
screen_captured:     [Screen name or route]
device:              [Desktop | Mobile | Tablet | N/A]
viewport:            [e.g. 1440x900, 390x844]
```

## Linked Objects
```
linked_screen:       [SCR-NNN or N/A]
linked_bug:          [BUG-NNN or N/A]
linked_feature:      [FEA-NNN or N/A]
linked_roadmap_item: [RMI-NNN or N/A]
linked_research:     [RSN-NNN or N/A]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
```

---
id: ""                               # e.g. WFR-001
object_type: Wireframe
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
# Wireframe

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Wireframe Reference object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/wireframe-references/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Wireframe Reference: [WFR-NNN]

## Core Fields
```
wireframe_id:        WFR-NNN
title:               [Descriptive title, e.g. "Checkout Flow — low-fi wireframe"]
fidelity:            [low | mid | high]
tool:                [figma | balsamiq | paper-sketch | excalidraw | other]
created_by:          [Name / role]
created_date:        YYYY-MM-DD
```

## Location
```
file_url:            [Figma URL, shared drive link, or image URL]
figma_frame:         [Frame name if in Figma]
file_path:           [Local or repo path if stored as image]
```

## Description
```
summary:             |
  [What screens or flows does this wireframe cover?]
screens_covered:     [List of screen names]
key_decisions:       [Layout or UX decisions visible in this wireframe]
open_questions:      [Unanswered design questions]
```

## Linked Objects
```
linked_feature:      FEA-NNN
linked_prd:          PRD-NNN
linked_screens:      [SCR-NNN, SCR-NNN]
linked_flow_diagram: FLW-NNN
```

## Status
```
status:              [draft | reviewed | superseded-by-figma | archived]
superseded_by:       [FIG-NNN or N/A]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

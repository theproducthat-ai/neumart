---
id: ""                               # e.g. FIG-001
object_type: FigmaLink
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
# FigmaLink

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Figma Link object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/figma-links/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Figma Link: [FIG-NNN]

## Core Fields
```
figma_link_id:       FIG-NNN
title:               [Descriptive title, e.g. "Product Listing Page — v2 Design"]
figma_link:          [Full Figma URL]
figma_page:          [Page name in the Figma file]
figma_frame:         [Frame name or ID, or N/A]
design_status:       [not-started | in-progress | review | approved | implemented | outdated]
```

## Ownership
```
design_owner:        [Name / role]
source_screen:       [SCR-NNN or N/A]
target_screen:       [SCR-NNN if this design is for a new screen]
```

## Linked Objects
```
linked_feature:      FEA-NNN
linked_prd:          PRD-NNN
linked_story:        UST-NNN
```

## Design Notes
```
open_design_questions:
  - 
design_decisions_made:
  - 
```

## Handoff
```
handoff_status:      [not-ready | ready | handed-off | implemented]
handoff_date:        YYYY-MM-DD
developer:           [Name]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

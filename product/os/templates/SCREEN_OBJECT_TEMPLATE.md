---
id: ""                               # e.g. SCR-CUS-001
object_type: Screen
title: ""
status: ""                           # active | planned | deprecated
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
# Screen

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Screen object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/screens/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Screen Object: [SCR-NNN]

## Core Fields
```
screen_id:           SCR-NNN
screen_name:         [Human-readable name, e.g. "Product Listing Page"]
module_id:           MOD-NNN
status:              [active | planned | deprecated]
last_updated:        YYYY-MM-DD
```

## Ownership
```
feature_ids:         [FEA-NNN, FEA-NNN]
roles_allowed:       [customer | admin | guest | all]
```

## Location
```
route:               [/path/to/screen, e.g. /products]
file_path:           [Relative path, e.g. neumart/app/(customer)/products/page.tsx]
component_paths:     []
```

## Design References
```
figma_link:          [Figma URL or N/A]
figma_frame:         [Frame name or ID]
screenshot_reference: [ATT-NNN or N/A]
```

## States
```
states:
  - loading:   [How loading state is handled]
  - empty:     [How empty state is handled]
  - error:     [How error state is handled]
  - default:   [Normal rendered state]
```

## Linked Objects
```
related_prds:        []
related_stories:     []
related_bugs:        []
related_releases:    []
related_components:  [UIC-NNN, UIC-NNN]
related_flows:       [FLW-NNN]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

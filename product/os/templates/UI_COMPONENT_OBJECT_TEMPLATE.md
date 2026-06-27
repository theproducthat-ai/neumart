---
id: ""                               # e.g. UIC-001
object_type: UIComponent
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
# UIComponent

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a frontend UI component — a reusable React/HTML component with props, states, and visual variants. Code-level component reference.
**Do not use this when:** Product/system-level architecture components (use COMPONENT_OBJECT_TEMPLATE.md). Full screens (use SCREEN_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/ui-components/`
**Related templates:** COMPONENT_OBJECT_TEMPLATE.md, SCREEN_OBJECT_TEMPLATE.md, FIGMA_BUILD_SPEC_TEMPLATE.md

---


# UI Component Object: [UIC-NNN]

## Core Fields
```
component_id:        UIC-NNN
component_name:      [e.g. ProductCard, CartDrawer, CheckoutSummary]
type:                [page-component | shared-component | ui-primitive | layout | hook]
status:              [active | planned | deprecated]
```

## Location
```
file_path:           [Relative path, e.g. neumart/components/shared/ProductCard.tsx]
exported_as:         [Default | Named — component export style]
```

## Ownership
```
module_id:           MOD-NNN
feature_ids:         [FEA-NNN]
screens_used_in:     [SCR-NNN, SCR-NNN]
```

## Props Interface
```
props_summary:       |
  [Brief description of key props — not a full TypeScript interface]
```

## States Handled
```
handles_loading:     [yes | no]
handles_empty:       [yes | no]
handles_error:       [yes | no]
```

## Design Reference
```
figma_link:          [Figma URL or N/A]
figma_component:     [Figma component name]
```

## Linked Objects
```
related_bugs:        []
related_stories:     []
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

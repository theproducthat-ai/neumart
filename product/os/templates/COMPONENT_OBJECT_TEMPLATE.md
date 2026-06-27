---
id: ""                               # e.g. CMP-0001
object_type: Component
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
# Component

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a product/system-level component — a bounded functional area that can be composed into modules. Think architecture-level component, not a UI widget.
**Do not use this when:** Frontend UI components or React components (use UI_COMPONENT_OBJECT_TEMPLATE.md). Full modules (use MODULE_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/components/`
**Related templates:** UI_COMPONENT_OBJECT_TEMPLATE.md, MODULE_OBJECT_TEMPLATE.md, SUBMODULE_OBJECT_TEMPLATE.md

---


# Component Object Template

**Version**: 2.0  
**Location**: `product/objects/components/CMP-XXXX.md`

---

```yaml
---
id: CMP-XXXX                       # e.g. CMP-0001
name: ""                           # Component name, e.g. "ProductCard"
type: organism                     # atom | molecule | organism | template | system
domain_codes: []                   # Modules this component appears in: [COM, ADM, DEL]
used_in_module_areas: []           # MA-XXX IDs where this component is used
status: active                     # active | deprecated | planned
figma_url: ""                      # Figma component URL (optional)
code_path: ""                      # Path in codebase, e.g. "src/components/ProductCard.tsx"
owner: ""                          # Engineering Lead or Designer
version: "1.0"
created_at: ""
updated_at: ""
---
```

---

## [Component Name]

## Purpose

_One sentence. What does this component do?_

---

## Where It Is Used

| Module Area | Screen | Usage |
|---|---|---|
| MA-COM-PLP | Product Listing | Product grid items |
| MA-COM-ORDHIS | Order History | Order list items |

---

## Props / Interface

_List the key props or parameters this component accepts. Engineers and designers read this before using the component._

| Prop | Type | Required | Description |
|---|---|---|---|
| `[propName]` | `[type]` | Yes/No | [What it controls] |

---

## Variants

_List any visual or behavioral variants._

- Default: [description]
- [Variant name]: [description]

---

## Screen States

- [ ] Loading state
- [ ] Empty / null data state
- [ ] Error state
- [ ] Disabled state
- [ ] Mobile layout (375px)

---

## Accessibility

_Note any specific accessibility requirements or implementations._

---

## Design Link

Figma: [link or "not yet in Figma"]

---

## Code Reference

Path: `[code_path]`

---

## Dependencies

_Other components this component uses._

- CMP-XXXX — [Name]

---

## Notes

_Any usage guidelines, known limitations, or migration notes._

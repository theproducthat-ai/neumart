---
id: ""                               # e.g. MA-COM-PLP
object_type: ModuleArea
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
# ModuleArea

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Module Area object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/module-areas/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Module Area Object Template

**Version**: 2.0  
**Location**: `product/objects/module-areas/MA-[DOMAIN_CODE]-[AREA_CODE].md`

---

```yaml
---
id: MA-[DOMAIN_CODE]-[AREA_CODE]   # e.g. MA-COM-PLP, MA-COM-CHK, MA-ADM-ORD
name: ""                           # Full area name, e.g. "Product Listing"
module_id: MOD-[DOMAIN_CODE]       # Parent module
domain_code: ""                    # COM | ADM | DEL | INV | PAY | USR | RPT
area_code: ""                      # PLP | PDP | CART | CHK | ADDR | FAV | ORD | etc.
object_type: module-area
status: active                     # active | planned | deprecated
owner: ""
version: "1.0"
created_at: ""
updated_at: ""
---
```

---

## [Area Name]

## Purpose

_One sentence. What functional section of the module does this area cover?_

---

## Screens

_List the screens that belong to this module area._

| Screen Name | Route / Path | User Group |
|---|---|---|
| [Screen name] | [/path] | [User type] |

---

## Capabilities in This Area

_List the named capabilities this area provides._

| Capability ID | Capability Name | Maturity |
|---|---|---|
| CAP-XXXX | [Name] | basic \| functional \| advanced |

---

## Features in This Area

_Populated as features are created. Use MODULE_FEATURE_MAP.md for the full list._

| Feature ID | Feature Name | Status |
|---|---|---|
| FEAT-[MODULE]-[AREA]-XXX | [Name] | planned \| in-development \| released |

---

## Active Bugs

_Link to BUG_INDEX.md filtered by this module area._

See: `product/indexes/BUG_INDEX.md` → filter by module_area_id = [this ID]

---

## Open Requests

_Link to REQUEST_INDEX.md filtered by this module area._

See: `product/indexes/REQUEST_INDEX.md` → filter by module_area_id = [this ID]

---

## Notes

_Design conventions, known constraints, or open decisions for this area._

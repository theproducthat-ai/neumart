---
id: ""                               # e.g. MOD-COM
object_type: Module
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
# Module

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Module object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/modules/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Module Object Template

**Version**: 2.0  
**Location**: `product/objects/modules/MOD-[DOMAIN_CODE].md`

---

```yaml
---
id: MOD-[DOMAIN_CODE]              # e.g. MOD-COM, MOD-ADM, MOD-DEL
name: ""                           # Full module name, e.g. "Customer Commerce"
domain_code: ""                    # Short code: COM | ADM | DEL | INV | PAY | USR | RPT
object_type: module
status: active                     # active | planned | deprecated
owner: ""                          # Role, e.g. product_lead
version: "1.0"
created_at: ""                     # YYYY-MM-DD
updated_at: ""                     # YYYY-MM-DD
---
```

---

## [Module Name]

## Purpose

_One paragraph. What does this module do? What problem does it solve for which user group?_

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-[CODE]-[AREA] | [Area name] | [Short description] |

---

## User Groups

- Primary: [Main user type]
- Secondary: [Other user types]

---

## Key Capabilities

_List 5-8 top-level capabilities this module provides._

- [Capability 1]
- [Capability 2]

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-[CODE] | [Why this module depends on it] |

---

## Metrics

_Key metrics that measure this module's health._

- [Metric name] ([MET-XXXX])

---

## Notes

_Any important context, constraints, or open decisions about this module._

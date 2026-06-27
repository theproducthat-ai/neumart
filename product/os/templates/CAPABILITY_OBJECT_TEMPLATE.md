---
id: ""                               # e.g. CAP-0001
object_type: Capability
title: ""
status: ""                           # planned | active | deprecated
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
# Capability

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Capability object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/capabilitys/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Capability Object Template

**Version**: 2.0  
**Location**: `product/objects/capabilities/CAP-XXXX.md`

---

```yaml
---
id: CAP-XXXX                       # e.g. CAP-0001, CAP-0002
name: ""                           # Plain language name, e.g. "Search products by name"
module_id: MOD-[DOMAIN_CODE]       # Parent module
module_area_id: MA-[CODE]-[AREA]   # Parent module area
domain_code: ""                    # COM | ADM | DEL | INV | PAY | USR | RPT
object_type: capability
status: active                     # active | planned | deprecated
maturity: none                     # none | basic | functional | advanced | market-leading
owner: ""
version: "1.0"
created_at: ""
updated_at: ""
---
```

---

## [Capability Name]

## Definition

_One sentence. What can a user do with this capability? Use "user can [verb] [object]" format._

Example: "Customers can search for products by name and see matching results instantly."

---

## User Benefit

_Why does this capability matter? What problem does it solve?_

---

## Current Maturity: [none | basic | functional | advanced | market-leading]

### What "basic" looks like

_Describe the minimum viable version of this capability._

### What "functional" looks like

_Describe the version that meets most user needs._

### What "advanced" looks like

_Describe a version that exceeds typical expectations._

---

## Features That Deliver This Capability

_Populated as features are created and released._

| Feature ID | Feature Name | Maturity Delivered | Status |
|---|---|---|---|
| FEAT-[MODULE]-[AREA]-XXX | [Name] | [basic/functional/advanced] | planned \| released |

---

## Capability Gaps

_What is the gap between current maturity and target? What would need to be built?_

---

## Dependencies

_Other capabilities this one depends on._

- CAP-XXXX — [reason]

---

## Notes

_Any constraints, open questions, or important context._

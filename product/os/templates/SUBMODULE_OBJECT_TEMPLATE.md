---
id: ""                               # e.g. SUBMOD-COM-PLP
object_type: Submodule
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
# Submodule

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Submodule object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/submodules/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Submodule Object Template

**Object type**: `submodule`
**ID format**: `SUBMOD-[MODULE]-[NAME]` (e.g., `SUBMOD-COM-CART`)
**Folder**: `product/objects/submodules/`
**Note**: Use submodule objects when a module has 10+ features or distinct ownership areas that need independent tracking.

---

```yaml
---
id: SUBMOD-[MODULE]-[NAME]
object_type: submodule
parent_module: MOD-[CODE]
module_code: COM | ADM | DEL | INV | PAY | USR | RPT
name: [Submodule Name]
description: [One sentence description]
status: active | planned | deprecated
features_count: 0
owner: [Product Manager]
lead_engineer: [Engineering Lead]
created_date: YYYY-MM-DD
updated_date: YYYY-MM-DD
---
```

# SUBMOD-[ID] — [Submodule Name]

## Summary

One paragraph describing what this submodule covers and why it exists as a distinct sub-area.

---

## Parent Module

**Module:** [MOD-CODE] — [Module Name]
**Module Workspace:** [link to workspace file]

---

## Submodule Scope

What features and capabilities belong in this submodule:

- [Capability 1]
- [Capability 2]

What does NOT belong here (scope boundary):

- [Out of scope 1]

---

## Module Areas Covered

| Area ID | Area Name | Description |
|---|---|---|
| | | |

---

## Features in This Submodule

| FEAT ID | Feature Name | Status | Priority |
|---------|-------------|--------|----------|
| | | | |

---

## User Groups

Who primarily uses the features in this submodule:
- Primary:
- Secondary:

---

## Ownership

| Role | Owner |
|---|---|
| Product | [Name] |
| Engineering | [Name] |
| Design | [Name] |

---

## Linked Indexes

- Filter `product/indexes/FEATURE_INDEX.md` by submodule: [CODE]
- Module workspace: `product/module-workspaces/MOD-[CODE].md`

---

## Audit
```
created:      YYYY-MM-DD
created_by:   [Name / AI]
last_updated: YYYY-MM-DD
```

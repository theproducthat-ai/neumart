---
id: ""                               # e.g. DE-USR-PROFILE-001
object_type: DataEntity
title: ""
status: ""                           # draft | active | deprecated | migrating

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
schema_version: "2.0"
template_version: "1.0"
---

# Data Entity Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a core data object (table, collection, or conceptual entity) that the product owns or depends on. Use for schema documentation and data governance.
**Do not use this when:** You are documenting a UI component or API response shape — use UI_COMPONENT or API_CONTRACT for those.
**Source-of-truth folder:** `product/objects/data-entities/`
**Related templates:** DATA_MIGRATION_OBJECT_TEMPLATE.md, API_CONTRACT_OBJECT_TEMPLATE.md, TECH_DESIGN_OBJECT_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| Entity ID | DE-NNN |
| Entity Name | [e.g. UserProfile, Order, Product] |
| Convex Table | [table name in Convex schema, if applicable] |
| Entity Type | primary \| reference \| junction \| audit \| event |
| Status | draft \| active \| deprecated \| migrating |
| PII | yes \| no |
| Sensitive | yes \| no |

## Schema Definition

```
table_name:     [Convex table name or conceptual name]
store:          [Convex | external-api | local-storage | session]
```

### Fields

| Field Name | Type | Required | Description | Notes |
|---|---|---|---|---|
| _id | Id | Yes | Convex generated ID | System field |
| _creationTime | number | Yes | Convex creation timestamp | System field |
| [field_name] | [type] | [yes/no] | [description] | [constraints or notes] |

### Indexes

| Index Name | Fields | Purpose |
|---|---|---|
| [index_name] | [field1, field2] | [why this index exists] |

## Relationships

| Related Entity | Relationship Type | Via Field | Notes |
|---|---|---|---|
| [EntityName] | one-to-one \| one-to-many \| many-to-many | [field] | [description] |

## Data Governance

```
retention_policy:   [e.g. 7 years | indefinite | delete on account close]
deletion_policy:    [cascade | soft-delete | archive]
backup_policy:      [Convex built-in | manual | none]
pii_fields:         [list any fields containing PII]
encryption:         [at-rest | in-transit | none | Convex-managed]
```

## Validation Rules

| Field | Rule |
|---|---|
| [field_name] | [constraint — e.g. non-empty, positive number, valid enum value] |

## Linked Objects

```
linked_module:          MOD-...
linked_tech_design:     TECH-...
linked_api_contracts:   []
linked_migrations:      []
```

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
schema_last_changed: YYYY-MM-DD
```

# Module → Feature Map

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when features are created, released, or deprecated

---

## Purpose

Maps every feature to its parent module and module area. Use this to answer:
- "Show me all features under Customer Commerce"
- "Show me all features for the Checkout area"
- "Which features does Inventory Management have?"

---

## How to Use

Entries are added here when a feature object is created. The `module_id` and `module_area_id` in the feature's frontmatter drives this map.

For automated generation: run `node product/tools/generate-indexes.js`

---

## Feature Map by Module

### MOD-COM — Customer Commerce

#### MA-COM-PLP — Product Listing

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-PDP — Product Detail

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-CART — Cart

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-CHK — Checkout

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-ADDR — Address Management

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-FAV — Favourites

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

#### MA-COM-ORDHIS — Order History

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/COM/`)_ | — | — | — | — |

---

### MOD-ADM — Admin Console

#### MA-ADM-DASH — Dashboard

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/ADM/`)_ | — | — | — | — |

#### MA-ADM-ORD — Order Management

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/ADM/`)_ | — | — | — | — |

#### MA-ADM-PROD — Product Management

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/ADM/`)_ | — | — | — | — |

---

### MOD-DEL — Delivery Management

#### MA-DEL-TASK — Delivery Task

| Feature ID | Feature Name | Sub-features | Capability | Status |
|---|---|---|---|---|
| _(populate from `objects/features/DEL/`)_ | — | — | — | — |

---

### MOD-INV — Inventory Management

| Feature ID | Area | Feature Name | Status |
|---|---|---|---|
| _(populate from `objects/features/INV/`)_ | — | — | — |

---

### MOD-PAY — Payment Management

| Feature ID | Area | Feature Name | Status |
|---|---|---|---|
| _(populate from `objects/features/PAY/`)_ | — | — | — |

---

### MOD-USR — User Management

| Feature ID | Area | Feature Name | Status |
|---|---|---|---|
| _(populate from `objects/features/USR/`)_ | — | — | — |

---

### MOD-RPT — Reporting

| Feature ID | Area | Feature Name | Status |
|---|---|---|---|
| _(populate from `objects/features/RPT/`)_ | — | — | — |

---

## Related Documents

- [MODULE_INDEX.md](MODULE_INDEX.md)
- [FEATURE_INDEX.md](FEATURE_INDEX.md)
- [FEATURE_SUBFEATURE_MAP.md](FEATURE_SUBFEATURE_MAP.md)
- `product/objects/features/`

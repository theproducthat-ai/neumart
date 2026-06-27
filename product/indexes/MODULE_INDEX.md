# Module Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when a module is added, changed, or deprecated

---

## Module Registry

| Module ID | Name | Domain Code | User Groups | Module Areas | Features | Bugs (Open) | Status |
|---|---|---|---|---|---|---|---|
| MOD-COM | Customer Commerce | COM | Customers | 8 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-ADM | Admin Console | ADM | Admins, Ops | 8 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-DEL | Delivery Management | DEL | Delivery Partners, Admins | 3 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-INV | Inventory Management | INV | Warehouse Staff, Admins | 3 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-PAY | Payment Management | PAY | Customers, Admins | 3 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-USR | User Management | USR | All users | 4 | see FEATURE_INDEX | see BUG_INDEX | active |
| MOD-RPT | Reporting | RPT | Admins, Operations | 4 | see FEATURE_INDEX | see BUG_INDEX | active |

---

## Module Area Summary

### MOD-COM — Customer Commerce

| Area ID | Area Name | Status |
|---|---|---|
| MA-COM-PLP | Product Listing | active |
| MA-COM-PDP | Product Detail | active |
| MA-COM-CART | Cart | active |
| MA-COM-CHK | Checkout | active |
| MA-COM-ADDR | Address Management | active |
| MA-COM-FAV | Favourites | active |
| MA-COM-ORDHIS | Order History | active |
| MA-COM-PROFILE | Customer Profile | active |

### MOD-ADM — Admin Console

| Area ID | Area Name | Status |
|---|---|---|
| MA-ADM-DASH | Dashboard | active |
| MA-ADM-ORD | Order Management | active |
| MA-ADM-PROD | Product Management | active |
| MA-ADM-CAT | Category Management | active |
| MA-ADM-USR | User Management | active |
| MA-ADM-DEL | Delivery Management | active |
| MA-ADM-RPT | Reports | active |
| MA-ADM-SETTINGS | Settings | active |

### MOD-DEL — Delivery Management

| Area ID | Area Name | Status |
|---|---|---|
| MA-DEL-TASK | Delivery Task | active |
| MA-DEL-PARTNER | Partner Management | active |
| MA-DEL-ZONE | Zone Management | active |

### MOD-INV — Inventory Management

| Area ID | Area Name | Status |
|---|---|---|
| MA-INV-STOCK | Stock Control | active |
| MA-INV-CATALOG | Product Catalogue Link | active |
| MA-INV-REORDER | Reorder Management | active |

### MOD-PAY — Payment Management

| Area ID | Area Name | Status |
|---|---|---|
| MA-PAY-GATEWAY | Gateway Integration | active |
| MA-PAY-REFUND | Refunds | active |
| MA-PAY-RECONCILE | Reconciliation | active |

### MOD-USR — User Management

| Area ID | Area Name | Status |
|---|---|---|
| MA-USR-AUTH | Authentication | active |
| MA-USR-PROFILE | Profile | active |
| MA-USR-ADDRESS | Address Book | active |
| MA-USR-ROLES | Role Management | active |

### MOD-RPT — Reporting

| Area ID | Area Name | Status |
|---|---|---|
| MA-RPT-ORDERS | Order Reports | active |
| MA-RPT-INVENTORY | Inventory Reports | active |
| MA-RPT-FINANCE | Financial Reports | active |
| MA-RPT-CUSTOMERS | Customer Reports | active |

---

## How to Query by Module

To find all objects for a given module, filter any index by `module_id` or `domain_code`:

| Want to see | Where to look |
|---|---|
| All features for COM | `product/indexes/FEATURE_INDEX.md` → COM section |
| All open requests for Checkout | `product/indexes/REQUEST_INDEX.md` → filter module_area_id = MA-COM-CHK |
| All open bugs for Admin Console | `product/indexes/BUG_INDEX.md` → filter module = ADM |
| All roadmap items for Delivery | `product/indexes/MODULE_ROADMAP_MAP.md` → DEL section |
| All PRDs for Inventory | `product/indexes/PRD_INDEX.md` → filter module = INV |

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- [MODULE_FEATURE_MAP.md](MODULE_FEATURE_MAP.md)
- [MODULE_ROADMAP_MAP.md](MODULE_ROADMAP_MAP.md)
- [MODULE_DEPENDENCY_MAP.md](MODULE_DEPENDENCY_MAP.md)
- `product/objects/modules/` — Full module definition objects
- `product/objects/module-areas/_README.md` — Module area registry

---
id: MOD-ADM
name: Admin Console
domain_code: ADM
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-ADM — Admin Console

## Purpose

The Admin Console is the internal operations interface used by admins, operations staff, and business managers to manage the platform — products, orders, inventory, users, and reporting.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-ADM-DASH | Dashboard | Admin home with summary metrics and quick actions |
| MA-ADM-ORD | Order Management | Order list, order detail, status updates, bulk actions |
| MA-ADM-PROD | Product Management | Product catalogue — add, edit, activate, deactivate |
| MA-ADM-CAT | Category Management | Product category tree — add, edit, reorder |
| MA-ADM-USR | User Management | Customer accounts, admin accounts, role assignment |
| MA-ADM-DEL | Delivery Management | Delivery task overview, manual assignment |
| MA-ADM-RPT | Reports | Report list, exports, scheduled reports |
| MA-ADM-SETTINGS | Settings | Platform-level configuration (delivery zones, fees, etc.) |

---

## User Groups

- Primary: Admins (platform operators)
- Secondary: Operations Lead, Support Lead (read-only or limited access)

---

## Key Capabilities

- Manage product catalogue and categories
- View and manage all customer orders
- Update order status and add notes
- View and export reports
- Manage user accounts and roles
- Configure platform settings (delivery zones, fees)

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-INV | Admin product management touches inventory |
| MOD-DEL | Delivery task management |
| MOD-PAY | Order financial data |
| MOD-USR | User account management |

---

## Related Indexes

- Filter `product/indexes/FEATURE_INDEX.md` by module: ADM
- `product/indexes/MODULE_FEATURE_MAP.md`

# Module Area Objects

**Object type**: `module-area`  
**ID Format**: `MA-[DOMAIN_CODE]-[AREA_CODE]`  
**Examples**: `MA-COM-PLP`, `MA-COM-CHK`, `MA-ADM-ORD`  
**Owner**: Product Lead  
**Template**: `product/os/templates/MODULE_AREA_OBJECT_TEMPLATE.md`

---

## What Is a Module Area?

A Module Area is a functional section within a module. It groups related screens, capabilities, and features that share a user context or business function.

Examples:
- **Customer Commerce** → Product Listing, Product Detail, Cart, Checkout, Address, Favourites, Order History
- **Admin Console** → Dashboard, Order Management, Product Management, Inventory, Users, Reporting

---

## Position in the Hierarchy

```
Module  (e.g., MOD-COM — Customer Commerce)
  └── Module Area  ← this folder  (e.g., MA-COM-CHK — Checkout)
        └── Capability  (e.g., CAP-0010 — Apply coupon at checkout)
              └── Feature  (e.g., FEAT-COM-CHK-001 — Coupon code input)
```

---

## Module Area Registry

### Customer Commerce (COM)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-COM-PLP | Product Listing | Product list, search results, category browse | active |
| MA-COM-PDP | Product Detail | Product detail page | active |
| MA-COM-CART | Cart | Shopping cart | active |
| MA-COM-CHK | Checkout | Address, delivery, payment steps | active |
| MA-COM-ADDR | Address Management | Address list, add/edit address | active |
| MA-COM-FAV | Favourites | Saved products | active |
| MA-COM-ORDHIS | Order History | Past orders list and detail | active |
| MA-COM-PROFILE | Customer Profile | Account settings | active |

### Admin Console (ADM)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-ADM-DASH | Dashboard | Admin home, summary metrics | active |
| MA-ADM-ORD | Order Management | Order list, order detail, status update | active |
| MA-ADM-PROD | Product Management | Product list, add/edit product | active |
| MA-ADM-CAT | Category Management | Category tree, add/edit category | active |
| MA-ADM-USR | User Management | Customer list, admin list | active |
| MA-ADM-DEL | Delivery Management | Delivery task view, assignment | active |
| MA-ADM-RPT | Reports | Report list, export | active |
| MA-ADM-SETTINGS | Settings | Platform configuration | active |

### Delivery Management (DEL)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-DEL-TASK | Delivery Task | Task list, task detail, complete task | active |
| MA-DEL-PARTNER | Partner Management | Partner list, onboarding | active |
| MA-DEL-ZONE | Zone Management | Delivery zone config | active |

### Inventory Management (INV)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-INV-STOCK | Stock Control | Stock levels, adjustments | active |
| MA-INV-CATALOG | Product Catalogue | Product-inventory link | active |
| MA-INV-REORDER | Reorder Management | Low-stock alerts, reorder rules | active |

### Payment Management (PAY)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-PAY-GATEWAY | Gateway Integration | Razorpay connection, config | active |
| MA-PAY-REFUND | Refunds | Refund initiation, tracking | active |
| MA-PAY-RECONCILE | Reconciliation | Payment reconciliation reports | active |

### User Management (USR)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-USR-AUTH | Authentication | Sign in, sign up, session management | active |
| MA-USR-PROFILE | Profile | User profile, preferences | active |
| MA-USR-ADDRESS | Address Book | Saved delivery addresses | active |
| MA-USR-ROLES | Role Management | Role assignment, permissions | active |

### Reporting (RPT)

| ID | Name | Screens | Status |
|---|---|---|---|
| MA-RPT-ORDERS | Order Reports | Daily orders, GMV, fulfilment | active |
| MA-RPT-INVENTORY | Inventory Reports | Stock levels, movements | active |
| MA-RPT-FINANCE | Financial Reports | Revenue, refunds, reconciliation | active |
| MA-RPT-CUSTOMERS | Customer Reports | Acquisition, retention | active |

---

## Files in This Folder

Each file is a module area definition: `MA-[DOMAIN_CODE]-[AREA_CODE].md`

---

## Related

- `product/objects/modules/` — Parent modules
- `product/objects/capabilities/` — Capabilities within each area
- `product/indexes/MODULE_INDEX.md`
- `product/indexes/MODULE_FEATURE_MAP.md`

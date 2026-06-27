---
id: MOD-INV
name: Inventory Management
domain_code: INV
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-INV — Inventory Management

## Purpose

The Inventory Management module tracks product stock levels, manages stock movements, and controls product availability on the customer-facing storefront.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-INV-STOCK | Stock Control | Current stock levels, stock adjustments, stock history |
| MA-INV-CATALOG | Product Catalogue Link | Links products to inventory, activation/deactivation based on stock |
| MA-INV-REORDER | Reorder Management | Low-stock thresholds, reorder alerts, purchase order tracking |

---

## User Groups

- Primary: Warehouse Staff / Inventory Manager
- Secondary: Admins (overview)

---

## Key Capabilities

- View current stock levels per product
- Adjust stock (receive, return, write-off)
- Set low-stock thresholds and alerts
- Automatically show/hide products based on stock

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Product availability is displayed on PLP/PDP |
| MOD-ADM | Admin views inventory data |

---

## Metrics

- Stock availability rate
- Out-of-stock incidents

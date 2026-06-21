# Sub-module: Stock Control

**Module:** Inventory Management  
**Screens:** SCR-ADM-0010 (`/admin/inventory`), SCR-ADM-0011 (`/admin/inventory/[productId]`)  
**Status:** Built

---

## Purpose

Maintains accurate stock levels for every product. Provides the admin with the ability to view and adjust stock. Ensures stock levels reflect real-world availability to prevent overselling.

---

## How Stock Is Stored

Stock is stored as a single integer field `stock` on the `products` table. It represents the number of units currently available for sale.

All changes to stock go through the `stockMovements` system — the `stock` field is never updated directly without a corresponding movement record.

---

## Features Built

### View Stock Levels

- Admin can view current stock for all products on `/admin/inventory`.
- Products are shown with their stock count and a status badge (In Stock / Low Stock / Out of Stock).
- Filter by status: All, Low Stock, Out of Stock.

### Manual Stock Adjustment

- From `/admin/inventory/[productId]`, the admin can submit a stock adjustment.
- Fields:
  - Delta: positive to add stock, negative to remove.
  - Reason: `restock`, `manual_adjustment`, `correction`, `damage`, `return`.
  - Note: optional free-text for additional context.
- The mutation atomically:
  1. Updates `products.stock` by the delta.
  2. Writes a `stockMovements` record.

### Stock Validation

- The Convex mutation rejects adjustments that would result in `stock < 0`.
- The mutation rejects order placements if any item's stock is insufficient.

### Automatic Stock Reduction at Order Placement

- When a customer places an order, the `orders.place` mutation reduces `products.stock` for each order item.
- A `stockMovements` record is written for each item with `reason: "order"` and `orderId` reference.

---

## Stock Status Thresholds

| Status | Condition |
|---|---|
| Out of Stock | `stock === 0` |
| Low Stock | `stock > 0 && stock <= 5` |
| In Stock | `stock > 5` |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `inventory.adjustStock` | Apply manual delta + write stockMovements record |
| `orders.place` | Reduces stock for each item at order placement |

---

*Last updated: 2026-06-21*

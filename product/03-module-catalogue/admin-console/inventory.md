# Sub-module: Inventory (Admin)

**Module:** Admin Console  
**Screens:** SCR-ADM-0010 (`/admin/inventory`), SCR-ADM-0011 (`/admin/inventory/[productId]`)  
**Status:** Built

---

## Purpose

Gives the admin visibility into current stock levels across all products, the ability to make manual stock adjustments with a logged reason, and a full audit trail of every stock change per product.

---

## Features Built

### Inventory Overview (`/admin/inventory`)

- Lists all products with their current stock level.
- Stock status badge per product: In Stock / Low Stock / Out of Stock.
- Filter by stock status: All, Low Stock, Out of Stock.
- Pre-filter via query param from dashboard (admin can click "low stock" on dashboard and land here filtered).
- Clickable row navigates to the inventory detail for that product.

### Inventory Detail (`/admin/inventory/[productId]`)

- Current stock level for the product.
- Manual stock adjustment form:
  - Delta field (positive = add stock, negative = remove stock)
  - Reason selector: `restock`, `manual_adjustment`, `correction`, `damage`, `return`
  - Optional note field for additional context
- Stock movement history: full audit trail of every change to this product's stock, in reverse chronological order.
  - Columns: date, delta, reason, order reference (if triggered by an order), note, performed by

---

## Features Pending

- **Low-stock auto-alerting:** Currently there is no push notification or email when stock drops below a threshold. Admin must monitor the inventory overview manually.
- **Stock reduction moves to Razorpay webhook (Phase 11):** Currently stock is reduced at order placement. After Phase 11, stock reduction will happen on webhook-verified payment.

---

## Future Candidates

- **Low-stock threshold per product:** Admin configures a threshold; system flags when stock drops below it.
- **Restock request / supplier notification:** Auto-generate a restock order or email when below threshold.
- **Bulk stock import via CSV:** Upload a spreadsheet to update stock for many products at once.
- **Stock export:** Download current inventory as CSV for external use.

---

## Business Rules

| Rule | Detail |
|---|---|
| Every stock change is logged | A `stockMovements` record is written for every delta — no silent changes |
| Stock cannot go negative via manual adjustment | Convex mutation validates resulting stock ≥ 0 |
| Stock is currently reduced at order placement | Will move to webhook-verified payment in Phase 11 |
| Admin only | All inventory mutations are guarded by `assertAdmin` |

---

## Stock Status Thresholds

| Status | Condition |
|---|---|
| Out of Stock | `stock === 0` |
| Low Stock | `stock > 0 && stock <= 5` |
| In Stock | `stock > 5` |

*Low-stock threshold (currently hardcoded at 5) — configurable per product is a future candidate.*

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `products.listWithStock` | All products with current stock for inventory overview |
| `products.getById` | Single product for inventory detail header |
| `stockMovements.listByProduct` | Full movement history for a single product |

---

## Convex Mutations Used

| Mutation | Purpose |
|---|---|
| `inventory.adjustStock` | Apply a delta to a product's stock and write a `stockMovements` record |

---

*Last updated: 2026-06-21*

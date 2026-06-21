# Sub-module: Stock Movements

**Module:** Inventory Management  
**Screen:** SCR-ADM-0011 (`/admin/inventory/[productId]`) — movement history panel  
**Status:** Built

---

## Purpose

Every change to a product's stock level — whether from an order, a manual adjustment, or a correction — is recorded as a `stockMovements` entry. This provides a complete, immutable audit trail for inventory accountability.

---

## Features Built

### Automatic Movement Recording

A `stockMovements` record is written whenever stock changes:

| Trigger | Reason Written | Notes |
|---|---|---|
| Customer places an order | `"order"` | `orderId` is recorded; delta is negative |
| Admin manual adjustment | `"manual_adjustment"`, `"restock"`, `"correction"`, `"damage"`, `"return"` | Admin selects reason; optional note |
| Product created with initial stock | `"restock"` | Written at product creation |

### View Movement History

- Available on `/admin/inventory/[productId]`.
- Displays all movements for a single product in reverse chronological order.
- Columns: date/time, delta (+ or −), reason, order reference (if triggered by an order), note, performed by (admin Clerk ID for manual adjustments).

### Movement Immutability

- Stock movement records are never deleted or edited.
- If a mistake was made, a correcting delta is added as a new movement with `reason: "correction"` and a note.

---

## Convex Table: `stockMovements`

| Field | Type | Notes |
|---|---|---|
| `productId` | Id<"products"> | Product affected |
| `delta` | number | Positive = stock added; negative = stock removed |
| `reason` | string | One of: `"order"`, `"manual_adjustment"`, `"restock"`, `"correction"`, `"damage"`, `"return"` |
| `orderId` | Id<"orders"> (optional) | Set when `reason === "order"` |
| `note` | string (optional) | Admin note |
| `performedBy` | string (optional) | Clerk user ID of admin who made the change |
| `createdAt` | number | Unix timestamp |

---

## Future Candidates

- **Export stock movements as CSV** — for accounting or external reporting
- **Filter movements by reason or date range**
- **Movement summary per product** — net stock in, net stock out over a period

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `stockMovements.listByProduct` | Fetch all movements for a product in reverse chronological order |

---

*Last updated: 2026-06-21*

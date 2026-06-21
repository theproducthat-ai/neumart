# Sub-module: Low-stock Management

**Module:** Inventory Management  
**Screen:** SCR-ADM-0010 (`/admin/inventory`) — pre-filtered view  
**Status:** Partial — filter built; auto-alert not built

---

## Purpose

Surfaces products that are running low on stock so the admin can take action (restock, hide from storefront, contact supplier) before they run out entirely.

---

## What Is Built

### Stock Status Filter

- The inventory overview at `/admin/inventory` supports three filter states: All, Low Stock, Out of Stock.
- Dashboard quick-link navigates to `/admin/inventory?status=low` or `/admin/inventory?status=out` to pre-filter.
- Filter is applied client-side from the Convex query result — no separate endpoint.

### Stock Status Thresholds (current, hardcoded)

| Status | Condition |
|---|---|
| Out of Stock | `stock === 0` |
| Low Stock | `stock > 0 && stock <= 5` |
| In Stock | `stock > 5` |

---

## What Is NOT Built

### Auto-alerting

- There is no automatic notification when a product drops into Low Stock or Out of Stock.
- The admin must periodically check the inventory page manually.
- This is a known gap — acceptable for MVP, but a future candidate to address.

---

## Future Candidates

### Per-product Low-stock Threshold

- Different products have different velocity. A threshold of 5 may be fine for a slow-moving product but dangerously low for a top-selling one.
- Future: admin configures a `lowStockThreshold` per product (stored on the `products` table).
- The system evaluates each product against its own threshold.

### Automated Low-stock Alert

- When stock drops to or below threshold, trigger an alert:
  - Option 1: Admin email via a notification service (e.g. Resend, SendGrid).
  - Option 2: In-app admin notification panel.
  - Option 3: WhatsApp message to the store owner.
- Alert should fire once per threshold crossing — not on every order.

### Restock Workflow

- Admin can mark a product as "restock requested".
- System could auto-generate a restock order email or log.
- Links to supplier contact if stored.

---

*Last updated: 2026-06-21*

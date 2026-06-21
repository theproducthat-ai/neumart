# Module: Inventory Management

## Purpose

Tracks product stock levels across the Nuemart platform. Records every stock change with a full audit trail. Surfaces low-stock and out-of-stock situations so the admin can act.

---

## Status

**Built** — Stock control and stock movement audit trail are live. Low-stock alerting exists as a filter only (no auto-notification).

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Stock Control | `stock-control.md` | Built |
| Stock Movements | `stock-movements.md` | Built |
| Low-stock Management | `low-stock-management.md` | Partial — filter built; auto-alert not built |

---

## Built Features (Summary)

- Current stock level tracked per product in the `products` table (`stock` field)
- Stock reduced automatically on order placement
- Manual stock adjustments via admin with logged reason and note
- Complete `stockMovements` audit trail for every stock change
- Admin inventory overview with stock status filter
- Admin inventory detail with stock movement history per product

---

## Pending Features

- **Stock deduction on webhook-verified payment (Phase 11):** Currently stock is reduced at order placement (Pay Later model). After Razorpay is integrated, the correct trigger is the Razorpay webhook — not order placement.

---

## Future Candidates

- Low-stock threshold configuration per product
- Automated low-stock alert (email or push notification)
- Restock workflow / supplier contact
- Bulk stock import via CSV
- Stock reservation on cart add (to prevent over-selling in high-concurrency scenarios)

---

## Related Modules

| Module | Relationship |
|---|---|
| Customer Commerce | Order placement triggers stock deduction |
| Admin Console | Inventory screens live in admin; manual adjustments go through admin |
| Payment Management | Phase 11 will move stock deduction to webhook trigger |
| Reporting & Analytics | Stock movement data feeds inventory reports |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Stock reduced at order placement, not payment | Pay Later orders that are cancelled leave stock reduced until manually corrected | Admin can manually adjust stock back via inventory detail |
| No auto-alert for low stock | Admin must monitor the inventory page manually | Document as known gap; auto-alert is a future candidate |

---

*Last updated: 2026-06-21*

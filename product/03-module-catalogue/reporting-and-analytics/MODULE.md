# Module: Reporting & Analytics

## Purpose

Provides the store operator with visibility into business performance — orders, revenue, inventory, and customer behaviour. Currently limited to basic dashboard statistics; richer reporting is a future candidate.

---

## Status

**Partial** — Basic dashboard stats only. No dedicated reporting screens. Full reporting depends on sufficient order volume and other modules (Razorpay for revenue, Coupons for coupon reports, Delivery for delivery metrics).

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Order Reports | `order-reports.md` | Future Candidate — basic stats only |
| Inventory Reports | `inventory-reports.md` | Future Candidate — stock movement view only |
| Coupon Reports | `coupon-reports.md` | Future Candidate — depends on Coupons module |

---

## Built Features (Summary)

- Admin dashboard: order counts by status
- Admin dashboard: low-stock and out-of-stock product counts
- Admin dashboard: quick-link to inventory page pre-filtered to low stock
- Stock movement history per product (in Inventory sub-module — not a reporting screen)

---

## Pending Features

- Revenue summary on dashboard (post Phase 11 — no verified revenue data until Razorpay)

---

## Future Candidates

- Dedicated order reporting screen (revenue trend, orders by day/week/month)
- Inventory report (stock movement export, restock frequency analysis)
- Coupon usage report (depends on Coupons module)
- Delivery performance report (depends on Delivery Management)
- Customer analytics (new vs. returning, order frequency, average order value)

---

## Related Modules

| Module | Relationship |
|---|---|
| Admin Console | Dashboard stats live in admin console |
| Customer Commerce | Order data is the primary source for reporting |
| Inventory Management | Stock movement data feeds inventory reports |
| Payment Management | Razorpay payment data needed for revenue reporting |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Revenue reporting blocked until Razorpay | Cannot show verified revenue until Phase 11 | Show order count and Pay Later order totals as a proxy |
| Coupon reports blocked until Coupons module | No coupon data to report | Coupon reports should launch alongside the Coupons module |
| Low order volume makes analytics misleading | Charts and trends are not meaningful at low volume | Defer analytics dashboards until volume is sufficient |

---

*Last updated: 2026-06-21*

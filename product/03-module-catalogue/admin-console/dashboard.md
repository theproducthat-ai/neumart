# Sub-module: Dashboard

**Module:** Admin Console  
**Screen:** SCR-ADM-0001 — `/admin`  
**Status:** Built

---

## Purpose

The admin's home screen. Provides an at-a-glance view of the store's operational health — order volumes, inventory alerts, and quick navigation to key management areas.

---

## Features Built

### Order Stats

- Total orders count
- Orders by status: pending, confirmed, processing, delivered, cancelled
- Recent orders list (last N orders) with quick-link to order detail

### Inventory Summary

- Count of products currently low on stock (e.g. stock ≤ 5)
- Count of products currently out of stock (stock = 0)
- Quick-link to inventory page pre-filtered to low or out-of-stock view (via query param)

### Navigation Links

- Links to all major admin sections: Categories, Products, Orders, Inventory

---

## Features Pending

- **Revenue summary:** Total revenue from paid orders (post Razorpay Phase 11 — currently no verified payments)
- **Today's orders / this week's orders:** Time-scoped order counts
- **New customer count:** How many new users registered in the period

---

## Future Candidates

- **Admin alerts / notification panel:** Low stock alerts, new order notifications
- **Sales trend chart:** Orders per day over the past 30 days
- **Top-selling products:** Ranked by quantity sold

---

## Convex Queries Used

| Query | Purpose |
|---|---|
| `orders.getStats` | Order counts by status |
| `orders.listRecent` | Last N orders for the recent orders panel |
| `products.getInventoryStats` | Low-stock and out-of-stock counts |

---

*Last updated: 2026-06-21*

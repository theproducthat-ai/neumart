# Sub-module: Order Reports

**Module:** Reporting & Analytics  
**Status:** Future Candidate — basic dashboard stats only today

---

## Purpose

Gives the store operator visibility into order volumes, revenue, and fulfilment performance over time.

---

## What Exists Today

- Admin dashboard shows:
  - Total order count
  - Orders by status (pending, confirmed, processing, delivered, cancelled)
  - Recent orders list

These are live counts, not historical charts. There is no date-range filtering or export.

---

## Intended Future Behaviour

### Revenue Summary

- Total revenue from paid orders (requires Razorpay — post Phase 11)
- Revenue by period: today, this week, this month, custom range
- Average order value

### Order Volume

- Orders per day / week / month — trend chart
- Orders by status breakdown over time

### Top Products

- Products ranked by units sold
- Products ranked by revenue contribution

### Fulfilment Performance

- Average time from order placement to `"delivered"` status
- Orders delivered on time vs. delayed (requires delivery tracking data or manual status timestamps)

### Export

- Download order report as CSV for a selected date range

---

## Pre-requisites to Build

1. Razorpay live — verified revenue data available.
2. Sufficient order volume for trends to be meaningful.
3. Formal PRD approved.
4. New Convex queries for aggregated reporting (current queries return full record lists, not aggregates).

---

*Last updated: 2026-06-21*

# Sub-module: Inventory Reports

**Module:** Reporting & Analytics  
**Status:** Future Candidate — stock movement history view exists, but no dedicated reporting

---

## Purpose

Helps the store operator understand stock movement patterns, identify fast-moving and slow-moving products, and plan restocking.

---

## What Exists Today

- Per-product stock movement history on `/admin/inventory/[productId]`
- Current stock levels with Low Stock / Out of Stock filter on `/admin/inventory`

There is no cross-product inventory report, no export, and no trend view.

---

## Intended Future Behaviour

### Stock Movement Summary

- Total stock in (restocked) vs. stock out (sold) per product over a date range
- Net stock change per product over a period

### Fast-moving / Slow-moving Products

- Products ranked by units sold (derived from `stockMovements` with `reason: "order"`) over a period
- Products that haven't moved in X days (potential dead stock)

### Restock Frequency

- How often each product needs to be restocked
- Average days between restocks

### Stock Movement Export

- Download stock movement log as CSV for a product or all products over a date range

### Low-stock History

- When did each product first reach Low Stock threshold?
- How long did it stay out of stock before restocking?

---

## Pre-requisites to Build

1. Sufficient stock movement data (enough orders and adjustments to make reports meaningful).
2. Formal PRD approved.
3. New Convex aggregate queries for cross-product reporting.

---

*Last updated: 2026-06-21*

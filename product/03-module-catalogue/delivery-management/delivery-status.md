# Sub-module: Delivery Status

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Provides real-time delivery status visibility to both the admin and the customer. The delivery person updates status as the delivery progresses; the customer sees the current state on their order detail page.

---

## Intended Behaviour

### Status Values

| Status | Who Sets It | Trigger |
|---|---|---|
| `unassigned` | System | Order marked Ready for Dispatch but no delivery person assigned |
| `assigned` | Admin / Delivery Manager | Delivery person assigned to the task |
| `picked_up` | Delivery Person | Delivery person confirms they have collected the order |
| `in_transit` | Delivery Person | Optional — delivery person marks themselves in transit |
| `delivered` | Delivery Person | Delivery confirmed; proof of delivery captured |
| `failed` | Delivery Person | Delivery attempt failed |

### Delivery Person Interface

- The delivery person needs a simple, mobile-friendly interface to:
  - See their assigned orders for the day.
  - Update delivery status (Picked Up, In Transit, Delivered, Failed).
  - Upload proof of delivery.
- This may be a dedicated mobile view within the admin console or a separate lightweight app (PRD decision).

### Customer-facing Status

- Customer order detail (`/orders/[id]`) shows the current delivery status from `deliveryTasks`.
- Customer sees: assigned, picked up, in transit, delivered — in a readable format.
- No map or GPS tracking in the initial build.

### Admin Visibility

- Admin sees delivery status on the order detail screen.
- Admin can view all orders grouped by delivery status.

---

## Convex Entity Required

`deliveryTasks.status` field — see `DATA_ENTITY_MAP.md`.

---

## Real-time Updates

Convex real-time reactivity means status changes by the delivery person are instantly reflected on the customer's order detail page without a page refresh.

---

## Pre-requisites to Build

1. Module evaluation approved.
2. Delivery Lifecycle and Assignment sub-modules designed.
3. Decision on delivery person interface: admin console mobile view vs. separate app.

---

*Last updated: 2026-06-21*

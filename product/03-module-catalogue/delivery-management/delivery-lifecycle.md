# Sub-module: Delivery Lifecycle

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Defines and manages the end-to-end status progression of an order through the delivery process, from the point the order is ready to dispatch through to final delivery confirmation.

---

## Intended Status Lifecycle

```
Order Placed
    │
    ▼
Ready for Dispatch   ← Admin marks order as ready
    │
    ▼
Assigned             ← Delivery person assigned to order
    │
    ▼
Picked Up            ← Delivery person confirms pickup
    │
    ▼
In Transit           ← Optional intermediate status
    │
    ▼
Delivered            ← Proof of delivery captured
    │
    OR
    ▼
Failed Delivery      ← Delivery attempt failed (see Delivery Exceptions)
    │
    ▼
Reattempt / Return
```

---

## Intended Behaviour

### Status Transitions

- Admin can move a delivery task to "Ready for Dispatch" from the order detail screen.
- Admin or Delivery Manager assigns a delivery person, moving the task to "Assigned".
- Delivery person marks "Picked Up" from their interface.
- Delivery person marks "Delivered" and uploads proof (photo or signature).
- Failed deliveries enter the exceptions flow.

### Customer Visibility

- Customer order detail page shows delivery status from the `deliveryTasks` table.
- Customer sees the delivery person's name (optional) and current status.
- No ETA calculation in the initial build — status only.

### Relationship to Order Status

- Delivery task status is separate from order status.
- When delivery is confirmed, admin or the system updates order status to `"delivered"`.

---

## Convex Entity Required

`deliveryTasks` table — see `DATA_ENTITY_MAP.md`.

---

## Pre-requisites to Build

1. Module evaluation approved in `MODULE_EVALUATION_BOARD.md`.
2. Formal PRD approved.
3. `deliveryPersons` and `deliveryTasks` Convex tables created.
4. Delivery assignment sub-module built.

---

*Last updated: 2026-06-21*

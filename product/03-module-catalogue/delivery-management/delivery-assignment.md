# Sub-module: Delivery Assignment

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Allows the admin or Delivery Manager to assign a delivery person to each order that is ready for dispatch.

---

## Intended Behaviour

### Delivery Person Management

- Admin maintains a list of active delivery persons (name, phone, active status) in Convex.
- Delivery persons are created and managed via an admin screen (not a self-serve flow in the initial build).

### Assignment Flow

1. Admin views orders that are "Ready for Dispatch" in the delivery queue.
2. Admin selects a delivery person from a dropdown for each order.
3. The system creates or updates a `deliveryTasks` record with:
   - `orderId`
   - `deliveryPersonId`
   - `status: "assigned"`
   - `assignedAt` timestamp
4. Delivery person is notified (via future notification system — not in initial build).

### Unassigned Queue

- Orders ready for dispatch but not yet assigned appear in a dedicated queue.
- Admin can see at a glance which orders are waiting for assignment.

### Reassignment

- Admin can reassign an order if the original delivery person is unavailable.
- Previous assignment is overwritten (or logged as a history of assignments, depending on PRD decision).

---

## Convex Entities Required

- `deliveryPersons` — see `DATA_ENTITY_MAP.md`
- `deliveryTasks` — see `DATA_ENTITY_MAP.md`

---

## Admin Screens Required (when built)

| Screen | Route | Status |
|---|---|---|
| Delivery queue | `/admin/delivery` | Proposed |
| Delivery task detail | `/admin/delivery/[id]` | Proposed |
| Delivery person management | `/admin/delivery/persons` | Proposed |

*Assign Screen IDs from MASTER_REGISTRY.md when these move to Planned.*

---

## Pre-requisites to Build

1. Module evaluation approved.
2. Delivery Lifecycle sub-module designed.
3. `deliveryPersons` and `deliveryTasks` Convex schema created.

---

*Last updated: 2026-06-21*

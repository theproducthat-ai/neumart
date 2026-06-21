# Module: Delivery Management

## Purpose

Manages the last-mile delivery lifecycle for Nuemart orders — assigning delivery persons to orders, tracking delivery status in real time, capturing proof of delivery, and handling delivery exceptions.

---

## Status

**Candidate — Not Built.**

Fulfilment is currently manual. This module has been identified as a candidate for a future phase but has not been formally evaluated or committed to the roadmap.

**Before any work begins, this module must:**

1. Pass a formal evaluation in `MODULE_EVALUATION_BOARD.md`.
2. Receive an approved PRD.
3. Be added to the roadmap in `PRODUCT_ROADMAP.md`.

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Delivery Lifecycle | `delivery-lifecycle.md` | Candidate — not built |
| Delivery Assignment | `delivery-assignment.md` | Candidate — not built |
| Delivery Status | `delivery-status.md` | Candidate — not built |
| Proof of Delivery | `proof-of-delivery.md` | Candidate — not built |
| Delivery Exceptions | `delivery-exceptions.md` | Candidate — not built |
| Delivery Reports | `delivery-reports.md` | Candidate — not built |

---

## Why This Module Is a Candidate

| Consideration | Detail |
|---|---|
| **Current fulfilment is manual** | The store owner currently handles delivery personally. There is no delivery person management need yet. |
| **Significant build complexity** | New Convex tables (deliveryPersons, deliveryTasks), new admin screens, potentially a mobile interface for delivery persons. |
| **Unclear ROI at current order volume** | Tracking and reporting only adds value at meaningful order volumes. |
| **Customer expectation not yet set** | Customers have not been promised delivery tracking — it is not a stated gap today. |

---

## Potential Value (When Evaluated)

- Admin visibility into where each order is in the delivery process.
- Customer confidence through real-time delivery status.
- Accountability for delivery persons via proof of delivery.
- Exception handling reduces unresolved delivery failures.
- Delivery performance data enables operational improvement.

---

## Convex Entities Required (not yet in schema)

- `deliveryPersons` — see `DATA_ENTITY_MAP.md`
- `deliveryTasks` — see `DATA_ENTITY_MAP.md`

---

## Related Modules

| Module | Relationship |
|---|---|
| Customer Commerce | Orders to deliver originate from customer order placement |
| Admin Console | Delivery management UI lives within admin |
| User Management | Delivery persons may need their own user accounts or roles |
| Reporting & Analytics | Delivery metrics feed operational reports |

---

## Next Action

Raise a formal module evaluation when:
- Razorpay integration is complete and the platform is processing real orders.
- Manual fulfilment creates a significant operational bottleneck.
- The business decides to offer tracked delivery to customers.

---

*Last updated: 2026-06-21*

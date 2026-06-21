# Sub-module: Delivery Exceptions

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Handles delivery attempts that do not result in a successful delivery — customer not available, incorrect address, damaged goods, access denied. Provides a structured flow for reattempt or return.

---

## Intended Exception Types

| Exception | Description |
|---|---|
| Customer not available | Delivery person arrived but customer was not present |
| Incorrect address | Address provided does not exist or is not findable |
| Access denied | Delivery person could not access the building or location |
| Order damaged | Order damaged in transit — cannot be delivered |
| Customer refused | Customer refused to accept the order |
| Other | Free-text reason |

---

## Intended Behaviour

### Logging an Exception

1. Delivery person marks delivery as "Failed" from their interface.
2. Selects exception type from a dropdown.
3. Optionally adds a note.
4. `deliveryTasks.status` is set to `"failed"`.
5. Exception type and note stored on the task.

### Admin Response Options

| Response | Action |
|---|---|
| Schedule Reattempt | Re-assign the delivery task to the same or different delivery person |
| Mark as Returned | Order is returned to the store; order status updated accordingly |
| Contact Customer | Admin reaches out to the customer to resolve address issue |
| Cancel Order | Order cancelled; refund initiated if Razorpay payment was made |

### Customer Notification

- If notification system exists: customer is notified of failed delivery with the reason.
- Customer may be prompted to update their address.

---

## Convex Entity Required

`deliveryTasks` — additional fields for exception type and note — see `DATA_ENTITY_MAP.md`.

---

## Business Questions to Answer Before Building

- What is the maximum number of delivery attempts before an order is returned?
- Who bears the cost of a failed delivery?
- Is the customer refunded for a failed delivery if they paid online?

---

## Pre-requisites to Build

1. Module evaluation approved.
2. Delivery Status and Delivery Assignment sub-modules built.
3. Business policy defined for failed delivery handling.

---

*Last updated: 2026-06-21*

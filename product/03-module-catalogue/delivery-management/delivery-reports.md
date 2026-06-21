# Sub-module: Delivery Reports

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Provides operational reporting on delivery performance — success rates, delivery times, exception rates, and delivery person performance. Enables continuous improvement of the fulfilment operation.

---

## Current State

No delivery data exists today. Delivery reports can only be built after the Delivery Management module is live and `deliveryTasks` data exists.

---

## Intended Report Areas

### Delivery Success Rate

- Successful deliveries vs. failed delivery attempts as a percentage
- Broken down by time period and by delivery person

### Delivery Time

- Average time from "Assigned" to "Delivered" per delivery person and overall
- Percentage of orders delivered within a target time window (if defined)

### Exception Analysis

- Most common exception types (customer not available, wrong address, etc.)
- Exception rate by area or pincode (are some zones harder to deliver to?)
- Exception rate by delivery person

### Delivery Person Performance

- Orders delivered per person per day
- Average delivery time per person
- Exception rate per person
- Successful delivery rate per person

### Pending / Stuck Deliveries

- Orders assigned but not picked up after X hours
- Orders in transit for longer than expected
- Orders with unresolved exceptions

---

## Pre-requisites to Build

1. Delivery Management module approved and built.
2. Sufficient delivery data for reports to be meaningful.
3. Formal PRD approved.
4. Reporting & Analytics module extended to include delivery data.

---

*Last updated: 2026-06-21*

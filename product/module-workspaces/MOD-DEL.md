# Module Workspace: Delivery Management (MOD-DEL)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-DEL.md](../objects/modules/MOD-DEL.md)

---

## Module Overview
```
module_id:         MOD-DEL
module_name:       Delivery Management
domain_code:       DEL
module_status:     active
description:       Handles the end-to-end lifecycle of delivery operations — from assigning orders
                   to delivery partners to confirming delivery completion.
```

## Ownership
```
business_owner:    Operations Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-DEL-TASK | Delivery Task | Task list, task detail, pick up, mark delivered, proof of delivery |
| MA-DEL-PARTNER | Partner Management | Delivery partner onboarding, profiles, availability |
| MA-DEL-ZONE | Zone Management | Delivery zone configuration, PIN code coverage, fees |

---

## Features

| FEAT ID | Feature Name | Status | Priority | Owner |
|---------|-------------|--------|----------|-------|
| FEATURE-DEL-CORE-DELIVERY-MVP | Delivery Module MVP | In Planning | P1 | Product Lead |

## Subfeatures

| SFE ID | Subfeature Name | Parent Feature | Status |
|--------|----------------|----------------|--------|
| _(none yet)_ | | | |

---

## Active Requests

| REQ ID | Title | Type | Priority | Status |
|--------|-------|------|----------|--------|
| REQ-0001 | Delivery Module MVP | Feature | P1 | In Progress |

---

## PRDs

| PRD ID | Title | Status | Version | Owner |
|--------|-------|--------|---------|-------|
| _(none yet)_ | | | | |

---

## User Stories

| US ID | Title | Feature | Status | Sprint |
|-------|-------|---------|--------|--------|
| _(none yet)_ | | | | |

---

## Open Bugs

| BUG ID | Title | Severity | Status | Assigned To |
|--------|-------|----------|--------|-------------|
| _(none yet)_ | | | | |

---

## Risks

| RISK ID | Title | Severity | Status |
|---------|-------|----------|--------|
| RISK-DEL-SCHEMA-001 | New deliveryTasks + deliveryAgents tables required — schema change | High | Active |
| RISK-DEL-ROLE-001 | New deliveryAgent role required in Clerk and Convex | High | Active |

---

## Linked Releases

| REL ID | Release Name | Status | Date |
|--------|-------------|--------|------|
| _(none yet)_ | | | |

---

## Metrics and KPIs

| Metric/KPI ID | Name | Current Value | Target | Status |
|---------------|------|---------------|--------|--------|
| MET-0020 | Order Fulfilment Rate | — | TBD | Tracking |
| MET-0021 | On-Time Delivery Rate | — | TBD | Tracking |
| MET-0022 | Delivery Partner Utilisation | — | TBD | Tracking |

---

## Roadmap Items

| RMI ID | Title | Status | Target Quarter | Priority Score |
|--------|-------|--------|----------------|----------------|
| _(none yet formalized)_ | | | | |

---

## Support Issues

| Ticket ID | Summary | Status | Linked Feature |
|-----------|---------|--------|----------------|
| _(none yet)_ | | | |

---

## Incidents

| INC ID | Title | Severity | Date | Status |
|--------|-------|----------|------|--------|
| _(none yet)_ | | | | |

---

## Decisions

| DEC ID | Title | Status | Date |
|--------|-------|--------|------|
| DEC-012 | Delivery task must be created atomically inside order mutation (placeOrder) | Accepted | 2026-06-22 |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| — | deliveryTasks (Convex) | Table | Future — required for MVP |
| — | deliveryAgents (Convex) | Table | Future — required for MVP |
| — | assignDeliveryTask | Convex mutation | Future |
| — | updateDeliveryStatus | Convex mutation | Future |
| — | completeDeliveryTask | Convex mutation | Future |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Order data for delivery tasks |
| MOD-ADM | Admin oversight of delivery operations |
| MOD-USR | Delivery partner authentication |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | When is DEL MVP targeted for development sprint? | Product Lead | TBD |
| 2 | How are delivery zones and fees configured at launch? | Operations Lead | TBD |
| 3 | Is proof of delivery (photo/signature) in scope for MVP? | Product Lead | TBD |

---

## Active Work

| Object Type | ID | Title | Status | Owner | Due |
|-------------|-----|-------|--------|-------|-----|
| Feature | FEATURE-DEL-CORE-DELIVERY-MVP | Delivery Module MVP | In Planning | Product Lead | TBD |

---

## Deferred Work

| DEF ID | Title | Source | Target Quarter |
|--------|-------|--------|----------------|
| _(none yet)_ | | | |

---

## Future Ideas (Parking Lot)

| PLT ID | Title | Parked Date | Promote Trigger |
|--------|-------|-------------|-----------------|
| — | Real-time delivery tracking for customers | — | Post-MVP |
| — | Delivery partner mobile app | — | Post-MVP |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```

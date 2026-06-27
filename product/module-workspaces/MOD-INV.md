# Module Workspace: Inventory Management (MOD-INV)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-INV.md](../objects/modules/MOD-INV.md)

---

## Module Overview
```
module_id:         MOD-INV
module_name:       Inventory Management
domain_code:       INV
module_status:     active
description:       Tracks product stock levels, manages stock movements, and controls product
                   availability on the customer-facing storefront.
```

## Ownership
```
business_owner:    Operations Lead / Warehouse Manager
product_owner:     Product Lead
engineering_owner: Engineering Lead
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-INV-STOCK | Stock Control | Current stock levels, stock adjustments, stock history |
| MA-INV-CATALOG | Product Catalogue Link | Links products to inventory, activation/deactivation based on stock |
| MA-INV-REORDER | Reorder Management | Low-stock thresholds, reorder alerts, purchase order tracking |

---

## Features

| FEAT ID | Feature Name | Status | Priority | Owner |
|---------|-------------|--------|----------|-------|
| _(none yet)_ | | | | |

## Subfeatures

| SFE ID | Subfeature Name | Parent Feature | Status |
|--------|----------------|----------------|--------|
| _(none yet)_ | | | |

---

## Active Requests

| REQ ID | Title | Type | Priority | Status |
|--------|-------|------|----------|--------|
| _(none yet)_ | | | | |

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
| _(none yet)_ | | | |

---

## Linked Releases

| REL ID | Release Name | Status | Date |
|--------|-------------|--------|------|
| _(none yet)_ | | | |

---

## Metrics and KPIs

| Metric/KPI ID | Name | Current Value | Target | Status |
|---------------|------|---------------|--------|--------|
| — | Stock availability rate | — | TBD | Tracking |
| — | Out-of-stock incidents | — | TBD | Tracking |

---

## Roadmap Items

| RMI ID | Title | Status | Target Quarter | Priority Score |
|--------|-------|--------|----------------|----------------|
| _(none yet)_ | | | | |

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
| _(none yet)_ | | | |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| — | products (Convex) | Table | Active (shared with COM) |
| — | stockMovements (Convex) | Table | Future |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Product availability is displayed on PLP/PDP |
| MOD-ADM | Admin views inventory data |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | Is inventory management in scope for the next release cycle? | Product Lead | TBD |
| 2 | Should stock adjustments be real-time Convex subscriptions or batch? | Engineering Lead | TBD |

---

## Active Work

| Object Type | ID | Title | Status | Owner | Due |
|-------------|-----|-------|--------|-------|-----|
| _(none yet)_ | | | | | |

---

## Deferred Work

| DEF ID | Title | Source | Target Quarter |
|--------|-------|--------|----------------|
| _(none yet)_ | | | |

---

## Future Ideas (Parking Lot)

| PLT ID | Title | Parked Date | Promote Trigger |
|--------|-------|-------------|-----------------|
| — | Low-stock automated alerts | — | When stock control is live |
| — | Reorder purchase order tracking | — | When supplier integration is defined |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```

# Module Workspace: Reporting (MOD-RPT)

> This is a visibility workspace. All objects listed here are defined in `product/objects/`. Do not duplicate object content here — link to it.

**Module Object:** [product/objects/modules/MOD-RPT.md](../objects/modules/MOD-RPT.md)

---

## Module Overview
```
module_id:         MOD-RPT
module_name:       Reporting
domain_code:       RPT
module_status:     active
description:       Business intelligence and operational reporting for the Neumart platform.
                   Surfaces data from all other modules in structured, exportable formats.
                   Reporting reads — it never creates or duplicates data.
```

## Ownership
```
business_owner:    Operations Lead / Finance Lead
product_owner:     Product Lead
engineering_owner: Engineering Lead
design_owner:      Designer
```

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-RPT-ORDERS | Order Reports | Daily orders, GMV, fulfilment rate, AOV |
| MA-RPT-INVENTORY | Inventory Reports | Stock levels, movements, low-stock products |
| MA-RPT-FINANCE | Financial Reports | Revenue, refunds, settlement reconciliation |
| MA-RPT-CUSTOMERS | Customer Reports | Acquisition, retention, order frequency |

---

## Important: Reporting Reads, Not Creates

> RPT module features should never duplicate data — they read from existing module tables. If required data is not available in existing tables, the correct approach is to instrument it first (see `product/analytics/EVENT_TAXONOMY.md`).

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
| — | Report adoption by Operations users | — | TBD | Tracking |
| — | Export frequency | — | TBD | Tracking |

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
| — | Reporting reads from existing module tables only | Accepted | — |

---

## Designs

| Design ID | Title | Type | Status | Figma Link |
|-----------|-------|------|--------|------------|
| _(none yet)_ | | | | |

---

## APIs and Data Entities

| ID | Name | Type | Status |
|----|------|------|--------|
| _(depends on all modules — RPT reads from COM, ADM, DEL, INV, PAY, USR entities)_ | | | |

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Order and customer data |
| MOD-ADM | Admin operational data |
| MOD-DEL | Delivery metrics |
| MOD-INV | Inventory data |
| MOD-PAY | Financial/payment data |
| MOD-USR | Customer acquisition data |

---

## Open Questions

| # | Question | Owner | Due By |
|---|----------|-------|--------|
| 1 | Which reports are required at launch (Day 1)? | Operations Lead | TBD |
| 2 | CSV export or dashboard UI first? | Product Lead | TBD |
| 3 | Are scheduled reports (daily email) in scope for MVP? | Operations Lead | TBD |

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
| — | Scheduled automated reports via email | — | When operations team requests |
| — | BI dashboard integration (Metabase, etc.) | — | When data volume justifies |

---

## Audit
```
workspace_created:  2026-06-24
last_updated:       2026-06-24
updated_by:         AI (Product OS structural cleanup)
```

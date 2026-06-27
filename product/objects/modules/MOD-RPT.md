---
id: MOD-RPT
name: Reporting
domain_code: RPT
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-RPT — Reporting

## Purpose

The Reporting module provides business intelligence and operational reporting for the Neumart platform. It surfaces data from all other modules in structured, exportable formats for operational decision-making.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-RPT-ORDERS | Order Reports | Daily orders, GMV, fulfilment rate, AOV |
| MA-RPT-INVENTORY | Inventory Reports | Stock levels, movements, low-stock products |
| MA-RPT-FINANCE | Financial Reports | Revenue, refunds, settlement reconciliation |
| MA-RPT-CUSTOMERS | Customer Reports | Acquisition, retention, order frequency |

---

## User Groups

- Primary: Operations Lead, Admins
- Secondary: Finance, Leadership

---

## Key Capabilities

- View aggregated business metrics in the admin console
- Filter reports by date range and dimensions
- Export reports as CSV
- Schedule automated report delivery

---

## Important: Reporting Reads, Not Creates

Reporting features should never duplicate data — they read from existing module tables. If required data is not available in existing tables, the correct approach is to instrument it first (see `product/analytics/EVENT_TAXONOMY.md`).

---

## Module Dependencies

All modules — reporting consumes data from COM, ADM, DEL, INV, PAY, USR.

---

## Metrics

- Report adoption by Operations users
- Export frequency

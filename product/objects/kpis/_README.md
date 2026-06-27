# KPIs (Key Performance Indicators)

**Object type**: `kpi`  
**ID prefix**: `KPI-`  
**ID format**: `KPI-NNNN`  
**Owner**: Product Lead / Business Lead  
**Template**: `product/os/templates/KPI_OBJECT_TEMPLATE.md`

## What Belongs Here

KPI objects — persistent performance indicators that the business tracks regardless of quarterly OKRs. KPIs are always-on measures of company health, distinct from OKR key results which are time-boxed goals.

## When to Create

- Defining core product and business performance indicators
- Setting performance baselines for a new product area
- Onboarding a new investor or board member who needs standard metrics

## Required Relationships

- **Informs**: `okrs/`
- **Measured by**: `metrics/`
- **Visualised in**: `dashboards/`

## Lifecycle / Statuses

`defined` → `active` → `deprecated`

## Required Fields

`id`, `name`, `status`, `definition`, `target`, `current_value`, `data_source`, `frequency`, `owner`, `created_date`

## Example KPIs (ecommerce)

- `KPI-0001` — Monthly Active Customers
- `KPI-0002` — Gross Merchandise Value (GMV)
- `KPI-0003` — Order Fulfilment Rate
- `KPI-0004` — Customer Retention Rate
- `KPI-0005` — Support CSAT Score

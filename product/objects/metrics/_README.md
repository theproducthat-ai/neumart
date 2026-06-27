# Metrics

**Object type**: `metric`  
**ID prefix**: `MET-`  
**ID format**: `MET-NNNN`  
**Owner**: Product Manager / Analytics  
**Template**: `product/os/templates/METRIC_OBJECT_TEMPLATE.md`

## What Belongs Here

Metric objects — definitions of product, business, or operational metrics. Each metric has a clear definition, owner, data source, target, and current value. Metrics are the building blocks of dashboards and measurement plans.

Metric categories:
- **Product metrics**: adoption, retention, engagement, conversion
- **Business metrics**: GMV, revenue, order count, AOV
- **Operational metrics**: order fulfilment rate, delivery success rate
- **Support metrics**: ticket volume, resolution time, CSAT
- **Technical metrics**: uptime, p99 latency, error rate

## When to Create

- Defining success criteria for a feature (every Standard Feature+ needs at least one metric)
- Building a dashboard
- Setting OKR/KPI targets

## Required Relationships

- **Measures**: `features/`, `okrs/`, `kpis/`
- **Populated by**: `analytics-events/`
- **Visualised in**: `dashboards/`
- **Part of**: `measurement-plans/`

## Lifecycle / Statuses

`defined` → `instrumented` → `active` → `deprecated`

## Required Fields

`id`, `name`, `status`, `category`, `definition`, `data_source`, `current_value`, `target_value`, `baseline_value`, `measurement_window`, `feature_ref`, `owner`, `created_date`

## Example IDs

- `MET-0001` — Add-to-cart rate
- `MET-0002` — Checkout completion rate
- `MET-0003` — Average order value

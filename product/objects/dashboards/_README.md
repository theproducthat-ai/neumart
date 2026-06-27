# Dashboards

**Object type**: `dashboard`  
**ID prefix**: `DASH-`  
**ID format**: `DASH-NNNN`  
**Owner**: Product Manager / Analytics  
**Template**: `product/os/templates/DASHBOARD_OBJECT_TEMPLATE.md`

## What Belongs Here

Dashboard objects — records of product and business dashboards with their purpose, metrics, data source, and URL. Every major dashboard should be registered here so stakeholders can find it.

## When to Create

- A new dashboard is built for a feature or business area
- A stakeholder needs a view of product/business metrics
- A release includes new analytics instrumentation

## Required Relationships

- **Displays**: `metrics/`
- **Powers**: `views/` (leadership/stakeholder views)
- **Registered in**: `analytics/DASHBOARD_REGISTER.md`

## Lifecycle / Statuses

`planned` → `building` → `active` → `outdated` → `archived`

## Required Fields

`id`, `title`, `status`, `purpose`, `audience`, `metrics_displayed`, `data_source`, `dashboard_url`, `refresh_frequency`, `owner`, `created_date`

## Example IDs

- `DASH-0001` — Product health dashboard
- `DASH-0002` — Sales and GMV dashboard
- `DASH-0003` — Operations dashboard

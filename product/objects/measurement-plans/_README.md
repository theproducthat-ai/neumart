# Measurement Plans

**Object type**: `measurement-plan`  
**ID prefix**: `MP-`  
**ID format**: `MP-NNNN`  
**Owner**: Product Manager  
**Template**: `product/os/templates/MEASUREMENT_PLAN_TEMPLATE.md`

## What Belongs Here

Measurement plan objects — holistic plans for how a feature or release will be measured. A measurement plan brings together success metrics, guardrail metrics, analytics events, dashboard requirements, and the evaluation timeline.

## When to Create

Required for Standard Feature and above. Should be created before development begins, not after.

## Required Relationships

- **For**: `features/`, `releases/`
- **References**: `metrics/`, `analytics-events/`, `dashboards/`
- **Informs**: post-release review

## Lifecycle / Statuses

`planned` → `instrumented` → `live` → `evaluated` → `completed`

## Required Fields

`id`, `title`, `status`, `feature_ref`, `success_metrics`, `guardrail_metrics`, `analytics_events`, `dashboard_ref`, `baseline_values`, `target_values`, `measurement_window`, `evaluation_date`, `owner`, `created_date`

## Example IDs

- `MP-0001` — Carousel feature measurement plan
- `MP-0002` — Checkout flow measurement plan

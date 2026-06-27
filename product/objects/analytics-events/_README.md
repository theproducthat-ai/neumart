# Analytics Events

**Object type**: `analytics-event`  
**ID prefix**: `EVT-`  
**ID format**: `EVT-[MODULE]-[NAME]` (e.g., EVT-COM-ADD_TO_CART)  
**Owner**: Product Manager / Engineering  
**Template**: `product/os/templates/ANALYTICS_EVENT_TEMPLATE.md`

## What Belongs Here

Analytics event objects — definitions of tracking events that should be fired in the product. Each event has a name, trigger, properties, and the metric(s) it powers.

Events must be documented here before being implemented so that:
- Engineering knows exactly what to instrument
- Analytics knows what data to expect
- There is a searchable registry of all product events

## When to Create

- Before engineering implements tracking for a feature
- When a new user action needs to be measured
- When a dashboard requires new data points

## Required Relationships

- **Powers**: `metrics/`
- **Part of**: `measurement-plans/`
- **For**: `features/`
- **Full taxonomy**: `analytics/EVENT_TAXONOMY.md`

## Lifecycle / Statuses

`defined` → `implemented` → `active` → `deprecated`

## Required Fields

`id`, `event_name`, `status`, `trigger`, `user_role`, `screen`, `properties`, `metrics_powered`, `feature_ref`, `owner`, `created_date`

## Example IDs

- `EVT-COM-ADD_TO_CART` — Customer adds product to cart
- `EVT-COM-CHECKOUT_STARTED` — Customer begins checkout
- `EVT-ADM-PRODUCT_CREATED` — Admin creates a product

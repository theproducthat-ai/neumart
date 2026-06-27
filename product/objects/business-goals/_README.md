# Business Goals

**Object type**: `business-goal`  
**ID prefix**: `BG-`  
**ID format**: `BG-NNNN`  
**Owner**: CEO / Product Lead  
**Template**: `product/os/templates/BUSINESS_GOAL_OBJECT_TEMPLATE.md`

## What Belongs Here

Business goal objects — high-level strategic goals that drive the product and company direction. Longer-horizon than OKRs (6-18 months) and less measurable at the time of setting.

## When to Create

- During annual planning
- When a new strategic direction is set
- When a major market opportunity is identified

## Required Relationships

- **Decomposed into**: `okrs/`, `initiatives/`
- **Tracked in**: `views/LEADERSHIP_VIEW.md`

## Lifecycle / Statuses

`active` → `achieved` | `pivot` | `abandoned`

## Required Fields

`id`, `title`, `status`, `description`, `time_horizon`, `strategic_pillars`, `owner`, `created_date`

## Example IDs

- `BG-0001` — Become the #1 grocery delivery platform in target market
- `BG-0002` — Achieve profitability by FY27

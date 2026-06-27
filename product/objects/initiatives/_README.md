# Initiatives

**Object type**: `initiative`  
**ID prefix**: `INIT-`  
**ID format**: `INIT-NNNN`  
**Owner**: Product Lead  
**Template**: `product/os/templates/INITIATIVE_OBJECT_TEMPLATE.md`

## What Belongs Here

Initiative objects — strategic programmes of work that span multiple features and OKRs. An initiative groups related features under a single strategic bet.

## When to Create

- A business goal requires 3+ features to be built together
- A new product area or module is being established
- A major platform change affects multiple parts of the product

## Required Relationships

- **Part of**: `business-goals/`, `okrs/`
- **Contains**: `features/`, `epics/`
- **Prioritised in**: `portfolio/PRIORITIZATION_MODEL.md`

## Lifecycle / Statuses

`proposed` → `approved` → `active` → `completed` | `paused` | `cancelled`

## Required Fields

`id`, `title`, `status`, `strategic_goal_ref`, `features_in_scope`, `estimated_effort`, `business_value`, `start_date`, `target_completion`, `owner`, `created_date`

## Example IDs

- `INIT-0001` — Customer loyalty programme
- `INIT-0002` — Delivery optimisation initiative

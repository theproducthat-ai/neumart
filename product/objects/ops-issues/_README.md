# Ops Issues

**Object type**: `ops-issue`  
**ID prefix**: `OPS-`  
**ID format**: `OPS-NNNN`  
**Owner**: Operations Lead  
**Template**: `product/os/templates/OPS_ISSUE_OBJECT_TEMPLATE.md`

## What Belongs Here

Operational issues that affect the business's ability to run efficiently using the product. These are issues that operations teams discover — not users or QA — such as data quality problems, process gaps, or operational inefficiencies.

## When to Create

- Operations cannot complete a process using the current product
- Manual workarounds are being used because a product flow is insufficient
- A data quality issue is affecting operations
- A process gap is causing operational errors

## Required Relationships

- **May lead to**: `requests/` (if a product change is needed)
- **May lead to**: `sops/` (if a workaround needs documentation)
- **Relates to**: `features/` (affected area)

## Lifecycle / Statuses

`open` → `in-progress` → `resolved` | `workaround-in-place` | `escalated`

## Required Fields

`id`, `title`, `status`, `impact_on_operations`, `frequency`, `workaround`, `product_change_needed`, `owner`, `created_date`

## Example IDs

- `OPS-0001` — First ops issue
- `OPS-0002` — Second ops issue

## Owner Roles

| Action | Role |
|---|---|
| Creates | Operations Lead |
| Escalates to product | Operations Lead → Product Manager |
| Resolves | Engineering (if product change needed) or Operations |

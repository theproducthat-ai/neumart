# SOPs (Standard Operating Procedures)

**Object type**: `sop`  
**ID prefix**: `SOP-`  
**ID format**: `SOP-NNNN`  
**Owner**: Operations Lead  
**Template**: `product/os/templates/SOP_TEMPLATE.md`

## What Belongs Here

Standard operating procedures — documented repeatable processes that operations, support, or other teams follow. SOPs ensure consistency and reduce errors in routine processes.

## When to Create

- A new operational process is established
- A feature introduces a new operational workflow
- A release introduces a new operational requirement
- An audit or compliance review requires documented procedures

## Required Relationships

- **For**: `features/`, `releases/`
- **Relates to**: `training-materials/`, `support-playbooks/`

## Lifecycle / Statuses

`draft` → `reviewed` → `approved` → `active` → `outdated` → `archived`

## Required Fields

`id`, `title`, `status`, `process`, `trigger`, `steps`, `responsible_role`, `frequency`, `review_date`, `owner`, `created_date`

## Example IDs

- `SOP-0001` — Order management SOP
- `SOP-0002` — Refund processing SOP

## Owner Roles

| Action | Role |
|---|---|
| Creates | Operations Lead or Product Manager |
| Approves | Operations Lead |
| Follows | Operations team |
| Reviews | Operations Lead (quarterly) |

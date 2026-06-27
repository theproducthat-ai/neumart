# Requests

**Object type**: `request`  
**ID prefix**: `REQ-`  
**ID format**: `REQ-NNNN` (e.g., REQ-0009)  
**Owner**: Product Manager  
**Template**: `product/os/templates/REQUEST_OBJECT_TEMPLATE.md`

## What Belongs Here

Every intake of a product need, problem, idea, or ask — regardless of source. A request is the entry point for all product work. It may or may not lead to a feature, bug fix, or other object.

## When to Create

- A stakeholder, client, user, or team member raises a need
- A support ticket reveals a product gap
- An incident reveals a missing capability
- Analytics identify an opportunity
- Leadership or sales requests something new

## Required Relationships

- **Parent**: none (requests are top-level intake)
- **Leads to**: `features/`, `bugs/`, `incidents/`, `decisions/` (after classification)
- **Source**: stakeholder, client, or system

## Lifecycle / Statuses

`intake` → `grilling` → `assessed` → `approved` → `parked` | `rejected` → `in-progress` → `delivered` | `closed`

## Required Fields

`id`, `title`, `status`, `source_type`, `source_owner`, `urgency`, `business_impact`, `created_date`, `owner`

## Example IDs

- `REQ-0009` — next sequential request
- `REQ-0010` — business stakeholder request
- `REQ-0011` — support escalation input

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager or any stakeholder via intake channel |
| Classifies | Product Manager (or AI via `/product-request`) |
| Approves/Rejects | Product Lead |
| Closes | Product Manager |

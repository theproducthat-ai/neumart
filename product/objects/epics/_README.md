# Epics

**Object type**: `epic`  
**ID prefix**: `EPIC-`  
**ID format**: `EPIC-NNNN` (e.g., EPIC-0001)  
**Owner**: Product Manager  
**Template**: `product/os/templates/EPIC_OBJECT_TEMPLATE.md`

## What Belongs Here

An epic is a grouping of related user stories that together deliver a meaningful outcome. Epics are used for sprint planning, capacity allocation, and progress tracking when a feature is large or cross-team.

Use epics when:
- A feature has 6+ user stories
- Delivery spans 2+ sprints
- Multiple team members work on it simultaneously
- Reporting needs a roll-up unit above story level

## When to Create

- At the start of sprint planning for a Standard Feature or larger
- When a feature needs to be broken into phases with separate sprint targets

## Required Relationships

- **Parent**: `features/` (required)
- **Children**: `user-stories/` (required — an epic without stories is empty)
- **Part of**: `releases/`

## Lifecycle / Statuses

`draft` → `active` → `in-progress` → `completed` | `deferred`

## Required Fields

`id`, `title`, `status`, `parent_feature`, `sprint_target`, `owner`, `created_date`

## Example IDs

- `EPIC-0001` — First epic
- `EPIC-0002` — Second epic

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager |
| Owns delivery | Engineering Lead |
| Reports on | Product Lead |

# RCAs (Root Cause Analyses)

**Object type**: `rca`  
**ID prefix**: `RCA-`  
**ID format**: `RCA-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/RCA_TEMPLATE.md`

## What Belongs Here

Root cause analysis documents — post-incident analyses that identify what went wrong, why, and what must change to prevent recurrence. Every resolved P1 or P2 incident requires an RCA.

## When to Create

- Immediately after an incident is resolved (status: `resolved`)
- Any P1 or P2 incident is mandatory
- P3 incidents at Engineering Lead's discretion

## Required Relationships

- **For**: `incidents/` (required — every resolved incident needs an RCA)
- **May create**: `bugs/`, `risks/`, `decisions/`
- **Action items lead to**: `tasks/`, `user-stories/`

## Lifecycle / Statuses

`pending` → `in-progress` → `reviewed` → `completed` | `overdue`

**SLA**: RCA must be completed within 5 business days of incident resolution.

## Required Fields

`id`, `title`, `status`, `incident_ref`, `timeline`, `root_cause`, `contributing_factors`, `impact`, `resolution`, `action_items`, `owner`, `date_completed`

## Example IDs

- `RCA-0001` — First RCA
- `RCA-0002` — Second RCA

## Owner Roles

| Action | Role |
|---|---|
| Facilitates | Engineering Lead |
| Contributes | All responders |
| Reviews | Product Lead |
| Action items | Assigned individuals |

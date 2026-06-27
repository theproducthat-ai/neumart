# Incidents

**Object type**: `incident`  
**ID prefix**: `INC-`  
**ID format**: `INC-NNNN`  
**Owner**: Engineering Lead (response), Support Lead (communication)  
**Template**: `product/os/templates/INCIDENT_OBJECT_TEMPLATE.md`

## What Belongs Here

Production incidents — events that cause unexpected degradation or outage affecting real users. An incident is declared when a severity 1 or 2 event occurs in production. It tracks the response, resolution, and post-incident review.

## When to Create

- Production is down or severely degraded for users
- Payment processing fails
- Data integrity issue is discovered in production
- Security vulnerability is actively exploited
- Critical customer-facing feature is completely unavailable

## Required Relationships

- **Triggers**: `rcas/` (every resolved incident requires an RCA)
- **May trigger**: `bugs/` (if root cause is a code defect)
- **May trigger**: `risks/` (if systemic risk identified)
- **Affects**: `features/`, `releases/`

## Lifecycle / Statuses

`detected` → `investigating` → `mitigated` → `resolved` → `post-mortem-pending` → `closed`

## Required Fields

`id`, `title`, `status`, `severity`, `detected_at`, `affected_users`, `affected_features`, `incident_commander`, `timeline`, `resolution`, `owner`, `created_date`

## Severity Levels

| Severity | Definition | Response SLA |
|---|---|---|
| `P1` | Complete outage or data loss | Immediate — all hands |
| `P2` | Major feature broken, >20% users affected | 30 min |
| `P3` | Partial degradation, workaround exists | 2 hours |
| `P4` | Minor issue, low impact | Next business day |

## Example IDs

- `INC-0001` — First tracked incident
- `INC-0002` — Second incident

## Owner Roles

| Action | Role |
|---|---|
| Declares | Engineering Lead or Support Lead |
| Commands response | Engineering Lead |
| Communicates to users | Support Lead |
| Runs RCA | Engineering Lead + Product Lead |
| Closes | Engineering Lead |

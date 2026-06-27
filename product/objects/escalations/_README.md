# Escalations

**Object type**: `escalation`  
**ID prefix**: `ESC-`  
**ID format**: `ESC-NNNN`  
**Owner**: Product Lead / Support Lead  
**Template**: `product/os/templates/ESCALATION_OBJECT_TEMPLATE.md`

## What Belongs Here

Escalation records — situations that have been raised to a higher authority because they cannot be resolved at the current level. Escalations may originate from support, operations, engineering, or business teams.

## When to Create

- A support ticket cannot be resolved within SLA without product involvement
- A client is threatening churn and requires executive intervention
- A blocker is stopping engineering for more than 24 hours
- A risk has become critical and the mitigation is insufficient

## Required Relationships

- **Escalated from**: `support-tickets/`, `incidents/`, `risks/`
- **Escalated to**: `stakeholders/` (the person receiving the escalation)
- **May create**: `decisions/` (escalation resolution becomes a decision)

## Lifecycle / Statuses

`open` → `in-progress` → `resolved` | `closed-unresolved`

## Required Fields

`id`, `title`, `status`, `escalated_from`, `escalated_to`, `reason`, `urgency`, `business_impact`, `resolution`, `owner`, `created_date`

## Example IDs

- `ESC-0001` — First escalation
- `ESC-0002` — Second escalation

## Owner Roles

| Action | Role |
|---|---|
| Raises | Support Lead, Product Lead, Engineering Lead |
| Handles | Escalation target (per `ESCALATION_MATRIX.md`) |
| Closes | Original raiser + escalation target |

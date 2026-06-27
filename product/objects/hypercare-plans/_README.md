# Hypercare Plans

**Object type**: `hypercare-plan`  
**ID prefix**: `HC-`  
**ID format**: `HC-NNNN`  
**Owner**: Support Lead / Operations Lead  
**Template**: `product/os/templates/HYPERCARE_PLAN_TEMPLATE.md`

## What Belongs Here

Hypercare plan objects — structured plans for the period immediately after a significant release when the team provides elevated monitoring and support. Hypercare ensures rapid response to post-launch issues.

## When to Create

Per `support-ops/HYPERCARE_RULES.md`, required for:
- Any Standard Feature or larger release
- Releases to new user groups
- Releases with client commitment deliveries
- High-risk releases (payments, auth, permissions)

## Required Relationships

- **For**: `releases/`
- **Triggers**: `incidents/` tracking during hypercare period
- **References**: `support-playbooks/`, `known-issues/`

## Lifecycle / Statuses

`planned` → `active` → `completed` | `extended`

## Required Fields

`id`, `title`, `status`, `release_ref`, `hypercare_start`, `hypercare_end`, `monitoring_checklist`, `escalation_path`, `success_criteria`, `owner`, `created_date`

## Hypercare Duration Guidelines

| Release Type | Recommended Hypercare |
|---|---|
| Fast Fix / Small Enhancement | None required |
| Standard Feature | 3-5 business days |
| Strategic Initiative | 1-2 weeks |
| Payments / Auth change | 2 weeks minimum |

## Example IDs

- `HC-0001` — First hypercare plan
- `HC-0002` — Second hypercare plan

# Client Commitments

**Object type**: `client-commitment`  
**ID prefix**: `CC-`  
**ID format**: `CC-NNNN`  
**Owner**: Product Lead / Business team  
**Template**: `product/os/templates/CLIENT_COMMITMENT_OBJECT_TEMPLATE.md`

## What Belongs Here

Formal commitments made to clients about product delivery — dates, features, capabilities, or SLAs that have been promised. Every client commitment must be tracked here so the team can prioritize and honour it.

## When to Create

- A sales deal includes a product feature promise
- A client contract includes a delivery milestone
- Leadership commits to a client on a feature timeline
- A client renewal is contingent on a feature being delivered

## Required Relationships

- **Relates to**: `features/`, `releases/`
- **Client**: `stakeholders/` (client record)
- **May trigger**: `risks/` (if commitment is at risk)
- **Tracked in**: `indexes/CLIENT_COMMITMENT_INDEX.md`

## Lifecycle / Statuses

`active` → `on-track` | `at-risk` | `delivered` | `missed` | `renegotiated`

## Required Fields

`id`, `title`, `status`, `client_ref`, `committed_feature`, `committed_date`, `committed_by`, `evidence`, `current_status`, `owner`, `created_date`

## Example IDs

- `CC-0001` — First client commitment
- `CC-0002` — Second commitment

## Owner Roles

| Action | Role |
|---|---|
| Records | Product Lead or Business team |
| Monitors | Product Lead |
| Escalates at risk | Product Lead → CEO |
| Closes/delivers | Product Manager |

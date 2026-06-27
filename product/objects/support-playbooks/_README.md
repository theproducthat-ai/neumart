# Support Playbooks

**Object type**: `support-playbook`  
**ID prefix**: `SPB-`  
**ID format**: `SPB-NNNN`  
**Owner**: Support Lead  
**Template**: `product/os/templates/SUPPORT_PLAYBOOK_TEMPLATE.md`

## What Belongs Here

Support playbooks — step-by-step guides for handling specific user issues, support scenarios, or product failure modes. Playbooks are authored by product/support and used by the support team to resolve issues without escalation.

## When to Create

- A new feature is released that support will need to handle
- A recurring support issue needs a documented response
- A new error state or failure mode needs a resolution path
- A release handover requires support documentation

## Required Relationships

- **For**: `features/`, `releases/`
- **Relates to**: `known-issues/`, `sops/`
- **Referenced in**: `support-ops/SUPPORT_HANDOVER_RULES.md`

## Lifecycle / Statuses

`draft` → `reviewed` → `active` → `outdated` → `archived`

## Required Fields

`id`, `title`, `status`, `scenario`, `trigger`, `resolution_steps`, `escalation_path`, `feature_ref`, `owner`, `created_date`

## Example IDs

- `SPB-0001` — First support playbook
- `SPB-0002` — Payment failure playbook

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager + Support Lead |
| Uses | Support team |
| Reviews | Support Lead |
| Updates | Support Lead or Product Manager |

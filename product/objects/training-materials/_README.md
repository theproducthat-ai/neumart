# Training Materials

**Object type**: `training-material`  
**ID prefix**: `TRN-`  
**ID format**: `TRN-NNNN`  
**Owner**: Operations Lead / Support Lead  
**Template**: `product/os/templates/TRAINING_PLAN_TEMPLATE.md`

## What Belongs Here

Training material objects — records of training content created for new features, process changes, or onboarding. Includes training guide links, session plans, and completion tracking.

## When to Create

Per `support-ops/HYPERCARE_RULES.md`, training materials are required when:
- A new feature significantly changes how support/ops use the product
- A feature is released to a new user type
- A new admin capability is added that requires training
- Ops/support team head count changes

## Required Relationships

- **For**: `features/`, `releases/`
- **Supports**: `sops/`, `support-playbooks/`

## Lifecycle / Statuses

`planned` → `in-progress` → `ready` → `delivered` → `outdated` → `archived`

## Required Fields

`id`, `title`, `status`, `audience`, `feature_ref`, `content_url`, `delivery_method`, `delivery_date`, `owner`, `created_date`

## Example IDs

- `TRN-0001` — First training material
- `TRN-0002` — Delivery management training

## Owner Roles

| Action | Role |
|---|---|
| Creates | Operations Lead or Support Lead |
| Delivers | Operations Lead |
| Completes | Target team |

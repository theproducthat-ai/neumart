# Feature Flags

**Object type**: `feature-flag`  
**ID prefix**: `FF-`  
**ID format**: `FF-[MODULE]-[NAME]` (e.g., FF-COM-CAROUSEL-V2)  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/FEATURE_FLAG_OBJECT_TEMPLATE.md`

## What Belongs Here

Feature flag objects — records of feature flags used to control rollout, enable A/B testing, or gate new functionality. Every feature flag should have an object so it can be tracked, monitored, and cleaned up.

## When to Create

- A feature needs gradual rollout (% of users)
- A feature needs a kill switch
- An A/B experiment requires flag control
- A feature is built but not yet released

## Required Relationships

- **For**: `features/`, `experiments/`
- **Governed by**: `engineering/FEATURE_FLAG_RULES.md`

## Lifecycle / Statuses

`created` → `enabled` → `rolled-out` → `deprecated` → `removed`

**Flag hygiene rule**: Every flag should have a `scheduled_removal_date`. Old flags must be cleaned up.

## Required Fields

`id`, `name`, `flag_key`, `status`, `feature_ref`, `scope`, `enabled_for`, `rollout_percentage`, `scheduled_removal_date`, `owner`, `created_date`

## Example IDs

- `FF-COM-CAROUSEL-V2` — Carousel v2 feature flag
- `FF-ADM-BULK-EDIT` — Admin bulk edit flag

## Owner Roles

| Action | Role |
|---|---|
| Creates | Engineering Lead |
| Controls rollout | Engineering Lead + Product Manager |
| Removes when done | Engineering Lead |

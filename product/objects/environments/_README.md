# Environments

**Object type**: `environment`  
**ID prefix**: `ENV-`  
**ID format**: `ENV-[NAME]` (e.g., ENV-PROD, ENV-STAGING)  
**Owner**: Engineering Lead  
**Template**: (use free-form based on this README)

## What Belongs Here

Environment registry — records of each deployment environment (development, staging, production, etc.) including configuration, access, and current state.

## When to Create

- A new environment is set up
- Environment configuration changes significantly

## Standard Environments

- `ENV-LOCAL` — local development
- `ENV-DEV` — shared development/integration
- `ENV-STAGING` — pre-production / QA environment
- `ENV-PROD` — production

## Lifecycle / Statuses

`active` → `deprecated` | `archived`

## Required Fields

`id`, `name`, `type`, `url`, `database`, `current_version`, `access_control`, `owner`, `last_updated`

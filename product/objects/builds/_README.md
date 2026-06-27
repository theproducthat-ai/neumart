# Builds

**Object type**: `build`  
**ID prefix**: `BUILD-`  
**ID format**: `BUILD-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/BUILD_OBJECT_TEMPLATE.md`

## What Belongs Here

Build objects — records of specific build artefacts deployed to an environment. Useful for tracking what version is in which environment and when it was deployed.

## When to Create

- A release build is deployed to staging or production
- A hotfix build is deployed outside the normal release cycle

## Required Relationships

- **Part of**: `releases/`
- **Deployed to**: `environments/`

## Lifecycle / Statuses

`building` → `built` → `deployed-staging` → `deployed-production` | `rolled-back`

## Required Fields

`id`, `version`, `status`, `environment`, `release_ref`, `commit_sha`, `deployed_at`, `deployed_by`, `created_date`

## Example IDs

- `BUILD-0001` — First build record

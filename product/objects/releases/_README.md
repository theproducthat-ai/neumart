# Releases

**Object type**: `release`  
**ID prefix**: `REL-`  
**ID format**: `REL-NNNN` (e.g., REL-0002)  
**Owner**: Engineering Lead (delivery), Product Manager (scope)  
**Template**: `product/os/templates/RELEASE_OBJECT_TEMPLATE.md`

## What Belongs Here

Release objects — planned deployments of a set of features, bug fixes, and changes to production. A release bundles work that is ready to ship.

**Note**: V1 releases (RELEASE-0001) remain in `13-release-management/releases/`. New releases (REL-0002 onwards) go here.

## When to Create

- When a set of stories has completed development and is ready for QA
- When a release scope is being planned (can be created earlier as a planning artifact)

## Required Relationships

- **Contains**: `features/`, `user-stories/`, `bugs/` (what's in the release)
- **Requires**: `qa-tests/` signoff, `uat-runs/` signoff (if applicable)
- **Results in**: post-release objects in `metrics/`, `incidents/`, `feedback/`

## Lifecycle / Statuses

`planning` → `building` → `in-qa` → `in-uat` → `ready` → `released` → `post-release` | `rolled-back`

## Release Readiness Checklist

- [ ] All in-scope stories: `done`
- [ ] QA signoff: `passed`
- [ ] UAT signoff: `approved` (if required)
- [ ] Rollback plan documented
- [ ] Feature flags configured
- [ ] Support handover complete
- [ ] Ops readiness confirmed
- [ ] Release notes drafted
- [ ] Approvals received

## Required Fields

`id`, `title`, `status`, `release_date`, `features_in_scope`, `qa_ref`, `uat_ref`, `rollback_plan`, `support_ready`, `ops_ready`, `owner`, `created_date`

## Example IDs

- `REL-0002` — Second release
- `REL-0003` — Third release

## Owner Roles

| Action | Role |
|---|---|
| Plans scope | Product Manager |
| Executes deployment | Engineering Lead |
| Signs off QA | QA Lead |
| Signs off UAT | Product Manager |
| Communicates | Support Lead |
| Approves go-live | Product Lead |

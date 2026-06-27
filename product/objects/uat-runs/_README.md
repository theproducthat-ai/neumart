# UAT Runs

**Object type**: `uat-run`  
**ID prefix**: `UAT-`  
**ID format**: `UAT-NNNN` (e.g., UAT-0003)  
**Owner**: Product Manager (runs), Business Stakeholders (participants)  
**Template**: `product/os/templates/UAT_OBJECT_TEMPLATE.md`

## What Belongs Here

User Acceptance Testing runs — structured sessions where stakeholders or real users validate that the built feature meets the business requirement. UAT is the final quality gate before release.

**Note**: V1 UAT runs (UAT-0001, UAT-0002) remain in `12-uat/uat-runs/`. New runs (UAT-0003 onwards) go here.

## When to Create

UAT is required for:
- Standard Feature or Strategic Initiative
- Any change to payment or checkout flow
- Client-visible features
- Client commitment deliveries
- Compliance/regulatory changes

## Required Relationships

- **Tests**: `features/`, `releases/`
- **Requires**: `qa-tests/` completion first
- **Result**: UAT signoff → unblocks `releases/`
- **Finds**: potential `bugs/` or `feedback/`

## Lifecycle / Statuses

`planned` → `in-progress` → `approved` → `rejected` | `conditional-approval`

## Required Fields

`id`, `title`, `status`, `scope`, `release_ref`, `qa_ref`, `participants`, `scenarios_tested`, `pass_count`, `fail_count`, `sign_off_by`, `created_date`

## Example IDs

- `UAT-0003` — Third UAT run
- `UAT-0004` — Fourth UAT run

## Owner Roles

| Action | Role |
|---|---|
| Plans and runs | Product Manager |
| Participates | Business stakeholders, client representatives |
| Signs off | Product Lead or designated stakeholder |
| Fixes failures | Engineering Lead |

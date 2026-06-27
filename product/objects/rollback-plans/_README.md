# Rollback Plans

**Object type**: `rollback-plan`  
**Owner**: Engineering Lead  
**Note**: Rollback plan objects — documented procedures for reverting a release if it causes critical issues in production.

## When to Create

A rollback plan is required for:
- Any release with database schema changes
- Any release to the payment or auth flow
- Any release flagged as high risk
- Any release with a client commitment

For all other releases, a brief rollback plan should be embedded in the `releases/` object.

## Format

`RB-[RELEASE-ID].md` with fields:
`id`, `release_ref`, `trigger_conditions`, `rollback_steps`, `data_impact`, `estimated_time`, `tested_on_staging`, `owner`

## Rollback Trigger Conditions

Define clear conditions that would trigger a rollback:
- Error rate > X%
- Payment success rate < Y%
- Customer-facing page fails to load
- Data corruption detected

# Dependencies

**Object type**: `dependency`  
**Owner**: Engineering Lead / Product Manager  
**Note**: Dependency records — external or internal dependencies that a feature, release, or initiative relies on. Tracking dependencies early prevents delivery surprises.

## Types of Dependencies

- **External**: third-party API, vendor, partner capability
- **Internal**: another team's delivery, another feature completing first
- **Regulatory**: approval or compliance prerequisite
- **Data**: data migration completing before feature can work

## When to Create

- A feature depends on a third-party integration not yet built
- A release depends on another team's work
- A feature cannot start until another feature is complete

## Required Relationships

- **Blocks**: `features/`, `releases/`, `user-stories/`
- **Tracked in**: `indexes/DEPENDENCY_INDEX.md`

## Format

`DEP-NNNN.md` with fields:
`id`, `title`, `type`, `blocking`, `blocked_by`, `status`, `expected_resolution_date`, `owner`

Status: `open` → `resolved` | `deferred` | `risk-accepted`

# Bugs

**Object type**: `bug`  
**ID prefix**: `BUG-`  
**ID format**: `BUG-NNNN`  
**Owner**: QA Lead (raises), Engineering (fixes)  
**Template**: `product/os/templates/BUG_OBJECT_TEMPLATE.md`

## What Belongs Here

Defects in existing product behaviour — any deviation from specified or expected behaviour. Bugs can be found in QA, UAT, production, or reported by users/support.

Bugs are distinct from:
- **Incidents** (production outage or critical failure affecting many users → use `incidents/`)
- **Enhancements** (desired new behaviour → use `requests/`)
- **Technical debt** (code quality issues without user-visible impact → use `tasks/`)

## When to Create

- QA finds a failure during testing
- UAT reveals unexpected behaviour
- Support or user reports a defect
- Production monitoring alerts on abnormal behaviour
- Post-release review finds a regression

## Required Relationships

- **Found in**: `releases/` or specific build
- **Affects**: `features/` or `user-stories/`
- **May trigger**: `incidents/` (if production impact is high)
- **Fixed in**: `releases/`

## Lifecycle / Statuses

`reported` → `triaged` → `in-progress` → `fixed` → `verified` | `closed` | `wont-fix` | `deferred`

## Required Fields

`id`, `title`, `status`, `severity`, `steps_to_reproduce`, `expected_behaviour`, `actual_behaviour`, `environment`, `found_by`, `owner`, `created_date`

## Severity Levels

| Severity | Definition |
|---|---|
| `critical` | Data loss, security breach, complete feature failure |
| `high` | Core workflow broken for most users |
| `medium` | Feature degraded, workaround exists |
| `low` | Minor visual or UX issue, minimal user impact |

## Example IDs

- `BUG-0001` — First tracked bug
- `BUG-0002` — Second bug

## Owner Roles

| Action | Role |
|---|---|
| Reports | QA Lead, Support, Engineering |
| Triages | QA Lead + Engineering Lead |
| Fixes | Engineer |
| Verifies fix | QA Lead |
| Closes | QA Lead |

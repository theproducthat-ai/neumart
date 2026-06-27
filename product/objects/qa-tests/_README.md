# QA Tests

**Object type**: `qa-test`  
**ID prefix**: `QA-`  
**ID format**: `QA-NNNN` (e.g., QA-0003)  
**Owner**: QA Lead  
**Template**: `product/os/templates/QA_TEST_OBJECT_TEMPLATE.md`

## What Belongs Here

V2 QA test objects — test plans and test run records for features and releases. Each QA object covers a release or feature scope and includes test cases, results, bugs found, and signoff.

**Existing qa-runs/** folder: The `objects/qa-runs/` folder also exists for test run artifacts (legacy). New QA objects go here under `qa-tests/`.

## When to Create

- When a feature or release enters QA
- When a regression test suite is run
- When a hotfix needs verification

## Required Relationships

- **Tests**: `features/`, `user-stories/`, `releases/`
- **Finds**: `bugs/` (linked bugs discovered during testing)
- **Required for**: `releases/` (QA signoff required before release)

## Lifecycle / Statuses

`planned` → `in-progress` → `passed` → `failed` | `blocked` | `cancelled`

## Required Fields

`id`, `title`, `status`, `scope`, `release_ref`, `test_cases`, `bugs_found`, `pass_count`, `fail_count`, `signoff_by`, `created_date`

## Test Types

- Functional testing
- Regression testing
- Integration testing
- Exploratory testing
- Performance/load testing
- Accessibility testing

## Example IDs

- `QA-0003` — Third QA run
- `QA-0004` — Fourth QA run

## Owner Roles

| Action | Role |
|---|---|
| Plans | QA Lead |
| Executes | QA Lead / QA team |
| Signs off | QA Lead |
| Receives bugs | Engineering Lead |

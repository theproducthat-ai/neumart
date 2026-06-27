# User Stories

**Object type**: `user-story`  
**ID prefix**: `US-`  
**ID format**: `US-NNNN` (e.g., US-0024)  
**Owner**: Product Manager (creates), Engineering (executes)  
**Template**: `product/os/templates/USER_STORY_OBJECT_TEMPLATE.md`

## What Belongs Here

V2 user story objects. Each story represents a testable unit of value from a user's perspective, written in the format: "As a [role], I want [capability] so that [outcome]."

**Note**: Legacy user stories (US-0001 through US-0023) remain in `08-user-stories/stories/`. New stories (US-0024 onwards) should be created here.

## When to Create

- During story breakdown of an approved feature or epic
- When engineering needs a shippable unit to estimate and commit to
- For sprint planning

## Required Relationships

- **Parent**: `features/` or `epics/` (required)
- **Has**: `acceptance-criteria/` (embedded in story or linked)
- **Part of**: `releases/` via epic or feature
- **Results in**: `tasks/` during planning

## Lifecycle / Statuses

`draft` → `ready` (Definition of Ready met) → `in-progress` → `in-review` → `in-qa` → `done` | `deferred`

## Required Fields

`id`, `title`, `status`, `parent_feature`, `role`, `goal`, `outcome`, `acceptance_criteria`, `story_points`, `owner`, `created_date`

## Example IDs

- `US-0024` — Next story after V1 series
- `US-0025` — Second new V2 story

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager (or AI via `/product-stories`) |
| Estimates | Engineering |
| Implements | Engineering |
| Accepts | Product Manager / QA |

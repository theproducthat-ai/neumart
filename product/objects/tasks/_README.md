# Tasks

**Object type**: `task`  
**ID prefix**: `TASK-`  
**ID format**: `TASK-NNNN`  
**Owner**: Engineer / Designer / QA (assigned)  
**Template**: `product/os/templates/TASK_OBJECT_TEMPLATE.md`

## What Belongs Here

Technical work items that are created during sprint planning or during implementation. A task is assigned to one person, has a clear deliverable, and is tracked within a sprint.

Tasks can be:
- Engineering implementation tasks
- Design tasks (create wireframes, update Figma)
- QA tasks (write test cases, run regression)
- Infrastructure tasks (set up environment, configure feature flag)
- Documentation tasks (write SOP, update training material)

## When to Create

- During sprint planning when a story is broken into implementation units
- When a piece of work arises during development that needs tracking
- For any parallelizable unit of work within a story

## Required Relationships

- **Parent**: `user-stories/` (required) or `bugs/` or `incidents/`
- **Assigned to**: individual team member

## Lifecycle / Statuses

`todo` → `in-progress` → `in-review` → `done` | `blocked`

## Required Fields

`id`, `title`, `status`, `parent_story`, `assignee`, `type`, `created_date`

## Example IDs

- `TASK-0001` — First task
- `TASK-0002` — Second task

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Manager or Engineer |
| Executes | Assigned team member |
| Reviews | Engineering Lead |

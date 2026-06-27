# Internal Ideas

**Object type**: `internal-idea`  
**ID prefix**: `IDEA-`  
**ID format**: `IDEA-NNNN`  
**Owner**: Product Manager (intake)  
**Template**: `product/os/templates/INTERNAL_IDEA_OBJECT_TEMPLATE.md`

## What Belongs Here

Internal product ideas raised by the team — engineers, designers, QA, support, or leadership — that are not yet requests. This is a low-friction capture mechanism. Ideas should not require business justification at intake; that comes when an idea is promoted to a request.

## When to Create

- Any team member has a product idea worth capturing
- An engineer suggests a better way to do something
- A designer spots a UX improvement opportunity
- Support suggests a product change based on user feedback patterns

## Required Relationships

- **May become**: `requests/` (if promoted)
- **Relates to**: `features/`, `feedback/`

## Lifecycle / Statuses

`captured` → `reviewed` → `promoted-to-request` | `parked` | `rejected`

## Required Fields

`id`, `title`, `status`, `description`, `raised_by`, `potential_value`, `created_date`

## Example IDs

- `IDEA-0001` — First internal idea
- `IDEA-0002` — Second idea

## Owner Roles

| Action | Role |
|---|---|
| Captures | Any team member |
| Reviews | Product Manager |
| Promotes | Product Manager → creates Request |

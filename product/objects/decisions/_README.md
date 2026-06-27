# Decisions

**Object type**: `decision`  
**ID prefix**: `DEC-`  
**ID format**: `DEC-NNNN`  
**Owner**: Product Lead / Engineering Lead (context-dependent)  
**Template**: `product/os/templates/DECISION_OBJECT_TEMPLATE.md`

## What Belongs Here

Documented product, architectural, and business decisions with context, options considered, rationale, and consequences. Every significant decision should be logged here so the team understands why things are the way they are.

Decision types:
- Product direction decisions (scope, priority, tradeoffs)
- Technical architecture decisions (ADRs)
- Business decisions (launch dates, market approach)
- Process decisions (how we work, what tools we use)

## When to Create

- A non-obvious choice is made between two or more options
- A decision will affect future design or engineering choices
- A decision has cross-functional impact
- A stakeholder asks "why did we do it this way?"

## Required Relationships

- **Context**: `features/`, `prds/`, `risks/` (what triggered the decision)
- **Impact**: `technical-designs/`, `releases/`

## Lifecycle / Statuses

`proposed` → `decided` → `superseded` | `reversed`

## Required Fields

`id`, `title`, `status`, `context`, `options_considered`, `decision`, `rationale`, `consequences`, `decider`, `date_decided`

## Example IDs

- `DEC-0001` — First decision
- `DEC-0002` — Second decision

## Owner Roles

| Action | Role |
|---|---|
| Documents | Product Manager or Engineering Lead |
| Decides | Product Lead or Engineering Lead (based on type) |
| Reviews | Affected team members |

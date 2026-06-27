# Design Decisions

**Object type**: `design-decision`  
**ID prefix**: `DD-`  
**ID format**: `DD-NNNN`  
**Owner**: Designer  
**Template**: `product/os/templates/DESIGN_DECISION_OBJECT_TEMPLATE.md`

## What Belongs Here

Records of significant UX and visual design decisions — why a specific pattern, layout, or interaction was chosen. Useful for design consistency and onboarding new designers.

## When to Create

- A non-obvious design choice is made
- A design pattern is established for reuse
- A design constraint or trade-off is accepted

## Required Relationships

- **Context**: `designs/`, `features/`
- **Linked to**: `decisions/` (if it also has product implications)

## Lifecycle / Statuses

`proposed` → `decided` → `superseded` | `reversed`

## Required Fields

`id`, `title`, `status`, `context`, `options_considered`, `decision`, `rationale`, `impact`, `designer`, `date_decided`

## Example IDs

- `DD-0001` — First design decision

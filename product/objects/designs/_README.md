# Designs

**Object type**: `design`  
**ID prefix**: `DES-`  
**ID format**: `DES-NNNN`  
**Owner**: Designer  
**Template**: `product/os/templates/DESIGN_BRIEF_TEMPLATE.md`

## What Belongs Here

Design brief objects — structured records of design work scoped for a feature or subfeature. Includes Figma links, screen scope, design decisions, handoff status, and review state.

## When to Create

- A feature enters the design phase
- A design brief is produced for a Standard Feature or above
- A designer begins work on a new screen or component

## Required Relationships

- **For**: `features/`, `subfeatures/`
- **Results in**: Figma file (linked)
- **References**: `design-decisions/`, `ux-research/`
- **Handed off to**: Engineering (via `FIGMA_HANDOFF_RULES.md`)

## Lifecycle / Statuses

`brief-created` → `in-design` → `in-review` → `approved` → `handed-off` | `revision-requested`

## Required Fields

`id`, `title`, `status`, `feature_ref`, `figma_url`, `screens_in_scope`, `required_states`, `designer`, `created_date`

## Required Screen States

Per `design/SCREEN_STATE_RULES.md`: loading, empty, error, success, mobile, disabled, permission-denied

## Example IDs

- `DES-0001` — First design object
- `DES-0002` — Second design

## Owner Roles

| Action | Role |
|---|---|
| Creates brief | Product Manager |
| Designs | Designer |
| Reviews | Product Manager, Engineering Lead |
| Approves | Product Manager |
| Receives handoff | Engineering Lead |

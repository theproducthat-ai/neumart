# Prototypes

**Object type**: `prototype`  
**ID prefix**: `PROTO-`  
**ID format**: `PROTO-NNNN`  
**Owner**: Designer  
**Template**: `product/os/templates/PROTOTYPE_OBJECT_TEMPLATE.md`

## What Belongs Here

Prototype objects — records of interactive design prototypes created for user testing, stakeholder reviews, or engineering guidance. Includes the prototype URL, test scenario, and findings.

## When to Create

- A high-fidelity Figma prototype is created for user testing
- A prototype is built for client presentation
- Engineering needs an interactive reference for a complex interaction pattern

## Required Relationships

- **For**: `features/`, `ux-research/`
- **Parent**: `designs/`

## Lifecycle / Statuses

`in-progress` → `ready-for-testing` → `tested` → `archived`

## Required Fields

`id`, `title`, `status`, `feature_ref`, `prototype_url`, `test_objectives`, `findings`, `designer`, `created_date`

## Example IDs

- `PROTO-0001` — First prototype

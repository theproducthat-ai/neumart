# UX Research

**Object type**: `ux-research`  
**ID prefix**: `UXR-`  
**ID format**: `UXR-NNNN`  
**Owner**: Designer / Product Manager  
**Template**: `product/os/templates/UX_REVIEW_TEMPLATE.md`

## What Belongs Here

UX research objects — records of user interviews, usability tests, surveys, or field studies conducted to inform product decisions. Includes methodology, findings, and recommended actions.

## When to Create

- A user interview is conducted
- A usability test is run on a feature or prototype
- A survey is designed and executed
- Field observation is done with users

## Required Relationships

- **Informs**: `features/`, `prds/`, `designs/`
- **May generate**: `requests/`, `feedback/`

## Lifecycle / Statuses

`planned` → `in-progress` → `analysed` → `actioned` | `archived`

## Required Fields

`id`, `title`, `status`, `methodology`, `participants`, `objectives`, `key_findings`, `recommendations`, `researcher`, `created_date`

## Example IDs

- `UXR-0001` — First UX research record

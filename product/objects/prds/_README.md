# PRDs (Product Requirements Documents)

**Object type**: `prd`  
**ID prefix**: `PRD-`  
**ID format**: `PRD-NNNN` (e.g., PRD-0005)  
**Owner**: Product Manager  
**Template**: `product/os/templates/PRD_OBJECT_TEMPLATE.md`

## What Belongs Here

Approved Product Requirements Documents. A PRD defines what to build and why — scope, user needs, success criteria, non-goals, open questions, and constraints. It is the contract between Product and Engineering before development begins.

**Note**: V1 PRDs (PRD-0001 through PRD-0004) remain in `07-prd/approved-prds/`. New PRDs (PRD-0005 onwards) go here.

## When to Create

PRD is required for:
- Standard Feature lane
- Strategic Initiative lane
- Any feature touching 2+ modules
- Any feature with a client commitment
- Any regulatory or compliance-driven feature
- Any feature requiring API contract or data schema change

PRD is NOT required for:
- Fast Fix lane
- Small Enhancement (≤3 story change)
- Internal tech debt
- Incident response

## Required Relationships

- **Parent**: `features/` (required — every PRD belongs to a feature)
- **Informs**: `user-stories/`, `technical-designs/`
- **References**: `designs/` (Figma links)
- **Approved by**: Product Lead, Engineering Lead

## Lifecycle / Statuses

`draft` → `in-review` → `approved` → `superseded` | `rejected`

## Required Fields

`id`, `title`, `status`, `parent_feature`, `problem_statement`, `goals`, `non_goals`, `success_metrics`, `owner`, `approved_by`, `created_date`

## Example IDs

- `PRD-0005` — Next PRD after V1 series
- `PRD-0006` — Second new V2 PRD

## Owner Roles

| Action | Role |
|---|---|
| Creates/Writes | Product Manager (or AI via `/product-prd`) |
| Reviews | Engineering Lead, Designer |
| Approves | Product Lead |
| Implements against | Engineering Team |

# Technical Designs

**Object type**: `technical-design`  
**ID prefix**: `TD-`  
**ID format**: `TD-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/TECH_DESIGN_OBJECT_TEMPLATE.md`

## What Belongs Here

Technical design documents — architecture decisions, system design, database schema changes, API design, and implementation approach for features. The engineering equivalent of a PRD.

## When to Create

Per `engineering/TECH_DESIGN_RULES.md`, required when:
- Any new API endpoint or change to existing API
- Any database schema change or data migration
- Third-party integration
- Payments, auth, or permissions changes
- Multi-service or cross-module change
- High engineering complexity feature

## Required Relationships

- **Parent**: `features/`, `prds/`
- **Informs**: `api-contracts/`, `data-migrations/`, `user-stories/`
- **References**: `non-functional-requirements/`

## Lifecycle / Statuses

`draft` → `in-review` → `approved` → `in-implementation` → `completed` | `superseded`

## Required Fields

`id`, `title`, `status`, `feature_ref`, `prd_ref`, `approach`, `alternatives_considered`, `data_model_changes`, `api_changes`, `risks`, `reviewed_by`, `owner`, `created_date`

## Example IDs

- `TD-0001` — First tech design
- `TD-0002` — Second tech design

## Owner Roles

| Action | Role |
|---|---|
| Creates | Engineering Lead / Senior Engineer |
| Reviews | Engineering Lead + Product Lead |
| Approves | Engineering Lead |
| Implements | Engineering team |

# Capacity Plans

**Object type**: `capacity-plan`  
**ID prefix**: `CAP-`  
**ID format**: `CAP-[QUARTER]` (e.g., CAP-FY26-Q3)  
**Owner**: Product Lead / Engineering Lead  
**Template**: `product/os/templates/CAPACITY_PLAN_OBJECT_TEMPLATE.md`

## What Belongs Here

Capacity plan objects — per-sprint or per-quarter records of available engineering/design/QA capacity and how it is allocated to initiatives, features, and maintenance.

## When to Create

- At the start of each quarter or sprint cycle
- When team composition changes
- When roadmap is being revised

## Required Relationships

- **Allocates**: `initiatives/`, `features/`
- **Based on**: `teams/` composition
- **Informs**: roadmap decisions in `portfolio/`

## Lifecycle / Statuses

`draft` → `approved` → `active` → `completed`

## Required Fields

`id`, `period`, `status`, `teams_in_scope`, `total_capacity_points`, `allocated_features`, `buffer_percentage`, `risk_items`, `owner`, `created_date`

## Example IDs

- `CAP-FY26-Q3` — Q3 FY2026 capacity plan
- `CAP-FY27-Q1` — Q1 FY2027 capacity plan

## Owner Roles

| Action | Role |
|---|---|
| Creates | Engineering Lead |
| Reviews and approves | Product Lead |
| Updates mid-quarter | Engineering Lead |

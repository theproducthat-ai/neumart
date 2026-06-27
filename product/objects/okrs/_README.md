# OKRs (Objectives and Key Results)

**Object type**: `okr`  
**ID prefix**: `OKR-`  
**ID format**: `OKR-[FY]-[Q]` (e.g., OKR-FY26-Q3)  
**Owner**: Product Lead / CEO  
**Template**: `product/os/templates/OKR_OBJECT_TEMPLATE.md`

## What Belongs Here

OKR objects — quarterly objectives with measurable key results. OKRs define what the company/product team is trying to achieve in a given quarter or year. They are the strategic anchor for prioritisation.

## When to Create

- At the start of each quarter (quarterly OKR)
- At the start of each fiscal year (annual OKR)

## Required Relationships

- **Children**: `kpis/`, `initiatives/`, `features/`
- **Part of**: `portfolio/OKR_TREE.md`
- **Tracked in**: `views/PORTFOLIO_VIEW.md`

## Lifecycle / Statuses

`draft` → `set` → `in-progress` → `achieved` | `missed` | `on-track`

## Required Fields

`id`, `title`, `status`, `objective`, `key_results`, `quarter`, `owner`, `progress`, `created_date`

## Example IDs

- `OKR-FY26-Q3` — Q3 FY2026 OKRs
- `OKR-FY27-Q1` — Q1 FY2027 OKRs

## Owner Roles

| Action | Role |
|---|---|
| Defines | CEO + Product Lead |
| Tracks | Product Lead |
| Reviews | Full leadership team |

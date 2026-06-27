# Teams

**Object type**: `team`  
**ID prefix**: `TEAM-`  
**ID format**: `TEAM-[NAME]` (e.g., TEAM-PRODUCT, TEAM-ENGINEERING)  
**Owner**: Product Lead / CEO  
**Template**: `product/os/templates/TEAM_OBJECT_TEMPLATE.md`

## What Belongs Here

Team registry — records of each functional team or squad, their members, responsibilities, and capacity. Used for RACI assignment, capacity planning, and sprint planning.

## When to Create

- When a new team or squad is formed
- When team composition changes significantly

## Required Relationships

- **Members**: individuals (linked to `stakeholders/` or internal roster)
- **Owns**: specific modules or product areas
- **Participates in**: `approvals/`, cadences

## Lifecycle / Statuses

`active` → `dissolved` | `restructured`

## Required Fields

`id`, `name`, `type`, `lead`, `members`, `product_areas_owned`, `capacity`, `created_date`

## Team Types

- `product` — product management team
- `engineering` — engineering/development team
- `design` — UX/UI design team
- `qa` — QA/testing team
- `support` — customer support team
- `operations` — ops team
- `business` — business/commercial team

## Example IDs

- `TEAM-PRODUCT`
- `TEAM-ENGINEERING`
- `TEAM-QA`

## Owner Roles

| Action | Role |
|---|---|
| Creates | Product Lead or HR |
| Maintains | Product Lead |

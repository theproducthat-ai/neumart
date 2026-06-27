# Data Migrations

**Object type**: `data-migration`  
**ID prefix**: `DM-`  
**ID format**: `DM-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/DATA_MIGRATION_OBJECT_TEMPLATE.md`

## What Belongs Here

Data migration objects — plans and records for database schema migrations, data transforms, or bulk data changes. Includes rollback plan, risk assessment, and execution record.

## When to Create

- A schema change requires migrating existing data
- A feature requires populating new fields from existing data
- A data cleanup or normalisation is required
- Backfilling data for a new feature

## Required Relationships

- **Parent**: `technical-designs/`
- **For**: `features/`, `releases/`
- **Risk**: `risks/` (if data loss risk exists)

## Lifecycle / Statuses

`planned` → `tested-on-staging` → `ready` → `executed` → `verified` | `rolled-back`

## Required Fields

`id`, `title`, `status`, `migration_type`, `affected_tables`, `row_count`, `rollback_plan`, `test_results`, `executed_by`, `owner`, `created_date`

## Example IDs

- `DM-0001` — First data migration

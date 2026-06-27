# Data Migration Rules

**Version**: 2.0  
**Owner**: Engineering Lead

---

## When Data Migrations Are Required

A data migration object (`objects/data-migrations/DM-XXXX.md`) is required when:
- A database schema change affects existing data
- New fields need to be populated from existing data
- Data needs to be transformed to a new format
- Data needs to be archived or deleted at scale
- A feature change makes existing data invalid

---

## Data Migration Safety Rules

1. **Never migrate production without testing on staging first** with production-like data volume
2. **Always have a rollback plan** before executing a migration
3. **Always take a backup** before a migration that modifies or deletes data
4. **Zero downtime preference** — design migrations to run without taking the app offline
5. **Batch large operations** — never update millions of rows in a single transaction
6. **Test with realistic data** — edge cases in production data will surface in testing

---

## Migration Types

| Type | Risk | Downtime Needed? | Notes |
|---|---|---|---|
| Add nullable column | Low | No | Safe to deploy first |
| Add non-nullable column | Medium | No | Add default first, then backfill |
| Rename column | High | Yes (or phased) | Use two-phase: add new, copy data, remove old |
| Delete column | High | No | Remove code first, then delete column |
| Change data type | Very High | Often yes | Careful — test thoroughly |
| Data backfill | Medium | No | Batch operation, monitor |
| Data transform | Medium | No | Test on sample first |
| Data archive/delete | High | No | Never delete without backup + confirmation |

---

## Migration Process

1. **Document** the migration in `objects/data-migrations/DM-XXXX.md`
2. **Write** the migration script (use existing DB migration tooling)
3. **Test** on a staging environment with production-like data
4. **Record** test results — rows affected, execution time, any errors
5. **Review** — Engineering Lead must review and approve before production
6. **Execute** in production during low-traffic window if high risk
7. **Verify** — confirm data looks correct after migration
8. **Document** results in the DM object

---

## Rollback Approach

Design every migration to be reversible:
- Keep old columns until new data structure is confirmed working
- Use two-phase migrations for column renames
- For deletes: archive first (soft delete), then hard delete in a later migration
- Document the rollback step in the DM object before execution

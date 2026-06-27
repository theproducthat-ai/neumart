---
id: DM-XXXX
object_type: data-migration
title: ""
status: planned
# Status: planned | tested-on-staging | ready | executed | verified | rolled-back

migration_type: schema-change
# Type: schema-change | data-backfill | data-transform | data-cleanup | archive

affected_tables: []
estimated_row_count: 0
data_loss_risk: false
downtime_required: false

tech_design_ref: ""
feature_ref: ""
release_ref: ""

rollback_plan: ""
test_results: ""

executed_by: ""
executed_at: ""
verified_by: ""
verified_at: ""

owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# data-migration

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Data Migration object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/data-migrations/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# DM-XXXX: Data Migration — [Title]

## Summary

[What data is being migrated and why?]

## Migration Details

**Type**: [schema-change | data-backfill | data-transform | data-cleanup]  
**Affected tables**: [list]  
**Row count estimate**: [number]  
**Downtime required**: [yes / no]  
**Data loss risk**: [yes / no — if yes, explain mitigation]

## Pre-Migration Checklist

- [ ] Backup taken
- [ ] Migration tested on staging with production-like data
- [ ] Rollback plan documented and tested
- [ ] Estimated execution time calculated
- [ ] Team notified of maintenance window (if needed)

## Migration Script

```
// Script reference or pseudocode
```

## Rollback Plan

[Step-by-step rollback procedure if migration needs to be reversed]

## Verification Steps

[How to verify the migration succeeded after execution]

## Test Results (Staging)

[Record of staging test — rows migrated, time taken, errors if any]

## Execution Record

**Executed by**: [name]  
**Executed at**: [datetime]  
**Duration**: [time]  
**Result**: [success | failed | partial]  
**Verified by**: [name]  
**Verified at**: [datetime]

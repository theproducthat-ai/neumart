---
id: FF-XXXX
object_type: feature-flag
title: ""
name: ""
flag_key: ""
# The actual flag key used in code

status: created
# Status: created | enabled | partial-rollout | rolled-out | deprecated | removed

feature_ref: ""
experiment_ref: ""
purpose: rollout
# Purpose: rollout | experiment | kill-switch | access-control

scope: all-users
# Scope: all-users | percentage | user-segment | admin-only | staff-only

enabled_for: []
rollout_percentage: 0

scheduled_removal_date: ""
# REQUIRED — every flag must have a cleanup date

owner: ""
created_date: ""
updated_date: ""

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# feature-flag

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Feature Flag object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/feature-flags/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# FF-XXXX: Feature Flag — [Flag Name]

## Flag Details

**Flag key**: `[flag_key]` (used in code)  
**Purpose**: [rollout | experiment | kill-switch | access-control]  
**Feature**: [FEAT-XXX]

## Current State

**Status**: [created | enabled | partial-rollout | rolled-out | deprecated]  
**Enabled for**: [all users | X% | specific segment]  
**Rollout percentage**: [0% — 100%]

## Rollout Plan

| Phase | % Users | Date | Notes |
|---|---|---|---|
| Initial | 0% | | Flag created, off |
| Canary | 10% | | Monitor for issues |
| Partial | 50% | | |
| Full | 100% | | |

## Kill Switch

[Under what conditions should this flag be disabled immediately?]

## Cleanup

**Scheduled removal date**: [date — REQUIRED]  
**Removal criteria**: [when can the flag be removed? e.g., "after full rollout and monitoring period"]

## Removal Checklist

- [ ] Flag fully rolled out to 100% or confirmed not proceeding
- [ ] Code cleaned up (conditional removed, feature is default)
- [ ] Flag removed from flag management system
- [ ] This object archived

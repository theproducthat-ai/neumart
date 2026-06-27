---
id: RCA-XXXX
object_type: rca
title: ""
status: pending
# Status: pending | in-progress | reviewed | completed | overdue

incident_ref: "INC-XXXX"
severity: P2
incident_date: ""
rca_due_date: ""
# SLA: 5 business days from incident resolution

facilitator: ""
contributors: []

root_cause: ""
action_items_count: 0

owner: ""
created_date: ""
date_completed: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# rca

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Rca object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/rcas/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# RCA-XXXX: Root Cause Analysis — [Incident Title]

## Incident Summary

**Incident**: [INC-XXXX]  
**Severity**: [P1 | P2 | P3]  
**Date**: [incident date]  
**Duration**: [total downtime/degradation]  
**Users affected**: [number or %]

## Timeline

| Time | Event | Who |
|---|---|---|
| | Monitoring alert fired | |
| | First responder engaged | |
| | Incident declared | |
| | Root cause identified | |
| | Fix deployed | |
| | Incident resolved | |
| | All-clear confirmed | |

## What Happened

[Factual narrative of the incident from detection to resolution]

## Root Cause

[The single underlying cause that, if fixed, would prevent this from happening again]

## Contributing Factors

1. [Factor 1 — what made this possible or worse]
2. [Factor 2]
3. [Factor 3]

## Why This Wasn't Caught Earlier

[What detection, monitoring, or testing gap allowed this to reach production?]

## Impact

**User impact**: [description]  
**Business impact**: [revenue, SLA breach, client impact]  
**Reputation impact**: [if any]

## What Went Well

[What worked well during the incident response?]

## Action Items

| Action | Owner | Due Date | Status |
|---|---|---|---|
| [Preventative fix] | | | pending |
| [Monitoring improvement] | | | pending |
| [Process improvement] | | | pending |
| [Documentation update] | | | pending |

## Review

**Reviewed by**: [attendees of post-mortem]  
**Review date**: [date]  
**RCA completed by**: [facilitator]

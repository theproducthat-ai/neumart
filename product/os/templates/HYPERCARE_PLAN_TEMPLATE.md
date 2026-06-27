---
id: HC-XXXX
object_type: hypercare-plan
title: ""
status: planned
# Status: planned | active | completed | extended

release_ref: ""
hypercare_start: ""
hypercare_end: ""
extended_until: ""

monitoring_owner: ""
escalation_owner: ""

owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# hypercare-plan

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Hypercare Plan object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/hypercare-plans/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# HC-XXXX: Hypercare Plan — [Release Name]

## Overview

**Release**: [REL-XXXX]  
**Hypercare period**: [start date] → [end date]  
**Duration**: [X business days / weeks]

## Team During Hypercare

| Role | Person | Availability |
|---|---|---|
| Engineering | | On-call |
| Support Lead | | Elevated monitoring |
| Product Manager | | Available |

## Monitoring Checklist

Daily during hypercare:

- [ ] Error rate within normal range
- [ ] Payment success rate normal
- [ ] No new critical bugs filed
- [ ] Support ticket volume within expected range
- [ ] Key metrics trending correctly

## Success Criteria

[What conditions would allow us to exit hypercare?]

## Escalation Path

| Condition | Action | Who |
|---|---|---|
| Error rate > X% | Trigger rollback consideration | Engineering Lead |
| P1 incident | Incident declared | Engineering Lead |
| Client complaint | Escalate to Product Lead | Support Lead |

## Known Issues During Hypercare

[Any known issues that are being monitored but not hotfixed]

## Hypercare Exit Decision

**Exit criteria met**: [ ] [date]  
**Exit confirmed by**: [name]  
**Post-hypercare owner**: [who monitors after?]

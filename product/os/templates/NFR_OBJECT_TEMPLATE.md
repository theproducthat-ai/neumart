---
id: NFR-XXXX
object_type: non-functional-requirement
title: ""
status: defined
# Status: defined | verified | failed | accepted-with-exception

category: performance
# Category: performance | scalability | availability | security | accessibility | reliability | compliance | observability

requirement: ""
measurement: ""
target_value: ""
current_value: ""

feature_ref: ""
tech_design_ref: ""

verified_by: ""
verified_date: ""

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
# non-functional-requirement

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Nfr object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/nfrs/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# NFR-XXXX: [NFR Title]

## Requirement

**Category**: [performance | scalability | availability | security | accessibility | reliability | compliance | observability]  
**Applies to**: [feature / module / system-wide]

## Specification

| Attribute | Value |
|---|---|
| Requirement | [clear statement of the requirement] |
| Measurement method | [how will this be measured?] |
| Target value | [e.g., p95 < 500ms, 99.9% uptime] |
| Current baseline | [current value if known] |

## Verification Approach

[How will this NFR be verified? Load test, monitoring, security scan, WCAG audit?]

## Verification Result

**Status**: [pass | fail | exception-accepted]  
**Verified by**: [name]  
**Date**: [date]  
**Notes**: [any exceptions or caveats]

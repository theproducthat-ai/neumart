---
id: RACI-XXXX
object_type: raci
status: ""  # draft | active | archived
title: ""
process: ""
# Which process this RACI covers
version: "1.0"
owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
created_by: ""
priority: ""                         # critical | high | medium | low
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# raci

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Raci object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/racis/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# RACI-XXXX: [Process Name]

**R** = Responsible (does the work)  
**A** = Accountable (owns the outcome, signs off)  
**C** = Consulted (provides input, two-way communication)  
**I** = Informed (receives one-way update)

## RACI Matrix

| Activity | Product Manager | Engineering Lead | Designer | QA Lead | Support Lead | Ops Lead | Business Stakeholder | Leadership |
|---|---|---|---|---|---|---|---|---|
| [Activity 1] | R | C | C | | | | I | |
| [Activity 2] | A | R | | | | | | I |
| [Activity 3] | A | | R | | | | | |

## Roles Legend

| Role | Person / Team |
|---|---|
| Product Manager | |
| Engineering Lead | |
| Designer | |
| QA Lead | |
| Support Lead | |
| Operations Lead | |
| Business Stakeholder | |
| Leadership | |

## Notes

[Any exceptions, clarifications, or role boundaries]

---

> For the standard product RACI, see `team-operating-model/APPROVAL_AUTHORITY_MATRIX.md` and `os/policies/OWNERSHIP_AND_RACI_RULES.md`.

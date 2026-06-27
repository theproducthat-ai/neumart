---
id: STK-XXXX
object_type: stakeholder
title: ""
status: active
# Status: active | inactive | archived

name: ""
role: ""
organisation: ""
stakeholder_type: internal-business
# Type: client | internal-business | leadership | partner | user-representative | regulatory

contact_email: ""
contact_slack: ""

influence_level: medium
# Level: very-high | high | medium | low
interest_level: medium
# Level: very-high | high | medium | low

engagement_approach: ""
# inform | consult | collaborate | empower

communication_preference: ""
# weekly-update | ad-hoc | milestone-only | never

owner: ""
created_date: ""
updated_date: ""

related_objects:
  client_commitments: []
  approvals: []

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# stakeholder

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Stakeholder object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/stakeholders/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# STK-XXXX: [Stakeholder Name]

## Profile

**Name**: [name]  
**Role**: [role at their organisation]  
**Organisation**: [organisation name]  
**Type**: [client | internal-business | leadership | partner | etc.]

## Influence / Interest

**Influence**: [Very High / High / Medium / Low]  
**Interest**: [Very High / High / Medium / Low]  
**Engagement approach**: [inform | consult | collaborate | empower]

## What They Care About

[What outcomes, features, or metrics matter most to this stakeholder?]

## Key Asks / Commitments

[Any active commitments or requests from this stakeholder — link to `client-commitments/` or `requests/`]

## Communication Notes

[How often to communicate, what format, any sensitivities]

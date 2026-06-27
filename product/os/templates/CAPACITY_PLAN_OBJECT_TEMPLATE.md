---
id: CAP-FYXX-QX
object_type: capacity-plan
title: ""
status: draft
# Status: draft | approved | active | completed

period: ""
# e.g., "Q3 FY2026" or "Sprint 14"
teams_in_scope: []

total_capacity_points: 0
allocated_points: 0
buffer_points: 0
# Buffer for unplanned work (suggest 20%)

allocated_features: []
risk_items: []

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
# capacity-plan

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Capacity Plan object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/capacity-plans/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# CAP-FYXX-QX: Capacity Plan — [Period]

## Period

**Quarter / Period**: [Q3 FY2026]  
**Sprint dates**: [if applicable]

## Team Capacity

| Team | People | Capacity (points) | Availability |
|---|---|---|---|
| Engineering | | | 100% |
| Design | | | 50% (shared) |
| QA | | | 80% |

**Total capacity**: [X points]  
**Buffer (20%)**: [Y points]  
**Available for features**: [Z points]

## Allocation

| Initiative / Feature | Points | Owner | Priority |
|---|---|---|---|
| [FEAT-XXX — title] | | | P0 |
| [FEAT-XXX — title] | | | P1 |
| [INIT-XXXX — title] | | | P1 |
| Tech debt / bugs | | | Ongoing |
| Unplanned buffer | | | Reserve |
| **Total** | | | |

## Risks to Capacity

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| | | | |

## Assumptions

[Key assumptions this plan is based on — e.g., no major incidents, all team members available]

## Approval

**Approved by**: Product Lead + Engineering Lead  
**Date**: [date]

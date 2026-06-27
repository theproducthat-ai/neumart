---
id: TEAM-XXX
object_type: team
title: ""
status: active
# Status: active | dissolved | restructured

name: ""
type: engineering
# Type: product | engineering | design | qa | support | operations | business

lead: ""
members: []

product_areas_owned: []
# Which modules or features this team owns

capacity:
  engineers: 0
  designers: 0
  qa: 0
  velocity_per_sprint: 0

owner: ""
created_date: ""
updated_date: ""

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# team

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Team object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/teams/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# TEAM-XXX: [Team Name]

## Overview

**Type**: [product | engineering | design | QA | support | operations]  
**Lead**: [name]  
**Size**: [number of people]

## Members

| Name | Role | Capacity |
|---|---|---|
| | | Full-time |
| | | Full-time |

## Product Areas Owned

[Which modules, features, or product areas does this team own?]

## Capacity

**Engineering**: [X engineers]  
**Design**: [X designers]  
**QA**: [X QA]  
**Sprint velocity**: [X story points per sprint]

## Current Sprint / Work

[Link to active sprint or current focus]

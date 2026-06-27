---
id: INIT-XXXX
object_type: initiative
title: ""
status: proposed
# Status: proposed | approved | active | completed | paused | cancelled

strategic_goal_ref: ""
okr_refs: []

features_in_scope: []
estimated_effort: ""
business_value: ""

start_date: ""
target_completion: ""

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
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric

---
# initiative

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Initiative object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/initiatives/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# INIT-XXXX: [Initiative Name]

## Purpose

[What is this initiative about? What strategic goal does it serve?]

## Problem / Opportunity

[What problem are we solving or opportunity are we capturing?]

## Scope

**In scope**: [what features / capabilities are included]  
**Out of scope**: [what is explicitly excluded]

## Business Value

[Quantified or qualified value this initiative delivers]

## Features in Scope

| Feature | Status | Sprint Target |
|---|---|---|
| [FEAT-XXX] | | |
| [FEAT-XXX] | | |

## OKR Alignment

[Which OKRs does this initiative drive?]

## Effort Estimate

**Engineering**: [X sprints]  
**Design**: [X sprints]  
**QA**: [X sprints]

## Timeline

**Start**: [date]  
**Target completion**: [date]  
**Milestones**: [key milestones]

## Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| | | | |

## Status Updates

| Date | Status | Notes |
|---|---|---|
| | proposed | Initiative created |

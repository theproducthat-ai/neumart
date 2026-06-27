---
id: BG-XXXX
object_type: business-goal
title: ""
status: active
# Status: active | achieved | pivot | abandoned

time_horizon: ""
# e.g., "FY2026-FY2027", "12 months", "3 years"

strategic_pillars: []
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
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric

---
# business-goal

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Business Goal object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/business-goals/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# BG-XXXX: [Business Goal Title]

## Goal Statement

[The goal stated clearly and ambitiously. What does success look like in the given time horizon?]

## Strategic Context

[Why is this goal important? What market or business situation makes this the right goal?]

## Strategic Pillars

[What are the 2-4 pillars or themes that will drive achievement of this goal?]

1. [Pillar 1]
2. [Pillar 2]
3. [Pillar 3]

## OKRs That Support This Goal

| OKR | Quarter | Status |
|---|---|---|
| [OKR-FYXX-QX] | | |

## Initiatives That Drive This Goal

| Initiative | Status | Expected Completion |
|---|---|---|
| [INIT-XXXX] | | |

## Current Progress

[Brief assessment of whether we're on track to achieve this goal]

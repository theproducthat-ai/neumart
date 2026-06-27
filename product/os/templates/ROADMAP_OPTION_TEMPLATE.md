---
id: ""                               # e.g. RMO-001
object_type: RoadmapOption
title: ""
status: ""                           # draft | under-review | selected | rejected
priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
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
# RoadmapOption

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Roadmap Option object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/roadmap-options/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Roadmap Option: [RMO-NNN]

## Core Fields
```
option_id:           RMO-NNN
parent_roadmap_item: RMI-NNN
title:               [Short option title]
status:              [draft | under-review | selected | rejected]
proposed_by:         [Name / role]
proposed_date:       YYYY-MM-DD
```

## Option Description
```
summary:             [What does this option propose?]
approach:            |
  [Detailed description of the approach]
```

## Evaluation
```
pros:
  - 
cons:
  - 
effort_estimate:     [XS | S | M | L | XL]
cost_impact:         [low | medium | high]
risk_level:          [low | medium | high]
dependencies:        []
technical_feasibility: [confirmed | likely | unknown | risky]
```

## Business Fit
```
aligns_with_goal:    [yes | partial | no]
target_user_impact:  [description]
expected_value:      [description]
```

## Decision
```
selected:            [yes | no | pending]
rejection_reason:    [If rejected, why]
decision_date:       YYYY-MM-DD
decided_by:          [Name]
linked_decision:     [RMD-NNN]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

---
id: ""                               # e.g. RMI-001
object_type: RoadmapItem
title: ""
status: ""                           # idea | under-discussion | approved | converted | rejected | deferred
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
# RoadmapItem

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Capturing a strategic candidate for future work — something on the horizon that needs discussion, scoring, or a go/no-go decision before it enters the backlog.
**Do not use this when:** Work already confirmed for delivery (use BACKLOG_ITEM_TEMPLATE.md or create a FEATURE object). Requests still being triaged (use REQUEST_OBJECT_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/roadmap-items/`
**Related templates:** BACKLOG_ITEM_TEMPLATE.md, ROADMAP_OPTION_TEMPLATE.md, FEATURE_OBJECT_TEMPLATE.md

---


# Roadmap Item: [RMI-NNN]

## Core Fields
```
roadmap_item_id:     RMI-NNN
title:               [Short descriptive title]
status:              [idea | under-discussion | approved | converted | rejected | deferred]
decision_status:     [undecided | in-discussion | decided]
source:              [stakeholder | client | support | analytics | competitive | internal | strategic | regulatory]
submitted_by:        [Name / role]
submitted_date:      YYYY-MM-DD
target_quarter:      [Q1-YYYY | TBD]
release_candidate:   [REL-NNN or TBD]
```

## Problem and Value
```
problem_statement:   [What problem does this solve?]
target_user:         [Who benefits?]
business_goal:       [Which business goal does this serve?]
expected_value:      [What outcome is expected?]
```

## Source Materials
```
source_materials:
  - type: [pdf | excel | figma | email | meeting-notes | screenshot | url]
    description: [What this material contains]
    location: [Link or file path]
```

## Assessment
```
priority_score:      [1–10]
confidence:          [low | medium | high]
effort_estimate:     [XS | S | M | L | XL | unknown]
dependencies:        []
risks:               []
```

## Options
List options under `product/objects/roadmap-options/` if applicable:
| Option ID | Summary | Status |
|-----------|---------|--------|
| RMO-NNN | | |

## Links
```
linked_requests:           []
linked_features:           []
linked_modules:            []
linked_reference_materials: []
linked_discovery_evidence:  []
```

## Conversion
```
converted_to_type:   [request | feature | initiative | experiment | N/A]
converted_to_id:     [REQ-NNN | FEA-NNN | N/A]
converted_date:      YYYY-MM-DD
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

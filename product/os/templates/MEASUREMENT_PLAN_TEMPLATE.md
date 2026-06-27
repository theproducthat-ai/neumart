---
id: MP-XXXX
object_type: measurement-plan
title: ""
status: planned
# Status: planned | instrumented | live | evaluated | completed

feature_ref: ""
release_ref: ""

success_metrics:
  - metric_ref: ""
    metric_name: ""
    baseline: ""
    target: ""

guardrail_metrics:
  - metric_ref: ""
    metric_name: ""
    threshold: ""

analytics_events: []
dashboard_ref: ""

measurement_window: "30 days"
evaluation_date: ""

metric_owner: ""
owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change

---
# measurement-plan

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Measurement Plan object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/measurement-plans/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# MP-XXXX: Measurement Plan — [Feature Name]

## Feature

**Feature**: [FEAT-XXX — feature name]  
**Release**: [REL-XXXX]

## Success Metrics

These are the metrics that must improve for the feature to be considered a success.

| Metric | Definition | Baseline | Target | Measurement Window |
|---|---|---|---|---|
| [MET-XXXX] | [definition] | [current value] | [target] | [window] |

## Guardrail Metrics

These metrics must not degrade as a result of this feature.

| Metric | Definition | Current Value | Alert Threshold |
|---|---|---|---|
| [MET-XXXX] | [definition] | [value] | [< X% degradation] |

## Analytics Events Required

| Event | Purpose | Status |
|---|---|---|
| [EVT-XXX] | [what it measures] | defined |

## Dashboard

**Dashboard**: [DASH-XXXX — where to see the data]

## Evaluation

**Evaluation date**: [when will we review results?]  
**Measurement window**: [how long after release before we evaluate]  
**Owner**: [who runs the evaluation?]

## Instrumentation Status

- [ ] Analytics events defined
- [ ] Analytics events implemented by engineering
- [ ] Events verified in analytics platform
- [ ] Dashboard created and showing data
- [ ] Baseline values recorded before release

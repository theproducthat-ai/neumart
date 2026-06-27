---
id: EXP-XXXX
object_type: experiment
title: ""
status: hypothesis
# Status: hypothesis | designed | running | analysed | decision-made | inconclusive | stopped-early

hypothesis: ""
control: ""
variant: ""

feature_ref: ""
feature_flag_ref: ""

success_metric: ""
success_metric_ref: "MET-XXXX"
guardrail_metric: ""
guardrail_metric_ref: "MET-XXXX"

minimum_detectable_effect: ""
required_sample_size: 0
confidence_level: 95

start_date: ""
end_date: ""

results:
  control_value: ""
  variant_value: ""
  relative_change: ""
  statistical_significance: ""
  p_value: ""

decision: ""
decision_date: ""

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
success_metrics: []              # KPI IDs or descriptive metrics
guardrail_metrics: []            # Metrics that must not regress
analytics_events: []             # ANALYTICS_EVENT-... IDs
dashboard_required: false        # Whether a dashboard object is needed
baseline_value: ""               # Current baseline before change
target_value: ""                 # Target value after change
measurement_window: ""           # e.g. "30 days post-release"
metric_owner: ""                 # Who owns tracking this metric

---
# experiment

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Running an A/B test or controlled experiment to validate a hypothesis before committing to full implementation.
**Do not use this when:** Features that are simply being shipped with a feature flag (use FEATURE_FLAG_OBJECT_TEMPLATE.md). Exploratory research (use RESEARCH_NOTE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/experiments/`
**Related templates:** FEATURE_FLAG_OBJECT_TEMPLATE.md, MEASUREMENT_PLAN_TEMPLATE.md, FEATURE_OBJECT_TEMPLATE.md

---


# EXP-XXXX: Experiment — [Title]

## Hypothesis

**We believe that** [proposed change]  
**Will result in** [expected outcome]  
**We will know this is true when** [success metric] changes by [X%] or more  
**The risk is** [guardrail metric] does not degrade by more than [Y%]

## Design

**Control**: [current experience]  
**Variant**: [new experience]  
**Feature flag**: [FF-XXXX]

## Metrics

**Success metric**: [MET-XXXX — definition]  
**Guardrail metric**: [MET-XXXX — definition]  
**Minimum detectable effect**: [X%]  
**Required sample size**: [N per variant]  
**Confidence level**: 95%  
**Expected duration**: [X days]

## Results

| Metric | Control | Variant | Change | Significant? |
|---|---|---|---|---|
| Success metric | | | | |
| Guardrail metric | | | | |

**Statistical significance**: [p-value]  
**Confidence interval**: [range]

## Decision

**Decision**: [ship | don't ship | iterate | extend experiment]  
**Rationale**: [why this decision was made]  
**Date**: [date]

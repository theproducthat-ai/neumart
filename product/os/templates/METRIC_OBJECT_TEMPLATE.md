---
id: MET-XXXX
object_type: metric
title: ""
name: ""
status: defined
# Status: defined | instrumented | active | deprecated

category: product
# Category: product | business | operational | support | technical

definition: ""
data_source: ""
calculation: ""
# How is this metric calculated?

current_value: ""
target_value: ""
baseline_value: ""

measurement_window: ""
# e.g., 7-day rolling average, monthly, per session

metric_owner: ""
owner: ""
feature_ref: ""
dashboard_ref: ""
kpi_ref: ""

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

---
# metric

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Metric object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/metrics/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# MET-XXXX: [Metric Name]

## Definition

**What it measures**: [clear, unambiguous definition]  
**Why it matters**: [why does this metric matter to the business or users?]

## Calculation

```
Metric = [formula]
Example: Add-to-cart rate = (Sessions with cart add) / (Total sessions) × 100
```

**Data source**: [database table / analytics platform / manual]  
**Measurement window**: [7-day rolling | monthly | per-session | real-time]

## Targets

| Target Type | Value | Notes |
|---|---|---|
| Baseline (before feature) | | |
| Target (post-feature) | | |
| Current | | |
| Red / alert threshold | | |

## Dashboard

**Visualised in**: [DASH-XXXX or dashboard name]  
**Update frequency**: [real-time | daily | weekly]

## Related Metrics

| Metric | Relationship |
|---|---|
| | Success metric |
| | Guardrail metric |

## Notes

[Any known data quality issues, calculation quirks, or context needed to interpret correctly]

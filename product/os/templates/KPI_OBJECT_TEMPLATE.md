---
id: KPI-XXXX
object_type: kpi
title: ""
name: ""
status: active
# Status: defined | active | deprecated

definition: ""
category: product
# Category: product | business | operational | support | technical

target: ""
current_value: ""
data_source: ""
frequency: monthly
# Frequency: real-time | daily | weekly | monthly | quarterly

metric_ref: ""
dashboard_ref: ""

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
# kpi

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Kpi object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/kpis/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# KPI-XXXX: [KPI Name]

## Definition

[Precise, unambiguous definition of this KPI]

## Importance

[Why does this KPI matter? What business outcome does it track?]

## Calculation

```
[Formula or calculation method]
```

## Targets

| Period | Target | Actual | Status |
|---|---|---|---|
| Current quarter | | | |
| Previous quarter | | | |
| Year target | | | |

## Data Source

**Source**: [where data comes from]  
**Metric object**: [MET-XXXX]  
**Dashboard**: [DASH-XXXX]  
**Updated**: [frequency]

## Historical Trend

[Summary of trend over last 3-6 periods]

## Notes

[Any interpretation notes, seasonal factors, or known data quality issues]

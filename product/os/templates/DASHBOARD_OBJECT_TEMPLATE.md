---
id: DASH-XXXX
object_type: dashboard
title: ""
status: planned
# Status: planned | building | active | outdated | archived

purpose: ""
audience: []
# Audiences: leadership | product | engineering | support | operations | business | all

metrics_displayed: []
data_source: ""
dashboard_url: ""
refresh_frequency: daily
# Frequency: real-time | hourly | daily | weekly | manual

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

---
# dashboard

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Dashboard object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/dashboards/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# DASH-XXXX: [Dashboard Name]

## Purpose

[What does this dashboard show and who is it for?]

## Audience

[Who uses this dashboard and how often?]

## Metrics

| Metric | Visualisation | Time Range | Notes |
|---|---|---|---|
| [MET-XXXX — name] | line chart / bar / number | 30 days | |
| | | | |

## Data Source

**Source**: [analytics platform / database / data warehouse]  
**Refresh**: [real-time | daily batch | etc.]  
**Dashboard URL**: [link]

## Access

**Who can view**: [all | role-restricted]  
**Who can edit**: [owner + analytics team]

## Maintenance

[Who is responsible for keeping this dashboard accurate and up to date?]

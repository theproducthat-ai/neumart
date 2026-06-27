---
id: PSCORE-XXXX
object_type: priority-score
owner: ""
title: ""
status: draft
# Status: draft | approved | superseded

request_ref: ""
feature_ref: ""

# Scoring: 1 = lowest, 5 = highest (effort is inverse — 5 = small effort)
scores:
  business_value: 0
  customer_value: 0
  revenue_impact: 0
  strategic_alignment: 0
  client_commitment: 0
  risk_reduction: 0
  engineering_effort: 0
  urgency: 0

total_score: 0
max_possible: 40

scored_by: ""
approved_by: ""

created_date: ""
updated_date: ""

notes: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# priority-score

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Priority Score object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/priority-scores/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# PSCORE-XXXX: Priority Score — [Request/Feature Title]

## Object Being Scored

**Request**: [REQ-XXXX — title]  
**Feature**: [FEAT-XXX if applicable]

## Scoring

| Factor | Score (1-5) | Rationale |
|---|---|---|
| Business value | X | [why this score] |
| Customer value | X | [why this score] |
| Revenue impact | X | [why this score] |
| Strategic alignment | X | [why this score — aligns with which OKR?] |
| Client commitment | X | [is there a client commitment attached?] |
| Risk reduction | X | [does this mitigate a known risk?] |
| Engineering effort | X | [inverse — 5 = small effort] |
| Urgency | X | [time-sensitive?] |
| **Total** | **X/40** | |

## Scoring Legend

| Score | Business Value | Customer Value | Engineering Effort |
|---|---|---|---|
| 5 | Critical to business | Must-have for users | < 1 sprint |
| 4 | Significant value | High value | 1-2 sprints |
| 3 | Moderate value | Moderate value | 2-4 sprints |
| 2 | Low value | Nice to have | 4-8 sprints |
| 1 | Minimal value | Negligible | > 8 sprints |

## Recommendation

**Final score**: [X/40]  
**Priority**: [critical | high | medium | low]  
**Recommended lane**: [Fast Fix | Small Enhancement | Standard Feature | Strategic Initiative | Defer]  
**Rationale**: [brief summary of why this score leads to this priority]

---
id: ""                               # e.g. ASSM-COM-PLP-001
object_type: Assumption
title: ""
status: ""                           # open | validated | invalidated | deferred

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
schema_version: "2.0"
template_version: "1.0"
---

# Assumption Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** You are documenting an unverified belief that a decision, design, or feature depends on.
**Do not use this when:** The fact is already confirmed — use a DECISION or DISCOVERY_EVIDENCE instead.
**Source-of-truth folder:** `product/objects/assumptions/`
**Related templates:** RISK_OBJECT_TEMPLATE.md, DECISION_OBJECT_TEMPLATE.md, DISCOVERY_EVIDENCE_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| Assumption ID | ASSM-NNN |
| Title | [Short label for this assumption] |
| Category | user-behaviour \| technical \| business \| market \| dependency |
| Status | open \| validated \| invalidated \| deferred |
| Confidence | low \| medium \| high |
| Impact if Wrong | critical \| high \| medium \| low |

## Statement

> **We assume that** [clear, testable statement of what we believe to be true].

## Why We Are Making This Assumption

[Why this assumption exists — context, constraints, or missing information that led to it.]

## What We Would Need to Validate It

[What evidence, experiment, or data would confirm or refute this assumption.]

## Validation Plan

```
validation_method:  [survey | analytics | prototype | user interview | A/B test | spike]
validation_owner:   [Who will run the validation]
validation_by:      YYYY-MM-DD
validation_status:  not-started | in-progress | complete
```

## Outcome

```
result:             [What we found — fill in after validation]
validated_by:       [Name]
validated_date:     YYYY-MM-DD
outcome_note:       [Any implications of the result]
```

## Impact on Feature / PRD

[How this assumption affects design, scope, or technical decisions. What changes if invalidated.]

## Linked Objects

```
linked_feature:     FEATURE-... 
linked_prd:         PRD-...
linked_risks:       []
linked_decisions:   []
```

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```

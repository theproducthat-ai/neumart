---
id: ""                               # e.g. REQ-0042
object_type: Request
title: ""
status: ""                           # new | triaged | accepted | rejected | deferred

priority: ""                         # critical | high | medium | low

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""
linked_request: ""
linked_risks: []
linked_decisions: []

owner: ""
created_by: ""
created_date: ""
updated_date: ""
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# Quick Request: [REQ-NNNN]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** Simple, single-sentence request for a small UI fix, copy change, config tweak, or minor workflow change. Will resolve with ≤3 stories and no schema change.
**Do not use this when:** The request requires a new feature, schema changes, new API endpoints, cross-module impact, or client commitment. Use REQUEST_OBJECT_TEMPLATE.md instead.
**Source-of-truth folder:** `product/objects/requests/`
**Related templates:** REQUEST_OBJECT_TEMPLATE.md, BUG_MINOR_TEMPLATE.md

---

## What Is Being Requested

[One or two sentences. What should change and why?]

## Who Needs This

**Requester:** [Name / team]
**Affected users:** [customers | admins | delivery agents | all]

## Acceptance

[How do we know this is done? One clear, verifiable statement.]

## Lane

Lane 1 — Fast Fix or Lane 2 — Small Enhancement

## Linked Objects

```
linked_feature:   FEATURE-...
linked_bug:       ""
output_story:     US-...
```

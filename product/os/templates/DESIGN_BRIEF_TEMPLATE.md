---
id: DES-XXXX
object_type: design
title: ""
status: brief-created
# Status: brief-created | in-design | in-review | approved | handed-off | revision-requested

feature_ref: ""
prd_ref: ""

designer: ""
figma_url: ""
figma_frame_url: ""

design_required: true
figma_required: true
ux_review_required: true

screens_in_scope: []
affected_components: []

required_states:
  loading: false
  empty: false
  error: false
  success: false
  disabled: false
  mobile: false
  permission_denied: false

accessibility_reviewed: false
wcag_level: AA

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
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# design

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Design Brief object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/design-briefs/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# DES-XXXX: Design Brief — [Feature Name]

## Context

**Feature**: [FEAT-XXX]  
**PRD**: [PRD-XXXX]  
**Design type**: [new design | redesign | component update]

## Design Objectives

[What should this design achieve? What user problems does it solve?]

## Screens in Scope

| Screen ID | Screen Name | Type |
|---|---|---|
| SCR-XXX | | new / update |

## Required Screen States

Per `design/SCREEN_STATE_RULES.md`, confirm all required states are designed:

- [ ] **Loading** — skeleton or spinner while data loads
- [ ] **Empty** — no items, first-time user, zero results
- [ ] **Error** — API failure, validation error, network error
- [ ] **Success** — confirmation of a completed action
- [ ] **Disabled** — unavailable action states
- [ ] **Mobile** — responsive at 375px minimum
- [ ] **Permission denied** — user lacks access

## Affected Components

[Which existing design system components will be used or modified?]

## Design Constraints

[Any technical, brand, or UX constraints to be aware of]

## Figma Deliverables

- [ ] Wireframes / low-fidelity
- [ ] High-fidelity screens (all states)
- [ ] Component annotations
- [ ] Prototype (if required)
- [ ] Handoff spec

## Figma Link

[Add Figma URL when available]

## Review & Approval

| Reviewer | Status | Date | Notes |
|---|---|---|---|
| Product Manager | pending | | |
| Engineering Lead | pending | | |

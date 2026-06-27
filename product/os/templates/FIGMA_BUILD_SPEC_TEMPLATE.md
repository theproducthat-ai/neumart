---
id: ""                               # e.g. FIG-COM-PLP-CAROUSEL-001
object_type: FigmaBuildSpec
title: ""
status: ""                           # draft | in-review | approved | implemented
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

---
# FigmaBuildSpec

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Figma Build Spec object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/figma-build-specs/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Figma Build Spec: [FIG-NNN or FEA-NNN]

A Figma-ready specification document. Used when no Figma design exists yet and a designer (or the Figma AI integration) needs precise guidance to build the design.

---

## Overview
```
spec_for:            [Screen name or feature name]
linked_screen:       SCR-NNN
linked_feature:      FEA-NNN
linked_prd:          PRD-NNN
created_by:          [Name / role or AI]
created_date:        YYYY-MM-DD
figma_target_file:   [Figma file URL if known, or TBD]
```

---

## User Goal
```
user_goal:           |
  [In one sentence: what is the user trying to accomplish on this screen?]
```

---

## Screen Layout

Describe the layout in sections:

### Header
- [ ] Content:
- [ ] Behaviour:

### Primary Content Area
- [ ] Content:
- [ ] Behaviour:

### Secondary / Sidebar
- [ ] Content:
- [ ] Behaviour (if applicable):

### Footer / CTA
- [ ] Content:
- [ ] Behaviour:

---

## Key UI Elements

| Element | Type | Label / Content | Behaviour | Notes |
|---------|------|-----------------|-----------|-------|
| | | | | |

---

## States to Design

| State | Trigger | Key Visual Differences |
|-------|---------|----------------------|
| Default | Normal load | |
| Loading | Data fetching | Skeleton or spinner |
| Empty | No data | Empty state illustration + CTA |
| Error | API failure | Error message + retry |
| Success | Action completed | Confirmation UI |

---

## Typography and Spacing
```
heading_style:       [H1 | H2 | H3 — use design system tokens]
body_style:          [Body | Small — use design system tokens]
spacing_unit:        [4px base grid]
```

---

## Colour Usage
```
primary_action:      [Use design system primary colour token]
secondary_action:    [Use design system secondary colour token]
destructive_action:  [Use design system destructive colour token]
surface:             [bg-card or bg-background token]
```

---

## Component References
List shadcn/ui components that should be used:
- 

---

## Mobile Breakpoints
```
mobile_layout:       [Describe how layout adapts at 390px]
tablet_layout:       [If applicable]
```

---

## Accessibility Notes
- 
- 

---

## Open Design Questions
- 

---

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
```

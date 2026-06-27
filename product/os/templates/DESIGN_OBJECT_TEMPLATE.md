---
id: ""                               # e.g. DESIGN-COM-PLP-CAROUSEL-001
object_type: Design
title: ""
status: ""                           # draft | in-review | approved | superseded

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

# Design Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a finalised or in-progress visual/UX design for a feature or screen. This is the design artifact record — not the brief (use DESIGN_BRIEF) and not the Figma link (use FIGMA_LINK).
**Do not use this when:** You only have a Figma URL to reference — use FIGMA_LINK_TEMPLATE.md. For a handoff to engineering, use FIGMA_HANDOFF_TEMPLATE.md.
**Source-of-truth folder:** `product/objects/designs/`
**Related templates:** DESIGN_BRIEF_TEMPLATE.md, FIGMA_LINK_TEMPLATE.md, FIGMA_HANDOFF_TEMPLATE.md, FIGMA_BUILD_SPEC_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| Design ID | DESIGN-NNN |
| Title | [Short name for this design] |
| Type | screen \| component \| flow \| system \| pattern |
| Status | draft \| in-review \| approved \| superseded |
| Design Tool | Figma \| Sketch \| other |
| Design Phase | wireframe \| low-fidelity \| high-fidelity \| prototype |

## Figma Reference

```
figma_file_url:     [Figma file URL]
figma_frame_url:    [Direct link to the specific frame or page]
figma_version:      [Figma version or branch name]
last_exported:      YYYY-MM-DD
```

## Screens / Frames Covered

| Screen / Frame | Route | Notes |
|---|---|---|
| [screen name] | [/route or screen ID] | [description] |

## Design Decisions

[Key decisions made in this design — why certain directions were chosen. Link to DECISION objects where decisions are formally documented.]

## Accessibility

```
wcag_level:         [AA | AAA | not-assessed]
colour_contrast:    [checked | not-checked]
keyboard_nav:       [designed | not-designed]
screen_reader:      [designed | not-designed]
```

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile (< 768px) | [description] |
| Tablet (768–1024px) | [description] |
| Desktop (> 1024px) | [description] |

## Approval

```
approved_by:        [Name / role]
approved_date:      YYYY-MM-DD
approval_notes:     [Any conditions or caveats]
```

## Linked Objects

```
linked_feature:     FEATURE-...
linked_prd:         PRD-...
linked_screens:     []           # SCREEN-... IDs
linked_figma_links: []           # FIGMA-LINK-... IDs
linked_handoff:     FIGMA-HANDOFF-...
```

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```

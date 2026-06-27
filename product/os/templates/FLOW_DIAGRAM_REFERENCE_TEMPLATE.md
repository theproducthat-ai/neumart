---
id: ""                               # e.g. FLW-001
object_type: FlowDiagram
title: ""
status: ""                           # active | archived
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
# FlowDiagram

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Flow Diagram Reference object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/flow-diagram-references/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Flow Diagram Reference: [FLW-NNN]

## Core Fields
```
flow_id:         FLW-NNN
title:           [Descriptive title]
type:            [user-flow | process-flow | system-flow | data-flow | decision-tree | state-machine | other]
created_by:      [Name / role]
created_date:    YYYY-MM-DD
tool:            [figma | miro | figjam | lucidchart | mermaid | draw.io | other]
```

## Location
```
url:             [Direct link to diagram]
figma_frame:     [Figma frame ID or URL if applicable]
file_path:       [If stored in repo — e.g., .mermaid or .svg file]
```

## Description
```
summary:         |
  [What does this flow depict? What is the start and end point?]
scope:           [Which screens, steps, or systems are in scope]
out_of_scope:    [What is intentionally excluded]
```

## Linked Objects
```
linked_features:       []
linked_prds:           []
linked_screens:        []
linked_roadmap_items:  []
linked_stories:        []
```

## Status
```
status:          [draft | review | approved | outdated]
last_reviewed:   YYYY-MM-DD
```

## Audit
```
added_by:        [Human | AI]
added_date:      YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

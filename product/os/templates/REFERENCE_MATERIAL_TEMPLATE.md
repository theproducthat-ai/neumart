---
id: ""                               # e.g. REF-001
object_type: ReferenceMaterial
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
# ReferenceMaterial

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Reference Material object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/reference-materials/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Reference Material: [REF-NNN]

## Core Fields
```
reference_id:    REF-NNN
title:           [Descriptive title for the material]
type:            [pdf | excel | google-doc | figma | email | meeting-notes | screenshot | url | other]
source:          [Who provided or created this material]
received_date:   YYYY-MM-DD
```

## Content Summary
```
summary:         |
  [What does this material contain? Why is it relevant?]
key_insights:
  - 
```

## Location
```
url:             [Link if accessible]
file_path:       [Path in repo or shared drive if stored locally]
drive_folder:    [Google Drive folder or similar]
access_level:    [public | internal | restricted]
```

## Linked Objects
```
linked_roadmap_items:  []
linked_features:       []
linked_prds:           []
linked_decisions:      []
linked_discovery:      []
```

## Audit
```
added_by:        [Human | AI]
added_date:      YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

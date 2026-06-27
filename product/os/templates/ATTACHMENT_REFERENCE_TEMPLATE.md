---
id: ""                               # e.g. ATT-001
object_type: Attachment
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
# Attachment

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Attachment Reference object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/attachment-references/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Attachment Reference: [ATT-NNN]

## Core Fields
```
attachment_id:   ATT-NNN
title:           [Descriptive title for the attachment]
type:            [pdf | excel | google-doc | google-sheet | figma | image | email-thread | recording | other]
attached_by:     [Name / role]
attached_date:   YYYY-MM-DD
```

## Location
```
url:             [Direct link]
drive_path:      [Google Drive path or shared location]
file_name:       [Original file name]
access_level:    [public | internal | restricted]
```

## Context
```
why_attached:    |
  [Why is this attachment relevant to the linked object?]
key_content:     |
  [Brief summary of what the file contains]
```

## Linked To
```
linked_object_type: [prd | feature | roadmap-item | incident | discovery | other]
linked_object_id:   [Object ID]
```

## Audit
```
added_by:        [Human | AI]
added_date:      YYYY-MM-DD
```

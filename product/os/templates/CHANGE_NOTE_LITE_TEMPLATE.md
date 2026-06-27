---
id: ""                               # e.g. CN-COM-PLP-001
object_type: ChangeNote
title: ""
status: ""                           # draft | published

priority: ""                         # critical | high | medium | low

module_id: ""
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

# Change Note (Lite): [CN-NNN]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** A brief midstream note recording a small, scoped change to scope, behaviour, or a design decision that happened during delivery. Not a full scope change — just a note.
**Do not use this when:** The change significantly alters feature scope, budget, timeline, or requires stakeholder re-approval. Use SCOPE_CHANGE_TEMPLATE.md for those.
**Source-of-truth folder:** `product/objects/change-notes/`
**Related templates:** SCOPE_CHANGE_TEMPLATE.md, CHANGE_NOTE_TEMPLATE.md

---

## What Changed

[One or two sentences. What specifically changed?]

## Why

[Brief reason — business decision, technical constraint, user feedback, etc.]

## Impact

- **Scope:** [expanded | reduced | no change]
- **Timeline:** [affected | not affected]
- **Stories affected:** [US-... IDs or "none"]

## Decision Made By

**[Name]** — [Date]

## Notes

[Any follow-up actions, risks, or references.]

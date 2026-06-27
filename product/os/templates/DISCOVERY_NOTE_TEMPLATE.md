---
id: ""                               # e.g. DSN-001
object_type: DiscoveryNote
title: ""
status: ""                           # open | evaluated | applied | parked | closed
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
# DiscoveryNote

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A midstream finding or observation that emerged during delivery, design, or discovery — not planned research but worth capturing.
**Do not use this when:** Planned research outputs (use RESEARCH_NOTE_TEMPLATE.md). Supporting artifacts like screenshots or recordings (use DISCOVERY_EVIDENCE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/discovery-notes/`
**Related templates:** RESEARCH_NOTE_TEMPLATE.md, DISCOVERY_EVIDENCE_TEMPLATE.md, OPEN_QUESTION_TEMPLATE.md

---


# Discovery Note: [DSN-NNN]

## Core Fields
```
discovery_note_id:   DSN-NNN
title:               [Short title for what was discovered]
status:              [open | evaluated | applied | parked | closed]
discovered_at_stage: [prd | design | development | qa | uat | release]
discovered_by:       [Name / role]
discovered_date:     YYYY-MM-DD
```

## Linked Object
```
parent_object_type:  [prd | feature | story | design | module | release]
parent_object_id:    [Object ID]
```

## Discovery
```
discovery_summary:   |
  [What new information, constraint, or insight was found?]
context:             |
  [How was this discovered? What led to it?]
```

## Classification
```
discovery_type:      [new-requirement | constraint | assumption-invalidated | risk | opportunity | clarification | conflict | dependency | other]
urgency:             [blocking | high | medium | low]
requires_change:     [yes | no | unknown]
```

## Evaluation
```
evaluated_by:        [Name]
evaluation_date:     YYYY-MM-DD
evaluation_outcome:  [clarification | minor-addition | scope-change | new-subfeature | new-feature | separate-request | bug | risk | blocker | no-change-needed]
resulting_objects:   [CHN-NNN | SCH-NNN | REQ-NNN | BUG-NNN | RSK-NNN | N/A]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

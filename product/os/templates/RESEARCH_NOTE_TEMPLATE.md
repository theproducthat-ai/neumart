---
id: ""                               # e.g. RSN-001
object_type: ResearchNote
title: ""
status: ""                           # draft | reviewed | applied | archived
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
# ResearchNote

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Recording planned or completed research output — user interviews, market research, competitive analysis, or data studies.
**Do not use this when:** Unplanned midstream findings during delivery (use DISCOVERY_NOTE_TEMPLATE.md). Raw supporting artifacts (use DISCOVERY_EVIDENCE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/research-notes/`
**Related templates:** DISCOVERY_NOTE_TEMPLATE.md, DISCOVERY_EVIDENCE_TEMPLATE.md, UX_REVIEW_TEMPLATE.md

---


# Research Note: [RSN-NNN]

## Core Fields
```
research_note_id: RSN-NNN
title:            [Short descriptive title]
type:             [user-interview | competitor-analysis | market-research | expert-review | stakeholder-interview | desk-research | other]
conducted_by:     [Name / role]
date:             YYYY-MM-DD
participants:     [Count or description, no PII]
```

## Context
```
research_question: |
  [What were we trying to learn?]
methodology:       |
  [How was this research conducted?]
```

## Findings
```
key_findings:
  - 
insights:
  - 
patterns_observed:
  - 
surprises:
  - 
```

## Supporting Evidence
```
linked_evidence:  [EVD-NNN, EVD-NNN]
quotes:
  - "[Quote]" — [Participant ID, no PII]
```

## Implications
```
product_implications:
  - 
recommended_actions:
  - 
open_questions:
  - 
```

## Linked Objects
```
linked_roadmap_items:  []
linked_prds:           []
linked_features:       []
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

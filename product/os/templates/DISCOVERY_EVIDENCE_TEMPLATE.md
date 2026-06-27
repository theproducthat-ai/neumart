---
id: ""                               # e.g. EVD-001
object_type: DiscoveryEvidence
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
# DiscoveryEvidence

**Template status:** Active
**Schema version:** 2.0
**Use this when:** A supporting artifact that provides evidence for a research finding, assumption validation, or design decision — a recording, screenshot, data export, or quote.
**Do not use this when:** Analysis or interpretation of evidence (use DISCOVERY_NOTE_TEMPLATE.md or RESEARCH_NOTE_TEMPLATE.md). The findings themselves — this template is for the raw artifact.
**Source-of-truth folder:** `product/objects/discovery-evidence/`
**Related templates:** RESEARCH_NOTE_TEMPLATE.md, DISCOVERY_NOTE_TEMPLATE.md, ASSUMPTION_OBJECT_TEMPLATE.md

---


# Discovery Evidence: [EVD-NNN]

## Core Fields
```
evidence_id:     EVD-NNN
title:           [Short descriptive title]
type:            [user-interview | survey | analytics | usability-test | support-data | competitive | stakeholder-input | other]
collected_by:    [Name / role]
collection_date: YYYY-MM-DD
sample_size:     [Number of participants / data points, if applicable]
```

## Evidence Summary
```
question_being_answered: |
  [What product question or hypothesis does this evidence address?]
key_findings:
  - 
supporting_quotes:
  - "[Quote]" — [source identifier, no PII]
```

## Raw Data Location
```
url:             [Link if accessible]
file_path:       [Path if stored locally]
access_level:    [public | internal | restricted]
```

## Confidence and Limitations
```
confidence:      [low | medium | high]
limitations:     |
  [Sample bias, methodology gaps, date of collection, etc.]
```

## Linked Objects
```
linked_roadmap_items:  []
linked_prds:           []
linked_features:       []
linked_research_notes: []
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

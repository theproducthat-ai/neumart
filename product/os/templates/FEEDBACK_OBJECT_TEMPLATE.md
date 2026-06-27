---
id: FB-XXXX
object_type: feedback
title: ""
status: collected
# Status: collected | reviewed | actioned | noted | archived

source: ""
source_type: user
# Source type: user | client | support | nps | csat | interview | survey | sales

sentiment: neutral
# Sentiment: positive | neutral | negative | mixed

theme: ""
# e.g., navigation, checkout, performance, pricing, delivery

feature_ref: ""
raw_feedback: ""

actioned: false
action_taken: ""
request_created: ""

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
# feedback

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Feedback object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/feedbacks/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# FB-XXXX: [Feedback Title / Theme]

## Raw Feedback

> "[Verbatim or paraphrased feedback]"

## Context

**Source**: [user name/handle or "anonymous"]  
**Channel**: [support ticket / review / NPS / interview / etc.]  
**Date received**: [date]  
**Feature being used**: [feature ref]

## Analysis

**Sentiment**: [positive | negative | neutral | mixed]  
**Theme**: [navigation | checkout | performance | etc.]  
**Frequency**: [one-off | recurring — seen X times]

## Action Taken

**Actioned**: [yes / no / noted for future]  
**Action**: [what was done — e.g., "created REQ-XXXX", "added to backlog", "logged in known issues"]

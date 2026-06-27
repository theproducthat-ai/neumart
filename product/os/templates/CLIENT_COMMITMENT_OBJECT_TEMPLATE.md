---
id: CC-XXXX
object_type: client-commitment
title: ""
status: active
# Status: active | on-track | at-risk | delivered | missed | renegotiated

client_ref: "STK-XXXX"
committed_feature: ""
committed_date: ""
committed_by: ""
evidence: ""
# Where is this commitment recorded? (email, contract, meeting notes URL)

urgency: high
# Urgency: critical | high | medium | low

current_status: on-track
delivery_date_actual: ""

feature_ref: ""
release_ref: ""

owner: ""
created_date: ""
updated_date: ""

customer_visible: true
internal_only: false

risks: []
escalation_triggered: false

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
# client-commitment

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Client Commitment object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/client-commitments/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# CC-XXXX: [Commitment Title]

## Commitment Summary

**Client**: [client name — link to STK-XXXX]  
**What was committed**: [feature or capability]  
**Committed date**: [when the commitment was made]  
**Committed by**: [who made the commitment]  
**Delivery deadline**: [date]

## Evidence

[Link to contract, email, meeting notes, or other evidence of the commitment]

## Current Status

**Status**: [on-track | at-risk | delivered | missed | renegotiated]  
**Last updated**: [date]  
**Progress notes**: [brief status update]

## Delivery Plan

**Feature ref**: [FEAT-XXX]  
**Release target**: [REL-XXXX]  
**Expected delivery date**: [date]

## Risk

[Is this commitment at risk? What is the mitigation?]

## Communication Log

| Date | Communication | To | From |
|---|---|---|---|
| | | | |

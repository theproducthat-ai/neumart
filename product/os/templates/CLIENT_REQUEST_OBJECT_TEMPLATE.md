---
id: CR-XXXX
object_type: client-request
title: ""
status: received
# Status: received | reviewed | approved | rejected | deferred | converted-to-request

client_ref: "STK-XXXX"
request_description: ""
urgency: medium
contractual: false
business_impact: ""

submitted_by: ""
submitted_date: ""

decision: ""
decision_date: ""
request_ref: ""
commitment_ref: ""

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
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# client-request

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Client Request object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/client-requests/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# CR-XXXX: [Client Request Title]

## Request

[What is the client requesting?]

## Client Context

**Client**: [STK-XXXX — client name]  
**Submitted via**: [email | support | account review | contract]  
**Is this contractual**: [yes / no]  
**Client urgency**: [how urgent is this for the client?]

## Business Impact

[What happens if we don't fulfil this request? Churn risk? Renewal impact?]

## Product Team Decision

**Decision**: [approved | rejected | deferred | alternative proposed]  
**Rationale**: [why]  
**Timeline if approved**: [when could this be delivered?]  
**Request created**: [REQ-XXXX if approved]  
**Client response**: [what was communicated to the client?]

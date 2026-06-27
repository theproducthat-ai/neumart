---
id: SR-XXXX
object_type: sales-request
title: ""
status: submitted
# Status: submitted | reviewed | approved | rejected | deferred | converted-to-request

deal_name: ""
deal_value: ""
deal_stage: ""
urgency: high
feature_requested: ""
business_justification: ""

submitted_by: ""
submitted_date: ""
decision_needed_by: ""

approved: false
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
# sales-request

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Sales Request object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/sales-requests/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# SR-XXXX: [Sales Request Title]

## Request

[What product feature or capability is being requested for a sales deal?]

## Deal Context

**Deal name**: [prospect/client name]  
**Deal value**: [estimated ARR/revenue]  
**Deal stage**: [qualification | proposal | negotiation | closing]  
**Deal timeline**: [when does the deal need to close?]

## Business Justification

[Why is this feature critical to closing the deal? What happens if we don't build it?]

## Feature Request Details

[Detailed description of what is being requested]

## Product Team Decision

**Decision**: [approved | rejected | deferred | alternative proposed]  
**Rationale**: [why this decision was made]  
**Timeline if approved**: [when could this be delivered?]  
**Request created**: [REQ-XXXX]

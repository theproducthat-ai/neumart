---
id: ST-XXXX
object_type: support-ticket
title: ""
status: open
# Status: open | in-progress | resolved | escalated | closed-no-action

customer: ""
issue_description: ""
frequency: one-off
# Frequency: one-off | recurring | widespread

product_impact: medium
# Impact: critical | high | medium | low

assigned_to: ""
resolution: ""
resolved_date: ""

escalated_to_product: false
escalation_ref: ""
bug_created: ""
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
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# support-ticket

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Support Ticket object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/support-tickets/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# ST-XXXX: [Support Ticket Title]

## Issue Description

[Describe the user issue. What were they trying to do? What went wrong?]

## Customer Details

**Customer**: [name or anonymised reference]  
**Segment**: [customer type if relevant]  
**When reported**: [date]

## Frequency

**Occurrences**: [how many customers/times has this been reported?]  
**Pattern**: [is this related to a specific feature, flow, or user type?]

## Product Impact

**Severity**: [critical | high | medium | low]  
**Affected feature**: [feature ref]

## Resolution

**Status**: [open | resolved | escalated | closed]  
**Resolution**: [what was done to resolve for the customer]  
**Root cause**: [if known]

## Escalation

**Escalated to product**: [yes / no]  
**Bug or request created**: [BUG-XXXX / REQ-XXXX]

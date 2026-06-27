---
id: APR-XXXX
object_type: approval
title: ""
status: pending
# Status: pending | approved | rejected | conditional-approval | expired

object_ref: ""
object_type_ref: ""
# What is being approved (e.g., PRD-0005, REL-0002)

required_approvers:
  - name: ""
    role: ""
    status: pending
    decided_at: ""
    notes: ""

approval_deadline: ""
decision: ""
approved_by: []

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
# approval

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Approval object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/approvals/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# APR-XXXX: Approval — [What Is Being Approved]

## What Needs Approval

**Object**: [link to the object being approved]  
**Type**: [PRD approval | release go/no-go | budget approval | design approval | etc.]  
**Deadline**: [date]

## Context

[Why is this approval needed? What decision is being made?]

## Required Approvers

| Approver | Role | Status | Date | Notes |
|---|---|---|---|---|
| [name] | [role] | pending | | |
| [name] | [role] | pending | | |

## Approval Criteria

[What must be true for this to be approved?]

## Decision

**Final decision**: [pending | approved | rejected | conditional]  
**Decision date**: [date]  
**Decision notes**: [any conditions or notes]

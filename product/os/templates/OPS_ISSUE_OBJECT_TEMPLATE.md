---
id: OPS-XXXX
object_type: ops-issue
title: ""
status: open
# Status: open | in-progress | resolved | workaround-in-place | escalated

impact_on_operations: ""
frequency: occasional
# Frequency: daily | weekly | occasional | one-off
workaround: ""
product_change_needed: true

feature_ref: ""
request_created: ""
sop_ref: ""

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
# ops-issue

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Ops Issue object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/ops-issues/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# OPS-XXXX: [Ops Issue Title]

## Issue Description

[What operational task is broken or inefficient? What can't operations do?]

## Impact on Operations

**Frequency**: [how often does this affect operations?]  
**Impact**: [what goes wrong when this happens?]  
**Manual effort required**: [what workaround is being used?]

## Current Workaround

[How is operations working around this today?]

## Product Change Needed

**Change required**: [yes / no / unknown]  
**Description**: [what product change would fix this?]  
**Request created**: [REQ-XXXX if applicable]

## Resolution

[How was this resolved, and when?]

---
id: ESC-XXXX
object_type: escalation
title: ""
status: open
# Status: open | in-progress | resolved | closed-unresolved

escalated_from: ""
# What triggered this escalation (ST-XXXX, INC-XXXX, RISK-XXXX)
escalated_to: ""
# Who is receiving the escalation

reason: ""
urgency: high
# Urgency: critical | high | medium | low
business_impact: ""
deadline: ""

resolution: ""
resolved_date: ""

owner: ""
created_date: ""
updated_date: ""

related_objects: []

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
# escalation

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Escalation object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/escalations/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# ESC-XXXX: [Escalation Title]

## What Is Being Escalated

[Clear description of the situation that requires escalation]

## Why Escalation Is Needed

[Why can't this be resolved at the current level?]

## Business Impact

[What happens if this is not resolved urgently?]

## Escalated From

**Source**: [support ticket / incident / risk / blocker]  
**Original owner**: [who was handling it before escalation]

## Escalated To

**Recipient**: [name + role]  
**Method**: [Slack | email | call | meeting]  
**Date escalated**: [date]

## Resolution

**Resolution**: [what was decided or done]  
**Resolved by**: [name]  
**Resolved date**: [date]

## Actions Required

- [ ] [Action 1]
- [ ] [Action 2]

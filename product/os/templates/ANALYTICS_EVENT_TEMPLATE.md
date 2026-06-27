---
id: EVT-XXX-XXX
object_type: analytics-event
title: ""
event_name: ""
# snake_case name used in code: e.g., product_added_to_cart
status: defined
# Status: defined | implemented | active | deprecated

trigger: ""
user_role: customer
# Role: customer | admin | delivery-agent | system

screen: ""
feature_ref: ""
metrics_powered: []

owner: ""
created_date: ""
updated_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# analytics-event

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Analytics Event object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/analytics-events/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Analytics Event: [EVENT_NAME]

## Event Overview

**Event name (code)**: `[event_name_in_snake_case]`  
**Trigger**: [exactly what user action or system event fires this]  
**User role**: [customer | admin | delivery-agent | system]  
**Screen**: [where does this event fire?]

## Properties

| Property | Type | Required | Description | Example |
|---|---|---|---|---|
| `user_id` | string | yes | User identifier | "usr_123" |
| `session_id` | string | yes | Session identifier | "sess_abc" |
| `[property]` | string | yes/no | [description] | "[example]" |

## Metrics This Powers

| Metric | Calculation Role |
|---|---|
| [MET-XXXX metric name] | numerator / denominator / event count |

## Implementation Notes

[Any technical notes for the engineer implementing this event]

## Validation

- [ ] Fires on correct trigger
- [ ] All required properties populated
- [ ] No PII in event properties
- [ ] Tested in development environment
- [ ] Confirmed in analytics platform

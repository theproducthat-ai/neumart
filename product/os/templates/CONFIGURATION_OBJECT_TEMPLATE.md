---
id: ""                               # e.g. CONFIG-PAY-RAZORPAY-001
object_type: Configuration
title: ""
status: ""                           # draft | active | deprecated

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
schema_version: "2.0"
template_version: "1.0"
---

# Configuration Object

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a named configuration set, feature switch, environment variable group, or integration parameter block that must be tracked as a product artifact.
**Do not use this when:** The configuration is already captured fully in a FEATURE_FLAG object. Use FEATURE_FLAG_OBJECT_TEMPLATE.md for flag-gated configurations.
**Source-of-truth folder:** `product/objects/configurations/`
**Related templates:** FEATURE_FLAG_OBJECT_TEMPLATE.md, ENVIRONMENT_OBJECT_TEMPLATE.md, INTEGRATION_OBJECT_TEMPLATE.md

---

## Core Fields

| Field | Value |
|---|---|
| Configuration ID | CONFIG-NNN |
| Name | [Human-readable name] |
| Type | feature-flag \| integration \| environment \| service \| api-key-group \| threshold |
| Scope | global \| module \| feature \| environment-specific |
| Status | draft \| active \| deprecated |
| Sensitive | yes \| no |

## Configuration Values

```
config_key:         [e.g. RAZORPAY_KEY_ID]
config_value:       [value or placeholder — never store real secrets here]
default_value:      [default if not set]
allowed_values:     [range or enum if constrained]
required:           yes | no
validation_rule:    [e.g. must be non-empty string, must be numeric > 0]
```

## Environment Mapping

| Environment | Value / Setting |
|---|---|
| Local | [value or placeholder] |
| Staging | [value or placeholder] |
| Production | [value or placeholder] |

## Where Used

```
used_in_module:     [module(s) that read this config]
used_in_service:    [service or function that references it]
injection_method:   [env var | Convex env | runtime config | build-time]
last_changed_by:    [who last updated this config]
```

## Linked Objects

```
linked_feature:         FEATURE-...
linked_feature_flag:    FF-...
linked_environment:     ENV-...
linked_decision:        DECISION-...
```

## Notes

[Any constraints, rotation policy, or ops notes.]

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```

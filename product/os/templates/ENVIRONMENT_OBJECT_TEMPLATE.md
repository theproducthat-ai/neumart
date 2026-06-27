---
id: ""                               # e.g. ENV-LOCAL | ENV-STAGING | ENV-PROD
object_type: Environment
title: ""
status: ""                           # active | deprecated | planned
priority: ""                         # critical | high | medium | low

module_id: ""                        # Leave empty for cross-environment objects
feature_id: ""                       # FEATURE-... ID (if environment is feature-specific)
linked_request: ""                   # REQUEST-... ID (omit if not applicable)
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs

owner: ""
created_by: ""
created_date: ""                     # YYYY-MM-DD
updated_date: ""                     # YYYY-MM-DD
version: "1.0"
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# Environment

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Environment object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/environments/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Environment Object: [ENV-NNN]

## Core Fields

| Field | Value |
|---|---|
| Environment ID | ENV-NNN |
| Name | [e.g. Local Development, Staging, Production] |
| Type | local \| staging \| production \| ci \| preview |
| Status | active \| deprecated \| planned |
| URL / Host | [environment URL or host address] |

## Access and Auth

| Field | Value |
|---|---|
| Access Level | public \| internal \| restricted |
| Auth Provider | [Clerk / None / Custom] |
| Auth Mode | [same as production? Y/N] |
| Admin Access | [how to get admin access] |

## Configuration

```
database:          [Convex project name / connection string type]
storage:           [storage bucket / local]
payment_gateway:   [Razorpay test mode / live / none]
feature_flags:     [all on | all off | config-driven]
external_services: [list external integrations active in this env]
```

## Deployment

```
deploy_method:     [Vercel / manual / CI pipeline]
branch:            [main | staging | feature branches]
auto_deploy:       [yes | no]
deploy_frequency:  [on-push | manual | scheduled]
last_deployed:     YYYY-MM-DD
```

## Data State

```
seed_data:         [yes | no — does this environment use seeded test data?]
production_data:   [no — never use production data in non-prod environments]
data_reset_policy: [e.g., reset weekly | persistent | on deploy]
```

## Linked Objects

```
linked_builds:     []     # BUILD-... IDs deployed to this environment
linked_releases:   []     # RELEASE-... IDs targeting this environment
linked_features:   []     # FEATURE-... IDs active/tested in this environment
```

## Notes

[Any environment-specific constraints, known issues, or configuration notes.]

## Audit

```
created_by:    [Human | AI]
created_date:  YYYY-MM-DD
updated_date:  YYYY-MM-DD
```

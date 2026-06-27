---
id: ""                               # e.g. RTE-001
object_type: Route
title: ""
status: ""                           # active | planned | deprecated
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
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# Route

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Route object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/routes/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Route Object: [RTE-NNN]

## Core Fields
```
route_id:            RTE-NNN
route_path:          [/path, e.g. /products/[id]]
route_type:          [page | layout | api-webhook | parallel-route | intercepted-route]
status:              [active | planned | deprecated]
```

## Ownership
```
module_id:           MOD-NNN
feature_ids:         [FEA-NNN]
screen_id:           SCR-NNN
```

## File Location
```
file_path:           [e.g. neumart/app/(customer)/products/[id]/page.tsx]
layout_path:         [e.g. neumart/app/(customer)/layout.tsx]
```

## Access Rules
```
auth_required:       [yes | no]
roles_allowed:       [customer | admin | guest | all]
redirect_if_unauth:  [/sign-in or N/A]
clerk_middleware:    [yes | no]
```

## URL Params
```
dynamic_segments:    [[id], [slug], etc.]
search_params:       [?q, ?page, etc.]
```

## Linked Objects
```
linked_screen:       SCR-NNN
linked_features:     []
linked_prds:         []
linked_components:   [UIC-NNN]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

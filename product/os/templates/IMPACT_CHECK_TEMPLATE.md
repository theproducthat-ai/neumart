---
id: ""                               # e.g. IMP-001
object_type: ImpactCheck
title: ""
status: ""                           # pending | complete
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
# ImpactCheck

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Impact Check object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/impact-checks/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Impact Check: [IMP-NNN]

## Core Fields
```
impact_check_id:     IMP-NNN
title:               [Short title — what change is being assessed]
status:              [pending | complete]
triggered_by:        [CHN-NNN | DSN-NNN | SCH-NNN]
assessed_by:         [Name / role]
assessed_date:       YYYY-MM-DD
```

## Change Being Assessed
```
change_summary:      |
  [Brief description of the change or discovery being impact-assessed]
```

## Impact Assessment

| Area | Impacted? | Severity | Action Required |
|------|-----------|----------|-----------------|
| PRD | yes / no / unknown | high / medium / low / N/A | [action or N/A] |
| User Stories | yes / no / unknown | | |
| Design | yes / no / unknown | | |
| Technical Design | yes / no / unknown | | |
| Data Model / Schema | yes / no / unknown | | |
| API Contracts | yes / no / unknown | | |
| QA Test Plan | yes / no / unknown | | |
| UAT Plan | yes / no / unknown | | |
| Release Plan | yes / no / unknown | | |
| Support / Ops Readiness | yes / no / unknown | | |
| Roadmap | yes / no / unknown | | |

## Required Actions
List each update needed as a result of this impact check:
1. 
2. 

## Resulting Objects
| Object Type | Object ID | Action |
|-------------|-----------|--------|
| | | |

## Overall Assessment
```
overall_severity:    [high | medium | low | none]
recommendation:      [update-current-object | create-new-version | create-child-request | park | reject | no-action]
blocks_progress:     [yes | no]
approval_needed:     [yes | no]
```

## Audit
```
created_by:      [Human | AI]
created_date:    YYYY-MM-DD
last_updated:    YYYY-MM-DD
```

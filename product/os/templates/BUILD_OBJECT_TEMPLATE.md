---
id: BUILD-XXXX
object_type: build
title: ""
version: ""
status: building
# Status: building | built | deployed-staging | deployed-production | rolled-back

environment: staging
release_ref: ""
commit_sha: ""

deployed_at: ""
deployed_by: ""
deployment_notes: ""

owner: ""
created_date: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
updated_date: ""                     # YYYY-MM-DD
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""                       # FEATURE-... ID (omit if not applicable)
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# build

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Build object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/builds/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# BUILD-XXXX: Build Record

## Build Details

**Version**: [version string]  
**Commit**: [SHA or branch]  
**Release**: [REL-XXXX]

## Deployment History

| Environment | Deployed At | Deployed By | Status |
|---|---|---|---|
| Staging | | | |
| Production | | | |

## Deployment Notes

[Any notes about the deployment — migration run, feature flags changed, etc.]

## Post-Deployment Checks

- [ ] Application is running
- [ ] No error spike in monitoring
- [ ] Key flows tested
- [ ] Feature flags in correct state

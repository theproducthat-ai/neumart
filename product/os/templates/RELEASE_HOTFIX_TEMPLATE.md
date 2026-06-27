---
id: ""                               # e.g. RELEASE-HOTFIX-2026-06-001
object_type: Release
title: ""
status: ""                           # Planned | In Progress | Released | Rolled Back

priority: critical                   # Hotfixes are always critical priority

module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
feature_id: ""
linked_request: ""
linked_risks: []
linked_decisions: []

owner: ""
created_by: ""
created_date: ""
updated_date: ""
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# Hotfix Release: [RELEASE-HOTFIX-NNN]

**Template status:** Active — Lite Variant
**Schema version:** 2.0
**Use this when:** An emergency fix to a production issue that must ship outside of the normal release cycle. Typically triggered by an Incident or critical Bug.
**Do not use this when:** This is a planned release, even an urgent one. Use RELEASE_OBJECT_TEMPLATE.md for planned releases.
**Source-of-truth folder:** `product/objects/releases/`
**Related templates:** RELEASE_OBJECT_TEMPLATE.md, BUG_OBJECT_TEMPLATE.md, INCIDENT_OBJECT_TEMPLATE.md

---

## Summary

[One or two sentences: what is being fixed and why it is urgent?]

## Trigger

```
incident_id:     INCIDENT-...       # if triggered by incident
bug_id:          BUG-...            # root cause bug
reported_at:     YYYY-MM-DD HH:MM
severity:        P0 | P1
users_affected:  [estimate or description]
```

## What Changed

| File / Area | Change Description |
|---|---|
| [file or area] | [what was changed and why] |

## Approval

| Step | Owner | Status |
|---|---|---|
| Engineering sign-off | Engineering Lead | pending \| approved |
| Product sign-off | Product Lead | pending \| approved |

## Deployment

```
deploy_method:   [Vercel auto-deploy | manual]
target_env:      production
deploy_date:     YYYY-MM-DD
deploy_time:     HH:MM UTC
deployed_by:     [Name]
commit_sha:      [short SHA]
```

## Rollback Plan

[How to revert if the hotfix causes new issues. Be specific.]

```
rollback_trigger:  [e.g. error rate > 5% | payment failures detected]
rollback_method:   [Vercel revert | git revert + redeploy]
rollback_owner:    [Name]
rollback_time_est: [e.g. 10 minutes]
```

## Post-Deploy Checks

- [ ] Core flow working: [most critical user flow]
- [ ] No new errors in logs
- [ ] Linked incident resolved
- [ ] Incident object updated with resolution

## Notes

[Any context about the decision to hotfix vs. standard release.]

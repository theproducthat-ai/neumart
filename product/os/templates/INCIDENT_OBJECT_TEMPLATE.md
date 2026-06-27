---
id: INC-XXXX
object_type: incident
title: ""
status: detected
# Status: detected | investigating | mitigated | resolved | post-mortem-pending | closed

severity: P2
# Severity: P1 (complete outage) | P2 (major degradation) | P3 (partial) | P4 (minor)

detected_at: ""
mitigated_at: ""
resolved_at: ""

affected_users: 0
affected_percentage: ""
affected_features: []
affected_modules: []

incident_commander: ""
responders: []

owner: ""
created_date: ""
updated_date: ""

rca_required: true
rca_ref: ""

related_objects:
  bugs: []
  risks: []

customer_communication_sent: false
support_briefed: false

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
# incident

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Documenting a production outage, critical degradation, or major service disruption as it is happening and in the post-mortem phase.
**Do not use this when:** Bugs found during QA (use BUG_OBJECT_TEMPLATE.md). Issues that are known but not actively causing outages (use KNOWN_ISSUE_TEMPLATE.md).
**Source-of-truth folder:** `product/objects/incidents/`
**Related templates:** RCA_TEMPLATE.md, BUG_OBJECT_TEMPLATE.md, RELEASE_HOTFIX_TEMPLATE.md, KNOWN_ISSUE_TEMPLATE.md

---


# INC-XXXX: [Incident Title]

## Summary

[1-2 sentence summary of what happened and the impact]

## Timeline

| Time | Event | Who |
|---|---|---|
| HH:MM | Incident detected | |
| HH:MM | Investigation started | |
| HH:MM | Root cause identified | |
| HH:MM | Mitigation applied | |
| HH:MM | Service restored | |

## Impact

**Users affected**: [number or %]  
**Duration**: [HH:MM]  
**Features affected**: [list]  
**Revenue impact**: [estimate if applicable]

## Root Cause (Initial)

[Brief initial root cause — full RCA in `rcas/RCA-XXXX.md`]

## Resolution

[What was done to resolve the incident?]

## Immediate Actions Taken

- [ ] Service restored
- [ ] Users notified
- [ ] Support briefed
- [ ] Monitoring confirmed normal

## Post-Incident Actions

- [ ] RCA completed: RCA-XXXX
- [ ] Bug filed: BUG-XXXX
- [ ] Risk assessed: RISK-XXXX
- [ ] Process improvement identified

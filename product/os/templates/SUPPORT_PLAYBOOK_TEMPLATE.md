---
id: SPB-XXXX
object_type: support-playbook
title: ""
status: draft
# Status: draft | reviewed | active | outdated | archived

scenario: ""
trigger: ""
# What triggers this playbook to be used?

feature_ref: ""
release_ref: ""

owner: ""
created_date: ""
updated_date: ""
last_reviewed: ""
linked_risks: []                     # RISK-... IDs
linked_decisions: []                 # DECISION-... IDs
version: "1.0"
created_by: ""
priority: ""                         # critical | high | medium | low
module_id: ""                        # MOD-COM | MOD-ADM | MOD-DEL | MOD-INV | MOD-PAY | MOD-USR | MOD-RPT
schema_version: "2.0"              # Product OS schema generation version
template_version: "1.0"           # Version of this template file

---
# support-playbook

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Support Playbook object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/support-playbooks/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# SPB-XXXX: Support Playbook — [Scenario Title]

## Scenario

**What happened**: [description of the user issue or scenario]  
**Trigger**: [what causes support to use this playbook]  
**Affected feature**: [FEAT-XXX]

## Identification

[How does support identify this is the right playbook to use?]
- Symptom 1
- Symptom 2

## Resolution Steps

1. [Step 1 — what to check first]
2. [Step 2]
3. [Step 3 — common fix]
4. [Step 4 — if common fix doesn't work]

## Escalation Path

If this playbook doesn't resolve the issue:

**Escalate to**: [Product Manager | Engineering Lead]  
**How**: [Slack | email | escalation form]  
**Severity**: [P1 | P2 | P3]  
**Include in escalation**: [what information to include]

## Do Not

- [What support should NOT do in this scenario]
- [Common mistake to avoid]

## Customer Communication Template

> "Hi [name], thank you for reaching out. [explanation of what happened]. [What we're doing to fix it]. [Next steps]. Please let us know if you need further assistance."

## Known Issues

[Link to `known-issues/KI-XXXX` if applicable]

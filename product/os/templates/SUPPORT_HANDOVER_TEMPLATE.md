---
id: ""                               # e.g. SHO-COM-001
object_type: SupportHandover
title: ""
status: ""                           # draft | ready | active | resolved
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
# SupportHandover

**Template status:** Active
**Schema version:** 2.0
**Use this when:** Creating or documenting a new Support Handover object.
**Do not use this when:** When another more specific object type better describes what you are documenting.
**Source-of-truth folder:** `product/objects/support-handovers/`
**Related templates:** _(see TEMPLATE_REGISTRY.md)_

---


# Support Handover Template

_Instructions: Fill in all sections before the handover review meeting with Support Lead. Delete instructions (italic text) before submitting. Link this document from the release object._

---

## Handover Details

- **Feature**: [Feature name and ID]
- **Release**: [REL-XXXX]
- **Go-live date**: [Date]
- **Prepared by**: [Product Lead name]
- **Support Lead sign-off**: [ ] Pending / [x] Signed off
- **Sign-off date**: —

---

## 1. What Changed

_Plain-language summary of what is new or different. Write for a non-technical reader. No jargon._

---

## 2. What Customers Will See

_Describe or attach screenshots of the new UI/flow. Walk through the customer journey step-by-step._

**New screens / flows**:
- [Step 1]
- [Step 2]
- [Step 3]

---

## 3. Expected Customer Questions

_Top 3-5 questions customers are likely to ask about this feature. Written as Q&A._

**Q: [Most likely question]**
A: [Answer support should give]

**Q:**
A:

**Q:**
A:

---

## 4. Known Limitations or Edge Cases

_Anything that doesn't work in certain conditions. Be specific about which conditions._

| Situation | Behaviour | Workaround |
|---|---|---|
| [Condition] | [What happens] | [What to tell the customer] |

_If no known limitations: write "None at go-live."_

---

## 5. Error Messages

_If the feature introduces new error messages, list each one and explain what it means and what the customer should do._

| Error Message | Meaning | Customer Action |
|---|---|---|
| "[Error text]" | [What caused it] | [What to do] |

---

## 6. What Support Can Resolve Directly

_Actions Support can take without Engineering involvement._

- [ ] [Action 1 — e.g., verify account settings, resend confirmation email]
- [ ] [Action 2]
- [ ] [Action 3]

---

## 7. What Requires Engineering Escalation

_Scenarios that cannot be resolved by Support — need a code or data fix._

| Scenario | Escalation Path |
|---|---|
| [Describe scenario] | Engineering Lead via [channel] |

---

## 8. Kill Switch / Rollback

_If this feature has a feature flag: confirm who can disable it and how._

- Feature flag: `ff_[module]_[description]` / No feature flag
- Who can disable: Engineering Lead
- How to request: [Slack channel / direct message to Engineering Lead]
- Effect of disabling: [What happens for customers if the flag is turned off]

---

## Support Lead Sign-Off Checklist

- [ ] All sections completed
- [ ] Support agent team briefed
- [ ] Known limitations documented
- [ ] Escalation path confirmed
- [ ] Support Lead is comfortable handling customer contacts for this feature

---

_Related: `product/support-ops/SUPPORT_HANDOVER_RULES.md`_

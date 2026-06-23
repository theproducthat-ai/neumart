# Nuemart Product OS — Product Request Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-request`

---

## Purpose
Intake a new product request, classify it, map it to the product hierarchy, create or link Feature Objects, identify open questions and risks. Every new piece of work that enters the system must pass through this interface first.

---

## Triggered By
- User types `/product-request` followed by a natural language description of the need, problem, or idea.
- User pastes a stakeholder request, Slack message, meeting note, or user feedback and prefixes with `/product-request`.

---

## Pre-conditions
None. This is the entry point of the product lifecycle. No prior objects are required.

---

## Inputs
What the user provides (in any format, any length):
- Description of the need, idea, or problem
- Optional: business context, stakeholder name, urgency level
- Optional: reference to existing features or modules

---

## What AI Never Asks
The AI never asks the user to:
- Assign IDs or sequence numbers — AI generates these from the counter and naming conventions
- Classify the request type — AI infers from context (New Feature vs Enhancement vs Bug Fix etc.)
- Identify the module or sub-module — AI maps from context and product knowledge
- Write formal acceptance criteria — that happens in /product-prd
- Estimate complexity — that happens in /product-evaluate

---

## AI Reasoning Steps

1. **Parse the input.** Extract the core problem or need from the user's natural language description. Separate the "what" from the "why."

2. **Classify the request type.** Determine: New Feature / Enhancement / Bug Fix / Config / Technical Debt / Documentation / Emergency. Use keywords, context, and module references to infer.

3. **Map to product hierarchy.** Identify the product area (COM / ADM / DEL / INV / PAY / USR / RPT), module, and sub-module most relevant to this request. If multiple modules are affected, identify the primary owner.

4. **Assign semantic ID.** Construct: `REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}` (e.g. `REQUEST-COM-PLP-CAROUSEL-001`). Increment sequence from last known ID in that namespace.

5. **Identify or create Feature Object links.** Search existing Feature Objects for overlap. If a matching feature exists, link to it. If new, flag for Feature Object creation and assign `FEATURE-{AREA}-{MODULE}-{SLUG}`.

6. **Detect blocking flags.** Scan description for: schema changes, payment flows, authentication, security implications, third-party integrations, release dependencies. Flag each one.

7. **Surface open questions.** Identify anything ambiguous, unstated, or requiring business decision. Create an Open Question Object for each. Do not assume answers.

8. **Assess initial risk.** If blocking flags detected or scope appears large, create Risk Object drafts. Assign risk category and initial probability/impact.

9. **Draft the Request Object.** Populate all frontmatter fields. Write problem statement and desired outcome summaries.

10. **Determine next action.** Based on classification and completeness, recommend: /product-grill (if discovery needed), /product-evaluate (if prioritization needed), /product-prd (if straightforward enough to proceed).

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Request Object | `product/objects/requests/` | Created |
| Feature Object | `product/objects/features/` | Created (if new) or linked (if existing) |
| Open Question Objects | `product/objects/questions/` | Created (one per open question) |
| Risk Objects | `product/objects/risks/` | Created (if high-risk flags detected) |

---

## Required Relationships Established

- `Request → has_feature → Feature Object`
- `Request → has_risk → Risk Object` (if risks detected)
- `Request → requires_question → Open Question Object`
- `Feature Object → sourced_from → Request Object`

---

## Required Metadata Populated

On the Request Object:
- `object_id` — semantic ID
- `legacy_id` — REQ-XXXX (backwards compatibility)
- `status` — Submitted → Classified
- `request_type` — inferred classification
- `module_code` — mapped from context
- `blocking_flags` — list of detected flags
- `classification_confidence` — High / Medium / Low
- `feature_impact` — creates / changes / extends / deprecates feature IDs

---

## Definition of Done

- [ ] Request Object created with all required frontmatter fields populated
- [ ] Request classified with type and confidence noted
- [ ] Module and sub-module mapped
- [ ] At least one Feature Object linked or created
- [ ] All open questions surfaced as Open Question Objects
- [ ] Blocking flags detected and documented
- [ ] Risk Objects created for any identified high-risk elements
- [ ] Next action clearly stated
- [ ] File written to `product/objects/requests/`

---

## Output Format

```
REQUEST INTAKE COMPLETE
=======================
Request ID:       REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}
Legacy ID:        REQ-XXXX
Title:            [inferred title]
Type:             [New Feature / Enhancement / Bug Fix / ...]
Confidence:       [High / Medium / Low]
Primary Module:   [COM / ADM / DEL / ...]
Sub-module:       [PLP / PDP / CART / ...]

FEATURE IMPACT:
- Creates:    [FEATURE-...] (if new)
- Changes:    [FEATURE-...] (if existing)

BLOCKING FLAGS:
- [flag 1] — [brief explanation]
- [flag 2] — [brief explanation]
(or: None detected)

OPEN QUESTIONS ({n} total):
1. [Question text] → [QUESTION-...]
2. [Question text] → [QUESTION-...]

RISKS IDENTIFIED ({n} total):
1. [Risk summary] — Probability: [H/M/L] | Impact: [Critical/High/Medium/Low]

NEXT ACTION:
→ Run /product-grill to resolve open questions and define MVP scope
  (or /product-evaluate if prioritization is needed first)

File written: product/objects/requests/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| More than 2 open questions | `/product-grill` |
| High uncertainty about scope | `/product-grill` |
| Competing priorities need resolution | `/product-evaluate` |
| Clear, small, well-defined scope | `/product-prd` |
| Emergency or hotfix | `/product-prd` with Emergency flag |

---

## Failure Conditions

- **Input too vague:** AI asks one clarifying question (the minimum needed) and waits.
- **Module cannot be determined:** AI lists the two most likely modules and asks user to confirm.
- **Duplicate request detected:** AI surfaces the existing Request Object and asks whether to link, merge, or proceed as new.
- **Blocking flag without context:** AI notes the flag as "unresolved" and adds it to open questions.

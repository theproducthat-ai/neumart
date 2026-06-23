# Nuemart Product OS — Product Grill Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-grill`

---

## Purpose
Deep-dive discovery session for an approved or classified request. Systematically resolve all open questions, surface assumptions, define MVP scope, and establish what is explicitly out of scope. The Grill phase transforms a rough intake into a well-understood, decision-ready product brief.

---

## Triggered By
- User types `/product-grill <REQUEST-ID>` or `/product-grill` with context.
- User references a request by name or description and asks for discovery.
- Automatically recommended by `/product-request` when open questions exceed 2.

---

## Pre-conditions
- Request Object must exist in `product/objects/requests/`.
- Request Object status must be `Classified` or higher (i.e., `/product-request` has been run).
- If status is `Submitted`, AI will note the gap and offer to classify first.

---

## Inputs
- Request Object ID (e.g. `REQUEST-COM-PLP-CAROUSEL-001`)
- Optional: additional context, stakeholder notes, user research snippets
- Optional: constraints (time, budget, technical, regulatory)

---

## AI Reasoning Steps

1. **Load the Request Object.** Read all frontmatter, open questions, risks, and feature links from the Request Object.

2. **Inventory open questions.** List all Open Question Objects linked to this request. Identify which are unresolved, which have tentative answers, and which are blocking vs non-blocking.

3. **Conduct structured discovery.** For each question category below, reason through what is known and what is missing:
   - **Who** — which users/roles are affected? What are their jobs-to-be-done?
   - **What** — what is the core user action or system behavior being changed?
   - **Why** — what business outcome does this serve? What is the cost of not building it?
   - **When** — is there a deadline? A dependency that gates this?
   - **How** — is there a preferred technical approach or constraint?
   - **Edge cases** — what are the boundary conditions, failure modes, and unusual states?
   - **Data** — what data is created, read, updated, or deleted? Any schema impacts?
   - **Integration** — does this touch Clerk, Convex, Razorpay, or external APIs?
   - **Rules** — are there business rules, pricing rules, role-based restrictions, or compliance requirements?

4. **Resolve open questions.** For each Open Question Object: mark resolved with answer, or escalate as a Decision Candidate requiring product owner input.

5. **Create Assumption Objects.** For any question answered by inference (not confirmed by stakeholder): create an Assumption Object. Tag confidence: High / Medium / Low.

6. **Define MVP scope.** Based on resolved questions, identify the minimum viable set of behaviors that satisfies the core user need. Separate must-have from nice-to-have.

7. **Define out-of-scope.** Explicitly enumerate what will NOT be built in this release. Each out-of-scope item should have a brief rationale.

8. **Create the Discovery Session Object.** Capture all findings, Q&A, assumptions, MVP scope, and out-of-scope in a structured object.

9. **Flag decision candidates.** Identify any decisions that require product owner confirmation before proceeding to PRD.

10. **Determine next action.** If all blocking questions resolved → recommend `/product-evaluate` or `/product-prd`. If blocking decisions remain → surface decision candidates.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| Discovery Session Object | `product/objects/discovery/` | Created |
| Open Question Objects | `product/objects/questions/` | Updated (resolved or escalated) |
| Assumption Objects | `product/objects/assumptions/` | Created (one per inference) |
| MVP Scope definition | Embedded in Discovery Session | Created |
| Out-of-Scope Objects | Embedded in Discovery Session | Created |
| Decision Candidate Objects | `product/objects/decisions/` | Created (if escalation needed) |

---

## Required Relationships Established

- `Discovery Session → discovered_in → Request Object`
- `Open Question → resolved_in → Discovery Session`
- `Assumption → derived_from → Discovery Session`
- `Discovery Session → defines_scope_for → Feature Object`
- `Decision Candidate → requires_decision_from → Product Owner`

---

## Required Metadata Populated

On the Discovery Session Object:
- `session_id` — semantic ID
- `linked_request` — Request Object ID
- `questions_resolved` — count
- `questions_escalated` — count
- `assumptions_made` — count
- `mvp_scope_defined` — boolean
- `decision_candidates` — list
- `grilling_status` — Complete / Partial / Blocked

On the Request Object (updated):
- `grilling_status` — Complete
- `status` — Advanced to `Grilled`

---

## Definition of Done

- [ ] All Open Question Objects reviewed (resolved or escalated)
- [ ] Assumption Objects created for all inferences
- [ ] MVP scope clearly defined with must-have list
- [ ] Out-of-scope explicitly enumerated (minimum 3 items or "None explicitly excluded" with rationale)
- [ ] Discovery Session Object written to `product/objects/discovery/`
- [ ] Request Object status updated to `Grilled`
- [ ] Decision candidates surfaced to product owner if any
- [ ] Next action stated

---

## Output Format

```
DISCOVERY SESSION COMPLETE
==========================
Session ID:         [DISCOVERY-...]
Linked Request:     [REQUEST-...]
Feature:            [FEATURE-...]

QUESTIONS RESOLVED ({n}):
1. Q: [question] → A: [answer] — Source: [assumed / confirmed]
2. Q: [question] → A: [answer] — Source: [assumed / confirmed]

QUESTIONS ESCALATED ({n} — requires product owner decision):
1. [Question] — Decision needed: [yes/no/option A/option B]

ASSUMPTIONS MADE ({n}):
1. [Assumption] — Confidence: [High/Medium/Low]

MVP SCOPE:
Must Have:
- [behavior 1]
- [behavior 2]
- [behavior 3]

Nice to Have (deferred):
- [behavior A]
- [behavior B]

OUT OF SCOPE (explicit):
- [item 1] — Reason: [why excluded]
- [item 2] — Reason: [why excluded]

DECISION CANDIDATES:
1. [Decision needed] → Awaiting product owner input

NEXT ACTION:
→ [/product-evaluate | /product-prd | Awaiting decision on item X]

File written: product/objects/discovery/{slug}.md
```

---

## Next Action Recommendation

| Condition | Recommended Next Command |
|---|---|
| All questions resolved, clear scope | `/product-prd` |
| Decision candidates pending | Wait for decisions, then `/product-prd` |
| Large scope or competing priorities | `/product-evaluate` first |
| Risk exposure identified during grilling | `/product-impact` |

---

## Failure Conditions

- **Request Object not found:** AI asks user to provide the correct ID or run `/product-request` first.
- **Request status below Classified:** AI offers to run classification inline and continue.
- **No questions can be resolved without stakeholder input:** AI creates all as Decision Candidates and halts with a summary of what is needed.
- **Circular dependency detected (grilling requires a decision that requires grilling):** AI surfaces the loop and recommends a scope-limiting assumption to break it.

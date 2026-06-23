# Nuemart Product OS — Product Resume Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-resume`

---

## Purpose
Reason over all active Product Objects, surface blockers, incomplete work, pending approvals, and recommend the highest-priority next actions. `/product-resume` is the situational awareness command — it answers "where are we and what should we do next?" at any point in the product lifecycle.

---

## Triggered By
- User types `/product-resume` (no arguments needed).
- User starts a new work session and wants to pick up where they left off.
- User asks "what should I work on next?" or "what's blocked?".
- Automatically recommended at the start of each product OS session.

---

## Pre-conditions
None. Can be run at any time, on any state of the product objects. The command reasons over whatever exists.

---

## Inputs
- No required inputs.
- Optional: filter by module (e.g., `/product-resume COM`) or feature (e.g., `/product-resume FEATURE-COM-PLP-CAROUSEL`).
- Optional: filter by status (e.g., `/product-resume blocked`).

---

## Intelligence Engines Used
- `NEXT_ACTION_ENGINE.md` — determines highest-priority next action per object
- `GAP_DETECTION_ENGINE.md` — identifies missing required relationships and incomplete lifecycle steps
- `TRACEABILITY_ENGINE.md` — traverses relationship graph to find orphaned or broken chains

---

## AI Reasoning Steps

1. **Scan all active Request Objects.** Read status of each. Identify: Submitted (not yet classified), Classified (pending grilling), Grilled (pending evaluation or PRD), In Progress (PRD exists, stories in flight), Blocked, Complete.

2. **Scan all active Feature Objects.** Read maturity for each: Candidate, Planned, In Development, Shipped, Deprecated. Identify any feature that has been In Development for a long period without story completion.

3. **Identify blocked objects.** Any object with a Dependency Object where `blocker: true` and the blocking dependency is unresolved. Any object awaiting a Decision that hasn't been made. Any object waiting for external input (stakeholder, integration, approval).

4. **Identify incomplete lifecycle work.** For each object in flight: what lifecycle step is missing? Apply GAP_DETECTION_ENGINE rules:
   - Request Classified but no Grilling → gap
   - Grilling complete but no PRD → gap
   - PRD Approved but no Stories → gap
   - Stories Done but no Dev Plan → gap
   - Dev Plan complete but no QA Run → gap
   - QA Passed but no UAT → gap
   - UAT Signed Off but no Release → gap
   - Release shipped but no Post-Release Review → gap

5. **Identify objects missing required relationships.** Apply TRACEABILITY_ENGINE:
   - Feature Object with no linked Request → orphaned feature
   - Story with no linked PRD → unanchored story
   - QA Run with no linked stories → uncovered QA
   - Release with no linked UAT → unvalidated release

6. **Identify pending approvals.** PRD Objects in `Pending Approval` status. UAT sign-off awaiting product owner. Release awaiting explicit go-ahead. Decision Candidates awaiting stakeholder input.

7. **Prioritize actions.** Apply NEXT_ACTION_ENGINE rules:
   - Emergency or hotfix requests: highest priority
   - Blocked items: surface blockers first (unblocking creates the most forward progress)
   - Items at UAT or QA: near-complete, high completion value
   - Items at PRD or Stories: mid-cycle, value if moved forward
   - Items at intake: lowest immediate priority unless flagged urgent

8. **Format the output.** Organize into five sections: Active Work, Blocked Work, Incomplete Work, Pending Approvals, Recommended Next Actions.

---

## Product Objects Read (Not Created)
All objects in `product/objects/` are read-only for this command. No objects are created or modified by `/product-resume` unless a gap is explicitly being created as a new object (e.g., a missing Open Question Object surfaced during gap detection).

Objects read:
- All Request Objects
- All Feature Objects
- All Discovery Session Objects
- All PRD Objects
- All Story Objects
- All QA Run Objects
- All UAT Run Objects
- All Release Objects
- All blocked/open Dependency Objects
- All pending Decision Objects
- All open Risk Objects

---

## Definition of Done

- [ ] All active Request Objects reviewed
- [ ] All active Feature Objects reviewed
- [ ] All blocked items identified with blocker details
- [ ] All lifecycle gaps identified
- [ ] All orphaned objects identified
- [ ] All pending approvals listed
- [ ] Recommended next actions prioritized and stated
- [ ] Output formatted per the standard format below

---

## Output Format

```
PRODUCT RESUME
==============
Generated: [YYYY-MM-DD HH:MM]
Scope: [All modules | {filtered scope}]

ACTIVE PRODUCT WORK:
--------------------
[REQUEST-...]   [title]             Status: [Classified]       Next: /product-grill
[REQUEST-...]   [title]             Status: [Grilled]          Next: /product-prd
[FEATURE-...]   [title]             Maturity: [In Development] Next: /product-qa
[FEATURE-...]   [title]             Maturity: [Planned]        Next: /product-devplan
(or: No active work items)

BLOCKED WORK:
-------------
[object-id]   [title]   Blocker: [description of blocker]
              Unblocked by: [what resolves this]
              Waiting on: [person / decision / external factor]
(or: No blocked items)

INCOMPLETE WORK (lifecycle gaps):
----------------------------------
[REQUEST-...]   Grilling complete → PRD not started    Gap: /product-prd needed
[FEATURE-...]   Stories done → Dev plan missing        Gap: /product-devplan needed
[QA-RUN-...]    QA Passed → UAT not initiated          Gap: /product-uat needed
[RELEASE-...]   Released → Post-release review pending  Gap: Schedule review
(or: No lifecycle gaps detected)

PENDING APPROVALS:
------------------
[PRD-...]       [title]    Awaiting: Product Owner PRD approval
[UATRUN-...]    [title]    Awaiting: UAT sign-off
[DECISION-...]  [topic]    Awaiting: Stakeholder decision by [date]
(or: No pending approvals)

RECOMMENDED NEXT ACTIONS:
--------------------------
1. [Highest priority action] → [command or task]
   Reason: [why this is first]

2. [Second priority action] → [command or task]
   Reason: [why this is second]

3. [Third priority action] → [command or task]
   Reason: [why this is third]

4. [Additional actions as needed]
...
```

---

## Next Action Recommendation

This command IS the next action recommendation system. Its output defines the next steps for all active work.

---

## Failure Conditions

- **No Product Objects exist yet:** AI outputs: "No product objects found. Start with `/product-request` to intake your first request."
- **All objects are in terminal states (Shipped/Rejected/Closed):** AI outputs: "All active work is complete. No pending actions. Start a new request with `/product-request`."
- **Object files are corrupted or missing required fields:** AI surfaces the specific objects with issues and recommends running `check <object_id>` via the Product Object Interface to diagnose.
- **Filter returns no results:** AI notes filter applied and outputs "No objects match this filter. Try removing the filter for full status."

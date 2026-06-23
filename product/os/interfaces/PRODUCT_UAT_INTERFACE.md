# Nuemart Product OS — Product UAT Interface
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Command
`/product-uat`

---

## Purpose
Run User Acceptance Testing, collect product owner or stakeholder feedback, capture known limitations, and obtain sign-off. UAT is the final human validation gate before a feature can be released. This interface structures the UAT session to ensure every user-facing acceptance criterion is validated by a human stakeholder.

---

## Triggered By
- User types `/product-uat <FEATURE-ID>` or `/product-uat <QA-RUN-ID>`.
- Automatically recommended by `/product-qa` when QA result is `Passed` or `Conditionally Passed`.
- Product owner initiates a UAT session for a feature ready for sign-off.

---

## Pre-conditions
- QA Run Object must exist with `overall_result: Passed` or `Conditionally Passed`.
- If QA result is `Failed`, AI blocks UAT and directs user to resolve bugs first.
- All Critical and High severity bugs must be in `Fixed` status.
- Product owner or designated stakeholder must be available to evaluate.

---

## Inputs
- Feature Object ID or QA Run Object ID
- Optional: specific scenarios the product owner wants to test
- Optional: feedback from previous UAT rounds (if this is a re-run)
- Optional: device or environment preferences for testing

---

## AI Reasoning Steps

1. **Load upstream QA artifacts.** Read the QA Run Object, all Test Case Objects, all User Story Objects, the PRD, and all linked Bug Objects.

2. **Build UAT Scenario list.** Convert QA test cases into human-readable UAT scenarios. UAT scenarios are written for a non-technical stakeholder: plain language, from the user's perspective, without technical steps. One scenario per key user journey.

3. **Separate user-facing from system scenarios.** UAT focuses on user-facing behavior. System and background stories are validated via QA, not UAT. Flag any scenarios that are user-facing but were not in QA.

4. **Prepare the UAT briefing.** Summarize for the product owner: what they are testing, what was already verified by QA, what they need to validate, and what known limitations exist going in.

5. **Run through each UAT scenario.** For each scenario:
   - Describe the user action in plain language
   - State what the product owner should observe
   - Record: Passed / Failed / Feedback
   - Capture any textual feedback provided

6. **Capture product owner feedback.** For each scenario with feedback: create a Feedback Object. Categorize feedback: Bug / Enhancement Request / Clarification / Wording / Design / Out of Scope.

7. **Handle UAT failures.** For any scenario that fails during UAT:
   - If it's a new bug not found in QA: create a Bug Object and log it
   - If it's a scope clarification: create a Decision Object
   - If it's an enhancement request beyond current scope: create a Feedback Object tagged as future candidate

8. **Assess known limitations.** For each known limitation (from QA Conditionally Passed conditions or product owner feedback): create a Known Limitation Object. These are behaviors that are acknowledged and accepted for this release.

9. **Determine sign-off status.**
   - Signed Off: all must-have scenarios pass, no Critical bugs, product owner explicitly approves
   - Signed Off with Limitations: passes with documented known limitations accepted by product owner
   - Not Signed Off: any critical scenario fails, or product owner explicitly withholds approval

10. **Create the UAT Run Object.** Write the complete UAT session record.

---

## Product Objects Created or Updated

| Object Type | Location | Action |
|---|---|---|
| UAT Run Object | `product/objects/uat-runs/` | Created |
| Feedback Objects | `product/objects/feedback/` | Created (one per feedback item) |
| Sign-off Object | Embedded in UAT Run | Created |
| Known Limitation Objects | `product/objects/limitations/` | Created (if applicable) |
| Bug Objects | `product/objects/bugs/` | Created (for new bugs found in UAT) |
| Feature Object | `product/objects/features/` | Updated with UAT link and sign-off status |

---

## Required Relationships Established

- `UAT Run → validates → Feature Object`
- `UAT Run → follows → QA Run Object`
- `Feedback Object → captured_in → UAT Run`
- `Known Limitation → acknowledged_in → UAT Run`
- `Sign-off → for → Feature Object`
- `Feature Object → has_uat → UAT Run`

---

## Required Metadata Populated

On the UAT Run Object:
- `uat_run_id` — semantic ID
- `linked_feature` — Feature Object ID
- `linked_qa_run` — QA Run Object ID
- `scenarios_total` — count
- `scenarios_passed` — count
- `scenarios_failed` — count
- `product_owner_feedback` — summary text
- `sign_off_status` — Signed Off / Signed Off with Limitations / Not Signed Off
- `sign_off_date` — date
- `known_limitations` — list of Known Limitation Object IDs
- `waiver_reason` — if UAT bypassed (must be explicitly stated)

---

## Definition of Done

- [ ] All user-facing scenarios validated (not just QA test cases)
- [ ] Product owner feedback captured for each scenario
- [ ] Feedback Objects created for all non-trivial feedback
- [ ] Known Limitation Objects created for all accepted limitations
- [ ] New bugs found in UAT logged as Bug Objects
- [ ] Sign-off status explicitly determined (not left ambiguous)
- [ ] UAT Run Object written to `product/objects/uat-runs/`
- [ ] Feature Object updated with sign-off status
- [ ] Next action stated

---

## Output Format

```
UAT RUN COMPLETE
================
UAT Run ID:       [UATRUN-...]
Feature:          [FEATURE-...]
QA Run Reference: [QARUN-...]
Date:             [YYYY-MM-DD]

UAT SCENARIOS:
  Scenario                           | Result   | Feedback
  [User journey description]         | PASS     | —
  [User journey description]         | PASS     | Minor wording issue noted
  [User journey description]         | FAIL     | [feedback] → BUG-XXXX
  ...

SCENARIOS SUMMARY:
  Total:   {n}
  Passed:  {n}
  Failed:  {n}

PRODUCT OWNER FEEDBACK ({n} items):
  [FEEDBACK-...] — [summary] — Category: [Bug/Enhancement/Wording/...]
  [FEEDBACK-...] — [summary] — Category: [...]

NEW BUGS FOUND IN UAT:
  [BUG-XXXX] — [summary] — Severity: [H/M/L]
  (or: None — QA caught all issues)

KNOWN LIMITATIONS ({n} acknowledged):
  1. [limitation] — Accepted by: [product owner name/role]
  2. [limitation] — Accepted by: [product owner name/role]

SIGN-OFF STATUS: [SIGNED OFF | SIGNED OFF WITH LIMITATIONS | NOT SIGNED OFF]
Sign-off Date: [YYYY-MM-DD]
Product Owner: [name/role]

CONDITIONS / NOTES:
- [any conditions on sign-off]

NEXT ACTION:
→ [/product-release to create release plan | Fix UAT failures, then re-run UAT]

Files written:
- product/objects/uat-runs/{slug}.md
- product/objects/feedback/{slug}.md × {n}
- product/objects/limitations/{slug}.md × {n} (if applicable)
```

---

## Next Action Recommendation

| Sign-off Status | Recommended Next Command |
|---|---|
| Signed Off | `/product-release` |
| Signed Off with Limitations | `/product-release` (limitations included in release notes) |
| Not Signed Off | Fix issues, then re-run `/product-uat` |

---

## Failure Conditions

- **QA not passed:** AI blocks UAT and states the QA pre-condition is not met. Directs to fix bugs and re-run QA.
- **Critical bugs remain open:** AI blocks sign-off until confirmed fixed.
- **Product owner not available:** AI can create the UAT Scenario list and wait. Notes that UAT is blocked pending human review.
- **UAT finds a regression in an existing feature:** AI logs the regression bug, notes it as out-of-scope for this UAT but critical to resolve, and creates a separate Request Object for tracking.
- **Waiver requested (skip UAT):** AI creates a Decision Object documenting the waiver reason, requires explicit product owner acknowledgment in the UAT Run, and notes the waiver in the Release Object.

# Work Type Lanes

**Version**: 2.0  
**Owner**: Product Lead  
**Last Updated**: 2026-06-24

---

## Purpose

Not every request needs a full PRD, technical design, UAT, and support handover. The work type lane system matches the level of process rigour to the size and risk of the work. This prevents over-documentation for small changes and ensures adequate governance for complex or high-risk work.

**The system should be lightweight for small changes and complete for major initiatives.**

---

## Lane Selection Decision Tree

```
Is it a production outage?         → Lane 5: Incident
Is it compliance/security?         → Lane 6: Compliance/Security
Is it a bug with clear root cause? → Lane 1: Fast Fix
Is it ≤3 stories, no schema change? → Lane 2: Small Enhancement
Is it tech debt with no user impact? → Lane 7: Tech Debt
Is it a business/ops process change? → Lane 8 or 9
Is it an experiment?               → Lane 10: Experiment
Does it require a new PRD?         → Lane 3 or 4
```

---

## Lane 1 — Fast Fix

**Use when**: A bug has a clear root cause, a simple fix, and no broader impact.

### Entry Criteria
- Defect is clearly identified
- Fix affects ≤1 file / ≤20 lines of code
- No schema, API, or permission changes
- No user-visible change other than fixing the bug

### Required Artifacts
- Bug object in `objects/bugs/`
- PR linked to bug

### Optional Artifacts
- Test case update (if regression risk)

### Required Approvals
- Engineering Lead code review

### Definition of Ready
- Root cause is understood
- Fix approach is confirmed

### Definition of Done
- Bug is fixed and verified by QA
- No regression introduced
- Bug object status: `verified`

### Example
> A button label displays the wrong text. Fix the copy. One-line change.

### What NOT to Do
- Do not write a PRD for a typo fix
- Do not require UAT for a single-line copy change
- Do not require support handover unless the fix changes documented behaviour

---

## Lane 2 — Small Enhancement

**Use when**: An improvement to an existing feature with limited scope and low risk.

### Entry Criteria
- Existing feature is being improved (not a new feature)
- ≤3 user stories
- No new API endpoints or schema changes
- Low to medium engineering complexity
- Design may or may not be required

### Required Artifacts
- Request object in `objects/requests/`
- User stories in `objects/user-stories/`
- QA test object

### Optional Artifacts
- PRD (optional for very small changes)
- Design brief

### Required Approvals
- Product Manager sign-off
- Engineering Lead estimate and approval

### Definition of Ready
- Stories are written and estimated
- Acceptance criteria are clear
- No unresolved dependencies

### Definition of Done
- Stories completed and QA passed
- Feature behaves as specified
- Story status: `done`

### Example
> Add a "Clear cart" button to the cart page. 1 story, no schema change.

### What NOT to Do
- Do not require a full PRD + tech design
- Do not require UAT for low-risk enhancements

---

## Lane 3 — Standard Feature

**Use when**: A new feature or significant enhancement that requires coordinated product, design, engineering, QA, and support work.

### Entry Criteria
- New user-visible capability OR significant change to existing capability
- 4+ user stories OR cross-module impact
- Design is required
- May involve schema or API changes

### Required Artifacts
- Request object
- Feature object
- PRD
- Technical design (if schema/API changes)
- Design brief + Figma
- User stories
- QA test object
- UAT run (if client-facing)
- Release object
- Support handover (if user-facing)
- Measurement plan

### Optional Artifacts
- Business case (if significant investment)
- Data migration plan

### Required Approvals
- PRD approval: Product Lead
- Technical design approval: Engineering Lead
- Design approval: Product Manager
- QA signoff: QA Lead
- UAT signoff: Product Manager
- Release approval: Product Lead + Engineering Lead

### Definition of Ready (per story)
- Story estimated, acceptance criteria clear, design ready, no blockers

### Definition of Done
- All stories done, QA passed, UAT approved (if required)
- Support briefed, release notes written
- Feature flag configured if needed
- Measurement plan instrumented

### Example
> Add a product favourites feature to the customer app. New screen, backend logic, admin view.

---

## Lane 4 — Strategic Initiative

**Use when**: A major cross-functional programme that delivers a new module, platform capability, or market-changing feature set.

### Entry Criteria
- Multiple features (3+) shipped together
- Cross-team or multi-sprint programme
- Significant business investment
- Client commitments or executive sponsorship

### Required Artifacts
- Business case
- Initiative object
- OKR alignment documented
- Feature + PRD for each feature in scope
- Technical design (mandatory)
- Capacity plan
- All Lane 3 artifacts for each feature

### Required Approvals
- Business case: CEO / Leadership
- All Lane 3 approvals, plus:
- Roadmap approval: Product Lead + Engineering Lead
- Final release: Product Lead + CEO for major launches

### Definition of Done
- All features delivered
- Success metrics instrumented and baseline recorded
- Hypercare plan executed
- Post-release review completed

### Example
> Build and launch a full Delivery Management module from scratch.

---

## Lane 5 — Incident

**Use when**: A production outage or critical degradation requiring immediate response.

### Entry Criteria
- Production is affected
- Users are impacted right now
- Normal development process is bypassed for speed

### Required Artifacts
- Incident object in `objects/incidents/`
- RCA (mandatory, due within 5 business days)
- Bug object (if root cause is a code defect)

### Optional Artifacts
- Hotfix PR (if code change needed)
- Known issue (if not immediately fixable)

### Required Approvals
- Engineering Lead declares and resolves
- Product Lead notified

### Process
- Incident response is independent of sprint planning
- Fix goes to production through emergency process
- Full post-mortem / RCA required after resolution

### Example
> Payment processing is failing for all customers. Emergency response required.

### What NOT to Do
- Do not slow down incident response with PRD requirements
- Do not skip RCA after resolution

---

## Lane 6 — Compliance / Security

**Use when**: A regulatory requirement, security vulnerability, or legal change drives a product change.

### Entry Criteria
- Compliance or legal deadline exists
- Security vulnerability has been identified
- Data privacy or regulatory requirement applies

### Required Artifacts
- Request object with `source_type: compliance`
- PRD (with compliance rationale)
- Technical design
- Security review (mandatory)
- Compliance sign-off

### Required Approvals
- Legal/compliance approval (mandatory)
- All Standard Feature approvals
- Security review: Engineering Lead + external if needed

### Priority
- Compliance and security work takes priority over feature work
- Deadlines are non-negotiable

### Example
> Implement GDPR data deletion endpoint. Legal deadline: 3 months.

---

## Lane 7 — Tech Debt

**Use when**: Internal code quality improvement with no direct user-visible impact.

### Entry Criteria
- No change in user-facing behaviour
- Improves maintainability, performance, or security posture
- Engineering-initiated

### Required Artifacts
- Request or task object
- Technical design (if large refactor)
- User stories (if meaningful scope)

### Optional Artifacts
- PRD (usually not needed)
- UAT (usually not needed)

### Required Approvals
- Engineering Lead approval
- Product Lead aware (not an active approver unless it has user impact)

### Example
> Refactor the order service to use a consistent error handling pattern.

---

## Lane 8 — Operational Change

**Use when**: A change to a product capability that primarily affects internal operations, not end customers.

### Entry Criteria
- Change affects admin or ops interface primarily
- Customer impact is low or indirect
- Operations team is requesting the change

### Required Artifacts
- Request or ops-issue object
- User stories
- SOP update (if process changes)
- Support handover (mandatory — ops must be trained)

### Required Approvals
- Operations Lead sign-off
- Product Manager approval

### Example
> Add a bulk order status update feature to the admin console.

---

## Lane 9 — Business / Commercial Request

**Use when**: A request originates from business, sales, or a commercial need and requires product delivery.

### Entry Criteria
- Business stakeholder or sales team request
- Commercial value is primary driver
- May have client commitment attached

### Required Artifacts
- Sales request or client request object
- Business case (if investment > 1 sprint)
- Standard Feature artifacts if scope warrants

### Required Approvals
- Product Lead approval
- Business stakeholder sign-off
- Revenue / ROI justification documented

### Example
> Sales requires a coupon import feature to close a key enterprise deal.

---

## Lane 10 — Experiment

**Use when**: Validating a hypothesis about user behaviour or feature performance before committing to full implementation.

### Entry Criteria
- Hypothesis is clearly stated
- Success metric is defined
- Experiment duration and sample size are defined
- Feature flag is being used

### Required Artifacts
- Experiment object in `objects/experiments/`
- Feature flag object
- Measurement plan
- User stories for the variant

### Required Approvals
- Product Manager designs and approves experiment
- Engineering Lead approves implementation
- Statistical significance required before shipping

### Definition of Done
- Experiment ran to full sample size
- Results analysed and decision documented
- Feature flag cleaned up regardless of outcome

### Example
> Test a new product carousel layout with 20% of users for 14 days.

---

## Quick Reference

| Lane | PRD | Tech Design | QA | UAT | Support Handover | Measurement Plan |
|---|---|---|---|---|---|---|
| Fast Fix | ✗ | ✗ | Optional | ✗ | ✗ | ✗ |
| Small Enhancement | Optional | ✗ | ✓ | ✗ | Optional | Optional |
| Standard Feature | ✓ | ✓ if complex | ✓ | ✓ | ✓ | ✓ |
| Strategic Initiative | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Incident | ✗ (RCA instead) | ✗ | ✗ | ✗ | ✓ | ✗ |
| Compliance/Security | ✓ | ✓ | ✓ | ✓ | ✓ | Optional |
| Tech Debt | Optional | ✓ if large | ✓ | ✗ | Optional | ✗ |
| Operational Change | Optional | Optional | Optional | Optional | ✓ | Optional |
| Business/Commercial | ✓ if large | Optional | ✓ | Optional | ✓ | ✓ |
| Experiment | ✗ | ✗ | Optional | ✗ | ✗ | ✓ |

---

## Next Action Routing by Lane

After intake (Request object created and indexed), the next action is determined by the confirmed lane — not by a default DEVPLAN path.

| Lane | Next Action After Intake |
|---|---|
| Lane 1 — Fast Fix | Quick fix notes + QA smoke check |
| Lane 2 — Small Enhancement | User story + acceptance criteria + lightweight implementation notes |
| Lane 3 — Standard Feature | PRD → DEVPLAN |
| Lane 4 — Strategic Initiative | Discovery → PRD → technical design → DEVPLAN |
| Lane 5 — Incident | Mitigation plan → RCA |
| Lane 6 — Compliance/Security | PRD → technical design → security review |
| Lane 7 — Tech Debt | Technical design → PR |
| Lane 8 — Operational Change | User stories → SOP update |
| Lane 9 — Business/Commercial | Business case (if large) → PRD |
| Lane 10 — Experiment | Hypothesis → feature flag → measurement plan |

### DEVPLAN Rule

A development plan (DEVPLAN) is only appropriate when:
- Lane is 3 (Standard Feature) or higher
- Work spans multiple modules
- Backend, schema, or API changes are present
- Payment, security, or auth impact exists
- Complex release coordination is required
- The user explicitly requests a development plan

**Do not suggest or reference DEVPLAN for Lane 1 (Fast Fix) or Lane 2 (Small Enhancement) unless the user asks for one.**

For Lane 1 the phrase is: _"before quick fix notes and QA smoke check"_
For Lane 2 the phrase is: _"before user story, acceptance criteria, and lightweight implementation notes"_

---

## Template Selection Rules

Use the right template depth for the right work. Using a 300-line PRD for a 10-minute fix is waste. Using a quick request form for a cross-module feature is risk.

### Request Templates

| Use Template | When |
|---|---|
| `REQUEST_QUICK_TEMPLATE.md` | One or two sentence request. Clear, small scope. ≤3 stories, no schema change, no cross-module impact. Resolves in Lane 1 or Lane 2. |
| `REQUEST_OBJECT_TEMPLATE.md` | Any request that may become a standard feature, requires triage, has cross-module risk, or has a client commitment attached. |
| `ROADMAP_OPTION_TEMPLATE.md` | Input contains deferred language ("later", "future", "roadmap", "park", "defer"). Item is not ready for active development. Use instead of any REQUEST template — do not assign a work type lane. |
| `DEFERRED_ITEM_TEMPLATE.md` | Item has a named dependency or explicit blocking reason (rather than just timing preference). Use when "blocked by X" or "after Y ships" language is present. |

### PRD Templates

| Use Template | When |
|---|---|
| `PRD_LITE_TEMPLATE.md` | Small enhancement. ≤3 stories. No schema changes. No UAT required. No client commitment. Resolves in Lane 2. |
| `PRD_OBJECT_TEMPLATE.md` | New feature, major enhancement, strategic initiative, compliance change, or anything requiring formal approval and UAT. Lanes 3–6. |

### Bug Templates

| Use Template | When |
|---|---|
| `BUG_MINOR_TEMPLATE.md` | Cosmetic defect — wrong copy, minor layout issue, non-functional visual glitch. Does not affect user flow, data, payments, or auth. One-line or small fix. |
| `BUG_OBJECT_TEMPLATE.md` | Defect that affects checkout, payments, order management, authentication, data integrity, or any user-visible feature flow. All P0/P1 bugs always use this template. |

### Release Templates

| Use Template | When |
|---|---|
| `RELEASE_HOTFIX_TEMPLATE.md` | Emergency fix deployed outside the normal release cycle. Triggered by a production incident or P0/P1 bug. Requires Engineering Lead + Product Lead sign-off. |
| `RELEASE_OBJECT_TEMPLATE.md` | Any planned release — whether simple or complex. Use for all standard feature releases, sprint releases, and milestone releases. |

### Change Note Templates

| Use Template | When |
|---|---|
| `CHANGE_NOTE_LITE_TEMPLATE.md` | Small midstream note. A brief decision or scope narrowing that happened during delivery and needs to be recorded. No stakeholder re-approval needed. |
| `SCOPE_CHANGE_TEMPLATE.md` | A change that materially alters feature scope, timeline, or budget and requires stakeholder re-approval or formal acknowledgement. |

### QA Templates

| Use Template | When |
|---|---|
| `QA_SMOKE_TEST_TEMPLATE.md` | Post-hotfix or post-small-release sanity check. Covers core flows only. No full regression. Run in 30 minutes or less. |
| `QA_RUN_OBJECT_TEMPLATE.md` | Full QA run for a standard feature or release. Covers all test cases, edge cases, and regression for the feature in scope. |

---

## Deferred / Roadmap Language Routing

Before assigning any work type lane, scan the request for deferred language signals. If found, bypass lane selection entirely and route to a Roadmap Object.

**Deferred language trigger words (case-insensitive):**
"later", "later phase", "not now", "not yet", "future", "future phase", "phase 2",
"roadmap", "add to roadmap", "park", "defer", "deferred", "eventually", "someday",
"backlog", "keep for later", "hold off", "skip for now"

**When deferred language is detected:**
- Do NOT select Lane 1–10.
- Do NOT create a REQUEST object.
- Do NOT ask discovery questions.
- Create a ROADMAP_OPTION object:
  - ID format: `ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}`
  - Template: `ROADMAP_OPTION_TEMPLATE.md`
  - Path: `product/objects/roadmap-options/ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}.md`
  - Status: `deferred`
- Output a `ROADMAP ITEM CAPTURED` block (not `REQUEST INTAKE COMPLETE`).
- Note blocking flags for future reference only — they do not activate any governance gate now.

**When there is NO deferred language:** proceed with normal lane selection (Lanes 1–10).

Full rules: `product/os/policies/ROADMAP_INTAKE_RULES.md` Section 12.
Full lane rules: `product/os/intelligence/LANE_SELECTION_ENGINE.md` Rule L9.

---

## The AI Routing Rule

When generating artifacts for a request, the AI must choose template depth based on these signals:

| Signal | Template Depth |
|---|---|
| "fix the button colour" | Quick Request + Minor Bug |
| "add sort to product list" | Quick Request + PRD Lite + stories |
| "add a product favourites feature" | Full Request + Full PRD + Feature object |
| "build a new delivery module" | Full Request + Initiative + Feature objects + PRDs |
| "production is broken" | Incident object + Hotfix Release |
| "experiment with a new layout" | Experiment object + Feature Flag |

**Default rule:** When in doubt, start small. A Lite template can always be upgraded. A 300-line PRD written for a one-hour fix cannot be un-written.

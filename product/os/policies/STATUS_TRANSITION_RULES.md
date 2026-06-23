# Nuemart Product OS — Status Transition Rules

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | All Product OS AI Agents, Lifecycle Engine |

---

## Purpose

Status Transition Rules define the allowed lifecycle paths for every product object in the Nuemart Product OS. They ensure that objects can only move through well-defined states in a controlled order, preventing shortcuts that bypass quality gates.

**Reference:** See `LIFECYCLE_MODELS.md` for full lifecycle definitions, state descriptions, and terminal state documentation.

---

## Core Transition Rules

### Rule 1 — Objects May Only Transition to Allowed Next States

Every product object type has a defined set of allowed transitions. An AI agent or human may not move an object to a state that is not in the allowed next-states list for the current state.

If a transition is attempted that is not in the allowed set, the AI must:
1. Reject the transition
2. Explain which transitions are allowed from the current state
3. Ask the user to confirm the intended action

---

### Rule 2 — No Object May Skip a Required Gate

Required approval gates (G1–G8) enforce mandatory checkpoints in the lifecycle. An object may not skip a gate by jumping multiple states.

**Examples of prohibited skips:**
- A Feature Object may not move from `In Development` to `Released` without passing through `QA` and the G7 gate
- A PRD may not move from `Draft` to `Approved` without being reviewed at the G4 gate
- A Release Object may not move from `Planned` to `Deployed` without passing G8

---

### Rule 3 — Blocked Objects Must Have a Blocker Field Populated

When an object transitions to `Blocked`, the following fields must be populated:

```yaml
status: Blocked
blocking_reason: |
  [Specific description of what is blocking progress]
blocked_by:
  - DECISION-<ID>  # OR
  - DEPENDENCY-<ID>  # OR
  - RISK-<ID>
blocked_since: <date>
```

An object may not be in `Blocked` state without a documented blocking reason. "Blocked" with no explanation is not valid.

---

### Rule 4 — Retrograde Transitions Are Allowed But Must Be Logged

Sometimes a product object must move backwards in its lifecycle — for example, when a PRD is returned from `In Review` to `Draft` with feedback, or when a QA Run fails and the feature returns to `In Development`.

**Retrograde transitions are allowed but must be logged in the object's `audit_log`:**

```yaml
audit_log:
  - date: 2026-06-22
    from_status: In Review
    to_status: Draft
    reason: PRD returned for revision — missing acceptance criteria on REQ-003 and REQ-005
    actioned_by: Product Owner
```

A retrograde transition without an audit log entry is not valid.

---

### Rule 5 — Terminal States Are Final Unless Explicitly Reopened

The following states are terminal — once an object reaches them, it cannot transition to any other state without a Decision Object:

- **Released** — Feature or release has shipped to production
- **Closed** — Request has been closed (completed, rejected, or cancelled)
- **Archived** — Object has been archived and is no longer active
- **Rejected** — Object was rejected and will not proceed

**To reopen a terminal state:**
1. Create a Decision Object documenting why the terminal state is being reversed
2. The Decision Object must be approved by the Product Owner
3. Update the object's status field with the new state and reference the Decision Object

```yaml
status: In Review  # was Released, now reopened
reopened_by: DECISION-GOV-REOPEN-001
reopen_reason: Critical post-release bug discovered; feature is being revised and re-tested
```

---

### Rule 6 — Stale Objects Must Be Reviewed via /product-resume

Any product object that has been in a non-terminal state for 30 or more days without a status change is considered **stale**.

Stale objects must be reviewed via the `/product-resume` command to determine:
- Is the work still active?
- Is it blocked (create a Blocker Object if so)?
- Has it been abandoned (create an Incomplete Work Object if so)?
- Can it be completed now?

AI agents will flag stale objects during regular product health checks and at the start of any new request that touches the same feature area.

---

## Transition Permission Rules

These rules define who is permitted to trigger each state transition.

| Transition | Permitted By | Notes |
|---|---|---|
| Draft → In Review | Object owner (Product Manager or AI) | Submits for review |
| In Review → Approved | Product Owner only | Cannot be self-approved by the author |
| In Review → Draft | Product Owner only | Returns with feedback; must log in audit_log |
| Approved → In Development | Engineering | Engineering picks up the approved work |
| In Development → In Review | Engineering | Submits for QA or Product review |
| In Development → Blocked | Any team member | Requires Blocker Object |
| Blocked → In Development | Object owner + blocker resolver | Blocker must be resolved first |
| In QA → QA Passed | QA | All test cases passed |
| In QA → QA Failed | QA | Critical failures found |
| In QA → Conditionally Passed | QA + Product Owner | Non-critical issues accepted |
| QA Passed → Released | Product Owner (G8 gate) | Final release sign-off |
| Any state → Archived | Product Owner | Requires Decision Object |
| Any state → Rejected | Product Owner | Requires reason documented |
| Rejected → Draft | Product Owner | Only with explicit Decision Object to reopen |
| Released → In Development | Product Owner | Requires Decision Object (post-release revision) |

---

## Prohibited Transitions

The following transitions are explicitly prohibited regardless of circumstance. They represent lifecycle shortcuts that bypass quality gates.

| From State | To State | Why Prohibited |
|---|---|---|
| Submitted | Released | Skips classification, grilling, PRD, development, and QA |
| Draft | Released | Skips all review and quality gates |
| In Development | Released | Bypasses QA (G6, G7) — no unverified code to production |
| QA Failed | Released | A failed QA run blocks release; must be fixed and re-tested |
| Draft | Approved | Skips the In Review state — review cannot be skipped |
| In Review | In Development | Skips the Approved state — must be explicitly approved first |
| New | In Development | Skips classification, grilling, PRD, and approval |
| Closed | Released | Closed objects cannot ship — must be reopened first via Decision Object |

Any attempt to perform a prohibited transition must be blocked by the AI with an explanation of the correct lifecycle path.

---

## Transition Matrix by Object Type

### Request Object Transitions

| From | Allowed To | Gate / Condition |
|---|---|---|
| New | Submitted | Intake complete |
| Submitted | Classified | G1 gate passes |
| Classified | In Grilling | /product-grill started |
| In Grilling | Grilling Complete | G2 gate passes |
| Grilling Complete | In PRD | /product-prd started |
| Grilling Complete | Blocked | Blocker found |
| In PRD | PRD Approved | G4 gate passes |
| PRD Approved | In Development | Engineering picks up |
| In Development | In QA | G6 gate passes |
| In QA | QA Passed | QA Run passes |
| In QA | QA Failed | QA Run fails |
| QA Failed | In Development | Bug fix cycle |
| QA Passed | Released | G7 + G8 gates pass |
| Released | Closed | Release complete, request closed |
| Any | Rejected | Product Owner decision |
| Any | Archived | Decision Object required |

---

### Feature Object Transitions

| From | Allowed To | Gate / Condition |
|---|---|---|
| Draft | Defined | Feature Object fully specified |
| Defined | In Development | Engineering begins work |
| In Development | Partially Implemented | Mid-release state |
| In Development | Implemented | All stories done |
| In Development | Blocked | Blocker Object required |
| Implemented | Released | G7 + G8 gate pass |
| Released | Evolving | New request modifies the feature |
| Evolving | Released | Follow-on release ships |
| Any | Deprecated | Decision Object required |
| Deprecated | Archived | Final archival |

---

### User Story Transitions

| From | Allowed To | Gate / Condition |
|---|---|---|
| Draft | Ready | G5 gate passes |
| Ready | In Progress | Engineering picks up |
| In Progress | In Review | Engineering submits for review |
| In Review | Done | Reviewer approves |
| In Review | In Progress | Returned with feedback |
| Done | Released | Included in release |
| Any | Blocked | Blocker Object required |
| Any | Deferred | Decision Object required |

---

### QA Run Transitions

| From | Allowed To | Gate / Condition |
|---|---|---|
| Not Started | In Progress | QA team begins testing |
| In Progress | Passed | All critical test cases passed |
| In Progress | Failed | Critical test case failures found |
| In Progress | Conditionally Passed | Non-critical issues, accepted by PO |
| Failed | In Progress | Re-run after bug fixes |
| Passed | Linked to Release | Used in Release Object |
| Conditionally Passed | Linked to Release | Risks accepted, linked to Release |

---

### Release Object Transitions

| From | Allowed To | Gate / Condition |
|---|---|---|
| Draft | Ready for Release | All release checklist items complete |
| Ready for Release | Deployed | G8 gate passes, deployment executed |
| Deployed | Stable | Post-release monitoring period complete |
| Deployed | Rolled Back | Rollback executed due to critical issue |
| Rolled Back | In Development | Fix cycle begins |
| Stable | Closed | Release considered complete |

---

## Audit Log Format

Every status transition (forward or retrograde) should be recorded in the object's `audit_log`:

```yaml
audit_log:
  - date: 2026-06-22
    from_status: Draft
    to_status: In Review
    reason: PRD complete, submitting for Product Owner review
    actioned_by: AI (Product OS) / Product Manager

  - date: 2026-06-23
    from_status: In Review
    to_status: Approved
    reason: PRD approved — all requirements complete, acceptance criteria defined
    actioned_by: Product Owner
```

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| LIFECYCLE_MODELS.md | `product/os/` | Full state definitions for each object type |
| APPROVAL_GATES.md | `product/os/policies/` | Gates referenced in transition conditions |
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P010 (Decision Objects for scope changes), P011 (Incomplete Work) |
| TRACEABILITY_RULES.md | `product/os/policies/` | Ensures state transitions don't break traceability |
| FEATURE_TRACKING_RULES.md | `product/os/policies/` | Feature lifecycle integration with request lifecycle |

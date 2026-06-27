# Lane Selection Engine

**Version**: 2.0  
**Owner**: Product Lead  
**Status**: Active

---

## Purpose

The Lane Selection Engine validates and confirms the work type lane assignment from the Classification Engine. It applies business rules to catch misclassifications before they affect governance gates and artifact requirements.

A correct lane assignment determines:
- Which artifacts are required
- Which approvals are needed
- How long the work should take
- Which governance gates apply

---

## Inputs

| Input | Source |
|---|---|
| `classification.work_type_lane` | Output of CLASSIFICATION_ENGINE.md Step 9 |
| `classification.request_type` | Output of CLASSIFICATION_ENGINE.md Step 3 |
| `classification.blocking_flags` | Output of CLASSIFICATION_ENGINE.md Step 8 |
| Request object full text | `product/objects/requests/` or raw text |
| Work Type Lanes reference | `product/os/policies/WORK_TYPE_LANES.md` |

---

## Lane Validation Rules

Apply these rules in order. Each rule can override the initial lane assignment.

### Rule L1 — Incident Override

If the request describes a current production issue (something is broken NOW):
→ Force lane to **Incident** regardless of other signals.

Signals: "broken", "down", "not working", "error since", "users are reporting", "production issue"

### Rule L2 — Compliance Override

If the request involves a legal, regulatory, or security requirement:
→ Force lane to **Compliance/Security** regardless of scope.

Signals: "GDPR", "PCI", "compliance", "legal requirement", "audit", "security vulnerability", "data breach", "pen test finding"

### Rule L3 — Size Correction (Small Enhancement → Standard Feature)

If the initial lane is **Small Enhancement** but any of the following are true:
- More than 3 user stories are needed
- Multiple modules are affected
- New API contracts are required
- A PRD would materially help alignment
→ Upgrade to **Standard Feature**.

### Rule L4 — Size Correction (Standard Feature → Strategic Initiative)

If the initial lane is **Standard Feature** but any of the following are true:
- The request spans 3+ sprints of work
- It requires a new architectural pattern
- It has cross-cutting business impact
- It requires sign-off from Business Owner or CTO
→ Upgrade to **Strategic Initiative**.

### Rule L5 — Size Correction (Standard Feature → Small Enhancement)

If the initial lane is **Standard Feature** but:
- The implementation is clearly < 3 user stories
- It affects only one module
- No new API contracts needed
- Design change is minor
→ Downgrade to **Small Enhancement** and document the reason.

### Rule L6 — Fast Fix Validation

If the initial lane is **Fast Fix**, confirm all of the following are true:
- The fix is < 4 hours implementation
- No API contract changes
- No schema changes
- No design changes
- Acceptance criteria can be written in one sentence

If any are false → upgrade to **Small Enhancement** or higher.

### Rule L7 — Experiment Lane

If the request is framed as a hypothesis to test, a feature flag rollout, or an A/B test:
→ Force lane to **Experiment** and require an EXPERIMENT object and measurement plan.

---

### Rule L8 — Delivery / Tracking Conditional Upgrade (Lane 3 → Lane 4)

**Trigger:** Initial lane is Standard Feature (Lane 3) AND request involves delivery tracking, order tracking, or customer-facing delivery status.

Apply this conditional upgrade check before confirming the lane.

**Upgrade to Lane 4 — Strategic Initiative if ANY of the following are true or likely:**

| Upgrade Signal | Reason for Upgrade |
|---|---|
| GPS or real-time map tracking of delivery agent | Requires external map API; real-time data pipeline |
| Live delivery agent location sharing to customer | Streaming data, external service dependency |
| Push notification, SMS, or WhatsApp alerts for delivery events | New notification system integration |
| Third-party delivery service or courier API integration | External API contract, failure modes, cost |
| New delivery event model (timestamped event stream vs. simple status enum) | Schema design, state machine, migration |
| Delivery state machine with 6+ distinct states and transitions | Complex business rules, support implications |
| Major role or permission changes for delivery partners | Auth/role blast radius |
| Operational SOP changes required across delivery staff | Cross-team readiness, training |
| Hypercare or support escalation plan required at launch | Cross-function coordination |
| Cross-module impact across DEL + COM + USR + NOTIF simultaneously | 3+ module blast radius → L4 threshold |

**Lane 3 holds (do NOT upgrade) if ALL of the following are true:**

| Lane 3 Condition | Verification |
|---|---|
| Status milestones only (≤5 fixed states) | No state machine or event stream |
| No external API or mapping service | Self-contained in Convex |
| No push / SMS / WhatsApp notifications | UI display only |
| Status data already exists in Convex | Confirmed via context pre-check |
| Limited scope: single new screen or section on order history | No cross-module sprawl |

**Required output format when L8 applies (upgrade undecided):**

```
Work Lane:  Lane 3 — Standard Feature
            (conditional upgrade → Lane 4 Strategic Initiative if
             GPS / notifications / third-party integration confirmed
             — answer Questions [n] and [n] to confirm)
```

If upgrade signals are confirmed via user answers → update to Lane 4 and regenerate artifact requirements accordingly.

**Signals that trigger L8 evaluation:**
"delivery tracking", "track my order", "order tracking", "real-time tracking",
"delivery status", "where is my order", "customer tracking", "live location",
"track delivery", "delivery updates"

---

### Rule L9 — Deferred / Roadmap Language (No Active Lane)

**This rule is checked FIRST, before L1–L8.** If L9 matches, skip all other lane rules.

If the input for a specific ask contains deferred language signals (per `ROADMAP_INTAKE_RULES.md` Section 12):
→ Do **not** assign an active work type lane.
→ Set `lane = none`, `status = roadmap_candidate`.
→ Route to ROADMAP_OPTION object in `product/objects/roadmap-options/`.
→ Do not run lane validation rules L1–L8 for this item.
→ Do not generate discovery questions.

**Deferred language signals:**
"later", "later phase", "not now", "not yet", "future", "future phase", "next phase",
"phase 2", "roadmap", "add to roadmap", "park", "defer", "deferred", "eventually",
"someday", "backlog", "keep for later", "hold off", "skip for now"

---

### Rule L10 — Context Conflict Blocking

**This rule is applied after all other rules (L1–L9).** It can hold or mark provisional any lane assignment when an unresolved context conflict makes the lane unreliable.

**Trigger:** A `CONTEXT CONFLICT DETECTED` block was generated in Step 1.5 of the intake skill with `Blocking: Yes`, AND the conflict affects the current request's lane selection or blocking flags.

**Apply L10 if the conflict involves ANY of the following for this request:**

| Conflict Dimension | Why It Can Change the Lane |
|---|---|
| `schema_change` flag | Determines whether Lane 2 → Lane 3 upgrade is required |
| `breaking_api_change` flag | Affects artifact requirements and tech design gate |
| `payment_change` flag | Triggers mandatory security review regardless of lane |
| `security_change` flag | Same as payment_change |
| Release readiness | Affects whether a go/no-go can be called for the lane's deliverables |
| Work type lane directly (e.g., whether a module was built affects New Feature vs. Feature Enhancement) | Incorrect type → incorrect lane → incorrect governance |

**When L10 applies:**
- Set `lane_confidence: Low`
- Mark the lane assignment as **provisional** — prefix with `[PROVISIONAL]` in the output
- Do not advance past intake for the affected item
- Show the `CONTEXT CONFLICT DETECTED` block before the `REQUEST INTAKE COMPLETE` block

**When L10 does NOT apply** (conflict was auto-resolved or does not affect blocking dimensions):
- Proceed with normal lane confidence
- Record auto-resolution in `ASSUMPTIONS MADE`
- Add `STALE FILE NOTE` in response (informational only, not a blocker)

**Lane selection output when L10 applies:**
```yaml
lane_selection:
  confirmed_lane: "[PROVISIONAL] Standard Feature — pending conflict resolution"
  rules_applied: [L10]
  lane_confidence: Low
  blocking_conflict: true
  conflict_description: "[plain language description of the conflict and affected flags]"
  resolution_required: "[specific question or audit needed before lane can be confirmed]"
```

Full conflict detection rules: `product/os/policies/CONTEXT_FRESHNESS_AND_SOURCE_PRECEDENCE_RULES.md`

---

## Lane Selection Output

```yaml
lane_selection:
  confirmed_lane: Fast Fix | Small Enhancement | Standard Feature | Strategic Initiative | Incident | Compliance/Security | Tech Debt | Operational Change | Business/Commercial | Experiment
  rules_applied: [L1, L3, ...]  # list of rules that were evaluated
  lane_changed: true | false
  original_lane: <if changed>
  change_reason: <plain language reason if changed>
  lane_confidence: High | Medium | Low
```

---

## Failure Conditions

| Failure | Handling |
|---|---|
| No lane can be confidently determined | Set `lane_confidence: Low`, flag for Product Lead review |
| Request spans multiple lanes | Recommend splitting into two separate requests |
| Request is clearly strategic but requester expects Fast Fix | Explain the mismatch and the correct process |

---

## Lane Quick Reference

| Lane | Typical Duration | Key Artifacts |
|---|---|---|
| Fast Fix | Hours | Bug object, 1-sentence acceptance criteria |
| Small Enhancement | 1 sprint | User story, light design review |
| Standard Feature | 1-3 sprints | PRD, tech design, QA plan, measurement plan |
| Strategic Initiative | 3+ sprints | PRD, tech design, OKR link, measurement plan, UAT |
| Incident | Hours-days | Incident object, RCA |
| Compliance/Security | Variable | Compliance brief, security review |
| Tech Debt | 1 sprint | Tech design, test coverage |
| Experiment | 2+ weeks | Experiment object, measurement plan |

---

## Related Files

- `CLASSIFICATION_ENGINE.md` — Provides initial lane assignment
- `ARTIFACT_REQUIREMENT_ENGINE.md` — Next step: determines required artifacts for the confirmed lane
- `product/os/policies/WORK_TYPE_LANES.md` — Full lane definitions and artifact requirements

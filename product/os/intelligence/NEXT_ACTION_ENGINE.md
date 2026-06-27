# Nuemart Product OS — Next Action Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

After every Product OS operation, the Next Action Engine determines the single most valuable, specific, and executable action the user should take next. It eliminates ambiguity about "what do I do now?" by reading the current state of all active work items and applying a deterministic decision tree.

This engine is called:
- At the end of every agent's operation (the agent's final output always includes a next action)
- When the user runs `/product-resume` (Intelligence Agent scans all active items and outputs prioritized next actions)
- When GAP_DETECTION_ENGINE identifies a Blocking gap (the gap resolution becomes the recommended next action)

The output is always structured, specific, and immediately actionable.

---

## Inputs

| Input | Source | Notes |
|---|---|---|
| All active Request Objects | `product/objects/requests/` | Status not in: Closed, Released, Rejected |
| All active Feature Objects | `product/objects/features/` | Status not in: Released, Deprecated |
| OBJECT_INDEX.md | `product/indexes/` | For full active items list |
| GAP_DETECTION_ENGINE output | Runtime | Blocking gaps pre-empt all other actions |
| Governance gate status | Each object's `governance` block | Pending approvals must be surfaced |
| Current date | Context | For stale object detection |

---

## Next Action Decision Logic

The decision tree below is evaluated for each active work item. The tree is deterministic: given the same inputs, it always produces the same recommendation.

**Evaluation order:** Blocking Gaps → Pending Approvals → Lifecycle Advancement → Optimization

---

### Branch 0 — Dry-run Reference (No Lifecycle Advancement)

**Condition:** An item referenced in the session exists only as a dry-run session reference — no committed file in `product/objects/`, no entry in `REQUEST_INDEX.md`.

**Rule:** Dry-run references are not active lifecycle items. Do not advance their lifecycle, do not recommend actions as if they are committed, and do not count them in the active item summary.

```
IF item is a dry-run reference (no committed file, no index entry):
  OUTPUT:
    RECOMMENDED NEXT ACTION: Commit this item before advancing its lifecycle
    COMMAND: Re-run /product-request without --dry-run to commit
             {item.preview_id} and assign a real ID from MASTER_REGISTRY.
    REASON: {item.preview_id} exists only as a dry-run preview — it has no
            committed Product OS object file and no index entry.
            Lifecycle advancement requires a committed object.
    BLOCKING: N (informational — item cannot advance until committed)
    BLOCKER DETAIL: None (not blocking active work; just not yet committed)
```

---

### Branch 0b — Change Impact Analysis Output

**Condition:** The most recent operation for a target item was `CHANGE IMPACT ANALYSIS COMPLETE` (output from `product-request` with midstream trigger phrases).

**Rule:** A change impact analysis produces a recommendation (amend / new version / Phase 2). The next action depends on which recommendation the user accepted.

```
IF last_operation == "CHANGE IMPACT ANALYSIS COMPLETE":
  IF recommendation == "amend":
    RECOMMENDED NEXT ACTION: Commit the amended scope for {target_id}
    COMMAND: /product-request --commit [scope description for {target_id}]
    REASON: Change impact analysis recommended amending {target_id} scope.
             Committing applies the scope change to the object before intake closes.

  IF recommendation == "phase_2":
    RECOMMENDED NEXT ACTION: Commit the Phase 2 deferred item
    COMMAND: /product-request --commit [Phase 2 scope description]
    REASON: Change impact analysis recommended deferring this scope.
             By default, Phase 2 creates a DEFERRED_ITEM (known scope, sequenced out),
             not an active REQUEST. Preview ID must be committed to receive a real ID
             from MASTER_REGISTRY. To activate for delivery later, re-run
             /product-request referencing the deferred item ID.

  IF recommendation == "new_version":
    RECOMMENDED NEXT ACTION: Create a new version of {target_id}
    COMMAND: /product-request --commit update {target_id} with [scope change]
    REASON: Change impact analysis recommended a new version (committed v1 exists).

  IF open_questions_remain:
    RECOMMENDED NEXT ACTION: Answer open questions before committing
    COMMAND: Answer questions listed in CHANGE IMPACT ANALYSIS COMPLETE output
             for {target_id}, then re-run /product-request.
    REASON: Lane and scope cannot be confirmed until questions are answered.
```

---

### Branch 0c — Roadmap Activation (Uncommitted Parent)

**Condition:** User triggered roadmap activation (e.g., "Activate ROADMAP-{ID}") but the referenced ROADMAP file does not exist at `product/objects/roadmap-options/`.

**Rule:** Do not proceed with REQUEST intake. Surface the `ROADMAP ACTIVATION TARGET NOT COMMITTED` block. The recommended next action depends on which option the user chooses.

```
IF roadmap_activation_triggered AND target_file_not_found:
  OUTPUT:
    RECOMMENDED NEXT ACTION: Choose how to handle the uncommitted roadmap parent
    COMMAND:
      Option A (Recommended):
        /product-request --commit [roadmap description]
        Then re-run: /product-request [activation description]
        Reason: commits roadmap parent first; full traceability maintained.
      Option B:
        /product-request --commit [request description] — confirm "Option B"
        Reason: proceeds without a committed parent; continuation link is session-only.
      Option C:
        /product-request --commit [description for both objects]
        Reason: creates both in one commit; traceability without two steps.
        Note (if discovery_framing = true): Option C also plans the discovery
        session object. Files included:
          product/objects/discovery/DISCOVERY-{AREA}-{MODULE}-{SLUG}-{SEQ}.md
          product/indexes/DISCOVERY_INDEX.md  (if file exists)
          product/views/ROADMAP_VIEW.md        (if file exists)
        Discovery object is created during /product-prd — not at intake.
    REASON: {ROADMAP-ID} has no committed file at
            product/objects/roadmap-options/{ROADMAP-ID}.md.
            Proceeding silently would create a REQUEST with an unverifiable
            parent — the continuation link cannot be traced in Product OS history.
    BLOCKING: N (informational — intake proceeds once option is confirmed)
    BLOCKER DETAIL: File not found: product/objects/roadmap-options/{ROADMAP-ID}.md
```

---

### Branch 1 — Blocking Gap Present

**Condition:** GAP_DETECTION_ENGINE has flagged one or more Blocking gaps for this item.

**Rule:** Blocking gaps override all lifecycle advancement. A lifecycle step cannot be recommended if a Blocking gap must be resolved first.

```
IF any_blocking_gap_exists(item):
  OUTPUT:
    RECOMMENDED NEXT ACTION: Resolve blocking gap before proceeding
    COMMAND: <specific resolution step from the gap object>
    REASON: A blocking gap prevents lifecycle advancement for {item.id}
    BLOCKING: Y
    BLOCKER DETAIL: {gap.description} — {gap.resolution_action}
```

---

### Branch 2 — Pending Approval (Governance Gate)

**Condition:** A required governance gate has been triggered but not yet cleared.

**Rule:** Pending approvals block downstream lifecycle steps. The user must be told what approval is needed and from whom.

```
IF any_pending_approval_exists(item):
  OUTPUT:
    RECOMMENDED NEXT ACTION: Obtain required approval before proceeding
    COMMAND: Manually: obtain {gate.name} approval from {gate.required_approver}
    REASON: Gate {gate.id} is required for {item.id} due to: {gate.trigger_reason}
    BLOCKING: Y
    BLOCKER DETAIL: {gate.name} approval pending from {gate.required_approver}. Gate triggered by: {item.blocking_flags}
```

---

### Branch 3 — Lifecycle Advancement

**Condition:** No blocking gaps; no pending approvals. Item should advance to its next lifecycle stage.

The lifecycle decision tree:

```
IF item.object_type == "Bug" AND item.lane == "Lane 1":
  IF item.fix_status in ["Open", "In Progress"]:
    → next action: Implement the fix per quick fix notes
    → COMMAND: Developer implements fix per /product-devplan {item.id} quick fix notes.
               Update fix_status to Fixed / Merged / Ready for QA when done.
    → REASON: Bug fix not yet implemented. Quick fix notes describe the implementation scope.
  IF item.fix_status in ["Fixed", "Merged", "Ready for QA"]:
    → next action: Run QA smoke check
    → COMMAND: /product-qa {item.id}
    → REASON: Fix is marked as ready. QA smoke check is the next required step for Lane 1.
  IF item.qa_status == "Passed" OR item.fix_status == "Resolved":
    → next action: Bug is resolved — no further action needed
    → COMMAND: Update bug fix_status to Resolved if not already done.
               Update BUG_INDEX.md and MOD-{MODULE}.md workspace accordingly.
               No UAT or release object required for Lane 1.
    → NOTE: Lane 1 bugs do not proceed to UAT or release steps. Work is complete.

IF item.status == "Received":
  → next action: Classify the request
  → COMMAND: Classification happens automatically — check OBJECT_INDEX.md for classification status.
               If stuck, re-run: /product-request {item.id}

IF item.status == "Classified":
  → next action: Run discovery and grilling session
  → COMMAND: /product-grill {item.id}

IF item.status == "Grilled":
  → next action: Assess full product and technical impact
  → COMMAND: /product-impact {item.id}

IF item.status == "Impact Assessed" AND all_required_gates_cleared(item):
  → next action: Write the PRD
  → COMMAND: /product-prd {item.id}

IF item.status == "Impact Assessed" AND pending_gates_exist(item):
  → Route to Branch 2 (Pending Approval)

IF item.status == "PRD Created" AND prd.status != "Approved":
  → next action: Get PRD reviewed and approved
  → COMMAND: Manually: share PRD-{id} for review. Once approved, update PRD status to Approved.

IF item.status == "PRD Approved" AND no_stories_exist(item):
  → next action: Generate user stories
  → COMMAND: /product-stories {item.id}

IF item.status == "PRD Approved" AND stories_exist(item) AND no_devplan_exists(item):
  → next action: Create development plan
  → COMMAND: /product-devplan {item.id}

IF devplan_exists(item) AND feature.status != "QA In Progress" AND feature.status != "QA Passed":
  → next action: Run QA
  → COMMAND: /product-qa {item.id}

IF feature.status == "QA In Progress":
  → next action: Complete QA execution and record results
  → COMMAND: Continue QA execution against TESTPLAN-{id}. Record all results in QA-{id}.

IF feature.status == "QA Failed":
  → next action: Fix failing tests then re-run QA
  → COMMAND: Review Bug Objects linked to QA-{id}. Fix bugs. Then re-run: /product-qa {item.id}

IF feature.status == "QA Passed" AND no_uat_exists(item):
  → next action: Run User Acceptance Testing
  → COMMAND: /product-uat {item.id}

IF feature.status == "UAT Complete" OR uat.verdict == "Signed Off":
  → next action: Release the feature
  → COMMAND: /product-release {item.id}

IF feature.status == "Released":
  → next action: Post-release review or move to next item
  → COMMAND: /product-resume (to see what is next in the backlog)
              OR run post-release review for {item.id} at the scheduled date.
```

---

### Branch 4 — Optimization

**Condition:** No blocking gaps, no pending approvals, lifecycle is as advanced as possible for the current state. Optimization recommendations apply.

```
IF evaluation_missing(item) AND item.status >= "Grilled":
  → next action: Score and prioritize this initiative
  → COMMAND: /product-evaluate {item.id}
  → REASON: Evaluation provides priority score needed for roadmap planning

IF knowledge_items_missing AND item.status == "Released":
  → next action: Extract learnings from this feature
  → COMMAND: Knowledge Agent will run automatically; if not yet triggered, manually trigger a retrospective.

IF stale_item_detected(item):
  → next action: Review and unblock stale item
  → COMMAND: Review {item.id} — it has been in stage {item.status} for {days} days (expected max: {max_days} days).
               Identify the blocker and resolve it.
```

---

## Priority Rules

When multiple active items have next actions available, apply these priority rules to determine which item's recommendation surfaces first:

**Priority Rule 1 — Blocking items first.**
Any item with a Blocking gap or pending approval is Priority 1. Present all blocking items before any non-blocking items.

**Priority Rule 2 — Within blocking items: sort by business impact.**
P0 features outrank P1; P1 outrank P2; P2 outrank P3. Use priority_tier from the Feature's Evaluation Object.

**Priority Rule 3 — Among non-blocking items: sort by proximity to release.**
Items in UAT outrank items in QA. QA outranks Dev Plan. Dev Plan outranks PRD. PRD outranks Discovery. Discovery outranks Classification.

**Priority Rule 4 — Among equal-stage items: sort by priority_tier.**
P0 > P1 > P2 > P3.

**Priority Rule 5 — Stale items surface after all advancing items.**
A stale item should not pre-empt an item that is actively moving. Stale items are surfaced at the end of the recommendation list with clear staleness indicators.

---

## Output Format

Every output from the Next Action Engine uses this exact format. No deviation.

```
RECOMMENDED NEXT ACTION: <one sentence describing the action>
COMMAND: <the exact slash command to run, or the exact manual step to take>
REASON: <one or two sentences explaining why this is the correct next step>
BLOCKING: <Y | N>
BLOCKER DETAIL: <if BLOCKING=Y, describe the blocker precisely; if BLOCKING=N, write "None">
```

**For multiple active items, output a numbered priority list:**

```
=== NEXT ACTIONS — NUEMART PRODUCT OS ===
Active Items: N | Blocking: N | Pending Approvals: N | Stale: N

--- PRIORITY 1 (BLOCKING) ---

[1] {item.id} — {item.title}
    RECOMMENDED NEXT ACTION: <action>
    COMMAND: <command>
    REASON: <reason>
    BLOCKING: Y
    BLOCKER DETAIL: <detail>

--- PRIORITY 2 (LIFECYCLE ADVANCEMENT — CLOSEST TO RELEASE) ---

[2] {item.id} — {item.title}
    Current Stage: <stage>
    RECOMMENDED NEXT ACTION: <action>
    COMMAND: <command>
    REASON: <reason>
    BLOCKING: N
    BLOCKER DETAIL: None

--- PRIORITY 3 (LIFECYCLE ADVANCEMENT) ---
[...]

--- STALE ITEMS (ATTENTION NEEDED) ---
[N] {item.id} — stuck in {stage} for {days} days
    RECOMMENDED NEXT ACTION: Review and unblock
    COMMAND: /product-resume {item.id} for details
```

---

## Required Metadata

The Next Action Engine does not create persistent Product Objects. Its output is ephemeral — printed to the user and forwarded to the Intelligence Agent's session output.

However, each agent that calls the Next Action Engine must document the recommendation in the current session object:

```yaml
session_next_action:
  generated_at: <ISO datetime>
  active_items_scanned: N
  recommended_action: "<text>"
  command: "<slash command or manual step>"
  reason: "<text>"
  blocking: true | false
  blocker_detail: "<text or null>"
  priority_tier: 1 | 2 | 3
```

---

## Multiple Active Items Behavior

When the Intelligence Agent runs `/product-resume` and finds multiple active work items, the engine:

1. Evaluates each active item through the full decision tree (Branches 1–4)
2. Assigns each item a next action and a priority tier (1 = Blocking, 2 = Advancing, 3 = Optimization, 4 = Stale)
3. Sorts items within each tier by priority_score from the Evaluation Object (or by submission date if no evaluation exists)
4. Outputs the full prioritized list

**Maximum items in a single output:** 10 items. If more than 10 active items exist, output the top 10 and note that N additional items are active.

---

## Failure Conditions

| Failure | Handling |
|---|---|
| No active items found | Output: "No active items in Product OS. Use /product-request to submit a new request." |
| OBJECT_INDEX.md not populated | Cannot run; output: "OBJECT_INDEX.md is empty — cannot determine next actions. Run /product-resume after rebuilding the object index." |
| Item has no lifecycle status | Flag as `MISSING_METADATA` gap; recommend updating the status field before proceeding |
| Decision tree reaches a state not covered | Default to: "RECOMMENDED NEXT ACTION: Review {item.id} manually — current state ({item.status}) is unrecognized. Contact your product team." |
| All items are released or closed | Output: "All tracked items are complete. Use /product-request to submit new work or /product-resume to review completed work." |

---

## Banned Recommendations

The following are explicitly banned outputs. The engine must never produce these:

| Banned Output | Why Banned |
|---|---|
| "Continue development" | Not actionable — tells the user nothing specific |
| "Check with the team" | Vague — who? about what? |
| "Review the PRD" | Vague — what specifically needs reviewing? |
| "Move to the next step" | Does not specify what the next step is |
| "This looks good" | Not a next action |
| "Consider running QA" | Wishy-washy — "consider" implies optionality that doesn't exist |

Every recommendation must: name the exact object(s), state the exact command, and explain the specific reason.

---

## Example Outputs

### Example 1 — After QA Pass for Carousel

**Context:** QA-COM-PLP-CAROUSEL-RUN-001 has verdict `Passed`. UAT has not started.

```
RECOMMENDED NEXT ACTION: Run User Acceptance Testing for the Promotional Banner Carousel feature.
COMMAND: /product-uat REQUEST-COM-PLP-CAROUSEL-001
REASON: QA-COM-PLP-CAROUSEL-RUN-001 passed with 100% of test cases. UAT is the required next gate before release. All P0 and P1 user stories (US-0009 through US-0014) must be validated by a real user before the feature can be released.
BLOCKING: N
BLOCKER DETAIL: None
```

---

### Example 2 — Blocking Gap (Missing Stories)

**Context:** PRD-0002 is Approved, but no User Story Objects exist for the carousel feature.

```
RECOMMENDED NEXT ACTION: Generate user stories for the Promotional Banner Carousel feature.
COMMAND: /product-stories REQ-0002
REASON: PRD-0002 is Approved but no User Story Objects have been created. Stories are required before a Development Plan can be written. GAP-MISSING-OBJ-003 flagged this as a Blocking gap.
BLOCKING: Y
BLOCKER DETAIL: No User Story Objects found linked to PRD-0002. Run /product-stories to generate stories from the approved PRD requirements.
```

---

### Example 3 — Pending Governance Gate

**Context:** Impact Assessment IMPACT-DEL-TASK-001 identified a schema change. G4 gate is triggered but not cleared.

```
RECOMMENDED NEXT ACTION: Obtain Schema Review approval (G4 gate) before proceeding to PRD.
COMMAND: Manually: share IMPACT-DEL-TASK-001 with the tech lead for schema review approval. Update governance.cleared_gates in the Impact Assessment Object once approved.
REASON: IMPACT-DEL-TASK-001 identified a schema change (new deliveryTasks table). Gate G4 (Schema Review) is mandatory for all schema changes and has not been cleared.
BLOCKING: Y
BLOCKER DETAIL: G4 (Schema Review) pending. Required approver: Tech Lead. Triggered by: schema_change flag on IMPACT-DEL-TASK-001.
```

---

### Example 4 — Full Resume Output (Multiple Items)

**Context:** `/product-resume` with 3 active items.

```
=== NEXT ACTIONS — NUEMART PRODUCT OS ===
Active Items: 3 | Blocking: 1 | Pending Approvals: 1 | Stale: 0

--- PRIORITY 1 (BLOCKING) ---

[1] REQ-0003 — Customer Search Feature
    RECOMMENDED NEXT ACTION: Resolve missing PRD — Impact Assessment is complete but no PRD exists.
    COMMAND: /product-prd REQ-0003
    REASON: IMPACT-COM-PLP-SEARCH-001 is complete and all governance gates are cleared. PRD creation is the next required step. GAP-MISSING-OBJ-007 flagged this as Blocking.
    BLOCKING: Y
    BLOCKER DETAIL: No PRD Object found for REQ-0003 despite Impact Assessment being complete.

--- PRIORITY 2 (LIFECYCLE ADVANCEMENT — CLOSEST TO RELEASE) ---

[2] REQ-0002 — Promotional Banner Carousel
    Current Stage: UAT Complete
    RECOMMENDED NEXT ACTION: Release the Promotional Banner Carousel feature.
    COMMAND: /product-release REQ-0002
    REASON: UAT-0001 is signed off. G7 (Release Approval) gate must be cleared, then release can proceed. This is the closest item to production.
    BLOCKING: N
    BLOCKER DETAIL: None

--- PRIORITY 3 (LIFECYCLE ADVANCEMENT) ---

[3] REQ-0001 — Delivery Module MVP
    Current Stage: Released
    RECOMMENDED NEXT ACTION: Run post-release review for the Delivery Module.
    COMMAND: Schedule post-release review for REQ-0001 — due 2026-06-29 (7 days post-release).
    REASON: REQ-0001 was released. A post-release review is scheduled for 7 days after release per release process.
    BLOCKING: N
    BLOCKER DETAIL: None
```

---

## Related Files

- `AI_REASONING_MODEL.md` — Next action recommendation is Step 13 of the reasoning model
- `AI_AGENTS.md` — Intelligence Agent (Agent 15) is the primary caller of this engine
- `GAP_DETECTION_ENGINE.md` — Blocking gaps feed directly into Branch 1 of this engine
- `LIFECYCLE_MODELS.md` — Lifecycle stages and transitions power Branch 3
- `APPROVAL_GATES.md` — Pending gate status powers Branch 2
- `TRACEABILITY_ENGINE.md` — Chain completeness informs advancement eligibility

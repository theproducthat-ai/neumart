# Multi-Request Decomposition Rules

Governs how the AI handles user input that contains more than one request, or input that is ambiguous, mixed, or bundled.

---

## 1. Detection Rules

Before acting on any input, the AI must classify it as one of:

| Input Type | Signal | Action |
|-----------|--------|--------|
| Single request | One clear ask, one subject | Process directly as REQ |
| Multiple independent requests | Two or more distinct subjects | Create intake batch, decompose |
| Parent initiative + child requests | One goal with multiple workstreams | Create initiative + child REQs |
| Mixed types (feature + bug + question) | Different classifications in one input | Decompose by type, route each appropriately |
| Unclear or vague request | Intent cannot be determined | Ask one targeted clarification question |
| Duplicate request | Matches an existing open REQ | Flag match, ask whether to merge or separate |

---

## 2. When to Create an Intake Batch

Create an `INTAKE_BATCH` object when:
- Input contains 2+ distinct requests.
- Input mentions multiple features, bugs, or screens.
- Input mixes short-term asks with long-term ideas.
- Input contains a numbered list of items.

A batch is not needed for a single request, even if long.

---

## 2a. Intake Batch Object — Required for All Multi-Request Inputs

When an intake batch is triggered (Section 2), **always** create or preview an Intake Batch Object that records the full batch in a single file.

**Object path:** `product/objects/intake-batches/INTAKE-BATCH-{YYYY-MM-DD}-{SEQ}.md`

Use sequence `001`, `002`... if multiple batches are submitted on the same date.

**Required frontmatter fields:**

```yaml
---
object_id: "INTAKE-BATCH-{YYYY-MM-DD}-{SEQ}"
object_type: IntakeBatch
raw_input: "[verbatim user input, unmodified]"
write_mode: "dry_run | create_objects | commit_after_approval"
submitted_date: "{YYYY-MM-DD}"
item_count: N
---
```

**Required body sections:**

| Section | Content |
|---------|---------|
| `child_objects` | List of all REQUEST / BUG / ROADMAP IDs created or planned from this batch |
| `duplicate_references` | Any asks identified as duplicates, with the referenced existing object ID |
| `deferred_roadmap_items` | Any asks routed to ROADMAP_OPTION or DEFERRED_ITEM rather than an active lane |
| `per_item_summary` | One row per ask: ID, title, type, lane, status, next_action |

**Per-item summary row format:**

```
| ID                              | Title                        | Type         | Lane    | Status   | Next Action              |
| REQUEST-DEL-DELSTATUS-TRACK-001 | Customer Delivery Tracking   | New Feature  | Lane 3  | intake   | /product-grill           |
| BUG-COM-CART-QTY-001            | Cart Quantity Bug            | Bug Fix      | Lane 1  | intake   | Quick fix notes + QA     |
| (duplicate — REQ-0009)          | Product Image Size           | —            | —       | dup      | Merge with REQ-0009      |
| ROADMAP-PAY-GATEWAY-RAZORPAY-001| Razorpay Integration         | New Feature  | deferred| roadmap  | Reactivate when ready    |
```

**In dry-run mode**, show this file under `Would create:` in the FILES CHANGED section — it must appear **first** in the list, before any child object paths.

**Template:** `product/os/templates/INTAKE_BATCH_OBJECT_TEMPLATE.md`

---

## 3. Decomposition Steps

1. Read the full input.
2. Identify each distinct ask (by subject, type, and action).
3. Assign each a clean `extracted_request` statement.
4. Classify each (`feature | bug | enhancement | question | idea | ops | risk | other`).
5. Assign each a lane and provisional priority.
6. Create one REQ object per ask.
7. Set `parent_batch_id` on each child REQ.
8. If any ask is unclear, park it with a note; do not discard it.

---

## 4. When to Create an Initiative

Create an initiative instead of (or in addition to) child requests when:
- Multiple requests share one business goal.
- Combined scope exceeds one sprint.
- Multiple modules or teams are affected.
- A roadmap item is the source.

Link all child requests to the initiative.

---

## 5. When to Create Separate Features

Create separate features (not one feature) when:
- Requests map to distinct user journeys.
- Requests have different target users.
- Requests have independent release timelines.
- Requests have different owners or lanes.

Do not bundle unrelated work into one feature to reduce ticket count.

---

## 6. When to Park a Request

Park (move to `parking-lot`) when:
- Input is too vague to evaluate.
- No business owner or product owner can be identified.
- Requires strategic decision not yet made.
- Is an exploratory idea without a clear problem statement.
- Flagged as `someday / maybe` by the submitter.

Always create the PLT object with the verbatim input. Never silently discard.

---

## 7. When to Defer a Request

Defer (move to `deferred-items`) when:
- Valid request, but blocked by dependency.
- Explicitly assigned to a future phase or quarter.
- Current capacity or priority makes it impossible now.
- Prerequisite feature must ship first.

Always set `target_quarter` or `reactivation_trigger` on deferred items.

---

## 8. When to Ask for Clarification

Ask one question when:
- The core intent of a request is unclear.
- Two requests appear contradictory.
- The target user cannot be inferred.
- The request could be interpreted as feature OR bug OR tech-debt.

Rules:
- Ask one question at a time.
- Ask the most important question, not all of them.
- Proceed with stated assumptions for minor ambiguities rather than blocking.
- Document the assumption in the REQ object.

---

## 9. When to Proceed with Assumptions

Proceed without asking when:
- Intent is clear enough to define an `extracted_request`.
- Minor ambiguity exists but a reasonable default is obvious.
- The user has previously clarified similar inputs.

Always record the assumption explicitly:
```
assumptions_made:
  - Assumed X because Y. If incorrect, update extracted_request.
```

---

## 10. No-Loss Rule

**No part of a user's input may be silently discarded.**

If a sub-request cannot be cleanly processed:
- Create a PLT or DEF object with verbatim input.
- Add a note explaining why it was parked/deferred.
- Surface it in `REQUEST_TRIAGE_VIEW.md`.

The system must be able to account for every sentence of every submitted input.

---

## 11. Child Request Required Fields

Every request extracted from a batch must have:
```
parent_batch_id:
raw_user_input:
extracted_request:
classification:
lane:
priority:
status:
owner:
required_artifacts:
next_action:
```

Missing any of these fields is a decomposition error. The AI must fill or mark unknown for each.

---

## Related
- Template: `product/os/templates/INTAKE_BATCH_OBJECT_TEMPLATE.md`
- Template: `product/os/templates/BACKLOG_ITEM_TEMPLATE.md`
- Template: `product/os/templates/PARKING_LOT_ITEM_TEMPLATE.md`
- Template: `product/os/templates/DEFERRED_ITEM_TEMPLATE.md`
- Policy: `product/os/policies/REQUEST_CLASSIFICATION_RULES.md`
- Policy: `product/os/policies/EDGE_CASE_HANDLING_RULES.md`

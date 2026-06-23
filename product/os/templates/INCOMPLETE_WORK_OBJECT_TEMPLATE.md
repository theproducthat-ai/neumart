# Nuemart Product OS — Incomplete Work Object Template
**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

> Template for Incomplete Work Item Objects. These objects capture work that was started but not completed — whether deferred, abandoned, blocked, or partially built. Incomplete work is always documented so it can be found, understood, and resolved in the future. File location: `product/objects/incomplete-work/{file_slug}.md`.

---

```yaml
---
# ─────────────────────────────────────────────
# IDENTITY
# ─────────────────────────────────────────────
object_id: ""                        # e.g. INCOMPLETE-COM-PLP-CAROUSEL-001
legacy_id: ""
object_type: IncompleteWork

# ─────────────────────────────────────────────
# NOMENCLATURE
# ─────────────────────────────────────────────
product_area_code: ""
module_code: ""
submodule_code: ""
feature_slug: ""
sequence: ""
version: "1.0"
canonical_name: ""                   # e.g. "Carousel keyboard navigation — Deferred from v1.2"
display_name: ""
file_slug: ""

# ─────────────────────────────────────────────
# INCOMPLETE WORK SPECIFIC FIELDS
# ─────────────────────────────────────────────
incomplete_type: ""                  # Deferred | Abandoned | Partially Built | Out of Scope | Blocked

# ─────────────────────────────────────────────
# SOURCE
# ─────────────────────────────────────────────
source_object: ""                    # Object ID of what was partially done or deferred (FEATURE/STORY/TASK/etc.)
source_object_type: ""               # Object type of source
source_object_name: ""               # Display name of source
source_release: ""                   # RELEASE-... ID of the release where this work was deferred/dropped

# ─────────────────────────────────────────────
# WHY INCOMPLETE
# ─────────────────────────────────────────────
reason_incomplete: ""                # Brief explanation of why this work was not completed
blocker: ""                          # If Blocked: what is blocking completion

# ─────────────────────────────────────────────
# RESOLUTION OPTIONS
# ─────────────────────────────────────────────
resolution_options: []               # Complete | Defer | Drop (list the viable options)
recommended_resolution: ""           # AI or product owner recommendation
target_resolution_date: ""           # YYYY-MM-DD (when this should be revisited)

# ─────────────────────────────────────────────
# WHAT EXISTS
# ─────────────────────────────────────────────
completion_percentage: ""            # Rough estimate: 0% | 25% | 50% | 75% | 90%
work_completed: []                   # List of what was done (tasks, stories, components)
work_remaining: []                   # List of what still needs to be done

# ─────────────────────────────────────────────
# FORWARD PATH
# ─────────────────────────────────────────────
linked_enhancement: ""               # FEATURE-... or REQUEST-... ID for follow-on work
enhancement_status: ""               # Not Created | Created | Planned | In Progress

# ─────────────────────────────────────────────
# STATUS
# ─────────────────────────────────────────────
status: ""                           # Documented | Pending Resolution | Resolved | Dropped

# ─────────────────────────────────────────────
# RELATIONSHIPS
# ─────────────────────────────────────────────
relationships:
  sourced_from: ""                   # Source object ID
  deferred_in: ""                    # RELEASE-... ID where deferral decision was made
  linked_to_enhancement: ""          # Future enhancement object ID

# ─────────────────────────────────────────────
# OWNERSHIP
# ─────────────────────────────────────────────
owner: ""
created_by: ""
created_at: ""
updated_at: ""

# ─────────────────────────────────────────────
# METADATA
# ─────────────────────────────────────────────
metadata:
  source_system: "Product OS"
  schema_version: "1.0"
  confidence: ""
---
```

---

## 1. Incomplete Work Summary

**Object ID:** `{object_id}`
**Type:** {incomplete_type}
**Status:** {status}
**Source Object:** {source_object} — {source_object_name}
**Source Release:** {source_release}
**Completion:** {completion_percentage}
**Owner:** {owner}

---

## 2. What Was This Work?

> Describe what was being built or planned before it became incomplete. What user need or feature was being addressed?

{description — 2–4 sentences}

**Related Feature:** {linked_feature or source_object}
**Original Goal:** {what completion would have delivered for users}

---

## 3. What Was Completed

> What parts of this work are actually done and potentially usable or reusable?

| Item | Status | Notes |
|---|---|---|
| {work item 1} | Complete | {where the completed work lives} |
| {work item 2} | Complete | {notes} |
| {work item 3} | Partial | {what's there and what's missing} |

*(or: Nothing was completed — work did not begin.)*

---

## 4. What Remains

> What would still need to be done to complete this work?

| Remaining Item | Estimated Effort | Dependency |
|---|---|---|
| {item 1} | {S/M/L} | {depends on what} |
| {item 2} | {S/M/L} | {depends on what} |

**Total remaining estimate:** {S / M / L / XL}

---

## 5. Why It's Incomplete

**Incomplete Type:** {incomplete_type}

| Type | Applies Because |
|---|---|
| Deferred | {why it was deferred — e.g. "out of time for this release cycle"} |
| Abandoned | {why work stopped — e.g. "requirements changed, original approach no longer valid"} |
| Partially Built | {what prevented completion — e.g. "blocked by schema decision not yet made"} |
| Out of Scope | {why it was descoped — e.g. "identified as nice-to-have in grilling, cut to hit deadline"} |
| Blocked | {what is blocking — e.g. "waiting for Razorpay to support this API"} |

**Reason:** {reason_incomplete}

**Blocker** (if Blocked): {blocker}

---

## 6. Resolution Options

> What are the realistic options for dealing with this incomplete work?

| Option | Description | Effort | Risk |
|---|---|---|---|
| Complete | Finish the remaining work in a future release | {S/M/L/XL} | {Low/Medium/High} |
| Defer | Keep it documented, revisit when conditions change | None now | {risk of forgetting} |
| Drop | Formally abandon and close, document decision | None | {risk of losing value} |

**Recommended Resolution:** {recommended_resolution}
**Recommendation Rationale:** {why this resolution is recommended}

---

## 7. Target Resolution Date

**Revisit By:** {target_resolution_date}

**Trigger for revisit** (if no fixed date): {what event or condition should prompt revisiting this}

---

## 8. Resolution Path

> If `recommended_resolution: Complete` — what's the path?

**Next steps to complete:**
1. {step 1}
2. {step 2}
3. Create new Request Object: {YES/NO}

**Enhancement Object:** {linked_enhancement} (or: "Not yet created — needs Request Object")
**Enhancement Status:** {enhancement_status}

---

## 9. Impact of Remaining Incomplete

> What is the user or business impact of this work remaining incomplete?

**User impact:** {what users experience due to this work not being done}
**Business impact:** {any business metric or outcome affected}
**Urgency:** {High — address immediately | Medium — address this quarter | Low — backlog}

---

## 10. Code / Asset State

> Where does any partial work live, and how complete is it?

| Artifact | Location | Completeness | Notes |
|---|---|---|---|
| {component/file} | {file path or branch} | {percentage} | {what's there} |
| {design/spec} | {location} | {percentage} | {notes} |

*(or: No artifacts created — work was only in planning stage.)*

---

## 11. AI Reasoning Notes

**Identified by:** {command or process that surfaced this as incomplete}
**Why documented:** {why this incomplete work is worth tracking rather than just deleting}

---

## 12. Change History

| Version | Date | Changed By | Change Summary |
|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Product OS | Incomplete work documented |
| 1.1 | {YYYY-MM-DD} | {who} | Resolution decision made |

---

## Definition of Done for This Object

- [ ] Incomplete type classified (Deferred/Abandoned/Partially Built/Out of Scope/Blocked)
- [ ] Source object identified and linked
- [ ] What was completed vs what remains clearly enumerated
- [ ] Reason for incompleteness documented
- [ ] Resolution options assessed
- [ ] Recommended resolution stated with rationale
- [ ] Target resolution date or trigger set
- [ ] User and business impact stated
- [ ] Enhancement object created or status set to "Not Yet Created"
- [ ] Status set to `Documented`

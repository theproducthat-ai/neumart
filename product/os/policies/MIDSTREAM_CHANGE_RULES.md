# Midstream Change Rules

Governs how the AI handles new information, pointers, or requirements discovered during active product work — from request intake through PRD writing, design, development, QA, UAT, and release.

---

## 0. Intake-Stage Change Inputs

This section covers change inputs received **during the intake phase** — before a request is committed, before a PRD exists, and before any lifecycle advancement has occurred. These arrive via `/product-request` with midstream trigger phrases.

### 0.1 Detection — Trigger Phrases

The following patterns route to `CHANGE IMPACT ANALYSIS COMPLETE (V2)` instead of `REQUEST INTAKE COMPLETE (V2)`:

| Trigger Pattern | Example |
|---|---|
| `New pointer:` | "New pointer: low-stock report should support CSV export" |
| `Add this point to...` | "Add this to REQUEST-ADM-RPT-LOW-STOCK-001" |
| `Check impact on [ID]` | "Check impact on REQUEST-DEL-DELSTATUS-ORDER-TRACK-001" |
| `Does this update the same request` | "Tell me whether this updates the same request" |
| `Should this be Phase 2` | "Should this become Phase 2?" |
| `Does this require a new version` | "Does this require a new version of REQ-0009?" |
| `Does this affect [ID]` | "Does this affect REQUEST-COM-CART-QTY-001?" |
| `Amend [ID] to include` | "Amend REQ-0010 to include CSV export" |
| `Impact of X on [ID]` | "What's the impact of this category filter on REQUEST-ADM-RPT-..." |

**Routing rule:** If ANY trigger phrase is detected AND a named target object is referenced → route to `CHANGE IMPACT ANALYSIS COMPLETE (V2)`. Only switch to `REQUEST INTAKE COMPLETE (V2)` if the user explicitly decides to create a separate independent request.

### 0.2 Committed vs. Uncommitted Target Objects

Before running change analysis, check whether the target object is committed:

| Check | Method |
|---|---|
| File exists | `product/objects/requests/{ID}.md` present |
| Index entry exists | Entry found in `product/indexes/REQUEST_INDEX.md` |
| Legacy ID committed | `MASTER_REGISTRY.md` Last Used ≥ target's REQ-NNNN |

**If target is NOT committed** (dry-run reference only):

| Possible Action | Rule |
|---|---|
| New version | **NOT APPLICABLE** — no committed v1 exists to version against |
| Change Note (CHN) | Optional — useful for tracking but not required |
| Amend scope | **RECOMMENDED** — fold new scope into target before first commit |
| No new file needed | Correct for amend path |
| Separate object | Valid only if Phase 2 or explicitly independent scope |

**If target IS committed:**
- Apply Section 3 (Classify the Change) and Section 4 (Run Impact Analysis) normally.
- A Change Note (CHN) is required for any scope amendment.
- "New version" may apply per `VERSIONING_RULES.md`.

### 0.3 Phase 2 Object Type Selection

When a user chooses Phase 2 or separate tracking in a change impact analysis, the type of object created depends on the nature of the deferred scope:

| Deferred Scope Nature | Create | Template | Path |
|---|---|---|---|
| Known scope, deferred for delivery sequencing | `DEFERRED_ITEM` | `DEFERRED_ITEM_TEMPLATE.md` | `product/objects/deferred-items/DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}.md` |
| Strategic, uncertain, or requires future discovery | `ROADMAP_OPTION` | `ROADMAP_OPTION_TEMPLATE.md` | `product/objects/roadmap-options/ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |
| Explicitly approved for active delivery intake | `REQUEST` | Per lane template | `product/objects/requests/REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |

**Default when scope is known:** `DEFERRED_ITEM` — do not create an active `REQUEST` unless the user explicitly approves it for delivery.

**Signals for DEFERRED_ITEM (scope is known):**
- User described what the feature does in concrete terms
- Deferral reason is sequencing or capacity ("ship basic first, add export later")
- Scope is a concrete capability addition, not a strategic direction

**Signals for ROADMAP_OPTION (scope is unknown):**
- Scope is undefined or exploratory ("maybe add CSV someday")
- Item is strategic or directional
- Discovery is needed before scoping

**DEFERRED_ITEM ID format:** `DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}`
Example: `DEFERRED-ADM-RPT-LOWSTOCK-EXPORT-001`
Path: `product/objects/deferred-items/DEFERRED-ADM-RPT-LOWSTOCK-EXPORT-001.md`

---

### 0.4 Output Format

Intake-stage change inputs use `CHANGE IMPACT ANALYSIS COMPLETE (V2)` not `REQUEST INTAKE COMPLETE (V2)`.
Full output format: `.claude/skills/product-request/SKILL.md` Step 11.

---

## 1. Trigger Phrases

The following user inputs trigger this policy:

| User Input | AI Action |
|-----------|-----------|
| "Add this pointer to this PRD" | Create DSN or CHN, assess impact |
| "I found a new requirement" | Create DSN, classify, assess impact |
| "This affects the same feature" | Create CHN linked to the feature |
| "Check if this impacts development" | Run impact check (IMP), report |
| "Add this to the module" | Create CHN linked to module, assess |
| "Is this a scope change?" | Classify per Step 3, create SCH if yes |
| "Does this affect QA/UAT/release?" | Run IMP across those areas |
| "Can we add this without impact?" | Run IMP, report findings |

---

## 2. Step 1 — Identify the Impacted Object

Before taking any action, identify:
- Which object is affected (PRD, feature, story, design, release, etc.)?
- What is its current status and version?
- Who is the owner?

---

## 3. Step 2 — Capture the New Pointer

Create one of:
- **Discovery Note (DSN)** — new information that may or may not require a change.
- **Change Note (CHN)** — a confirmed change to an existing object.

Never silently edit a PRD or feature without creating a CHN or DSN first.

---

## 4. Step 3 — Classify the Change

| Classification | Definition | Next Action |
|---------------|------------|-------------|
| Clarification | Explains existing scope more precisely | Update current object; note in CHN |
| Minor addition | Small addition within existing scope | Update current object; note in CHN |
| Scope change | Alters the agreed scope | Create SCH; run IMP; seek approval |
| New sub-feature | New capability under existing feature | Create subfeature; link to parent |
| New feature | Separate, independent capability | Create REQ/FEA; do not add to current |
| Separate request | Belongs to a different object | Create REQ; link as related |
| Bug | A defect in existing behaviour | Create BUG object |
| Risk | Something that could go wrong | Create RSK object |
| Blocker | Prevents progress on current work | Create OPQ or CHN; flag immediately |

When in doubt, classify conservatively (e.g., treat possible scope change as scope change) and ask one targeted question.

---

## 5. Step 4 — Run Impact Analysis

For any change classified as scope change, new sub-feature, or higher:

Run an impact check (IMP) across:
1. PRD
2. User stories
3. Design
4. Technical design
5. Data model / schema
6. API contracts
7. QA test plan
8. UAT plan
9. Release plan
10. Support / ops readiness
11. Roadmap

Record results in an `IMPACT_CHECK` object. Flag any area with `yes` or `unknown` impact.

---

## 6. Step 5 — Recommend an Action

Based on classification and impact, recommend one of:

| Recommendation | When to Use |
|---------------|-------------|
| Update current object | Clarification or minor addition with no downstream impact |
| Create new version | Minor addition that affects multiple linked objects |
| Create child request | New sub-feature or new feature discovered |
| Create change request | Scope change requiring approval |
| Park for later | Cannot evaluate now; out of current scope |
| Reject from current scope | Clearly outside scope; no path to current sprint/release |

---

## 7. No Silent Edits Rule

**The AI must never edit a PRD, feature, or story without first creating a CHN or DSN that records:**
- What changed.
- Why it changed.
- Who raised it.
- When it was raised.

The change history must be preserved in the object's `version_history` section.

---

## 8. Traceability

After applying a change:
- Update the parent object's `version_history`.
- Update the TRACEABILITY_MATRIX if linked objects are affected.
- Update the relevant view (ACTIVE_WORK_VIEW, MODULE_VIEW, etc.) if needed.

---

## Related
- Template: `product/os/templates/CHANGE_NOTE_TEMPLATE.md`
- Template: `product/os/templates/DISCOVERY_NOTE_TEMPLATE.md`
- Template: `product/os/templates/IMPACT_CHECK_TEMPLATE.md`
- Template: `product/os/templates/SCOPE_CHANGE_TEMPLATE.md`
- Template: `product/os/templates/OPEN_QUESTION_TEMPLATE.md`
- Policy: `product/os/policies/VERSIONING_RULES.md`
- Policy: `product/os/policies/APPROVAL_GATES.md`

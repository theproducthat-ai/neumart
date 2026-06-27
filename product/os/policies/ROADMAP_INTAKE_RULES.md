# Roadmap Intake Rules

Governs how roadmap items are captured, evaluated, converted, and managed.

---

## 1. What Qualifies as a Roadmap Item

A roadmap item is any potential future capability, change, or investment that:
- Is not ready to be turned into a feature or PRD immediately.
- Requires discussion, validation, or prioritisation.
- Has a business goal, user need, or strategic intent.

If something can go directly to a REQ or FEA today, create those objects. Do not route it through the roadmap as a delay mechanism.

---

## 2. Accepted Sources

| Source | Action |
|--------|--------|
| New module idea | Create RMI, classify as strategic |
| New feature idea | Create RMI or REQ depending on readiness |
| Stakeholder roadmap request | Create RMI, record stakeholder as source |
| Client roadmap commitment | Create RMI + CLIENT_COMMITMENT object |
| Business roadmap option | Create RMI with business_goal and priority_score |
| Technical roadmap item | Create RMI, tag lane as engineering |
| Support/ops-driven idea | Create RMI, link to support tickets or ops issues |
| Strategic idea not ready for PRD | Create RMI with status = idea |
| Research-backed opportunity | Create RMI, link to EVD or RSN objects |
| PDF / flow diagram / screenshot / email | Create RMI + REFERENCE_MATERIAL or ATTACHMENT_REFERENCE |
| Figma link | Create RMI + FIGMA_LINK object |
| Meeting notes / Excel | Create RMI + ATTACHMENT_REFERENCE |

---

## 3. Required Fields at Intake

Minimum to create an RMI:
- `title`
- `source`
- `problem_statement` (or `summary` if problem is not yet defined)
- `submitted_by`
- `status = idea`

All other fields can be `TBD` initially. Missing information is captured but does not block RMI creation.

---

## 4. Source Material Handling

When the user provides:
- A PDF → create ATT-NNN, link to RMI.
- A Figma link → create FIGMA_LINK object, link to RMI.
- A flow diagram → create FLW-NNN, link to RMI.
- A screenshot → create SCREENSHOT_REFERENCE, link to RMI.
- Meeting notes → create ATT-NNN or RSN-NNN, link to RMI.
- Excel / spreadsheet → create ATT-NNN, link to RMI.

The AI should ask for the content summary of the material and record it in the reference object. The file itself is not stored in the repo — only the pointer and context.

---

## 5. Supported Commands

The system supports:
```
Add this to roadmap
Compare this roadmap option
Start discussion from roadmap item RMI-NNN
Attach this PDF/diagram/context to roadmap item RMI-NNN
Convert this roadmap option into a request
Convert this roadmap option into a PRD
Show roadmap options for RMI-NNN
What is the status of RMI-NNN?
Who owns RMI-NNN?
```

---

## 6. When to Create Options

Create ROADMAP_OPTION (RMO) objects when:
- Two or more approaches exist for the same roadmap item.
- A decision is being made between build vs. buy vs. defer.
- Stakeholders are debating scope or approach.

A single obvious approach does not need an option object.

---

## 7. When to Create a Decision

Create ROADMAP_DECISION (RMD) when:
- A significant choice has been made about a roadmap item.
- The decision closes discussion on a set of options.
- The decision triggers conversion to a feature or request.

---

## 8. Conversion Rules

Convert a roadmap item to a request when: ready for active evaluation.
Convert a roadmap item to a feature when: PRD-ready and approved.
Convert a roadmap item to an initiative when: spans multiple modules/features.
Convert a roadmap item to an experiment when: validation-first approach is needed.

On conversion:
- Update `converted_to_type` and `converted_to_id`.
- Update `status = converted`.
- The original RMI is not deleted — it is the source of record.

---

## 9. Prioritisation

Every roadmap item should have:
- `priority_score` (1–10)
- `confidence` (low | medium | high)
- `target_quarter` (or TBD)

Items without scores are reviewed in the next roadmap review cycle.

---

## Related
- Template: `product/os/templates/ROADMAP_ITEM_TEMPLATE.md`
- Template: `product/os/templates/ROADMAP_OPTION_TEMPLATE.md`
- Template: `product/os/templates/ROADMAP_DECISION_TEMPLATE.md`
- Views: `product/views/ROADMAP_OPTIONS_VIEW.md`
- Index: `product/indexes/ROADMAP_REFERENCE_INDEX.md`

---

## 12. Deferred Language Detection — Integration with `/product-request`

When `/product-request` receives input containing deferred language signals, it must route the item to a Roadmap Object rather than an active REQUEST or BUG object.

### Deferred Language Trigger Words

If any ask in the input contains ANY of the following (case-insensitive), treat that item as a roadmap / deferred item:

| Category | Trigger Words |
|----------|--------------|
| Timing deferrals | "later", "not now", "not yet", "eventually", "someday" |
| Explicit roadmap signals | "roadmap", "on the roadmap", "add to roadmap", "keep for later" |
| Future scope | "future", "future phase", "later phase", "phase 2", "next phase" |
| Parking signals | "park", "parked", "parking lot", "backlog" |
| Deferral verbs | "defer", "deferred", "shelve", "hold off", "hold for now", "skip for now" |

### Routing Action

When deferred language is detected for a specific ask:

1. **Do NOT** assign an active work type lane (Lane 1–10).
2. **Do NOT** create a REQUEST object in `product/objects/requests/`.
3. **Do NOT** generate discovery questions — the item is not ready for active scoping.
4. **Create a ROADMAP_OPTION object** using the attributes below.

### ROADMAP_OPTION Object Format

| Field | Value |
|-------|-------|
| Semantic ID | `ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}` |
| Example | `ROADMAP-PAY-GATEWAY-RAZORPAY-001` |
| Template | `ROADMAP_OPTION_TEMPLATE.md` |
| Path | `product/objects/roadmap-options/ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |
| Status at creation | `deferred` |
| Legacy ID | Assign next `REQ-NNNN` as `legacy_id` for traceability |

### Artifacts at Roadmap Stage

No execution artifacts are required or created at roadmap stage:

| Artifact | Status |
|----------|--------|
| PRD | Not needed |
| User stories | Not needed |
| Tech design | Not needed |
| Development plan | Not needed |
| Discovery questions to user | Not generated |

Capture only: title, problem statement, and any blocking flags noted for future reference.

### Output Block in `/product-request`

Show a `ROADMAP ITEM CAPTURED` block instead of `REQUEST INTAKE COMPLETE`:

```
ROADMAP ITEM CAPTURED
=====================
Object ID:      ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}
Legacy ID:      REQ-NNNN
Title:          [inferred title]
Status:         deferred
Template:       ROADMAP_OPTION_TEMPLATE.md

OBJECT PATH
  product/objects/roadmap-options/ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}.md

BLOCKING FLAGS (noted for future activation — not active now)
  [flags that would apply when this item enters active development]
  (or: None identified at this stage)

NEXT ACTION
  No active development or discovery. When ready to scope this item:
  Re-submit via /product-request [description without deferral language]
  The new request will be linked to this roadmap item as a continuation.
```

### Conversion to Active Request

When the user later decides to activate a roadmap item:

1. Re-submit via `/product-request` describing the scope without deferral language.
2. The system creates a new REQUEST object with `related_prior_work: ROADMAP-{ID}` and relationship `continuation`.
3. Update the roadmap item: `status = converted`, `converted_to_id = REQUEST-{ID}`.
4. The original ROADMAP object is not deleted — it is the source of record.

---

## 13. Phase 2 Deferred Items — Three-Way Routing

When Phase 2 is chosen (from deferred language in intake or midstream change analysis), apply three-way routing based on the nature of the deferred scope. Do not default to `ROADMAP_OPTION` for all deferred items.

### Routing Table

| Nature of Deferred Item | Object to Create | Template | Path |
|---|---|---|---|
| Known scope, deferred for sequencing | `DEFERRED_ITEM` | `DEFERRED_ITEM_TEMPLATE.md` | `product/objects/deferred-items/DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}.md` |
| Strategic, uncertain, or requires discovery | `ROADMAP_OPTION` | `ROADMAP_OPTION_TEMPLATE.md` | `product/objects/roadmap-options/ROADMAP-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |
| Approved for active delivery intake | `REQUEST` | Per lane template | `product/objects/requests/REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |

**Default:** When scope is already defined by the user (even if deferred), create a `DEFERRED_ITEM`. Only create a `ROADMAP_OPTION` when scope is undefined or strategic. Never create an active `REQUEST` from deferred language unless explicitly approved.

### Signals for DEFERRED_ITEM

- User described what the feature does in concrete terms (even if briefly)
- Deferral reason is sequencing or capacity ("ship basic first, add this later")
- Scope is a concrete capability addition, not a strategic idea
- Example: "CSV export for the low-stock report, but in Phase 2"

### Signals for ROADMAP_OPTION

- Scope is not yet defined or is exploratory
- Item is a strategic direction or discovery-oriented
- User used "maybe", "possibly", "someday" rather than "later"
- Example: "maybe add machine learning recommendations someday"

### DEFERRED_ITEM ID Format

`DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}`

| Component | Rule |
|---|---|
| `MODULE` | Module code matching the deferred scope (e.g., `ADM`, `COM`) |
| `AREA` | Area/sub-module code (e.g., `RPT`, `PLP`) |
| `SHORTNAME` | 1–3 word scope slug in uppercase (e.g., `LOWSTOCK-EXPORT`) |
| `SEQ` | 3-digit zero-padded sequence (e.g., `001`) |

Example: `DEFERRED-ADM-RPT-LOWSTOCK-EXPORT-001`
Path: `product/objects/deferred-items/DEFERRED-ADM-RPT-LOWSTOCK-EXPORT-001.md`

### Output Block

Use `DEFERRED ITEM CAPTURED` (not `ROADMAP ITEM CAPTURED`) when creating a `DEFERRED_ITEM`:

```
DEFERRED ITEM CAPTURED
======================
Object ID:      DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}
Legacy ID:      REQ-NNNN
Title:          [inferred title]
Status:         deferred
Template:       DEFERRED_ITEM_TEMPLATE.md

OBJECT PATH
  product/objects/deferred-items/DEFERRED-{MODULE}-{AREA}-{SHORTNAME}-{SEQ}.md

BLOCKING FLAGS (noted for future activation — not active now)
  [flags that would apply when this item enters active development]
  (or: None identified at this stage)

NEXT ACTION
  No active development. When ready to activate:
  Re-submit via /product-request [description] to create a REQUEST linked
  to this deferred item as a continuation.
```

### Activation

When the team is ready to activate a deferred item:
1. Re-submit via `/product-request --commit` describing the scope.
2. The system creates a `REQUEST` with `related_prior_work: DEFERRED-{ID}` and relationship `continuation`.
3. Update the deferred item: `status = converted`, `converted_to_id = REQUEST-{ID}`.

---

## 14. Roadmap Activation Pre-flight Check

Before converting any ROADMAP or DEFERRED item to an active REQUEST, verify that the source object exists as a committed file.

### Activation Trigger Patterns

| Pattern | Example |
|---|---|
| `Activate ROADMAP-{ID}` | "Activate ROADMAP-PAY-GATEWAY-RAZORPAY-001 for discovery" |
| `Convert ROADMAP-{ID} to...` | "Convert ROADMAP-COM-PLP-SEARCH-001 to a request" |
| `Ready to build ROADMAP-{ID}` | "Ready to build ROADMAP-DEL-TRACK-LIVE-001" |
| `Start [discovery/work/development] on ROADMAP-{ID}` | "Start discovery on ROADMAP-ADM-RPT-ANALYTICS-001" |
| `Move ROADMAP-{ID} to active` | "Move ROADMAP-INV-THRESH-AUTO-001 to active" |

### Pre-flight Check

When an activation trigger is detected, check the target file **before** generating any intake output:

| Check | Method |
|---|---|
| File exists | `product/objects/roadmap-options/{ROADMAP-ID}.md` present |
| Fallback | `product/objects/deferred-items/{DEFERRED-ID}.md` (for DEFERRED activations) |

**If committed** → proceed with intake per Section 12 conversion rules. Link as `continuation`.

**If NOT committed** → stop. Output `ROADMAP ACTIVATION TARGET NOT COMMITTED` block. Do not proceed to REQUEST intake until the user confirms an option.

### Output Block: ROADMAP ACTIVATION TARGET NOT COMMITTED

```
ROADMAP ACTIVATION TARGET NOT COMMITTED
========================================
Target:   {ROADMAP-ID or DEFERRED-ID}
Status:   File not found at
          product/objects/roadmap-options/{ROADMAP-ID}.md
          This item exists only as a session reference — it was never
          committed to the Product OS as a file.

OPTIONS
  A. Commit roadmap parent first, then activate  (Recommended)
     Commits {ROADMAP-ID} as a file first, then creates the active REQUEST.
     Maintains full traceability: roadmap → request → PRD → delivery.
     Command: /product-request --commit [roadmap description]
              Then re-run: /product-request [activation description]

  B. Create active request now without committed roadmap parent
     Proceeds with REQUEST intake immediately. The ROADMAP parent is noted
     as a session reference — no committed traceability link exists.
     Risk: If {ROADMAP-ID} is later committed with different scope, the
     continuation link will be inconsistent.
     Command: Re-run /product-request --commit [request description]
              and confirm "Option B."

  C. Create both roadmap parent and active request in the same commit
     Commits both objects together. Full traceability in one operation.
     Command: /product-request --commit [description for both objects]

FILES CHANGED:  No
  [Option A — after parent is committed:]
    Would create:  product/objects/requests/REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}.md
    Would update:  product/indexes/REQUEST_INDEX.md
    Would update:  product/module-workspaces/MOD-{CODE}.md
  [Option B:]
    Would create:  product/objects/requests/REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}.md
    Would update:  product/indexes/REQUEST_INDEX.md
    Would update:  product/module-workspaces/MOD-{CODE}.md
    (parent link: session reference only — no committed ROADMAP file)
  [Option C:]
    Would create:  product/objects/roadmap-options/{ROADMAP-ID}.md
    Would create:  product/objects/requests/REQUEST-{AREA}-{MODULE}-{SLUG}-{SEQ}.md
    Would update:  product/indexes/REQUEST_INDEX.md
    Would update:  product/module-workspaces/MOD-{CODE}.md
    [If discovery_framing = true:]
    Would create:  product/objects/discovery/DISCOVERY-{AREA}-{MODULE}-{SLUG}-{SEQ}.md
                   (created during /product-prd — not at intake)
    Would update:  product/indexes/DISCOVERY_INDEX.md  (if file exists)
    Would update:  product/views/ROADMAP_VIEW.md        (if file exists)

Which option do you want to proceed with? (A / B / C)
```

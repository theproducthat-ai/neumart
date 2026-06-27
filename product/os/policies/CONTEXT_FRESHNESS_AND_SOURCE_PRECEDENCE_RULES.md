# Context Freshness and Source Precedence Rules

**Version**: 1.0  
**Owner**: Product Lead  
**Status**: Active  
**Last Updated**: 2026-06-24

---

## Purpose

Product OS context files become stale at different rates. When two sources describe the same entity — a table, a field, a feature, a module — but disagree, the system must **not silently choose one**. It must detect the conflict, label it, rank the sources by freshness and authority, and either auto-resolve it (when precedence is unambiguous) or surface it to the user (when resolution requires human confirmation).

**Goal: No silent winner.** A stale documentation file that contradicts actual implementation code must not silently override the code when classifying blocking flags or selecting a work type lane.

---

## Source Precedence Ranking

When two sources disagree, the higher-ranked source takes precedence. Lower-ranked sources are treated as potentially stale unless independently verified.

| Rank | Source | Type | Trust Rationale |
|------|--------|------|-----------------|
| 1 | Actual implementation files and schema (`schema.ts`, route files, component files, git commits) | `implementation` | Ground truth — the code defines what exists in production |
| 2 | Latest versioned Product OS object (`product/objects/`) | `product_os_object` | Deliberate decision artifact; updated when features ship |
| 3 | `CURRENT_APP_STATUS.md` | `status_doc` | Curated phase/feature delivery record; manually maintained |
| 4 | `DATA_ENTITY_MAP.md` | `schema_doc` | Schema snapshot; reflects intent but lags implementation |
| 5 | ROADMAP / future candidate files | `roadmap_doc` | Forward-looking; describes intended state, not current state |
| 6 | Legacy numbered folders (`product/00-xx/` to `product/14-xx/`) | `legacy_ref` | Reference layer; lowest priority in V2; often not updated post-delivery |

**Key precedence rules:**
- A git commit that names a delivered feature (e.g., `Phase 11 — Delivery Module MVP`) outranks `DATA_ENTITY_MAP.md` labelling the same entities as "Candidate — not built."
- `CURRENT_APP_STATUS.md` outranks `DATA_ENTITY_MAP.md` on feature delivery claims.
- Implementation files (`schema.ts`, route handlers, Convex functions) outrank all documentation files regardless of update date.
- A more recently dated file does not automatically outrank a less recently dated one — rank governs, not date (a fresh legacy folder still ranks below a stale Product OS object).

---

## When to Run Conflict Detection

Run conflict detection in **Step 1.5** — after reading all context files (Step 1) and before decomposing requests (Step 2).

Apply conflict detection when:
1. Two context sources describe the same table, field, feature, or module with different states.
2. A git commit or commit message implies delivery of something a documentation file labels as "not built," "candidate," or "future."
3. A module workspace or feature object contradicts a data map or status document.
4. A ROADMAP file describes something a Product OS object marks as "delivered."

**If no conflicts are detected → proceed silently to Step 2.**

---

## Conflict Detection Procedure

### Step C1 — Collect Claims

For each entity referenced in the current request (tables, fields, features, modules), collect all claims from the context sources read in Step 1.

**Entity types to check:**
- Convex tables and fields (from DATA_ENTITY_MAP.md, schema files)
- Feature delivery state (from CURRENT_APP_STATUS.md, module workspaces, git log)
- Module build status (from DATA_ENTITY_MAP.md vs. git commits)
- Phase completion (from CURRENT_APP_STATUS.md vs. git commit history)

### Step C2 — Compare Claims

For each entity where two or more sources make claims, compare them:

| Comparison Type | Example |
|---|---|
| Table exists vs. does not exist | DATA_ENTITY_MAP lists `deliveryTasks` as "Candidate"; git commit confirms delivery MVP shipped |
| Feature delivered vs. not started | CURRENT_APP_STATUS says Phase 11 = Razorpay (not started); git commit says Phase 11 = Delivery MVP |
| Field present vs. absent | DATA_ENTITY_MAP shows no `lowStockThreshold`; module workspace documents a threshold field |
| Schema ready vs. schema missing | orders table has `razorpayOrderId` in DATA_ENTITY_MAP; CURRENT_APP_STATUS says Razorpay not built |

### Step C3 — Apply Precedence

Using the precedence table above, determine which source is higher-ranked.

**If the higher-ranked source is clearly more authoritative (rank gap ≥ 2 levels) → auto-resolve:**
- Record the conflict and resolution in `ASSUMPTIONS MADE`.
- Note the lower-ranked source as stale.
- Do not surface a CONTEXT CONFLICT DETECTED block unless the resolution affects a blocking flag.

**If same-rank sources conflict, OR the conflict affects a blocking dimension → escalate:**
- Surface a `CONTEXT CONFLICT DETECTED` block.
- Do not silently proceed.

### Step C4 — Output the Conflict Block

For each detected conflict that is escalated (not auto-resolved), output:

```
CONTEXT CONFLICT DETECTED
──────────────────────────────────────────────────────────────────
Source A says:             [source name + what it claims]
Source B says:             [source name + what it claims]
Higher-confidence source:  [source name — or "Cannot determine automatically"]
Decision:                  [auto-resolved to Source A/B — or "Requires confirmation"]
Question or audit needed:  [specific question to the user, or audit action required]
Blocking:                  [Yes — affects {flag list} / No]
```

---

## Auto-Resolution vs. Escalation

### Auto-resolve (record as assumption, do not surface as conflict block)

Use when the rank gap between sources is ≥ 2 levels:

| Example Conflict | Resolution |
|---|---|
| Git commit names a delivered feature; DATA_ENTITY_MAP says "Candidate" | Assume feature was built per git commit. Note DATA_ENTITY_MAP is stale. |
| CURRENT_APP_STATUS marks a screen as ✅ Complete; legacy folder has no screen object | Assume screen exists. Legacy folder is not maintained in V2. |
| Convex `schema.ts` contains a field; DATA_ENTITY_MAP does not list it | Assume field exists per schema file. |
| Product OS feature object (Rank 2) says "delivered"; legacy folder (Rank 6) has no entry | Assume delivered. Legacy folder does not reflect post-delivery state. |

Auto-resolved conflicts are recorded only in `ASSUMPTIONS MADE` and, if a stale file is involved, in a `STALE FILE NOTE`.

### Escalate to user (surface CONTEXT CONFLICT DETECTED block)

Use when any of the following are true:
- Two sources of equal rank (e.g., two Product OS objects) disagree.
- The conflict affects a blocking flag: `schema_change`, `breaking_api_change`, `payment_change`, `security_change`, `role_change`, `data_migration`.
- The conflict affects the work type lane selection.
- The conflict affects release readiness (what is and is not in production).

---

## Blocking Conflicts

A conflict is **blocking** if it cannot be auto-resolved AND it affects any of:

| Dimension | Why Blocking |
|---|---|
| Work type lane | The wrong lane sets incorrect artifact requirements and approval chains |
| `schema_change` flag | A false positive forces unnecessary tech design; a false negative skips required tech design |
| `breaking_api_change` flag | Affects API contract documentation requirements |
| `payment_change` flag | Triggers mandatory security review — missing it is a governance gap |
| `security_change` flag | Same as payment_change |
| Release readiness | A conflict about what is or isn't built affects go/no-go decisions |

**When a conflict is marked `Blocking: Yes`:**
- Do not finalize the work type lane for the affected item.
- Set `lane_confidence: Low`.
- Do not advance past intake until the conflict is confirmed.
- Show the `CONTEXT CONFLICT DETECTED` block before the `REQUEST INTAKE COMPLETE` block.

---

## Stale File Notification

When a conflict is auto-resolved because a lower-ranked source is stale, append a stale file notice to the response:

```
STALE FILE NOTE
  [filename] (dated [date]) — this file appears to be out of date.
  Suggested update: [what needs to be updated and why]
```

This notice is informational only. It does not block intake.

---

## Example: deliveryTasks Conflict

This is the canonical example. It illustrates the Phase 11 naming confusion between Razorpay and Delivery.

**Conflict summary:**

| Source | Rank | Claim |
|---|---|---|
| `DATA_ENTITY_MAP.md` (dated 2026-06-21) | 4 | `deliveryTasks` — "Candidate — Delivery Management module not built" |
| `CURRENT_APP_STATUS.md` (dated 2026-06-21) | 3 | Phase 11 = "Razorpay payment gateway integration — 🔲 Not started" |
| Git log — commit `69376c1f` | 1 | "Phase 11 — Delivery Module MVP" (committed after both docs were last updated) |

**Analysis:**
- Git commit (Rank 1 — implementation) outranks both DATA_ENTITY_MAP (Rank 4) and CURRENT_APP_STATUS (Rank 3).
- The commit confirms that Phase 11 was re-scoped from Razorpay → Delivery, and the Delivery Module MVP was shipped.
- Both documentation files are stale — they were last updated before the Phase 11 delivery commit.
- Rank gap between git (1) and DATA_ENTITY_MAP (4) is ≥ 2 levels → eligible for auto-resolution.
- However, the resolution affects the `schema_change` flag (deliveryTasks may or may not be in Convex depending on what Phase 11 actually implemented) → escalate for the schema_change dimension; auto-resolve for the lane dimension.

**Output:**

```
CONTEXT CONFLICT DETECTED
──────────────────────────────────────────────────────────────────
Source A says:             DATA_ENTITY_MAP.md (2026-06-21) —
                           deliveryTasks: "Candidate — Delivery Management
                           module not built"
Source B says:             Git commit 69376c1f — "Phase 11 — Delivery Module
                           MVP" (committed after DATA_ENTITY_MAP last updated)
Higher-confidence source:  Git commit (Rank 1 — implementation) >
                           DATA_ENTITY_MAP.md (Rank 4 — schema doc)
Decision:                  Auto-resolved for lane selection — deliveryTasks
                           likely exists per git commit. Lane 3 proceeds
                           provisionally.
                           NOT auto-resolved for schema_change flag —
                           exact scope of Phase 11 schema implementation
                           is unknown. Requires confirmation.
Question or audit needed:  Is the deliveryTasks Convex table live in the
                           database today? If yes, which fields were
                           implemented? (Run: npx convex data or check
                           convex/schema.ts)
Blocking:                  Yes — affects schema_change flag

STALE FILE NOTE
  DATA_ENTITY_MAP.md (2026-06-21) — deliveryTasks and deliveryPersons are
  listed as "Candidate — not built" but Phase 11 Delivery MVP was committed
  after this date.
  Suggested update: Audit Convex schema and update entity status from
  "Candidate" to "Current" for entities implemented in Phase 11.

  CURRENT_APP_STATUS.md (2026-06-21) — Phase 11 is listed as "Razorpay
  payment gateway integration — Not started" but Phase 11 was re-scoped
  to Delivery Module MVP and committed.
  Suggested update: Rename Phase 11 to "Delivery Module MVP — ✅ Complete"
  and add Phase 12 for Razorpay integration.
```

---

## Session Memory vs Committed State

### Dry-run Allocations Are Not Committed State

When an intake run completes with `write_mode = dry_run`:
- IDs shown in the output are **previews only**
- They do **not** advance `MASTER_REGISTRY.md`
- They do **not** appear in `REQUEST_INDEX.md`
- They do **not** create files in `product/objects/`

If a subsequent request or session references an ID from a prior dry-run (e.g., `REQUEST-ADM-RPT-LOW-STOCK-001` assigned in a prior dry-run session), apply the following:

### Dry-run Reference Trust Rank

Session memory of a prior dry-run is **not** a Product OS context source. It sits below all 6 ranked tiers and must always be validated against committed state before use.

| Source | Committed State Check |
|--------|----------------------|
| Session memory of a prior dry-run output | File exists at `product/objects/requests/{ID}.md`? Entry in `REQUEST_INDEX.md`? If neither → dry-run reference only |
| MASTER_REGISTRY.md `Last Used` ID | Source of truth for the next committed legacy ID |
| `product/objects/requests/` directory | Source of truth for committed request files |
| `product/indexes/REQUEST_INDEX.md` | Authoritative active request list |

### Rules for Dry-run References

1. **Do NOT assign committed status** to an object that exists only in session memory.
2. **Do NOT reserve IDs** from prior dry-run outputs. If `MASTER_REGISTRY.md` shows last used = REQ-0009 and no files were committed, the next committed ID is REQ-0010 — regardless of how many IDs were shown in prior dry-run outputs.
3. **Do NOT build future IDs on top of dry-run allocations.** Do not say "continuing from REQ-0014 based on prior dry-run."
4. **Always re-derive the next ID from MASTER_REGISTRY.md at the start of each session.** Prior dry-run previews do not carry over.
5. **Mention dry-run references only as contextual references** — label them clearly as "dry-run reference only" in OBJECT STATUS CHECK blocks.

### Conflict Resolution for Dry-run References

When session memory says an object exists but committed state does not:

```
CONTEXT CONFLICT DETECTED
──────────────────────────────────────────────────────────────────
Source A says:             Session memory — REQUEST-ADM-RPT-LOW-STOCK-001 assigned
                           in prior dry-run (REQ-0013)
Source B says:             product/objects/requests/ — file not found
                           REQUEST_INDEX.md — no entry for REQ-0013
                           MASTER_REGISTRY.md — Last Used: REQ-0009
Higher-confidence source:  Committed state (Rank 2–3) > Session memory (unranked)
Decision:                  Auto-resolved — REQUEST-ADM-RPT-LOW-STOCK-001 is a
                           dry-run reference only. Not a committed object.
                           Next committed legacy ID is REQ-0010 (from MASTER_REGISTRY).
Question or audit needed:  Commit prior dry-run objects first, or proceed with
                           fresh IDs from MASTER_REGISTRY.
Blocking:                  No — informational only (does not affect blocking flags
                           or lane selection for this intake)
```

---

## Known Architecture Facts

These are fixed architecture truths derived from Product OS objects (Rank 2 sources). They do not require re-derivation from code inspection. When a context source contradicts one of these facts, treat the contradiction as a staleness issue and auto-resolve in favour of the known fact unless actual code inspection (`schema.ts` / component files) shows otherwise.

| Module / Area | Known Fact | Confidence | Source |
|---|---|---|---|
| MA-COM-CART | Cart state is **Zustand/localStorage** — not a Convex table | High | MOD-COM workspace: `cart (Convex)` listed as "Future Candidate (not yet created)" |
| MA-COM-PLP / MA-COM-PDP | Stock availability reads from the **products** Convex table | High | MOD-COM Dependencies: MOD-INV provides stock data to PLP and PDP |
| MA-COM-CHK | Orders Convex table is **Active** | High | MOD-COM: `orders (Convex)` listed as Active |
| SCR-CUS-0003 | Cart at route **/cart** | High | SCREEN_REGISTRY: SCR-CUS-0003 — Built, "Zustand cart with localStorage persistence" |

### Application Rules

1. **Do not apply `schema_change`** for cart quantity behavior bugs or cart frontend enhancements — cart is Zustand, not Convex.
2. **Do not infer a Convex `cart` table** from the MOD-COM workspace entry — it is explicitly marked Future Candidate.
3. **Do not report SCR-CUS-0003 as "not registered"** — it is confirmed Built in SCREEN_REGISTRY.md as the Cart screen at /cart with Zustand/localStorage persistence.
4. **When a documentation source claims a Convex cart table exists**, treat this as a stale claim (Rank 4–6 source) and auto-resolve against the MOD-COM workspace fact (Rank 2). Record in ASSUMPTIONS MADE.

---

## Related Files

- `IMPACT_ANALYSIS_ENGINE.md` — Context Conflict Detection section integrates this engine into impact analysis
- `LANE_SELECTION_ENGINE.md` — Rule L10 uses conflict blocking output to hold lane assignments
- `CLASSIFICATION_ENGINE.md` — Blocking flags are adjusted based on conflict resolution
- `.claude/skills/product-request/SKILL.md` — Step 1.5 executes this engine
- `.claude/commands/product-request.md` — Step 1.5 executes this engine

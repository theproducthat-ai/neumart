# Impact Analysis Engine

**Version**: 2.1  
**Owner**: Engineering Lead / Product Lead  
**Status**: Active
**Updated**: 2026-06-24

---

## Purpose

The Impact Analysis Engine assesses the **strategic blast radius** of a proposed change before implementation planning begins. It identifies which modules, features, user groups, data entities, and external systems are affected — including second-order effects that are not obvious from the request text.

This engine prevents surprises during implementation and ensures the team scopes and sequences work correctly.

**Scope of this engine (run upstream, before gate checks):**
- Cross-module dependency mapping
- Data flow and entity impact across the system
- User group impact identification
- External system identification
- NFR risk (performance, availability, security, accessibility)
- Roadmap and dependency conflict identification

**Contrast with `IMPACT_GATE_ENGINE.md`:**
- This engine = *strategic blast-radius* — run before planning starts on any cross-module or complex work to understand scope and sequencing before committing to a lane.
- `IMPACT_GATE_ENGINE.md` = *per-gate checklists* — run at G3/G4/G5/G6/G7 to verify each of 12 specific risk categories is resolved before the next stage begins.

---

## Inputs

| Input | Source |
|---|---|
| Confirmed work type lane | `LANE_SELECTION_ENGINE.md` output |
| Classification module and blocking flags | `CLASSIFICATION_ENGINE.md` output |
| Request full text | Request object |
| Current feature objects | `product/objects/features/` |
| Dependency index | `product/indexes/DEPENDENCY_INDEX.md` |

---

## Known Context Pre-Check

**Before running the Impact Analysis Steps or generating any schema/data/field-existence question for the user, the engine must check known Product OS context sources.**

The purpose is to avoid asking the user whether a data field or capability already exists when that answer can be derived from existing documentation.

### Context Sources to Check

| Source | What to Look For |
|--------|-----------------|
| `product/01-product-architecture/DATA_ENTITY_MAP.md` | Existing Convex tables, fields, and their types |
| `product/00-product-foundation/CURRENT_APP_STATUS.md` | Features already delivered; schema already in production |
| `product/module-workspaces/MOD-{CODE}.md` | Module-specific delivered features and known data structures |
| `product/indexes/FEATURE_INDEX.md` | Features already released, in progress, or parked |
| Implementation summaries in module workspaces | Any fields or capabilities documented as built |

### Rule: If It's Known, Don't Ask

If a data field, table, schema, or feature capability is found in any of the above sources:

1. **Record it as a known fact** in the `ASSUMPTIONS MADE` section of the request output — do not present it as a question.
2. **Ask the next useful product question** (how to use the field, what behavior to build on top of it) — not whether it exists.
3. **Adjust blocking flags accordingly** — if a field already exists, `schema_change` may not apply for that specific field.

### Example Applications

**Low-Stock Report:**
- Check `DATA_ENTITY_MAP.md` for `lowStockThreshold`, `reorderLevel`, `minStockLevel`, or equivalent.
- If found → Lane 2 holds. Ask product-level questions (scope, sorting, export).
- If not found → `schema_change` flag applies. Upgrade to Lane 3.

**Delivery Tracking:**
- Check `CURRENT_APP_STATUS.md` or `MOD-DEL.md` for delivery status fields or event history.
- If Phase 11 delivery MVP already includes timestamped status events → state as assumption, ask about customer-facing UX only.
- If not found → new event model required → `schema_change` applies.

**Cart Quantity / Cart Behavior (MA-COM-CART):**
- Cart state is managed via **Zustand/localStorage**, NOT a Convex table.
- The MOD-COM workspace lists `cart (Convex)` as "Future Candidate (not yet created)". Do not treat this as an active Convex table.
- Do **not** apply `schema_change` for cart quantity increment bugs or cart behavior fixes.
- Stock validation in cart reads from the **products** Convex table (`stockQuantity` or equivalent field) — not from a cart table.
- A frontend bug fix on the cart quantity increment button is Lane 1 (Fast Fix) with no blocking flags.

---

## Context Conflict Detection

After completing the Known Context Pre-Check, compare all context sources for contradictions about the same entity before proceeding to Impact Analysis.

Apply `product/os/policies/CONTEXT_FRESHNESS_AND_SOURCE_PRECEDENCE_RULES.md` in full.

### When to Run

Run whenever the Known Context Pre-Check surfaces conflicting claims — e.g., two files disagree on whether a table exists, whether a phase was completed, or whether a field is present in the schema.

### Procedure

1. **Collect all claims** about the entities referenced in this request (tables, fields, features, modules) across all context sources read in Step 1.
2. **Rank sources** by authority (Rank 1 = implementation files / git commits; Rank 6 = legacy folders). See `CONTEXT_FRESHNESS_AND_SOURCE_PRECEDENCE_RULES.md` for the full table.
3. **Auto-resolve** when the rank gap is ≥ 2 levels — record resolution in `ASSUMPTIONS MADE` and add a `STALE FILE NOTE`. Do not surface a conflict block.
4. **Escalate** when same-rank sources conflict, OR the conflict directly affects a blocking flag.

### When Conflict Affects Blocking Flags

If an unresolved conflict changes whether a blocking flag applies (`schema_change`, `payment_change`, `breaking_api_change`, `security_change`, `role_change`, `data_migration`):

- Do **not** finalize that blocking flag.
- Mark the flag as **conditional** in the output with a note referencing the conflict.
- Surface a `CONTEXT CONFLICT DETECTED` block before the `REQUEST INTAKE COMPLETE` block.

### Integration with Impact Analysis Steps

- If a conflict is **auto-resolved** in favour of implementation/git → proceed with adjusted blocking flag scope.
- If a conflict is **escalated** (blocking) → pause Steps 3–6 for the affected flag only. Record preliminary findings; mark the affected step output as conditional.

Full rules and output format: `product/os/policies/CONTEXT_FRESHNESS_AND_SOURCE_PRECEDENCE_RULES.md`

---

## Impact Analysis Steps

### Step 1 — Primary Module Impact

Identify the primary module being changed and all features within that module that will be modified:
- List existing feature objects that will change
- List new features that will be created
- Identify any features that will be deprecated

### Step 2 — Cross-Module Impact

For the primary module identified in Step 1, apply the cross-module dependency rules:

| If primary module is... | Also check... |
|---|---|
| COM (Commerce) | USR (if logged-in user state), PAY (if checkout), INV (if stock display) |
| PAY (Payments) | COM (checkout flow), ADM (order status), RPT (financial reporting) |
| DEL (Delivery) | COM (order tracking display), ADM (delivery management), USR (notifications) |
| INV (Inventory) | ADM (stock management), COM (product availability display) |
| USR (User Management) | COM (logged-in features), ADM (user admin), DEL (customer address) |
| ADM (Admin) | All modules (admin views data from all modules) |
| RPT (Reporting) | All modules (reports consume data from all modules) |

### Step 3 — Data Impact

Identify all data entities that will be created, modified, or deleted:
- New Convex tables or fields
- Modified table schemas
- Data that will be backfilled or migrated
- Data that will be deleted

Flag: if any data impact is identified, set `blocking_flags: schema_change` if not already set.

### Step 4 — User Group Impact

Identify which user groups will be affected:
- Customers (direct UX change)
- Admin users (admin console change)
- Delivery partners (delivery app change)
- Anonymous users (pre-login experience)
- All users (system-wide change)

### Step 5 — External System Impact

Identify any external systems that will be called, changed, or whose data will change:
- Razorpay (payment gateway)
- Clerk (authentication)
- Any third-party APIs or webhooks
- Email/SMS notification systems

### Step 6 — NFR Impact Assessment

Assess whether the change could affect any system-wide NFRs:
- Performance (does this add latency to hot paths?)
- Availability (does this introduce a new failure mode?)
- Security (does this change authentication or data access?)
- Accessibility (does this affect the customer-facing UI?)

See `product/engineering/NON_FUNCTIONAL_REQUIREMENTS.md` for thresholds.

---

## Impact Analysis Output

```yaml
impact_analysis:
  primary_module: COM | ADM | DEL | INV | PAY | USR | RPT
  secondary_modules: []
  features_modified: []  # list of FEAT-XXX IDs
  features_created: []
  features_deprecated: []
  data_impact:
    schema_changes: true | false
    tables_affected: []
    migration_required: true | false
  user_groups_affected: [customers, admins, delivery_partners, all]
  external_systems_affected: [razorpay, clerk, none]
  nfr_risks: []  # list of NFRs at risk with reason
  dependency_conflicts: []  # objects that depend on things being changed
  blast_radius: Low | Medium | High | Critical
```

**Blast Radius Levels**:
- **Low**: Single module, no schema change, no external system, < 2 user stories
- **Medium**: 1-2 modules, possible schema change, < 5 user stories
- **High**: 3+ modules, schema change, external system affected, or payment touched
- **Critical**: System-wide, security/auth change, payment change, or data migration

---

## When High/Critical Blast Radius Is Found

If `blast_radius: High` or `Critical`:
1. Escalate to Engineering Lead before planning starts
2. Require a tech design document before implementation
3. Ensure all affected module owners have reviewed
4. Consider phasing the implementation across multiple sprints

---

## Related Files

- `IMPACT_GATE_ENGINE.md` — Per-gate 12-category impact checks (run at G3/G4/G5/G6/G7)
- `CLASSIFICATION_ENGINE.md` — Provides initial module classification and blocking flags
- `product/engineering/NON_FUNCTIONAL_REQUIREMENTS.md` — NFR thresholds
- `product/indexes/DEPENDENCY_INDEX.md` — Cross-object dependencies
- `product/os/policies/WORK_TYPE_LANES.md` — Lane-specific impact requirements

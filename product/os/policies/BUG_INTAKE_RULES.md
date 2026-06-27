# Bug Intake Rules

Governs how bug reports are captured, classified, indexed, and routed in Product OS V2.

---

## 1. Bug Object Routing

When `classification = Bug Fix` and `object_type = bug`:

| Action | Target |
|---|---|
| Create object | `product/objects/bugs/BUG-{AREA}-{MODULE}-{SLUG}-{SEQ}.md` |
| Update bug index | `product/indexes/BUG_INDEX.md` — **Required. Never omit.** |
| Update module workspace | `MOD-{CODE}.md` → **Open Bugs** table |
| REQUEST_INDEX.md | Do **NOT** update — bugs are not requests |

**Never route bug objects to `REQUEST_INDEX.md`.** `REQUEST_INDEX.md` is a request-specific master index. Bug objects have their own index: `BUG_INDEX.md`.

### BUG_INDEX.md Row Format

Add one row per bug:

| BUG ID | Title | Severity | Module | Area | Status | Reporter | Date |
|---|---|---|---|---|---|---|---|

### MOD Workspace — Open Bugs Table

Add one row per bug:

| BUG ID | Title | Severity | Status | Assigned To |

---

## 2. Bug Output Heading

When `classification = Bug Fix`, the intake output block heading must be:

```
BUG INTAKE COMPLETE (V2)
========================
```

Never use `REQUEST INTAKE COMPLETE (V2)` for bug intake. The heading signals object type to the Product OS and determines which index is updated.

### Object ID and Path

For Bug Fix classification:
- **Object ID:** `BUG-{AREA}-{MODULE}-{SLUG}-{SEQ}`
- **Object path:** `product/objects/bugs/BUG-{AREA}-{MODULE}-{SLUG}-{SEQ}.md`
- **Template:** `BUG_OBJECT_TEMPLATE.md` (functional bugs) or `BUG_MINOR_TEMPLATE.md` (cosmetic/non-functional)

For all other classifications, use `REQUEST INTAKE COMPLETE (V2)` and `REQUEST-` prefix with `product/objects/requests/`.

---

## 3. Cart Architecture Known Context

For all bugs and requests touching `MOD-COM` / `MA-COM-CART`:

| Fact | Value |
|---|---|
| Cart state management | **Zustand / localStorage** |
| Convex cart table | **Does not exist** — listed as "Future Candidate (not yet created)" in MOD-COM workspace |
| `schema_change` for cart quantity bugs | **Not applicable** — frontend logic fix only |
| Stock quantity source | `stockQuantity` (or equivalent) in the **products** Convex table |
| Relevant module dependency | MOD-INV provides stock data to MOD-COM (PLP, PDP, Cart) |

**Do not infer a Convex `cart` table.** If any context source (documentation, legacy file) implies a Convex cart table exists, treat that claim as stale. The authoritative source is the MOD-COM workspace and any actual `schema.ts` inspection.

**Do not apply `schema_change`** for frontend cart quantity behavior fixes. The fix reads stock quantity from the products table — no new schema is required.

---

## 4. Screen Lookup Before "Not Registered"

Before reporting a screen as "not registered", check **all three** screen sources in this order:

1. `product/indexes/SCREEN_INDEX.md`
2. `product/01-product-architecture/SCREEN_REGISTRY.md`
3. `product/indexes/ROUTE_SCREEN_MAP.md`

Only output "not registered" if the screen is absent from all three.

### Known Screen Assignments (Phase 2 Setup)

SCR-CUS-0001 through SCR-CUS-0010 were assigned in Phase 2 Product OS setup. Known mappings include:

| SCR ID | Screen Name | Route |
|---|---|---|
| SCR-CUS-0003 | Cart | /cart |

These assignments are confirmed in `SCREEN_REGISTRY.md`. Note: SCR-CUS-0006 is Add New Address (/addresses/new) — not the Cart screen.

---

## 5. Expected Output — Cart Quantity Bug

**Input:** Cart quantity increases beyond available stock when user taps plus button repeatedly.

**Expected output:**

```
BUG INTAKE COMPLETE (V2)
========================
Preview Object ID:  BUG-COM-CART-QTY-OVERSTOCK-001
Preview Legacy ID:  REQ-0010

Title:          Cart quantity exceeds available stock on rapid plus-button tap
Classification: Bug Fix   Confidence: High
Work Lane:      Lane 1 — Fast Fix
Template:       BUG_OBJECT_TEMPLATE.md

SCOPE
  Module:     MOD-COM — Customer Commerce
  Area:       MA-COM-CART — Cart
  Screen:     SCR-CUS-0003 — Cart (/cart)
  Component:  Cart item quantity controls — plus (+) button

OBJECT PATH
  product/objects/bugs/BUG-COM-CART-QTY-OVERSTOCK-001.md

BLOCKING FLAGS
  None — frontend logic fix; cart is Zustand/localStorage, not Convex

ARTIFACTS FOR LANE 1
  Required:   Bug object, reproduction steps, acceptance criteria,
              1 engineer code review, QA smoke check
  Not needed: PRD, full DEVPLAN, tech design, UAT, business case

ASSUMPTIONS MADE
  - Cart is Zustand/localStorage (not Convex) — schema_change does not apply
  - Stock reads from products Convex table — no new schema required
  - SCR-CUS-0003 — Cart (/cart) confirmed from SCREEN_REGISTRY

FILES CHANGED:  No
  Would create:  product/objects/bugs/BUG-COM-CART-QTY-OVERSTOCK-001.md
  Would update:  product/indexes/BUG_INDEX.md
  Would update:  product/module-workspaces/MOD-COM.md
```

---

## Related Files

- `.claude/skills/product-request/SKILL.md` — Rules 31, 32, 33
- `.claude/commands/product-request.md` — Failure Conditions: bug routing, screen lookup, cart architecture
- `product/os/intelligence/IMPACT_ANALYSIS_ENGINE.md` — Cart Architecture Known Context example
- `product/os/intelligence/ARTIFACT_REQUIREMENT_ENGINE.md` — Known Module State Architecture
- `product/os/policies/CONTEXT_FRESHNESS_AND_SOURCE_PRECEDENCE_RULES.md` — Known Architecture Facts
- `product/indexes/BUG_INDEX.md` — Bug index (update for every bug object created)
- `product/os/templates/BUG_OBJECT_TEMPLATE.md` — Full bug template
- `product/os/templates/BUG_MINOR_TEMPLATE.md` — Lite bug template (cosmetic/non-functional)

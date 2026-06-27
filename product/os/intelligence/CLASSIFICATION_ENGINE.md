# Nuemart Product OS — Classification Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

The Classification Engine assigns every incoming request and product object to the correct request type, domain, module, sub-module, and lifecycle stage. Classification drives everything downstream: which governance gates apply, which agents run, which traceability chains are built, and how priority is calculated.

Classification is mandatory. An unclassified object may not advance past the `Received` stage.

---

## Inputs

| Input | Source | Required |
|---|---|---|
| Raw user request text | `/product-request` command or manual | Yes |
| Existing Request Object | `product/objects/requests/` | If re-classifying |
| PRODUCT_HIERARCHY.md | `product/architecture/` | Yes |
| MODULE_MASTER.md | `product/architecture/` | Yes |
| FEATURE_MASTER.md | `product/knowledge/` | Yes |
| OBJECT_INDEX.md | `product/indexes/` | Yes |

---

## Reasoning Steps

### Step 1 — Extract Key Entities from Request Text

Parse the user's request and extract:

- **Feature references**: Named features, screen names, component names (e.g., "carousel", "checkout", "product listing page", "delivery task")
- **Module references**: Named modules or implied module context (e.g., "admin panel" → ADM, "customer app" → COM, "delivery agent" → DEL)
- **Role references**: User types mentioned (e.g., "customer", "admin", "delivery agent", "warehouse staff")
- **Data entity references**: Table names or data concepts (e.g., "orders", "products", "addresses", "tasks")
- **Action references**: What the user wants to do (e.g., "add", "remove", "fix", "change", "migrate", "remove", "report on")
- **Scope signals**: In/out, MVP vs. future, "just this", "all of", "phase 2"

**Output of Step 1:** Entity list with confidence annotation for each entity.

---

### Step 2 — Match Entities to Known Modules

Using MODULE_MASTER.md, map each extracted entity to the most specific module node:

| Keyword Pattern | Module | Sub-module |
|---|---|---|
| product listing, PLP, browse, search, filter, carousel, banner | COM | PLP |
| product detail, PDP, description, images, add to cart | COM | PDP |
| cart, basket, items, quantity, remove from cart | COM | CART |
| checkout, payment, confirm order, place order | COM | CHK |
| address, delivery address, location, pincode | COM | ADDR |
| favourites, wishlist, saved | COM | FAV |
| order history, past orders, reorder | COM | ORDHIS |
| admin, dashboard, manage, back office | ADM | (sub-module per function) |
| delivery, task, assignment, route, delivery agent | DEL | (sub-module per function) |
| inventory, stock, warehouse, reorder level | INV | (sub-module per function) |
| payment, Razorpay, refund, transaction | PAY | (sub-module per function) |
| user, profile, auth, Clerk, identity, session | USR | (sub-module per function) |
| report, analytics, metrics, export, dashboard | RPT | (sub-module per function) |

If no match: assign `domain: UNCLASSIFIED` and flag for human review.

---

### Step 3 — Determine Request Type

Apply the following rules in order. Use the first matching rule.

| Rule | Trigger | Request Type |
|---|---|---|
| R1 | Request describes a crash, data loss, security breach, or production outage | Emergency |
| R2 | Request describes something that is broken, not working, or producing wrong output | Bug Fix |
| R3 | Request describes a brand new capability that does not exist anywhere in the product | New Feature |
| R4 | Request describes adding to, improving, or extending an existing capability | Feature Enhancement |
| R5 | Request describes changing how the system is configured, not how it behaves | Configuration Change |
| R6 | Request is entirely about documentation, specs, or writing without code impact | Documentation |
| R7 | Request describes refactoring, removing dead code, or improving code quality with no user-visible change | Technical Debt |
| R8 | Request describes something outside the current product scope, another product, or a future phase | Out of Scope |

**Tie-breaking rule**: If R2 and R4 both apply (a bug that implies an enhancement), classify as Bug Fix with a note that an enhancement opportunity exists.

---

### Step 4 — Apply Confidence Scoring

Score classification confidence based on the following factors:

| Factor | High (+) | Medium (0) | Low (−) |
|---|---|---|---|
| Request clarity | Single clear intent | Mixed intent | Ambiguous or contradictory |
| Entity match | All entities map to known modules | Most entities map | Few or no entities map |
| Information completeness | All key fields determinable | Some fields require assumption | Multiple key fields unknown |
| Precedent in taxonomy | Same type classified before (e.g., REQ-0002 for carousel) | Similar type exists | No precedent |

**Confidence calculation:**
- 3–4 High factors → `High` (>85%)
- 2 High + some Medium → `Medium` (60–85%)
- Any Low factor, or fewer than 2 High → `Low` (<60%)

**Low confidence rule**: Classification Agent flags for human review and does not advance the object past `Classified-Needs-Review`.

---

### Step 5 — Identify All Affected Domains

A request may touch multiple domains. After identifying the primary domain, check for secondary domain impacts:

- COM + PAY: Checkout flow changes almost always touch both
- COM + USR: Personalization, favorites, order history require user identity
- ADM + INV: Admin stock management touches inventory
- DEL + COM: Delivery status shown in order history touches both
- DEL + ADM: Delivery task management touches admin console
- RPT + (any): Reporting always depends on the domain being reported on

**Rule**: All affected domains must be listed in the `affected_domains` field. The primary domain is listed in `domain`.

---

### Step 6 — Assign product_area_code and module_code

Using the module match from Step 2 and domain from Step 5:

```
product_area_code = sub-module shortcode (e.g., PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS)
module_code = {DOMAIN}-{SUBMODULE} (e.g., COM-PLP, DEL-TASK, PAY-RAZORPAY)
```

If the request spans multiple sub-modules, assign the primary one to `module_code` and list others in `secondary_module_codes`.

---

### Step 7 — Identify Feature Object Impact

Determine whether this classification requires:

| Impact Type | Condition | Action |
|---|---|---|
| `creates` | The request describes a net-new capability not in FEATURE_MASTER.md | Create new Feature Object; alert Product Architect Agent |
| `modifies` | The request changes the scope, behavior, or definition of an existing Feature | Update existing Feature Object; document what is changing |
| `deprecates` | The request removes or replaces an existing Feature | Mark Feature as Deprecated; create supersession link |
| `none` | The request does not change any Feature definition (e.g., bug fix, docs) | No Feature Object action required |

Check FEATURE_MASTER.md before assigning `creates` — avoid creating duplicate Feature Objects.

---

### Step 8 — Check for Blocking Flags

Based on the request content and module match, check for blocking flags that trigger mandatory governance gates:

| Blocking Flag | Trigger Condition | Required Gate |
|---|---|---|
| `schema_change` | Request implies adding/modifying/removing Convex tables or fields | G4 — Schema Review |
| `payment_change` | Request touches Razorpay, payment flows, financial data, or refunds | G4 + G6 |
| `role_change` | Request adds, removes, or modifies user roles or permissions | G4 |
| `security_change` | Request touches authentication, authorization, or sensitive data | G6 |
| `release_action` | This classification is for a release operation | G7 |
| `integration_change` | Request adds or modifies external service integrations (Clerk, Razorpay, SMS, etc.) | G4 + G5 |
| `breaking_api_change` | Request modifies the interface of an existing Convex function used by other modules | G5 |
| `data_migration` | Request requires migrating existing data | G4 + G6 |

**Rule**: Blocking flags are additive. A request can have multiple flags. All triggered gates must be cleared.

---

## Output Objects

Classification metadata is added to the Request Object. No separate Classification Object is created — classification lives inside the Request Object.

**Classification block (added to Request Object):**

```yaml
classification:
  request_type: New Feature | Feature Enhancement | Bug Fix | Configuration Change | Documentation | Technical Debt | Emergency | Out of Scope
  domain: COM | ADM | DEL | INV | PAY | USR | RPT | UNCLASSIFIED
  affected_domains: []
  product_area_code: PLP | PDP | CART | CHK | ADDR | FAV | ORDHIS | ...
  module_code: COM-PLP | DEL-TASK | PAY-RAZORPAY | ...
  secondary_module_codes: []
  confidence: High | Medium | Low
  blocking_flags: []
  feature_impact: creates | modifies | deprecates | none
  classified_at: <ISO datetime>
  classified_by: AI | Human | AI-with-Human-Review
  classification_notes: <any ambiguities or reasoning notes>
```

---

## Required Metadata

Every classified Request Object must have all fields in the `classification` block populated. Fields may be `null` only if the gap is documented in `classification_notes` with a resolution plan.

---

## Failure Conditions

| Failure | Handling |
|---|---|
| Cannot map to any module | Set `domain: UNCLASSIFIED`, `confidence: Low`, add gap to `classification_notes`, output specific question to user about product area |
| Multiple conflicting module matches | Set primary module to best match, list all candidates in `secondary_module_codes`, set `confidence: Medium`, flag for human review |
| Request type is ambiguous between two types | Apply tie-breaking rule from Step 3; if tie-breaking fails, set type to higher-governance option (e.g., Emergency over Bug Fix) and flag |
| FEATURE_MASTER.md not populated | Cannot check for feature impact → set `feature_impact: unknown`, flag for Product Architect Agent review |
| Request is clearly Out of Scope | Set `request_type: Out of Scope`, explain why, suggest the correct product or phase where this belongs |

---

## Classification Matrix

| Request Characteristics | Domain | Type | Confidence Signal | Notes |
|---|---|---|---|---|
| "Add a carousel to the product listing page" | COM-PLP | Feature Enhancement | High (matches REQ-0002 pattern) | Extends existing PLP capability |
| "Fix the price showing wrong on PDP" | COM-PDP | Bug Fix | High | Clear bug, clear module |
| "Allow delivery agents to mark tasks complete" | DEL | New Feature | Medium | DEL module exists; specific sub-module TBD |
| "Add Razorpay refund support" | PAY | New Feature | High | PAY + G4+G6 gates triggered |
| "Create a report of daily orders" | RPT + COM | New Feature | Medium | RPT primary, COM dependency |
| "Improve the code quality of the checkout" | COM-CHK | Technical Debt | High | No user-visible change |
| "Add dark mode to the entire app" | COM | Feature Enhancement | Medium | Cross-cutting, scope needs grilling |
| "Integrate WhatsApp notifications" | USR or COM | New Feature | Low | Integration, module unclear — needs grilling |
| "Show stock levels to admin" | ADM + INV | New Feature | Medium | Two modules, admin-facing |
| "Remove the favourites feature" | COM-FAV | Feature Enhancement (Deprecation) | High | deprecates Feature Object |

---

## Example — REQ-0002 Classification

**Raw request:** "Add an auto-scrolling promotional banner carousel to the product listing page"

**Step 1 entities:** carousel (UI component), promotional banner (content), auto-scrolling (behavior), product listing page (screen/module)

**Step 2 match:** "product listing page" → COM-PLP

**Step 3 request type:** Existing product listing page exists; carousel is a new component on it → Feature Enhancement (new visual capability added to existing screen)

**Step 4 confidence:** All entities map to COM-PLP; clear intent; precedent (product listing page is well-defined) → **High**

**Step 5 affected domains:** COM only; no payment, auth, or delivery involvement

**Step 6 codes:** `product_area_code: PLP`, `module_code: COM-PLP`

**Step 7 feature impact:** FEATURE_MASTER.md check → no existing carousel feature → **creates** new Feature Object

**Step 8 blocking flags:** No schema change, no payment, no role change. If carousel images are stored in Convex: `schema_change` flag triggered for `bannerImages` table → G4 gate required

**Classification result:**
```yaml
classification:
  request_type: Feature Enhancement
  domain: COM
  product_area_code: PLP
  module_code: COM-PLP
  confidence: High
  blocking_flags: [schema_change]
  feature_impact: creates
  classified_at: 2026-06-22T00:00:00Z
  classified_by: AI
```

---

## Related Files

- `AI_REASONING_MODEL.md` — Classification is Step 3 of the reasoning model
- `AI_AGENTS.md` — Classification Agent (Agent 2)
- `MODULE_MASTER.md` — Module registry used in Step 2
- `PRODUCT_HIERARCHY.md` — Product tree used in Step 6
- `FEATURE_MASTER.md` — Feature registry used in Step 7
- `APPROVAL_GATES.md` — Gate definitions triggered by blocking flags in Step 8
- `IMPACT_ENGINE.md` — Picks up blocking flags from classification

---

## V2 Extensions (Product OS V2)

_These extensions connect the Classification Engine to the V2 five-layer architecture. The V1 steps above are unchanged._

### Step 9 — Map to Work Type Lane

After completing Steps 1-8, use the `request_type` and `blocking_flags` to assign a work type lane:

| request_type | Blocking Flags | → Work Type Lane |
|---|---|---|
| Emergency | any | Incident |
| Bug Fix | schema_change or payment_change | Standard Feature lane |
| Bug Fix | none | Fast Fix lane |
| Feature Enhancement | none, small scope | Small Enhancement lane |
| Feature Enhancement | large scope or multiple modules | Standard Feature lane |
| New Feature | none | Standard Feature lane |
| New Feature | cross-cutting or strategic | Strategic Initiative lane |
| Technical Debt | none | Tech Debt lane |
| Configuration Change | none | Operational Change lane |
| compliance / legal | any | Compliance/Security lane |
| experiment / A/B | any | Experiment lane |

Pass the assigned lane to the [LANE_SELECTION_ENGINE.md](LANE_SELECTION_ENGINE.md).

### Step 10 — Route to Correct Object Type

Based on the work type lane, confirm the correct primary object type to create:

| Work Type Lane | Primary Object |
|---|---|
| Fast Fix | `objects/bugs/` |
| Small Enhancement / Standard Feature / Strategic Initiative | `objects/requests/` → `objects/features/` |
| Incident | `objects/incidents/` |
| Tech Debt | `objects/requests/` with type = tech_debt |
| Experiment | `objects/experiments/` |

### V2 Output Block Extension

Add to the classification block:

```yaml
classification:
  # ... V1 fields above ...
  work_type_lane: Fast Fix | Small Enhancement | Standard Feature | Strategic Initiative | Incident | Compliance | Tech Debt | Operational Change | Business/Commercial | Experiment
  primary_object_type: requests | bugs | incidents | experiments
  lane_confidence: High | Medium | Low
```

### V2 Related Files

- `LANE_SELECTION_ENGINE.md` — Validates and confirms the work type lane
- `ARTIFACT_REQUIREMENT_ENGINE.md` — Determines which artifacts are required given the lane
- `IMPACT_ANALYSIS_ENGINE.md` — Cross-module impact analysis
- `product/os/policies/WORK_TYPE_LANES.md` — Source of truth for lane definitions
- `product/os/policies/REQUEST_CLASSIFICATION_RULES.md` — Classification rules in human-readable form
- `product/os/PRODUCT_OS_V2_ARCHITECTURE.md` — V2 architecture overview

# Nuemart Product OS — Metadata Model

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/METADATA_MODEL.md`

---

## Overview

The Metadata Model defines every metadata field that can appear on a Product Object. It is the formal schema for the YAML frontmatter in every object file, and the data dictionary for the Product OS.

Metadata is organised into 10 categories. Each category groups fields that serve a common purpose. Categories are not separate sections in the frontmatter — all fields co-exist in a single YAML block. The categorisation here is conceptual, for documentation and tooling purposes.

### Reading the Tables

| Column | Meaning |
|---|---|
| Field | The exact YAML key name |
| Type | Data type: `string`, `list`, `map`, `boolean`, `number`, `ISO 8601 date`, `enum` |
| Required | `Required`, `Conditional` (required under specific conditions), or `Optional` |
| Description | What the field means and how to use it |
| Example | A realistic example value for Nuemart |

---

## Category 1: Identity Metadata

Identity metadata uniquely addresses an object. These fields are immutable after assignment.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `object_id` | string | Required | Semantic identifier. Format: `<TYPE>-<AREA>-<MODULE>-<SLUG>-<SEQ>`. Assigned at creation; never changed. | `FEATURE-COM-PLP-CAROUSEL-001` |
| `legacy_id` | string | Conditional | Old numeric ID from the pre-OS era. Only present for objects migrated from the legacy numbering scheme. Never assigned to new objects. | `REQ-0002` |
| `canonical_name` | string | Required | Stable machine-readable name in snake_case. Used as a key in the graph index and API calls. Never changed after assignment. | `promotional_carousel_plp` |
| `display_name` | string | Required | Human-readable label shown in product tools, roadmaps, and documents. May be updated for clarity. Title Case. | `Promotional Carousel — PLP` |
| `file_slug` | string | Required | The filename basis, without extension. Lowercase version of the object ID. Used for routing in `product/objects/`. | `feature-com-plp-carousel-001` |
| `version` | string | Required | Schema version of this object file. Increment when the object is substantially revised (V1 → V2). Not to be confused with the product version. | `V1` |
| `sequence` | string | Required | Zero-padded three-digit sequence number within the `(object_type, product_area_code, module_code)` namespace. Assigned at creation; never reused. | `001` |
| `name` | string | Required | Short label used in lists, references, and breadcrumbs. Typically the feature or concept name in a few words. | `PLP Promotional Carousel` |

### Rules

- `object_id` is the primary key. It is used in all relationships, graph edges, and external references.
- `legacy_id` is a read-only migration alias. Tools should not write or rely on it for new objects.
- `canonical_name` must be unique across all objects of the same type.
- `file_slug` must match the actual filename of the object file (excluding extension).

---

## Category 2: Classification Metadata

Classification metadata determines how an object is routed, grouped, filtered, and processed by tools and agents.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `object_type` | enum | Required | The canonical type from OBJECT_TYPES.md. Determines lifecycle model, governance rules, and AI processing. | `FEATURE` |
| `domain` | enum | Required | The domain this object belongs to, derived from object_type. One of 11 defined domains. See DOMAIN_MODEL.md. | `Product Architecture` |
| `product_area_code` | enum | Required | The top-level product area. One of: COM, ADM, DEL, INV, PAY, USR, RPT. | `COM` |
| `module_code` | enum | Required | The module within the product area. Must be a registered module code from MODULE_REGISTRY.md. | `PLP` |
| `submodule_code` | string | Optional | The sub-module within a module. Used when a module is large enough to require internal sub-divisions. | `BANNER` |
| `feature_slug` | string | Required | Lowercase-hyphenated short name for the feature or concept. Forms part of the semantic ID. | `promotional-carousel` |
| `tags` | list | Optional | Free-form labels for filtering, grouping, and search. May include sprint tags, theme tags, or platform tags. | `["mobile", "p1", "discovery"]` |
| `confidence` | enum | Required | PM's assessed confidence in the correctness and completeness of this object's definition. One of: High, Medium, Low. | `High` |
| `source` | enum | Required | How this object came to exist. One of: `request` (from an incoming REQUEST), `discovery` (from research/sessions), `ai_derived` (AI-generated), `manual` (PM-authored), `migration` (migrated from legacy system). | `request` |

### Nuemart Product Area Codes

| Code | Area | Products Covered |
|---|---|---|
| COM | Customer Commerce | Customer web app, product browsing, cart, checkout, orders |
| ADM | Admin Console | Admin web interface, catalog management, order management |
| DEL | Delivery | Delivery agent app, dispatch, routing, tracking |
| INV | Inventory | Stock management, supplier integration, low-stock alerts |
| PAY | Payment | Payment processing, Pay Later, Razorpay integration |
| USR | User / Identity | Clerk auth, profile, addresses, customer data |
| RPT | Reports | Analytics, GMV reports, delivery reports, admin dashboards |

### Nuemart Module Codes

| Code | Module | Area |
|---|---|---|
| PLP | Product Listing Page | COM |
| PDP | Product Detail Page | COM |
| CART | Shopping Cart | COM |
| CHK | Checkout | COM |
| ADDR | Addresses | COM, USR |
| FAV | Favourites | COM |
| ORDHIS | Order History | COM |
| AUTH | Authentication | USR |
| PROF | Customer Profile | USR |
| CATMGMT | Catalog Management | ADM |
| ORDMGMT | Order Management | ADM |
| USRMGMT | User Management | ADM |
| PRICING | Pricing Management | ADM, INV |
| DISPATCH | Dispatch Management | DEL |
| ROUTING | Delivery Routing | DEL |
| TRACKING | Order Tracking | DEL, COM |
| STOCK | Stock Levels | INV |
| SUPPLIER | Supplier Integration | INV |
| RAZORPAY | Razorpay Integration | PAY |
| PAYLATER | Pay Later | PAY |
| ANALYTICS | Analytics & Reporting | RPT |
| GMV | GMV Reports | RPT |

---

## Category 3: Product Placement Metadata

Product placement metadata locates an object in the Nuemart product hierarchy. It answers: "Where in the product does this object live?"

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `product` | string | Optional | Reference to the PRODUCT object this object belongs to. | `PRODUCT-NUEMART-COM-001` |
| `module` | string | Optional | Reference to the MODULE object. Redundant with module_code but provides a typed link. | `MODULE-COM-PLP-001` |
| `submodule` | string | Optional | Reference to the SUBMODULE object, if applicable. | `SUBMODULE-COM-PLP-BANNER-001` |
| `capability` | string | Optional | Reference to the CAPABILITY this object is part of or serves. | `CAPABILITY-COM-PROMOTIONAL-DISPLAY-001` |
| `feature` | string | Conditional | Reference to the parent FEATURE, required for SUBFEATURE, STORY, TASK, TEST, BUG objects. | `FEATURE-COM-PLP-CAROUSEL-001` |
| `subfeature` | string | Optional | Reference to the parent SUBFEATURE for very granular stories or tasks. | `SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL-001` |
| `screen_refs` | list | Optional | References to SCREEN objects this feature or component appears on. | `["SCREEN-COM-PLP-001"]` |
| `component_refs` | list | Optional | References to COMPONENT objects that implement or are part of this feature. | `["COMPONENT-COM-CAROUSELSTRIP-001"]` |

### Placement Hierarchy

```
Nuemart (PRODUCT-NUEMART-COM-001)
  └── Customer Commerce (product_area_code: COM)
        └── Product Listing Page (module_code: PLP)
              └── Banner Area (submodule_code: BANNER)
                    └── Promotional Display Capability (CAPABILITY-COM-PROMOTIONAL-DISPLAY-001)
                          └── Promotional Carousel Feature (FEATURE-COM-PLP-CAROUSEL-001)
                                └── Auto-scroll Sub-feature (SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL-001)
```

---

## Category 4: Lifecycle Metadata

Lifecycle metadata tracks the current state of an object through its defined state machine.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `status` | enum | Required | Current lifecycle status. Must be a valid status for this object_type's lifecycle model (see LIFECYCLE_MODELS.md). | `Released` |
| `lifecycle_stage` | enum | Required | Coarse lifecycle bucket. One of: `discovery`, `definition`, `delivery`, `operations`. Derived from status. | `operations` |
| `lifecycle_model` | string | Required | Name of the lifecycle model governing this object. References an entry in LIFECYCLE_MODELS.md. | `Feature` |
| `created_at` | ISO 8601 date | Required | Date the object was first created. Set at creation; never modified. | `2026-01-05` |
| `updated_at` | ISO 8601 date | Required | Date of the most recent update to any field. Updated automatically by the Product OS on every write. | `2026-02-14` |
| `closed_at` | ISO 8601 date | Conditional | Date the object reached a terminal state. Required when `status` is a terminal state (Released, Archived, Closed, Rejected, Done, Won't Fix, etc.). | `2026-02-14` |
| `target_date` | ISO 8601 date | Optional | Expected completion or release date. Used for roadmap projections and sprint planning. | `2026-02-28` |

### Lifecycle Stage Mapping

| Stage | Typical Statuses |
|---|---|
| `discovery` | Submitted, Classified, Grilling, Candidate, Open, Identified |
| `definition` | Impact Assessment, Planned, Draft, In Review, Approved, Assessed |
| `delivery` | In Development, In Progress, QA, UAT, In Fix, Fixed, In Progress |
| `operations` | Released, Sign-off Pending, Signed Off, Passed, Released, Post-Release Review, Closed |

---

## Category 5: Ownership Metadata

Ownership metadata defines accountability for an object throughout its lifecycle.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `owner` | string | Required | The primary decision-maker for this object. A human's email or handle. Must be a real person; never a team alias for Active objects. | `pm@nuemart.in` |
| `created_by` | string | Required | Who or what created this object. Person email, or `ai_agent:<agent_id>` for AI-created objects. | `ai_agent:product-os-classifier-v1` |
| `last_updated_by` | string | Required | Who last modified this object. Updated on every write. | `pm@nuemart.in` |
| `approved_by` | string | Conditional | Who formally approved this object (e.g. approved a PRD, signed off a QA run). Required when an approval gate has been passed. | `cpo@nuemart.in` |
| `stakeholders` | list | Optional | Other people or teams with interest in or influence over this object. Used for notification and review routing. | `["eng-lead@nuemart.in", "qa@nuemart.in", "design@nuemart.in"]` |
| `product_area` | string | Required | The product area this object belongs to, matching product_area_code. Used for team routing and filtering. | `COM` |

### Ownership Rules

1. Every Active object must have a human `owner`. AI-created objects without a human owner after 24 hours trigger a `GAP` governance alert.
2. `stakeholders` are notified (via the Product OS notification system) when an object transitions lifecycle states.
3. `approved_by` is set automatically when a governance gate records an approval event for this object.
4. Ownership transfer is a formal action recorded in the `audit_log`.

---

## Category 6: Risk Metadata

Risk metadata captures the risk profile of an object. Risk is assessed at creation and re-assessed on significant scope or priority changes.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `risk_level` | enum | Required | Overall risk level for this object. One of: Critical, High, Medium, Low, None. | `Medium` |
| `risk_category` | string | Optional | The primary risk category. Examples: Technical, Data Privacy, User Experience, Business, Compliance, Security, Operational. | `User Experience` |
| `risk_refs` | list | Optional | References to RISK objects (formal risk records) linked to this object. | `["RISK-COM-PLP-CAROUSEL-ACCESSIBILITY-001"]` |
| `has_mitigation` | boolean | Conditional | Whether mitigation actions exist. Required when risk_level is High or Critical. | `true` |
| `mitigation_refs` | list | Conditional | References to DECISION objects or FEATURE objects that mitigate the risk. Required when has_mitigation is true. | `["DECISION-COM-PLP-CAROUSEL-REDUCEDMOTION-001"]` |

### Risk Level Definitions

| Level | Meaning | Required Actions |
|---|---|---|
| Critical | Could cause data loss, security breach, major revenue loss, or regulatory violation | Immediate escalation; must have mitigation before proceeding; PM + CPO sign-off required |
| High | Significant chance of user harm, customer trust damage, or blocking release | Must have mitigation documented; PM sign-off required |
| Medium | Moderate chance of degraded experience or delayed delivery | Mitigation recommended; PM aware |
| Low | Minor issue unlikely to cause material harm | Monitor; no blocking action |
| None | No identified risk | No action required |

### Nuemart Risk Categories

| Category | Examples |
|---|---|
| Technical | Performance degradation, SSR/hydration issues, Convex rate limits |
| Data Privacy | PII exposure, Clerk data, address data, order history |
| User Experience | Accessibility, mobile performance, confusing UX |
| Business | GMV impact, order failure, checkout disruption |
| Compliance | RBI regulations (Pay Later), DPDP Act (data privacy), GST |
| Security | Auth bypass, injection, data leakage |
| Operational | Delivery failures, stock sync errors, notification failures |

---

## Category 7: AI Reasoning Metadata

AI Reasoning metadata is the transparency and auditability layer for AI-generated or AI-classified content. It is a first-class metadata category in the Nuemart Product OS.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `ai_reasoning_trace` | string | Conditional | Full step-by-step reasoning trace from the AI agent. Required for AI-created objects. | See example below |
| `classification_rationale` | string | Conditional | Explanation of why this object was classified as this type. Required for AI-classified objects. | `"Classified as FEATURE (not EPIC) because it is a discrete, single-screen deliverable..."` |
| `confidence_score` | number | Conditional | Numeric confidence in the AI's classification and generation. Range: 0.0–1.0. Required for AI-created objects. | `0.87` |
| `gaps_identified` | list | Optional | Gaps in information or definition that the AI identified during processing. Each gap should be an actionable statement. | `["No user research cited", "Mobile accessibility not scoped"]` |
| `assumptions` | list | Optional | Assumptions the AI made in the absence of explicit information. Each should be validated by a human. | `["Carousel renders client-side only", "Banner images are CDN-hosted"]` |
| `recommended_action` | string | Optional | The AI's recommended next step for the object owner. | `"Add accessibility acceptance criterion; link to user research session"` |
| `reasoning_version` | string | Conditional | Version identifier of the AI agent or prompt template used. Required for AI-created objects. Enables reproducibility and audit. | `product-os-agent-v1.2` |

### Example ai_reasoning Block

```yaml
ai_reasoning:
  classification_rationale: >
    Classified as FEATURE (not EPIC) because this is a single, scoped, deliverable
    user-facing behaviour on one screen (PLP). It has clear acceptance criteria and
    a single owning team. It is not large enough to require multiple EPICs.
  assumptions:
    - "Carousel data (banners) is managed by the Admin Console CONTENT module"
    - "Auto-scroll speed is configurable via a CONFIG object"
    - "No video content in banners — images only for V1"
  confidence_score: 0.91
  gaps_identified:
    - "No citation of user research supporting the carousel discovery approach"
    - "Accessibility for users with motion sensitivity (prefers-reduced-motion) not addressed"
    - "Analytics instrumentation for carousel banner clicks not in scope statement"
  recommended_action: >
    Add an acceptance criterion for reduced-motion accessibility.
    Link to a DISCOVERY session or user research EVIDENCE object to ground the
    decision in data. Add a MONITOR object for carousel CTR post-launch.
  reasoning_version: "product-os-agent-v1.2"
  ai_reasoning_trace: >
    Step 1: Parsed REQUEST-COM-PLP-CAROUSEL-001 text.
    Step 2: Identified product area as COM from context ("PLP", "customer", "browsing").
    Step 3: Mapped to module PLP — request explicitly mentions Product Listing Page.
    Step 4: Evaluated object_type: candidate types were FEATURE, EPIC, SUBFEATURE.
      - Not EPIC: scoped to one screen, single team, estimable in one sprint.
      - Not SUBFEATURE: no parent FEATURE exists; this is a first-class deliverable.
      - Selected FEATURE.
    Step 5: Assigned sequence 001 (first FEATURE in COM-PLP namespace in this cycle).
    Step 6: Set confidence High — request is clear, scope is defined, AC derivable.
    Step 7: Identified 3 gaps; generated recommended_action.
```

---

## Category 8: Traceability Metadata

Traceability metadata connects an object to its origin and its downstream artefacts. It enables full chain traceability from Strategy to Release.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `source_request` | string | Optional | The REQUEST object this object was created from. | `REQUEST-COM-PLP-CAROUSEL-001` |
| `source_prd` | string | Optional | The PRD that specified this object. | `PRD-COM-PLP-CAROUSEL-V1` |
| `source_story` | string | Optional | The STORY this task or prompt was created from. | `STORY-COM-PLP-CAROUSEL-001` |
| `epic_ref` | string | Optional | The EPIC this object belongs to. | `EPIC-COM-PLP-PROMOTIONAL-001` |
| `initiative_ref` | string | Optional | The INITIATIVE this object contributes to. | `INIT-COM-DISCOVERY-EXPERIENCE-2026` |
| `release_ref` | string | Optional | The RELEASE this object is included in. | `RELEASE-2026-02-14-V1` |
| `qa_ref` | string | Optional | The QA run that validated this object. | `QA-COM-PLP-CAROUSEL-001` |
| `uat_ref` | string | Optional | The UAT run that signed off this object. | `UAT-COM-PLP-CAROUSEL-001` |

### Traceability Chain for a Feature

A fully traced FEATURE object connects back through all layers:

```
GOAL (business outcome)
  └── INIT (initiative)
        └── EPIC (epic)
              └── REQUEST (incoming request)
                    └── PRD (specification)
                          └── FEATURE (this object)
                                ├── STORY × N (delivery)
                                │     └── TASK × N → PROMPT × N → PR
                                ├── TESTPLAN → TEST × N → QA
                                ├── UAT → SIGNOFF
                                └── RELEASE → RELNOTE
```

All links in this chain are expressed as `relationships` entries in the FEATURE object file and as edges in the graph index.

---

## Category 9: Evidence Metadata

Evidence metadata grounds objects in data, research, and formal decisions. Every significant claim should be evidenced.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `evidence_links` | list | Optional | Links to supporting evidence. Each entry: `{ label, url, type }`. Types: research, data, decision, doc, ticket, conversation, benchmark. | See below |
| `data_sources` | list | Optional | Named data sources used to support this object's priority or definition (e.g. analytics, monitoring signals). | `["Analytics: PLP CTR June 2025", "User interviews: 12 customers"]` |
| `user_research_refs` | list | Optional | References to DISCOVERY session objects or external research reports. | `["DISCOVERY-COM-GROCERY-BROWSING-001"]` |
| `decision_refs` | list | Optional | References to DECISION objects that made a material choice affecting this object. | `["DECISION-COM-PLP-CAROUSEL-AUTOSCROLL-001"]` |
| `assumption_refs` | list | Optional | References to ASSUMPTION objects that underpin this object's definition. | `["ASSUMPTION-COM-PLP-CAROUSEL-MOBILE-001"]` |

### Evidence Links Example

```yaml
evidence_links:
  - label: "Nuemart PLP Analytics — banner CTR data Q1 2026"
    url: "https://analytics.nuemart.in/reports/plp-banner-ctr-q1-2026"
    type: data
  - label: "User interview session — 12 customers on grocery browsing behaviour"
    url: "product/research/2025-07-grocery-browsing-sessions.md"
    type: research
  - label: "Competitor analysis — BigBasket and Blinkit PLP patterns"
    url: "product/research/competitor-plp-carousel-analysis-2025.md"
    type: research
  - label: "Design decision — auto-scroll vs manual carousel"
    url: "product/objects/decision-com-plp-carousel-autoscroll-001.md"
    type: decision
```

---

## Category 10: Change Metadata

Change metadata provides an immutable audit trail of every meaningful change to an object. It complements the `updated_at` field with full context.

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `version_history` | list | Optional | High-level version history for major revisions of the object (V1, V2, etc.). Each entry: `{ version, date, changed_by, summary }`. | See below |
| `audit_log` | list | Required | Append-only log of all changes. Each entry: `{ date, changed_by, change_type, summary }`. | See below |
| `change_type` | enum | Required (in audit_log entries) | Type of change. One of: `create`, `update`, `status_change`, `deprecate`, `archive`, `relationship_added`, `relationship_removed`, `ai_enrichment`, `governance_override`, `ownership_transfer`. | `status_change` |
| `changed_by` | string | Required (in audit_log entries) | Who or what made the change. Person email or `ai_agent:<id>` or `lifecycle-engine`. | `pm@nuemart.in` |
| `change_reason` | string | Optional | Rationale for a significant change. Required for `governance_override` and `deprecate` change types. | `"Scope revised after stakeholder review on 2026-01-15"` |

### Version History Example

```yaml
version_history:
  - version: V1
    date: "2026-01-05"
    changed_by: "pm@nuemart.in"
    summary: "Initial object created from REQUEST-COM-PLP-CAROUSEL-001"
  - version: V2
    date: "2026-01-20"
    changed_by: "pm@nuemart.in"
    summary: "Scope revised: added accessibility requirement; removed video banner from scope"
```

### Audit Log Example

```yaml
audit_log:
  - date: "2026-01-05"
    changed_by: "ai_agent:product-os-classifier-v1"
    change_type: create
    summary: "Object created and classified from REQUEST-COM-PLP-CAROUSEL-001"
  - date: "2026-01-05"
    changed_by: "pm@nuemart.in"
    change_type: update
    summary: "Owner assigned; display_name corrected; acceptance criteria added"
  - date: "2026-01-10"
    changed_by: "pm@nuemart.in"
    change_type: relationship_added
    summary: "Linked to PRD-COM-PLP-CAROUSEL-V1 and TESTPLAN-COM-PLP-CAROUSEL-001"
  - date: "2026-01-20"
    changed_by: "pm@nuemart.in"
    change_type: update
    summary: "Scope updated: added SUBFEATURE for accessibility; added OUTOFSCOPE for video banners"
  - date: "2026-02-01"
    changed_by: "pm@nuemart.in"
    change_type: status_change
    summary: "Status changed from Planned to In Development; sprint started"
  - date: "2026-02-10"
    changed_by: "lifecycle-engine"
    change_type: status_change
    summary: "Status changed from In Development to QA; all stories Done"
  - date: "2026-02-12"
    changed_by: "qa@nuemart.in"
    change_type: status_change
    summary: "Status changed from QA to UAT; QA sign-off obtained"
  - date: "2026-02-14"
    changed_by: "pm@nuemart.in"
    change_type: status_change
    summary: "Status changed from UAT to Released; UAT signed off; deployed to production"
```

---

## Metadata Completeness Requirements

The Product OS linter enforces minimum metadata completeness per lifecycle stage:

| Stage | Required Fields |
|---|---|
| `discovery` | object_id, object_type, product_area_code, module_code, status, owner, created_at, summary, source |
| `definition` | All discovery fields + display_name, description, priority, risk_level, acceptance_criteria (for FEATURE), relationships (at least one) |
| `delivery` | All definition fields + feature_slug, sequence, effort_estimate, story_refs, test_plan_ref |
| `operations` | All delivery fields + release_ref, qa_ref, uat_ref, closed_at (for terminal states), release_note_ref |

Metadata completeness scores are computed per object and surfaced in the `product/views/metadata-health.md` view.

---

## Field Type Reference

| Type | Description | Format |
|---|---|---|
| `string` | Free-text string | Plain text or Markdown where indicated |
| `enum` | One of a fixed set of values | Exact match required; case-sensitive |
| `list` | An ordered list of values | YAML sequence (dash-prefixed) |
| `map` | A key-value structure | YAML mapping |
| `boolean` | True or false | `true` or `false` (lowercase) |
| `number` | Numeric value | Integer or decimal |
| `ISO 8601 date` | A calendar date | `YYYY-MM-DD` |

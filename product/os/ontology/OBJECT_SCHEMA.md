# Nuemart Product OS — Universal Product Object Schema

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/OBJECT_SCHEMA.md`

---

## Overview

Every meaningful concept in the Nuemart product is a **Product Object**. Whether it is a customer-facing feature, a backend data entity, a user story, a bug, a release, or a governance decision — it is modelled as a Product Object with a universal, consistent structure.

A Product Object always carries:

- **Identity** — a stable, semantic, machine-readable ID and human-readable name
- **Classification** — what type of object it is, which domain and module it belongs to
- **Metadata** — priority, risk, effort, status, dates, ownership
- **Lifecycle** — current state and allowed transitions
- **Relationships** — typed links to other Product Objects
- **Evidence** — supporting data, research, and decisions
- **AI Reasoning** — the rationale and confidence of any AI-assisted classification or generation
- **Change History** — an immutable audit log of every meaningful change

This schema is the universal contract. Every file in `product/objects/` MUST conform to it. Tools, agents, and views read from this schema. The schema is versioned and governed by `IDRULE-GOV-SCHEMA-001`.

---

## Frontmatter (YAML Header)

Every Product Object file starts with a YAML frontmatter block. All fields below are part of the schema. Required fields are marked; all others are optional but strongly recommended.

```yaml
---
# ─── IDENTITY ─────────────────────────────────────────────────────────────────
object_id: ""          # Semantic ID e.g. FEATURE-COM-PLP-CAROUSEL
legacy_id: ""          # Old numeric ID e.g. FEAT-Product-Listing-Carousel (for migration only)
object_type: ""        # One of the canonical types from OBJECT_TYPES.md
product_area_code: ""  # COM | ADM | DEL | INV | PAY | USR | RPT
module_code: ""        # PLP | PDP | CART | CHK | ADDR | FAV | ORDHIS | etc.
submodule_code: ""     # Optional sub-module code (e.g. BANNER, GRID, FILTER)
feature_slug: ""       # Short lowercase-hyphenated slug for the feature (e.g. carousel)
sequence: ""           # Zero-padded sequence within the module (e.g. 001, 002)
version: ""            # Schema version of this object file (e.g. V1, V2)

# ─── NAMING ───────────────────────────────────────────────────────────────────
canonical_name: ""     # Stable machine-readable name (snake_case)
display_name: ""       # Human-readable name shown in UIs and docs
file_slug: ""          # Filename without extension (matches object_id lowercased)
name: ""               # Short label used in lists and references

# ─── DESCRIPTION ──────────────────────────────────────────────────────────────
summary: ""            # One-sentence summary of this object
description: ""        # Full multi-line description (Markdown supported)

# ─── STATUS & LIFECYCLE ───────────────────────────────────────────────────────
status: ""             # Current lifecycle status (see LIFECYCLE_MODELS.md)
lifecycle_stage: ""    # Coarse stage: discovery | definition | delivery | operations
lifecycle_model_ref: ""# Reference to lifecycle model used (from LIFECYCLE_MODELS.md)

# ─── OWNERSHIP ────────────────────────────────────────────────────────────────
owner: ""              # Primary owner (person or team handle)
created_by: ""
last_updated_by: ""
stakeholders: []

# ─── CLASSIFICATION ───────────────────────────────────────────────────────────
tags: []
source: ""             # request | discovery | ai_derived | manual | migration
confidence: ""         # High | Medium | Low
domain: ""             # Strategy | Portfolio | Product Architecture | etc.

# ─── METADATA ─────────────────────────────────────────────────────────────────
priority: ""           # P1 | P2 | P3 | P4
risk_level: ""         # Critical | High | Medium | Low | None
business_value: ""     # Free text or score
effort_estimate: ""    # e.g. S / M / L / XL or story points
complexity: ""         # Low | Medium | High
created_at: ""         # ISO 8601 date
updated_at: ""         # ISO 8601 date
target_date: ""        # Optional target delivery date
closed_at: ""          # ISO 8601 date when object reached a terminal state

# ─── RELATIONSHIPS ────────────────────────────────────────────────────────────
# Each entry: { type: <relationship_type>, target: <object_id>, note: "" }
relationships: []

# ─── EVIDENCE ─────────────────────────────────────────────────────────────────
# Each entry: { label: "", url: "", type: research|data|decision|doc|ticket }
evidence: []

# ─── DECISIONS ────────────────────────────────────────────────────────────────
# References to DECISION objects
decisions: []

# ─── ACCEPTANCE ───────────────────────────────────────────────────────────────
acceptance_criteria: []
test_coverage: ""      # None | Partial | Full
sign_off_status: ""    # Pending | Signed Off | Waived

# ─── AI REASONING ─────────────────────────────────────────────────────────────
ai_reasoning:
  classification_rationale: ""
  assumptions: []
  confidence_score: 0.0    # 0.0 – 1.0
  gaps_identified: []
  recommended_next_action: ""
  reasoning_trace: ""
  reasoning_version: ""    # Version of the AI reasoning model/prompt used

# ─── OPEN QUESTIONS ───────────────────────────────────────────────────────────
open_questions: []

# ─── AUDIT LOG ────────────────────────────────────────────────────────────────
# Each entry: { date: "", changed_by: "", change_type: create|update|status_change|deprecate, summary: "" }
audit_log: []

# ─── VIEWS & LINKED DOCUMENTS ─────────────────────────────────────────────────
prd_ref: ""
story_refs: []
test_plan_ref: ""
qa_run_refs: []
uat_run_refs: []
release_ref: ""
release_note_ref: ""
---
```

---

## Section Definitions

### 1. Identity

The identity block is **immutable once assigned**. It uniquely addresses this object across the entire Product OS, all tools, and all time.

| Field | Purpose | Rules |
|---|---|---|
| `object_id` | Primary semantic identifier | Format: `<TYPE>-<AREA>-<MODULE>-<SLUG>-<SEQ>` (see ID_RULES.md) |
| `legacy_id` | Migration alias from old numeric scheme | Preserved only during transition; never reused |
| `canonical_name` | Machine-readable stable name | snake_case; no spaces; never changes after assignment |
| `display_name` | Human-readable label in UIs | Title Case; may evolve |
| `file_slug` | Filename basis | Lowercase of `object_id`; used for file routing |
| `version` | Object schema version | Increments when object is substantially revised (V1 → V2) |
| `sequence` | Ordering within module/type | Zero-padded three digits; assigned at creation |

**ID Format Reference:**

```
FEATURE-COM-PLP-CAROUSEL-001
│       │   │   │         │
│       │   │   │         └── Sequence (3 digits)
│       │   │   └──────────── Feature slug
│       │   └──────────────── Module code
│       └──────────────────── Product area code
└──────────────────────────── Object type prefix
```

Sequences are assigned per `(object_type, product_area_code, module_code)` tuple. They never skip, never reuse, never reset.

---

### 2. Classification

Classification determines how the object is routed, filtered, governed, and related to other objects.

| Field | Values | Notes |
|---|---|---|
| `object_type` | See OBJECT_TYPES.md | Must be an exact match to a registered type |
| `domain` | Strategy, Portfolio, Product Architecture, Experience, Data & System, Requirement, Delivery, Quality, Release & Operations, Governance, Intelligence | Derived from object_type; rarely set manually |
| `product_area_code` | COM, ADM, DEL, INV, PAY, USR, RPT | COM = Customer Commerce, ADM = Admin Console, DEL = Delivery, INV = Inventory, PAY = Payment, USR = User/Identity, RPT = Reports |
| `module_code` | PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS, etc. | Use codes from MODULE_REGISTRY.md |
| `submodule_code` | BANNER, GRID, FILTER, etc. | Optional; only set when a module has sub-divisions |
| `feature_slug` | lowercase-hyphenated | e.g. `promotional-carousel`, `quick-add` |
| `tags` | Free list of strings | e.g. `["mobile", "p0-launch", "razorpay"]` |
| `source` | `request`, `discovery`, `ai_derived`, `manual`, `migration` | How this object came into existence |
| `confidence` | `High`, `Medium`, `Low` | PM's confidence in classification and definition completeness |

---

### 3. Product Placement

Product placement describes exactly where in the Nuemart product hierarchy this object lives. This is the hierarchical context that positions the object for navigation, roadmapping, and reporting.

**Hierarchy:**

```
Product (Nuemart)
  └── Product Area (COM — Customer Commerce)
        └── Module (PLP — Product Listing Page)
              └── Sub-module (BANNER — Banner Area)
                    └── Capability (Promotional Display)
                          └── Feature (FEATURE-COM-PLP-CAROUSEL-001)
                                └── Sub-feature (Auto-scroll, Tap-to-navigate)
```

Fields:
- `product_area_code` — the top-level product area
- `module_code` — the module within that area
- `submodule_code` — optional sub-division of a module
- `feature_slug` — feature within the sub-module
- `screen_refs` — SCREEN objects this object appears on
- `component_refs` — COMPONENT objects that implement this feature

---

### 4. Description

The description block is the human-readable core of the object. It communicates what the object is, what problem it solves, and what is explicitly in or out of scope.

| Field | Content |
|---|---|
| `summary` | Single sentence. Starts with a verb. "Allows customers to…", "Enables admins to…" |
| `description` | Full explanation. May include background, context, user need, and business rationale. Markdown supported. |
| `problem_statement` | (inline in description or separate) What is broken or missing today? |
| `scope` | Overall scope statement |
| `in_scope` | Explicit list of what is covered |
| `out_of_scope` | Explicit list of what is NOT covered (important for preventing scope creep) |

**Writing standards:**
- Descriptions must be written from the perspective of value delivered, not implementation details.
- In-scope and out-of-scope lists must be present for all FEATURE, REQUIREMENT, and PRD objects.
- Problem statements must reference a known pain point, data point, or user insight.

---

### 5. Ownership

| Field | Type | Notes |
|---|---|---|
| `owner` | string | Primary decision-maker for this object |
| `created_by` | string | Who created the object (person or agent) |
| `last_updated_by` | string | Who last modified this object |
| `stakeholders` | list | Other people or teams with interest |
| `product_area` | string | Maps to product_area_code; used for team routing |

For AI-created objects, `created_by` is set to `ai_agent:<agent_id>` and `owner` must be assigned to a human within 24 hours. Unowned objects in `Active` status generate a governance alert.

---

### 6. Lifecycle

| Field | Purpose |
|---|---|
| `status` | Current state in the lifecycle state machine |
| `lifecycle_stage` | Coarse bucket: `discovery`, `definition`, `delivery`, `operations` |
| `lifecycle_model_ref` | Which lifecycle model governs this object (from LIFECYCLE_MODELS.md) |
| `allowed_next_states` | Computed list of valid next statuses given the current state |

Rules:
- Status transitions MUST follow the state machine defined in LIFECYCLE_MODELS.md for this object type.
- Skipping states (e.g. going from `Draft` directly to `Released`) is a governance violation unless explicitly waived.
- Terminal states (`Archived`, `Closed`, `Rejected`) are irreversible without an explicit governance override.
- Any status change MUST be recorded in `audit_log`.

---

### 7. Metadata

| Field | Type | Purpose |
|---|---|---|
| `priority` | P1–P4 | P1 = must ship this sprint, P4 = nice to have someday |
| `business_value` | string/score | Qualitative or quantitative value statement |
| `effort_estimate` | S/M/L/XL or numeric | Engineering effort estimate |
| `complexity` | Low/Medium/High | Implementation complexity (technical debt, unknowns, integrations) |
| `risk_level` | Critical/High/Medium/Low/None | Risk to product, users, or business if this object is wrong |
| `created_at` | ISO 8601 | Creation timestamp |
| `updated_at` | ISO 8601 | Last modification timestamp |
| `target_date` | ISO 8601 | Expected completion date |
| `closed_at` | ISO 8601 | When this object reached a terminal state |

---

### 8. Relationships

Relationships are the edges of the Product Object Graph. Every meaningful connection between objects is expressed as a typed relationship.

Format in YAML:

```yaml
relationships:
  - type: created_from
    target: REQUEST-COM-PLP-CAROUSEL-001
    note: "Feature created from this approved request"
  - type: implemented_by
    target: STORY-COM-PLP-CAROUSEL-001
    note: ""
  - type: tested_by
    target: TESTPLAN-COM-PLP-CAROUSEL-001
    note: ""
```

- Relationship types are defined in RELATIONSHIP_TYPES.md.
- Relationships are bidirectional in the graph index (`product/graph/`) but stored as directed edges in the object file.
- When a relationship is created, the reverse relationship SHOULD be added to the target object's file.
- Dangling relationships (pointing to non-existent objects) generate a lint warning.

---

### 9. Evidence

Evidence links ground the object in reality. Every major claim, design decision, or priority call should be evidenced.

```yaml
evidence:
  - label: "User research — grocery browsing session July 2025"
    url: "product/research/2025-07-grocery-browsing.md"
    type: research
  - label: "Analytics — banner CTR data Q1 2026"
    url: "https://analytics.nuemart.in/reports/banner-ctr-q1-2026"
    type: data
  - label: "Competitor analysis — BigBasket PLP"
    url: "product/research/competitor-plp-analysis.md"
    type: research
```

Evidence types: `research`, `data`, `decision`, `doc`, `ticket`, `conversation`, `benchmark`

---

### 10. Decisions

Decisions are formal records of choices made about this object. Each decision is its own DECISION object; the `decisions` array here holds references.

```yaml
decisions:
  - object_id: DECISION-COM-PLP-CAROUSEL-001
    summary: "Chose auto-scroll over manual-only carousel for discoverability"
    date: "2026-01-10"
    status: Made
```

Decisions that affect scope, priority, or architecture MUST be recorded. Undocumented decisions are a governance risk.

---

### 11. Risks

Risks are formal RISK objects. Link them here:

```yaml
risk_refs:
  - object_id: RISK-COM-PLP-CAROUSEL-001
    summary: "Auto-scroll may trigger motion sickness on older devices"
    risk_level: Low
    mitigation_status: Mitigated
```

All objects with `risk_level: High` or `risk_level: Critical` MUST have at least one linked RISK object with a mitigation.

---

### 12. Dependencies

Dependencies are typed relationships to objects this object depends on:

```yaml
relationships:
  - type: depends_on
    target: FEATURE-COM-PLP-GRID-001
    note: "Carousel renders within the PLP grid container"
  - type: blocked_by
    target: INTEGRATION-PAY-RAZORPAY-001
    note: "Promotional banners include Razorpay-offer content; blocked until integration live"
```

Blocked dependencies that affect P1 objects automatically surface as governance alerts.

---

### 13. Acceptance / Validation

| Field | Content |
|---|---|
| `acceptance_criteria` | List of testable conditions that define "done" (Given/When/Then preferred) |
| `test_coverage` | None / Partial / Full |
| `sign_off_status` | Pending / Signed Off / Waived |

```yaml
acceptance_criteria:
  - id: AC-001
    statement: "Given a customer on the PLP, when the page loads, then the carousel displays and begins auto-scrolling within 2 seconds"
    status: Verified
  - id: AC-002
    statement: "Given the carousel is visible, when the customer taps a banner, then they are navigated to the correct promotion landing page"
    status: Verified
```

All FEATURE objects MUST have at least one acceptance criterion before entering `In Development` status.

---

### 14. AI Reasoning

The `ai_reasoning` block records the rationale behind any AI-assisted action on this object. It is the transparency and auditability layer for AI-generated or AI-classified content.

```yaml
ai_reasoning:
  classification_rationale: >
    Object classified as FEATURE (not CAPABILITY) because it is a discrete,
    deliverable user-facing behaviour with a defined screen placement, acceptance
    criteria, and a single owning team. It is not a broad platform capability.
  assumptions:
    - "Carousel is rendered client-side (Next.js) — no SSR penalty assumed"
    - "Promotion data is managed by Admin Console CONTENT module"
  confidence_score: 0.91
  gaps_identified:
    - "No user research cited for auto-scroll vs manual preference"
    - "Mobile accessibility (reduced-motion) not yet addressed in scope"
  recommended_next_action: "Add accessibility acceptance criterion; link to user research"
  reasoning_trace: >
    Step 1: Parsed request text. Step 2: Identified product area as COM (Customer
    Commerce) from context. Step 3: Mapped to PLP module (request explicitly mentions
    Product Listing Page). Step 4: Classified as FEATURE (not EPIC) due to scoped,
    deliverable nature. Step 5: Set confidence High based on explicit scope definition.
  reasoning_version: "product-os-agent-v1.2"
```

AI Reasoning blocks MUST be present on any object created or classified by an AI agent. Human-created objects MAY omit this block or set `confidence_score: null`.

---

### 15. Change History (Audit Log)

The audit log is an append-only record. Never delete entries. Never edit entries.

```yaml
audit_log:
  - date: "2026-01-05"
    changed_by: "pm@nuemart.in"
    change_type: create
    summary: "Object created from REQUEST-COM-PLP-CAROUSEL-001"
  - date: "2026-01-10"
    changed_by: "ai_agent:product-os-agent-v1.2"
    change_type: update
    summary: "AI enriched description, added acceptance criteria, linked test plan"
  - date: "2026-02-01"
    changed_by: "pm@nuemart.in"
    change_type: status_change
    summary: "Status moved from In Development → QA"
  - date: "2026-02-14"
    changed_by: "qa@nuemart.in"
    change_type: status_change
    summary: "Status moved from QA → Released; QA sign-off obtained"
```

Change types: `create`, `update`, `status_change`, `deprecate`, `archive`, `relationship_added`, `relationship_removed`, `ai_enrichment`, `governance_override`

---

### 16. Views / Linked Documents

The object file is the source of truth. View files are derived summaries. Linked documents are external artifacts that reference this object.

```yaml
prd_ref: "PRD-COM-PLP-CAROUSEL-V1"
story_refs:
  - "STORY-COM-PLP-CAROUSEL-001"
  - "STORY-COM-PLP-CAROUSEL-002"
  - "STORY-COM-PLP-CAROUSEL-003"
test_plan_ref: "TESTPLAN-COM-PLP-CAROUSEL-001"
qa_run_refs:
  - "QA-COM-PLP-CAROUSEL-001"
uat_run_refs:
  - "UAT-COM-PLP-CAROUSEL-001"
release_ref: "RELEASE-2026-02-14-V1"
release_note_ref: "RELNOTE-COM-PLP-CAROUSEL-001"
```

---

## Validation Rules

The Product OS linter enforces these rules on every object file:

| Rule | Severity | Description |
|---|---|---|
| `SCHEMA-001` | Error | `object_id` must be present and match the semantic ID format |
| `SCHEMA-002` | Error | `object_type` must be a registered type from OBJECT_TYPES.md |
| `SCHEMA-003` | Error | `status` must be a valid status for this object_type's lifecycle model |
| `SCHEMA-004` | Error | Status transitions must follow the state machine in LIFECYCLE_MODELS.md |
| `SCHEMA-005` | Warning | `owner` must be assigned for any object in Active status |
| `SCHEMA-006` | Warning | All FEATURE objects must have at least one `acceptance_criterion` before `In Development` |
| `SCHEMA-007` | Warning | Objects with `risk_level: High` or `Critical` must have at least one linked RISK object |
| `SCHEMA-008` | Info | `ai_reasoning` block expected for AI-created objects |
| `SCHEMA-009` | Error | `audit_log` must have at least one `create` entry |
| `SCHEMA-010` | Warning | Relationships referencing non-existent object_ids generate a dangling reference warning |
| `SCHEMA-011` | Error | `product_area_code` and `module_code` must match registered values in MODULE_REGISTRY.md |
| `SCHEMA-012` | Warning | Objects in terminal states (`Archived`, `Closed`, `Rejected`) should have `closed_at` set |

---

## Source of Truth Statement

> **Object files in `product/objects/` are the source of truth.**
> Graph files in `product/graph/` are relationship indexes derived from object files.
> View files in `product/views/` are summaries derived from object files.
> No information that exists only in a view or graph file is authoritative.
> When a view and an object file conflict, the object file wins.
> All tools, agents, and humans must write to object files first.

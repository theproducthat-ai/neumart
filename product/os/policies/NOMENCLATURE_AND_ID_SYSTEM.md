# Nuemart Product OS — Nomenclature and ID System

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | All Product OS AI Agents |

---

## 1. Naming Philosophy

The Nuemart ID and nomenclature system is designed with the following non-negotiable principles:

- **Human-readable** — Any team member should be able to understand an ID without looking it up. `FEATURE-COM-PLP-CAROUSEL` is immediately meaningful. `REQ-0042` is not.
- **AI-readable** — IDs must be parseable by AI agents to extract object type, product area, module, and feature scope without requiring a lookup.
- **Enterprise-scalable** — The system must handle hundreds of features, thousands of stories, and years of product history without collision or ambiguity.
- **Stable over time** — IDs assigned today must remain valid references 3 years from now. Names may evolve; IDs must not.
- **Traceable across objects** — IDs must enable the AI to follow relationships between objects without resolving ambiguous references.
- **Compatible with legacy numeric IDs** — The system must preserve and reference all legacy IDs (REQ-0001, PRD-0001, US-0001–US-0014, QA-0001, UAT-0001) created before this OS was adopted.

---

## 2. Object ID Structure

### Primary Format

```
<OBJECT_TYPE>-<PRODUCT_AREA>-<MODULE_OR_SUBMODULE>-<FEATURE_OR_SCOPE_SLUG>-<SEQUENCE_OR_VERSION>
```

Not every segment is required for every object type. Use only the segments that are meaningful for the object:

| Object Type | Typical Structure | Example |
|---|---|---|
| Feature | `FEATURE-<AREA>-<MODULE>-<SLUG>` | `FEATURE-COM-PLP-CAROUSEL` |
| Sub-feature | `SUBFEATURE-<AREA>-<MODULE>-<PARENT_SLUG>-<BEHAVIOR>` | `SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL` |
| PRD | `PRD-<AREA>-<MODULE>-<SLUG>-<VERSION>` | `PRD-COM-PLP-CAROUSEL-V1` |
| Story | `STORY-<AREA>-<MODULE>-<SLUG>-<BEHAVIOR>-<SEQ>` | `STORY-COM-PLP-CAROUSEL-RENDER-001` |
| Request | `REQUEST-<AREA>-<MODULE>-<SLUG>-<SEQ>` | `REQUEST-COM-PLP-CAROUSEL-001` |
| QA Run | `QA-<AREA>-<MODULE>-<SLUG>-RUN-<SEQ>` | `QA-COM-PLP-CAROUSEL-RUN-001` |
| UAT Run | `UAT-<AREA>-<MODULE>-<SLUG>-RUN-<SEQ>` | `UAT-COM-PLP-CAROUSEL-RUN-001` |
| Release | `RELEASE-<AREA>-<MODULE>-<SLUG>-<YYYY-MM>` | `RELEASE-COM-PLP-CAROUSEL-2026-06` |
| Decision | `DECISION-<AREA>-<TOPIC>-<SEQ>` | `DECISION-GOV-POLICY-WAIVER-001` |
| Risk | `RISK-<AREA>-<MODULE>-<SLUG>-<SEQ>` | `RISK-COM-PLP-CAROUSEL-001` |

### Segment Rules

- All uppercase
- Hyphens between segments — no underscores, dots, or spaces
- Maximum approximately 6 meaningful segments
- Each segment should be 1–3 words maximum
- Do not pad with meaningless segments

---

## 3. Product Area Codes

Product Area Codes are the top-level domain identifiers. Every product object must have exactly one Product Area Code.

| Code | Name | Description |
|---|---|---|
| CORE | Product Foundation / Global System | System-wide concerns, cross-cutting features, global configuration |
| COM | Customer Commerce | All customer-facing shopping, browsing, checkout, and order experiences |
| ADM | Admin Console | Admin user interface and operator workflows |
| CAT | Catalog Management | Product catalog, categories, search, and browse infrastructure |
| ORD | Order Management | Order lifecycle from placement to fulfillment |
| PAY | Payment Management | Payment initiation, verification, webhooks, and Razorpay integration |
| INV | Inventory Management | Stock tracking, stock levels, stock movements, replenishment |
| DEL | Delivery Management | Delivery assignment, status tracking, delivery exceptions, routing |
| USR | User / Identity / Access | Authentication, user profiles, roles, permissions (Clerk integration) |
| RPT | Reports / Analytics | Reporting dashboards, data exports, analytics |
| NOTIF | Notifications | Push notifications, SMS, email, in-app notifications |
| CFG | Configuration | System and feature configuration, feature flags |
| OPS | Operations | Internal operational tooling, support tooling |
| QA | Quality (Process Objects) | QA process objects — QA Runs, Test Plans, Test Cases |
| REL | Release (Process Objects) | Release process objects — Release Objects, Rollback Plans |
| GOV | Governance | Product OS governance objects — Policy Waivers, Decisions |
| AI | AI / Product OS / Intelligence | Product OS meta-objects, prompt objects, intelligence layer |

---

## 4. Module and Sub-module Codes

Module Codes identify the specific functional area within a Product Area. Sub-module Codes further narrow the scope.

| Code | Full Name | Parent Area | Description |
|---|---|---|---|
| PLP | Product Listing Page | COM | Customer product browsing grid/list |
| PDP | Product Detail Page | COM | Individual product detail view |
| CART | Cart | COM | Shopping cart management |
| CHK | Checkout | COM | Checkout flow (address, payment, confirmation) |
| ADDR | Address Management | COM / USR | Customer delivery address management |
| FAV | Favourites | COM | Customer saved/favourited products |
| ORDHIS | Order History | COM | Customer order history and reorder |
| ADMORD | Admin Order Management | ADM | Admin view and management of all orders |
| ADMINV | Admin Inventory | ADM | Admin inventory view and adjustments |
| ADMCAT | Admin Catalog | ADM | Admin product catalog management |
| ADMPRODUCT | Admin Product Management | ADM | Admin individual product creation and editing |
| PAYCHK | Payment Checkout | PAY | Payment initiation during checkout |
| PAYVERIFY | Payment Verification | PAY | Post-payment verification and status |
| PAYWEBHOOK | Payment Webhooks | PAY | Razorpay webhook handling and processing |
| DELASSIGN | Delivery Assignment | DEL | Assigning orders to delivery persons |
| DELSTATUS | Delivery Status | DEL | Real-time delivery status tracking |
| DELEXCEPT | Delivery Exceptions | DEL | Handling failed deliveries, returns, exceptions |
| AUTH | Authentication | USR | Login, logout, session management (Clerk) |
| ROLES | Roles and Permissions | USR | User role definitions and permission grants |
| STOCK | Stock Control | INV | Stock level management and alerts |
| STOCKMOV | Stock Movements | INV | Stock movement history, adjustments, audits |

---

## 5. Feature Slug Rules

The feature or scope slug is the human-readable identifier for the specific capability within the module.

**Rules:**
- 1–3 words maximum
- Must describe the **product capability**, not the implementation detail
- Must be unique within the same Module Code
- Must be stable — do not change slugs once assigned

**Good slugs (describe the capability):**

| Slug | What it identifies |
|---|---|
| `CAROUSEL` | The promotional banner carousel feature |
| `AUTO-SCROLL` | Auto-scrolling behavior in a carousel |
| `ORDER-TRACKING` | Order tracking capability |
| `STOCK-ALERT` | Low stock alert capability |
| `REORDER` | One-tap reorder from order history |
| `ADDRESS-SUGGEST` | Address autocomplete/suggestion |
| `WEBHOOK-VERIFY` | Webhook signature verification |
| `DELIVERY-MVP` | Minimum viable delivery management feature |

**Bad slugs (vague or implementation-focused):**

| Bad Slug | Problem |
|---|---|
| `NEW-FEATURE` | Every feature was new at some point |
| `UPDATE-UI` | Does not identify what was updated |
| `CHANGE-001` | A sequence number is not a slug |
| `MISC` | Means nothing |
| `PROMOTIONAL-BANNER-IMAGE-CAROUSEL-AT-TOP-OF-PRODUCT-LISTING-PAGE` | Too long — use `CAROUSEL` |
| `REAL-TIME-ORDER-TRACKING-FEATURE-FOR-CUSTOMERS` | Too long — use `ORDER-TRACKING` |

---

## 6. Object Type Prefixes

Every Product Object ID begins with an Object Type Prefix that identifies the type of object. This prefix is used by AI agents to route objects to the correct template, workflow, and storage location.

| Prefix | Object Type | Example ID | Storage Location |
|---|---|---|---|
| `REQUEST` | Request Object | `REQUEST-COM-PLP-CAROUSEL-001` | `product/objects/requests/` |
| `FEATURE` | Feature Object | `FEATURE-COM-PLP-CAROUSEL` | `product/objects/features/` |
| `SUBFEATURE` | Sub-feature Object | `SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL` | `product/objects/subfeatures/` |
| `CAPABILITY` | Capability Object | `CAPABILITY-DEL-DELASSIGN-ROUTING` | `product/objects/capabilities/` |
| `MODULE` | Module Object | `MODULE-COM-PLP` | `product/objects/modules/` |
| `SUBMODULE` | Sub-module Object | `SUBMODULE-COM-PLP-MAIN` | `product/objects/submodules/` |
| `SCREEN` | Screen Object | `SCREEN-COM-PLP-MAIN` | `product/objects/screens/` |
| `COMPONENT` | UI Component Object | `COMPONENT-COM-PLP-CAROUSEL-WIDGET` | `product/objects/components/` |
| `RULE` | Business Rule Object | `RULE-PAY-PAYWEBHOOK-VERIFY-001` | `product/objects/rules/` |
| `CONFIG` | Configuration Object | `CONFIG-COM-PLP-CAROUSEL-SCROLL` | `product/objects/configs/` |
| `PRD` | Product Requirements Document | `PRD-COM-PLP-CAROUSEL-V1` | `product/objects/prds/` |
| `REQUIREMENT` | Requirement Object (within PRD) | `REQUIREMENT-COM-PLP-CAROUSEL-001` | Embedded in PRD or `product/objects/requirements/` |
| `ACCEPTANCE` | Acceptance Criterion Object | `ACCEPTANCE-COM-PLP-CAROUSEL-RENDER-001` | Embedded in Story |
| `STORY` | User Story Object | `STORY-COM-PLP-CAROUSEL-RENDER-001` | `product/objects/stories/` |
| `TASK` | Engineering Task Object | `TASK-COM-PLP-CAROUSEL-RENDER-001` | `product/objects/tasks/` |
| `PROMPT` | AI Prompt Object | `PROMPT-AI-PRD-GENERATOR-V1` | `product/os/prompts/` |
| `TEST` | Test Case Object | `TEST-COM-PLP-CAROUSEL-RENDER-001` | `product/objects/tests/` |
| `QA` | QA Run Object | `QA-COM-PLP-CAROUSEL-RUN-001` | `product/objects/qa-runs/` |
| `UAT` | UAT Run Object | `UAT-COM-PLP-CAROUSEL-RUN-001` | `product/objects/uat-runs/` |
| `BUG` | Bug Object | `BUG-COM-PLP-CAROUSEL-001` | `product/objects/bugs/` |
| `RELEASE` | Release Object | `RELEASE-COM-PLP-CAROUSEL-2026-06` | `product/objects/releases/` |
| `ROLLBACK` | Rollback Plan Object | `ROLLBACK-COM-PLP-CAROUSEL-2026-06` | `product/objects/releases/` |
| `DECISION` | Decision Object | `DECISION-GOV-POLICY-WAIVER-001` | `product/objects/decisions/` |
| `RISK` | Risk Object | `RISK-COM-PLP-CAROUSEL-001` | `product/objects/risks/` |
| `DEPENDENCY` | Dependency Object | `DEPENDENCY-COM-PLP-CAROUSEL-001` | `product/objects/dependencies/` |
| `ASSUMPTION` | Assumption Object | `ASSUMPTION-COM-PLP-CAROUSEL-001` | Embedded in PRD or Feature |
| `QUESTION` | Open Question Object | `QUESTION-COM-PLP-CAROUSEL-001` | Embedded in Request or Discovery |
| `GAP` | Gap Object | `GAP-COM-PLP-CAROUSEL-001` | `product/objects/gaps/` |
| `INCIDENT` | Incident Object | `INCIDENT-COM-PLP-CAROUSEL-2026-06-001` | `product/objects/incidents/` |
| `ENHANCEMENT` | Enhancement / Future Candidate Object | `ENHANCEMENT-COM-PLP-CAROUSEL-ADMIN-001` | `product/objects/enhancements/` |
| `KNOWLEDGE` | Knowledge Object | `KNOWLEDGE-DEL-CORE-WEBHOOK-TRUST-001` | `product/objects/knowledge/` |
| `EVAL` | Evaluation Object | `EVAL-COM-PLP-CAROUSEL-V1` | `product/objects/evaluations/` |
| `IMPACT` | Impact Assessment Object | `IMPACT-COM-PLP-CAROUSEL-001` | `product/objects/impacts/` |
| `DISCOVERY` | Discovery Session Object | `DISCOVERY-COM-PLP-CAROUSEL-001` | `product/objects/discovery/` |
| `DEVPLAN` | Development Plan Object | `DEVPLAN-COM-PLP-CAROUSEL-V1` | `product/objects/devplans/` |
| `GOAL` | Product Goal Object | `GOAL-COM-2026-H1-001` | `product/objects/goals/` |
| `KPI` | KPI / Metric Object | `KPI-COM-PLP-CONVERSION-001` | `product/objects/kpis/` |
| `PERSONA` | User Persona Object | `PERSONA-COM-URBAN-SHOPPER-001` | `product/objects/personas/` |
| `ROLE` | User Role Definition | `ROLE-USR-CUSTOMER-001` | `product/objects/roles/` |
| `JOURNEY` | User Journey Object | `JOURNEY-COM-CHECKOUT-MOBILE-001` | `product/objects/journeys/` |
| `ENTITY` | Data Entity Object | `ENTITY-ORD-ORDER-001` | `product/objects/entities/` |
| `API` | API Definition Object | `API-PAY-PAYWEBHOOK-VERIFY-001` | `product/objects/apis/` |
| `INTEGRATION` | Integration Object | `INTEGRATION-PAY-RAZORPAY-001` | `product/objects/integrations/` |
| `EVENT` | System Event Object | `EVENT-ORD-ORDER-PLACED-001` | `product/objects/events/` |

---

## 7. Sequence Rules

| Sequence Type | Format | Example | Notes |
|---|---|---|---|
| Object sequence | `001`, `002`, `003` | `STORY-COM-PLP-CAROUSEL-RENDER-001` | Zero-padded to 3 digits |
| Version | `V1`, `V2`, `V3` | `PRD-COM-PLP-CAROUSEL-V1` | Uppercase V; integer only |
| Date-based (releases) | `YYYY-MM` | `RELEASE-COM-PLP-CAROUSEL-2026-06` | Year-month for monthly release references |
| Date-based (incidents) | `YYYY-MM-DD-SEQ` | `INCIDENT-COM-PLP-CAROUSEL-2026-06-22-001` | Full date for incidents |

---

## 8. Versioning Rules

- Object versions track **major revisions** — a V2 represents a significantly revised specification, not a minor edit
- Minor edits (typo fixes, clarification updates, adding an assumption) use the object's `audit_log` field — they do not create a new version ID
- Breaking changes or significant scope revisions create a new version object: `PRD-COM-PLP-CAROUSEL-V2`
- When a new version is created:
  - The new version object must include `supersedes: PRD-COM-PLP-CAROUSEL-V1`
  - The old version must include `superseded_by: PRD-COM-PLP-CAROUSEL-V2`
  - Both version objects remain in storage — old versions are not deleted
- Versions do not imply "V1 was wrong" — V2 may simply represent a feature evolution

---

## 9. Legacy ID Compatibility Rules

Legacy numeric IDs created before the Product OS was adopted remain valid references. They must not be deleted or overwritten.

- Legacy IDs are preserved as `legacy_id` in object YAML frontmatter
- New objects must use semantic IDs
- AI agents must resolve both legacy and semantic IDs to the same object
- `MASTER_REGISTRY.md` (in `product/00-product-foundation/`) continues to track next numeric IDs for backward compatibility
- `OBJECT_INDEX.md` (in `product/os/indexes/`) is the primary index for semantic IDs
- The mapping between old and new IDs is maintained in `MIGRATION_FROM_LEGACY_PRODUCT_OS.md`

---

## 10. File Naming Rules

- Files are named after their `object_id`: `FEATURE-COM-PLP-CAROUSEL.md`
- Default: UPPERCASE filenames
- Lowercase alternative is acceptable for very long filenames, but UPPERCASE is preferred
- Template files use the pattern: `<TYPE>_OBJECT_TEMPLATE.md` (stored in `product/os/templates/`)
- **Never name a file after the request title** — use the `object_id` as the filename
- **Never use spaces in filenames** — use hyphens

| Example Object | File Name |
|---|---|
| `FEATURE-COM-PLP-CAROUSEL` | `FEATURE-COM-PLP-CAROUSEL.md` |
| `PRD-COM-PLP-CAROUSEL-V1` | `PRD-COM-PLP-CAROUSEL-V1.md` |
| `STORY-COM-PLP-CAROUSEL-RENDER-001` | `STORY-COM-PLP-CAROUSEL-RENDER-001.md` |
| `DECISION-GOV-POLICY-WAIVER-001` | `DECISION-GOV-POLICY-WAIVER-001.md` |

---

## 11. Relationship Naming Rules

Relationship fields in object YAML frontmatter use `snake_case` for the relationship type name:

| Relationship Field | Meaning |
|---|---|
| `created_by_request` | This object was created in response to this Request |
| `specifies_feature` | This PRD specifies this Feature Object |
| `implements_requirement` | This Story implements this Requirement |
| `verifies_story` | This Test Case verifies this Story |
| `found_in_qa_run` | This Bug was found in this QA Run |
| `follows_qa_run` | This UAT Run followed this QA Run |
| `ships_features` | This Release ships these Feature Objects |
| `linked_to` | This Risk is linked to this carrier object |
| `supersedes` | This object supersedes the listed object |
| `superseded_by` | This object has been superseded by the listed object |
| `parent_feature` | This Sub-feature belongs to this parent Feature |
| `derived_from` | This Incomplete Work Object was derived from this object |
| `context_object` | This Decision was made in the context of this object |

See `RELATIONSHIP_TYPES.md` for the full list of allowed relationship types.

---

## 12. Examples Table

Comprehensive mapping of existing Nuemart objects to their semantic and legacy IDs:

| Object | Semantic ID | Legacy ID | File Path |
|---|---|---|---|
| Carousel Request | `REQUEST-COM-PLP-CAROUSEL-001` | `REQ-0002` | `product/objects/requests/REQUEST-COM-PLP-CAROUSEL-001.md` |
| Carousel Feature | `FEATURE-COM-PLP-CAROUSEL` | — | `product/objects/features/FEATURE-COM-PLP-CAROUSEL.md` |
| Carousel PRD | `PRD-COM-PLP-CAROUSEL-V1` | `PRD-0002` | `product/objects/prds/PRD-COM-PLP-CAROUSEL-V1.md` |
| Carousel Story — Render | `STORY-COM-PLP-CAROUSEL-RENDER-001` | `US-0009` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-RENDER-001.md` |
| Carousel Story — Auto-scroll | `STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002` | `US-0010` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002.md` |
| Carousel Story — Navigation | `STORY-COM-PLP-CAROUSEL-NAV-003` | `US-0011` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-NAV-003.md` |
| Carousel Story — Mobile | `STORY-COM-PLP-CAROUSEL-MOBILE-004` | `US-0012` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-MOBILE-004.md` |
| Carousel Story — Swipe | `STORY-COM-PLP-CAROUSEL-SWIPE-005` | `US-0013` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-SWIPE-005.md` |
| Carousel Story — Click | `STORY-COM-PLP-CAROUSEL-CLICK-006` | `US-0014` | `product/objects/stories/STORY-COM-PLP-CAROUSEL-CLICK-006.md` |
| Carousel QA Run | `QA-COM-PLP-CAROUSEL-RUN-001` | `QA-0001` | `product/objects/qa-runs/QA-COM-PLP-CAROUSEL-RUN-001.md` |
| Carousel UAT Run | `UAT-COM-PLP-CAROUSEL-RUN-001` | `UAT-0001` | `product/objects/uat-runs/UAT-COM-PLP-CAROUSEL-RUN-001.md` |
| Delivery Request | `REQUEST-DEL-CORE-DELIVERY-MVP-001` | `REQ-0001` | `product/objects/requests/REQUEST-DEL-CORE-DELIVERY-MVP-001.md` |
| Delivery Feature | `FEATURE-DEL-CORE-DELIVERY-MVP` | — | `product/objects/features/FEATURE-DEL-CORE-DELIVERY-MVP.md` |
| Delivery PRD | `PRD-DEL-CORE-DELIVERY-MVP-V1` | `PRD-0001` | `product/objects/prds/PRD-DEL-CORE-DELIVERY-MVP-V1.md` |

---

## 13. Migration Approach

Migration from legacy numeric IDs to semantic IDs is a gradual, non-breaking process.

**Principles:**
- Legacy IDs are never deleted
- Semantic IDs are added alongside legacy IDs
- Objects can be referenced by either ID
- New objects use semantic IDs exclusively

**Full mapping table and migration steps:** See `MIGRATION_FROM_LEGACY_PRODUCT_OS.md`.

---

## 14. AI Rule for ID Generation

When an AI agent is creating a new Product Object, it must determine the ID in this exact order:

**Step 1 — Determine Object Type**
What kind of object is being created? Select the correct Object Type Prefix from Section 6.

**Step 2 — Determine Product Area Code**
Which product area does this object belong to? Select the correct code from Section 3. If unclear, use the closest match and flag for review.

**Step 3 — Determine Module or Sub-module Code**
Which module or sub-module does this object belong to? Select from Section 4. If the feature spans multiple modules, use the primary module.

**Step 4 — Determine Feature or Scope Slug**
What is the 1–3 word slug that identifies this specific capability or scope? Apply the slug rules from Section 5.

**Step 5 — Determine Sequence or Version**
Is this a sequence (`001`, `002`) or a version (`V1`, `V2`)? Use the appropriate format.

**Step 6 — Determine Legacy Mapping**
Does this object correspond to a legacy numeric ID? If so, record it as `legacy_id` in the frontmatter.

**Step 7 — Verify Uniqueness**
Check `product/os/indexes/OBJECT_INDEX.md` to confirm the proposed ID does not already exist. If a match is found, run duplicate detection before proceeding.

---

### IDs the AI Must NEVER Create

These ID patterns are prohibited. The AI must refuse to create any object with one of these IDs and must prompt the user for a proper classification:

| Prohibited Pattern | Why |
|---|---|
| `REQUEST-GENERAL-001` | "General" is not a product area or module |
| `FEATURE-NEW-001` | "New" carries no semantic meaning |
| `STORY-MISC-001` | "Misc" is a wastebasket, not a scope |
| `TASK-UPDATE-001` | "Update" describes nothing |
| `PRD-CHANGE-001` | "Change" is not a feature scope |
| Any ID with a lowercase segment | Violates Rule 6 of ID_RULES.md |
| Any ID with underscores | Violates Rule 7 of ID_RULES.md |
| Any ID reusing an existing object's ID | Violates uniqueness requirement |

If an AI cannot determine the correct ID for any segment, it must use `NEEDS-CLASSIFICATION` as a placeholder and flag the object for resolution at the G1 gate.

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| ID_RULES.md | `product/os/policies/` | Core ID rules that enforce this system |
| FEATURE_TRACKING_RULES.md | `product/os/policies/` | Feature and Sub-feature ID rules |
| OBJECT_INDEX.md | `product/os/indexes/` | Primary index — AI checks here for uniqueness |
| MASTER_REGISTRY.md | `product/00-product-foundation/` | Legacy numeric ID registry |
| MIGRATION_FROM_LEGACY_PRODUCT_OS.md | `product/os/` | Old→new ID mapping |
| RELATIONSHIP_TYPES.md | `product/os/` | Full list of relationship field names |
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P001, P003 — requires objects and IDs per these rules |

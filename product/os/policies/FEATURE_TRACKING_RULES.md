# Nuemart Product OS — Feature Tracking Rules

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | All Product OS AI Agents (mandatory) |

---

## Purpose

This is a critical policy file. Every AI agent and every human product manager must follow these rules without exception.

Feature Tracking Rules define the relationship between incoming requests and the product knowledge graph. They answer the fundamental question: **When a request comes in, how do we decide what product objects to create, update, or link?**

The core principle: **Requests are workflow inputs. Features are permanent product knowledge.**

---

## Rules

### Rule 1 — Every Approved Request That Changes Product Behavior Maps to a Feature

Every approved request that creates or modifies product behavior — behavior that is visible to users (customers, delivery persons) or operators (admin users) — must map to a Feature Object or Sub-feature Object.

**What counts as a behavioral change:**
- New screen, flow, or interaction that users can perform
- Change to an existing screen, flow, or interaction
- New data displayed to users or new data collected from users
- New or changed business rule affecting what users can do
- New or changed notification sent to users
- New capability available to admin operators

**What does NOT require a Feature Object (may use Enhancement Object instead):**
- Documentation-only changes (no code, no behavior)
- Styling changes that don't change how any feature functions
- Configuration changes with no observable behavior change
- Infrastructure or developer tooling changes

---

### Rule 2 — New Capability → Create a Feature Object

If the request introduces a new product capability — something that users or operators could NOT do before — create a new Feature Object in `product/objects/features/`.

**A new Feature Object is required when:**
- The capability did not exist at all before this request
- The capability existed in a different module and is now being added to a new area
- The capability is a net-new interaction pattern

**Example:** REQ-0002 introduced the Promotional Banner Carousel. Customers could not see promotional banners on the product listing page before this request. Therefore, a new Feature Object — `FEATURE-COM-PLP-CAROUSEL` — was created.

---

### Rule 3 — Enhancement to Existing Feature → Update Feature Object

If the request enhances an existing feature **without changing its core purpose**, update the existing Feature Object rather than creating a new one.

**Updating (not creating) is correct when:**
- The core capability already exists and is simply being improved
- The change expands the feature's scope within its original purpose
- The change adds configuration options to an existing behavior

**What to update in the Feature Object:**
- Add a Change History entry in the `audit_log` field
- Update `version` if the change is significant
- Update `future_candidates` if items from the future candidates list are being implemented
- Update status if applicable

**Example:** If a future request adds support for video banners to the Carousel feature, that is an enhancement to `FEATURE-COM-PLP-CAROUSEL`, not a new Feature Object. Update the existing Feature Object with the new capability.

---

### Rule 4 — New Distinct Behavior Under Existing Feature → Create Sub-feature

If the request adds a **distinct behavior** under an existing feature — a behavior that is separable, testable independently, and has its own UX rules — create a Sub-feature Object linked to the parent Feature.

**Creating a Sub-feature is correct when:**
- The new behavior is distinct enough to be documented separately
- The behavior could potentially be enabled/disabled independently of the parent feature
- The behavior has its own user story, acceptance criteria, and test cases

**Example:** Auto-scroll behavior within the Carousel feature. The carousel can exist without auto-scroll. Auto-scroll is a distinct behavior with its own UX rules (3-second interval, pause on hover, manual navigation resets timer). It warrants a Sub-feature: `SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL`.

**Sub-feature must link to parent:**
```yaml
parent_feature: FEATURE-COM-PLP-CAROUSEL
```

---

### Rule 5 — Full Traceability Required

No PRD, Story, QA Run, UAT Run, or Release Object may exist without being traceable back to one or more Feature or Sub-feature Objects.

This rule works in conjunction with `TRACEABILITY_RULES.md`. Specifically:
- A PRD must link to the Feature Object it specifies
- Stories must trace through the PRD to the Feature Object
- QA Runs must link to the Feature Object(s) they test
- Releases must link to the Feature Objects they ship

See `TRACEABILITY_RULES.md` for the full minimum traceability chain.

---

### Rule 6 — Requests Are Workflow Inputs; Features Are Permanent Knowledge

This is the single most important conceptual distinction in the Nuemart Product OS.

| Dimension | Request Object | Feature Object |
|---|---|---|
| **What it captures** | WHY the work came in (the incoming ask) | WHAT the product capability is and HOW it works |
| **Lifecycle** | Created, processed, and closed | Created and evolves — never closed |
| **Perspective** | Requestor's perspective | Product's perspective |
| **Purpose** | Workflow management | Product knowledge |
| **After delivery** | Closed / archived | Remains as active product knowledge |
| **Future requests** | New requests are created | Existing Feature Object is updated |

**The practical consequence:** After a request is closed and delivered, the Request Object becomes historical. But the Feature Object it created or modified remains the living record of that product capability. Future requests that touch the same feature will update the Feature Object, not the original Request Object.

---

### Rule 7 — One Request Can Touch Many Features

A single request may:
- **Create** a new Feature Object (new capability)
- **Modify** an existing Feature Object (enhancement)
- **Extend** an existing Feature Object (new sub-feature)
- **Deprecate** a Feature Object (capability being removed)
- **Flag as duplicate** a Feature Object (request reveals that two separate features are the same thing)

Always enumerate all affected Feature Objects in the Request Object:

```yaml
feature_impact:
  creates:
    - FEATURE-COM-PLP-CAROUSEL
  modifies:
    - SUBMODULE-COM-PLP
  deprecates: []
  flags_as_duplicate: []
```

A request that touches multiple features must be linked to ALL of them, not just the primary one.

---

### Rule 8 — Future Candidates Must Be Tracked

During grilling (`/product-grill`) and PRD writing (`/product-prd`), ideas, enhancements, and possibilities often surface that are explicitly out of scope for the current request. These are valuable product knowledge and must not be lost.

**Future candidates must be tracked in one of two places:**

1. In the Feature Object's `future_candidates` section:
```yaml
future_candidates:
  - name: Admin-managed carousel content
    status: Candidate
    origin: REQ-0002 grilling session
    notes: PO wants admin to control banner images; deferred to avoid scope creep

  - name: Auto-scroll configuration by admin
    status: Candidate
    origin: REQ-0002 PRD review
    notes: Fixed 3s interval for now; configurable interval deferred

  - name: Promotional banner click analytics
    status: Candidate
    origin: REQ-0002 grilling session
    notes: Tracking click-through rates on banners; requires analytics infrastructure
```

2. As Enhancement Objects in `product/objects/enhancements/`, especially if they are complex enough to warrant their own discovery session.

**Rule:** No future candidate identified during grilling or PRD writing may be discarded. It must be either tracked as a future candidate or explicitly recorded as "Considered and rejected" with a reason.

---

### Rule 9 — Feature Details Must Not Live Only in Request Files

The following types of product knowledge belong in the Feature Object, not just in the Request Object or PRD:

- **Functional scope** — what the feature does and does not do
- **UX rules** — how the user interacts with the feature and what happens
- **Business rules** — the logical rules that govern the feature's behavior
- **Configuration rules** — what can be configured and by whom
- **Data dependencies** — what Convex entities and fields the feature reads/writes
- **Constraints** — known technical, regulatory, or UX constraints
- **Assumptions** — what was assumed to be true when the feature was designed

**Why:** Request Objects are closed after delivery. PRDs are versioned and eventually superseded. If important product knowledge lives only in a closed Request or an archived PRD V1, it is effectively invisible to the team when working on future enhancements.

The Feature Object is the **permanent living record** of the product capability. It must contain everything the team needs to understand the feature, maintain it, extend it, or deprecate it — without having to read through old requests and PRDs.

---

### Rule 10 — Feature Master Must Be Maintained

`product/graph/FEATURE_MASTER.md` is the master registry of all Feature Objects in the product graph. It must be updated whenever:

- A new Feature Object is created (add entry)
- A new Sub-feature Object is created (add entry under parent)
- A Feature Object status changes (update status)
- A Feature Object is deprecated (update status)
- A Feature Object is archived (mark as archived)

The AI must update FEATURE_MASTER.md as part of the same operation that creates or modifies a Feature Object. It must not be updated separately as an afterthought.

---

## Object Type Distinctions

| Object Type | Purpose | Lifecycle | Location |
|---|---|---|---|
| Request Object | Captures the incoming ask — the requestor's need or problem | Processed and closed after delivery | `product/objects/requests/` |
| Feature Object | Captures the product capability — what the product can do | Permanent; evolves with each enhancement | `product/objects/features/` |
| Sub-feature Object | A distinct, independently documentable behavior within a Feature | Permanent; evolves with each enhancement | `product/objects/subfeatures/` |
| Enhancement Object | A future improvement candidate; not yet committed | Tracked but not in active development | `product/objects/enhancements/` |
| Change History | What changed in a Feature over time across multiple requests | Embedded in Feature Object's `audit_log` | Embedded in Feature Object file |

---

## Example: REQ-0002 → FEATURE-COM-PLP-CAROUSEL

This example demonstrates how Feature Tracking Rules applied to the Carousel request.

```
REQ-0002 (legacy_id) = REQUEST-COM-PLP-CAROUSEL-001 (semantic_id)
  type: New Feature (Existing Screen Enhancement)
  title: Promotional Banner Carousel at Top of Product Listing Page
  creates:
    - FEATURE-COM-PLP-CAROUSEL

FEATURE-COM-PLP-CAROUSEL:
  belongs_to: SUBMODULE-COM-PLP
  impacts_screen: SCR-CUS-0001  (Product Listing Page)
  specified_by: PRD-COM-PLP-CAROUSEL-V1  (legacy: PRD-0002)
  implemented_by:
    - STORY-COM-PLP-CAROUSEL-RENDER-001   (legacy: US-0009)
    - STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002  (legacy: US-0010)
    - STORY-COM-PLP-CAROUSEL-NAV-003      (legacy: US-0011)
    - STORY-COM-PLP-CAROUSEL-MOBILE-004   (legacy: US-0012)
    - STORY-COM-PLP-CAROUSEL-SWIPE-005    (legacy: US-0013)
    - STORY-COM-PLP-CAROUSEL-CLICK-006    (legacy: US-0014)
  tested_by: QA-COM-PLP-CAROUSEL-RUN-001  (legacy: QA-0001)
  validated_by: UAT-COM-PLP-CAROUSEL-RUN-001  (legacy: UAT-0001)
  future_candidates:
    - Admin-managed carousel content (Candidate)
    - Auto-scroll configuration by admin (Candidate)
    - Promotional banner analytics (Candidate)
```

**What REQUEST-COM-PLP-CAROUSEL-001 captures:**
- WHY the carousel came in: the Product Owner wanted promotional banners on the product listing page to drive promotional awareness
- The incoming context, constraints, stakeholder, and timeline
- That it was processed and delivered
- That it is now closed

**What FEATURE-COM-PLP-CAROUSEL captures:**
- WHAT the carousel capability is: its scope, rendering rules, auto-scroll behavior, navigation dots, swipe gesture support, click handling
- HOW it was built: which stories, which PRD version, which QA run
- WHEN it shipped: first release date
- WHERE it lives: SCR-CUS-0001, SUBMODULE-COM-PLP
- WHAT could come next: admin-managed content, configurable auto-scroll, analytics

FEATURE-COM-PLP-CAROUSEL will remain in the product graph permanently. When a future request modifies the carousel (e.g., adds admin-managed content), it will update this Feature Object — not create a new one. REQUEST-COM-PLP-CAROUSEL-001 will remain closed as historical context.

---

## Clarification: When to Create a New Feature vs. Update Existing

| Scenario | Action |
|---|---|
| Request adds a brand-new capability on a new screen | Create new Feature Object |
| Request adds a capability to an existing screen, for an existing feature | Update existing Feature Object |
| Request adds a distinct sub-behavior to an existing feature | Create Sub-feature Object, link to parent Feature |
| Request changes the configuration or rules of an existing feature | Update existing Feature Object's audit_log |
| Request deprecates an existing capability | Update Feature Object status to Deprecated |
| Request is a bug fix with no UX or behavior change | Update Feature Object's bug_history; no new Feature Object |
| Request is a duplicate of a closed request | Link to existing Feature Object; do not create new one |

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P013 (feature details must live in Feature Objects) |
| TRACEABILITY_RULES.md | `product/os/policies/` | Rule 1–2 (Feature traceability chain) |
| NOMENCLATURE_AND_ID_SYSTEM.md | `product/os/policies/` | FEATURE and SUBFEATURE prefixes and ID rules |
| FEATURE_MASTER.md | `product/graph/` | Master registry updated by Rule 10 |
| STATUS_TRANSITION_RULES.md | `product/os/policies/` | Feature Object lifecycle transitions |
| APPROVAL_GATES.md | `product/os/policies/` | G4 gate checks Feature Object link in PRD |

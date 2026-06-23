# Nuemart Product OS — Duplicate Detection Engine

**Version:** 1.0
**Date:** 2026-06-22
**Status:** Active

---

## Purpose

The Duplicate Detection Engine prevents the creation of redundant, conflicting, or fragmented Product Objects. Before any new Feature Object, Request Object, or PRD is created, this engine checks whether a functionally equivalent or highly similar object already exists.

Duplicate objects cause:
- Engineering rework (two teams building the same thing)
- Inconsistent product definitions (two PRDs for the same feature)
- Traceability fragmentation (work done against one object, specs in another)
- Priority confusion (same initiative scored twice with different results)

This engine runs as part of Step 6 of the AI Reasoning Model and is triggered automatically by the Intake Agent and Product Architect Agent.

---

## Duplicate Types

---

### Type 1 — Exact Duplicate

**Definition:** A request or feature already exists with the same scope, same module, and the same core user need. The new object adds nothing new.

**Indicators:**
- Same canonical feature name found in FEATURE_MASTER.md
- Same module_code and same user goal
- Overlapping scope that is ~100% identical
- User may be re-submitting a previously submitted request

**Example:**
- Existing: FEATURE-COM-PLP-CAROUSEL (Promotional banner carousel on PLP, auto-scroll, navigation dots)
- New request: "Can we add a rotating banner to the product listing page with dots at the bottom?"
- Assessment: Same feature, same screen, same behavior described differently → Exact Duplicate

**Resolution action:** REJECT-AND-LINK — Do not create a new object. Link the conversation to the existing object. Inform the user that this feature already exists and show its current status.

---

### Type 2 — Near Duplicate

**Definition:** A request or feature exists with the same core capability but with meaningfully different scope, audience, or behavior. They are related but not identical.

**Indicators:**
- Same module_code and overlapping user goal
- Scope overlap is ~60–80%
- Key differences exist (different user role, different screen, additional behavior, reduced behavior)
- Could be the same feature if scope is reconciled, or could legitimately be a separate feature

**Example:**
- Existing: FEATURE-COM-PLP-CAROUSEL (Promotional carousel on PLP)
- New request: "Add a carousel to the homepage showing featured categories"
- Assessment: Same component type (carousel), different screen (homepage vs. PLP), different content type (categories vs. promotional banners) → Near Duplicate

**Resolution action:** Human confirmation required. Present both objects side by side. Ask: "Is this the same feature on a different screen, or a distinct feature?" If confirmed distinct → PROCEED. If confirmed same → LINK as Sub-feature or MERGE.

---

### Type 3 — Superseded

**Definition:** An older object exists but the new request explicitly replaces, retires, or supersedes it. The old object should be deprecated in favor of the new one.

**Indicators:**
- The new request explicitly mentions replacing or upgrading existing functionality
- The new scope makes the old object's scope entirely obsolete
- The old object is in a deprecated or terminal state

**Example:**
- Existing: FEATURE-COM-PLP-CAROUSEL (Phase 1 — static promotional banners, manually updated)
- New request: "Replace the current carousel with a dynamic system driven by admin-configured promotions with scheduling"
- Assessment: New capability supersedes the static implementation → Superseded

**Resolution action:** SUPERSEDE — Create the new Feature Object. Add `supersedes: FEATURE-COM-PLP-CAROUSEL-STATIC` to the new object. Mark the old object as `status: Deprecated`, add `superseded_by: FEATURE-COM-PLP-CAROUSEL-DYNAMIC`.

---

### Type 4 — Extended

**Definition:** A request describes adding a new behavior or dimension to an existing feature. The new work should become a Sub-feature of the existing Feature Object, not a new independent Feature.

**Indicators:**
- The new request references an existing feature by name
- The new scope would be incomplete without the existing feature's context
- The existing feature continues to exist and operate; the new request adds to it
- The new request affects the same screen, component, or data entity as the existing feature

**Example:**
- Existing: FEATURE-COM-PLP-CAROUSEL (Promotional banner carousel — render, auto-scroll, navigation)
- New request: "Add analytics tracking to the carousel — track impressions and clicks per banner"
- Assessment: The carousel already exists; analytics is a new dimension of the same feature → Extended

**Resolution action:** LINK — Create a Sub-feature Object under the existing Feature. Do not create a new top-level Feature. Semantic ID: SUBFEATURE-COM-PLP-CAROUSEL-ANALYTICS-001.

---

### Type 5 — Conflicting

**Definition:** Two objects make contradictory claims about the same product area. This is not a duplicate to be merged — it is a consistency problem to be resolved.

**Indicators:**
- Two PRDs define conflicting rules for the same scenario
- Two Feature Objects claim to own the same screen or data entity
- A new request contradicts an approved decision in an existing Decision Object
- Two User Story Objects describe opposing behaviors for the same use case

**Example:**
- Existing Rule Object: "Carousel must display a maximum of 5 banners"
- New request: "The carousel should support up to 10 banners for seasonal campaigns"
- Assessment: Direct numerical conflict on the same constraint → Conflicting

**Resolution action:** CONFLICT — Do not create the new object. Surface the contradiction to the user. Require a Decision Object that explicitly resolves the conflict before either object is updated.

---

## Detection Methods

### Method 1 — Feature Slug Match in FEATURE_MASTER.md

1. Extract key nouns from the new request (e.g., "carousel", "banner", "product listing")
2. Generate a candidate feature slug: `{DOMAIN}-{MODULE}-{KEY_NOUN}` (e.g., `COM-PLP-CAROUSEL`)
3. Search FEATURE_MASTER.md for an exact or fuzzy match on the slug
4. If exact match → high-confidence Exact Duplicate candidate
5. If fuzzy match (e.g., slug matches but name differs) → Near Duplicate candidate

**Confidence:** High for exact slug match; Medium for fuzzy match

---

### Method 2 — Canonical Name Match in OBJECT_INDEX.md

1. Generate 2–4 candidate canonical names from the request (e.g., "Promotional Banner Carousel", "Banner Carousel", "Product Listing Carousel")
2. Search OBJECT_INDEX.md for matching or near-matching canonical names
3. Match on module_code + name combination for higher specificity

**Confidence:** High for exact name + module match; Medium for name match across different modules

---

### Method 3 — Module Code + Feature Keyword Combination Search

1. Identify the primary module_code (e.g., `COM-PLP`)
2. Extract feature keywords (e.g., "carousel", "banner", "promo")
3. Search OBJECT_INDEX.md for all objects with the same module_code
4. Scan those objects' titles and descriptions for matching keywords
5. If 2+ keywords match → Near Duplicate candidate

**Confidence:** Medium (keyword match is approximate; requires additional validation)

---

### Method 4 — Request History Intent Match

1. Scan all existing Request Objects in `product/objects/requests/`
2. For each request: compare intent (what was the user trying to achieve?)
3. If the core user need is the same (even if wording differs) → Exact or Near Duplicate candidate
4. Check `request.status` — if the existing request is `Closed` or `Rejected`, the new request may be a revival (document, but proceed with caution)

**Confidence:** Medium for intent match; Low if the existing request is closed

---

### Method 5 — Scope Overlap Estimation

For any candidate duplicate identified by Methods 1–4, estimate scope overlap:

1. List the core behaviors/capabilities of the existing object (from Feature Object or PRD)
2. List the core behaviors/capabilities of the new request (from request text)
3. Count: how many of the new request's behaviors already exist in the existing object?
4. Calculate: (overlapping behaviors / total behaviors in new request) × 100 = overlap percentage

**Overlap thresholds:**
- ≥90% overlap → Exact Duplicate
- 60–89% overlap → Near Duplicate
- 30–59% overlap → Extended (evaluate whether sub-feature is appropriate)
- <30% overlap → Likely distinct; PROCEED with note about related object

**Confidence:** Medium (behavior enumeration is AI interpretation, not mechanical count)

---

## Reasoning Steps

1. **Extract entities from the new request.** Identify module, feature keywords, user role, data entities, screen references.

2. **Run Method 1 (slug match).** Check FEATURE_MASTER.md. If exact slug match found → declare Exact Duplicate candidate at High confidence. If fuzzy → Near Duplicate at Medium confidence.

3. **Run Method 2 (canonical name match).** Check OBJECT_INDEX.md. If match found, cross-reference with Method 1 result.

4. **Run Method 3 (keyword combination).** Search by module_code + keywords. Identify all objects in the same module with keyword overlaps.

5. **Run Method 4 (intent match).** Scan Request history for similar user intent.

6. **For any candidate found: run Method 5 (scope overlap).** Estimate overlap percentage to classify the duplicate type.

7. **Assign duplicate type and confidence.** If High confidence → present findings before creating new object. If Medium → present findings with recommendation. If Low (no strong match) → proceed and document null result.

8. **Apply resolution action.** Based on duplicate type: REJECT-AND-LINK, Human-Confirm, SUPERSEDE, LINK, CONFLICT, or PROCEED.

9. **Document the search.** Add `duplicate_detection` block to the new Request or Feature Object with search results, match candidates, and resolution action.

10. **Update OBJECT_INDEX.md.** If resolution is SUPERSEDE: mark old object as deprecated. If LINK: add sub-feature link. If REJECT-AND-LINK: do not create new object, add note to existing object.

---

## Output Objects

| Output | Created/Updated | Notes |
|---|---|---|
| Duplicate flag | Added to new object's metadata | Always present (even if `no_duplicate_detected`) |
| Existing object link | Added to new object's relationships | Only if candidate found |
| Deprecation notice | Added to old object | Only if SUPERSEDE |
| OBJECT_INDEX.md | Updated | Deprecation status if SUPERSEDE |
| Decision Object | Required if CONFLICT | Cannot resolve conflict without Decision Object |

---

## Required Metadata

```yaml
duplicate_detection:
  search_performed: true
  methods_used: [slug_match, canonical_name, keyword_combo, intent_match, scope_overlap]
  candidates_found: N
  candidates:
    - candidate_id: <existing object ID>
      candidate_type: <object type>
      match_method: <which detection method found it>
      overlap_percentage: <0–100>
      duplicate_type: Exact | Near | Superseded | Extended | Conflicting | None
      confidence: High | Medium | Low
  resolution_action: REJECT-AND-LINK | SUPERSEDE | LINK | CONFLICT | PROCEED
  resolution_rationale: "<why this resolution was chosen>"
  human_confirmation_required: true | false
  human_confirmation_status: Pending | Confirmed | Overridden
```

---

## Failure Conditions

| Failure | Handling |
|---|---|
| OBJECT_INDEX.md not populated | Cannot run Methods 1–4; output warning, proceed with PROCEED resolution, flag as LOW confidence |
| FEATURE_MASTER.md not populated | Cannot run Method 1; flag slug match as unavailable; continue with Methods 2–5 |
| Scope overlap cannot be estimated (no existing PRD or Feature spec) | Mark overlap as `unknown`; set confidence to Low; flag for human review |
| Both old and new objects are PRD-Approved | Cannot auto-resolve; always require Decision Object before any action |
| Circular supersession detected (A supersedes B, new request would make B supersede A) | Flag as CONFLICT; require human Decision Object |

---

## Resolution Actions — Reference

| Resolution | When to Apply | Effect |
|---|---|---|
| **REJECT-AND-LINK** | Exact Duplicate, High confidence | Do not create new object; link conversation to existing object; inform user |
| **SUPERSEDE** | The new request explicitly replaces the old | Create new object; mark old object `Deprecated`; add `supersedes` link |
| **LINK** | Extended — new request adds to existing Feature | Create Sub-feature Object under existing Feature; do not create new top-level Feature |
| **CONFLICT** | Contradictory objects | Block creation; require Decision Object to resolve contradiction |
| **PROCEED** | Confirmed distinct feature | Create new object; document null duplicate result; note related objects |
| **Human-Confirm** | Near Duplicate, Medium confidence | Surface both objects; ask human whether to PROCEED, LINK, MERGE, or SUPERSEDE |

---

## Example — Carousel Homepage Request

**Trigger:** New request received: "I want to add a carousel to the homepage showing our featured categories and seasonal promotions"

**Step 1 entities:** carousel (component), homepage (screen), featured categories (content type), seasonal promotions (content type)

**Step 2 (Method 1 slug match):**
- Candidate slug generated: `COM-HOME-CAROUSEL`
- FEATURE_MASTER.md search: No exact match for `COM-HOME-CAROUSEL`
- Fuzzy match: `COM-PLP-CAROUSEL` (FEATURE-COM-PLP-CAROUSEL) — same component type, different screen
- Result: Near Duplicate candidate at Medium confidence

**Step 3 (Method 2 canonical name match):**
- Searched OBJECT_INDEX.md for "carousel" → found FEATURE-COM-PLP-CAROUSEL (title: "Promotional Banner Carousel — Product Listing Page")
- Module: COM-PLP; new request implies COM-HOME
- Module mismatch noted

**Step 4 (Method 5 scope overlap):**
- Existing feature behaviors: auto-scroll, navigation dots, banner images, click-through navigation, accessibility
- New request behaviors: carousel component, featured categories content, seasonal promotions content, homepage placement
- Overlapping behavior: carousel component mechanism (~1 of 4 new behaviors)
- Overlap percentage: ~25%

**Assessment:** 25% overlap → distinct feature with related component. Not a duplicate.

**Resolution: PROCEED**

**Duplicate detection block:**
```yaml
duplicate_detection:
  search_performed: true
  methods_used: [slug_match, canonical_name, scope_overlap]
  candidates_found: 1
  candidates:
    - candidate_id: FEATURE-COM-PLP-CAROUSEL
      match_method: slug_match (fuzzy) + canonical_name
      overlap_percentage: 25
      duplicate_type: None (distinct feature, related component)
      confidence: Medium
  resolution_action: PROCEED
  resolution_rationale: "Different screen (homepage vs. PLP), different content type (categories vs. promotional banners), 25% overlap — below Near Duplicate threshold. Note: reuse carousel component from COM-PLP implementation."
  human_confirmation_required: false
```

**Note added to new Request Object:** "Related feature: FEATURE-COM-PLP-CAROUSEL. Engineering recommendation: reuse the carousel component built for COM-PLP. This is a different feature on a different screen."

---

## Related Files

- `AI_REASONING_MODEL.md` — Duplicate detection is Step 6 of the reasoning model
- `AI_AGENTS.md` — Intake Agent (Agent 1) and Product Architect Agent (Agent 3) run this engine
- `FEATURE_MASTER.md` — Primary search target for Method 1
- `OBJECT_INDEX.md` — Primary search target for Methods 2 and 3
- `GAP_DETECTION_ENGINE.md` — Receives CONFLICT gaps from this engine

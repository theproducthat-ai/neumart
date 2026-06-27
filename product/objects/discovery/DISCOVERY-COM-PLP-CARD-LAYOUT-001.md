---
id: DISCOVERY-COM-PLP-CARD-LAYOUT-001
object_type: discovery
session_type: grilling
status: complete
linked_request: REQUEST-COM-PLP-CARD-LAYOUT-001
feature_ref: FEATURE-COM-PLP-CARD
session_date: 2026-06-25
duration_minutes: 30
owner: Product Owner
participants:
  - name: Product Owner
    role: Requester / Decision Maker
  - name: AI
    role: Discovery Facilitator
module_id: MOD-COM
module_area: MA-COM-PLP
screen_id: SCR-CUS-0001
created_date: 2026-06-25
created_by: AI
schema_version: "2.0"

grilling_status: Complete
questions_resolved: 2
questions_escalated: 0
assumptions_made: 3
decision_candidates: []
mvp_scope_defined: true
---

# DISCOVERY-COM-PLP-CARD-LAYOUT-001 — Product Card Image Size Reduction and Price-Name Alignment

## Session Summary

A structured grilling session for REQUEST-COM-PLP-CARD-LAYOUT-001 (REQ-0009). The session resolved both open questions from intake: the target image height for the product card and the scope boundary relative to REQ-0003 (Product Card Price Alignment). The product owner confirmed image sizing targets and clarified that price alignment is conditional on the outcome of REQ-0003's QA. All blocking questions are resolved — no decision candidates remain.

---

## Context

**Request / Feature being explored:** REQUEST-COM-PLP-CARD-LAYOUT-001  
**Why this session was needed:** Two open questions at intake prevented story creation: (1) target image height was unspecified, and (2) scope overlap with REQ-0003 was unresolved.

---

## Questions Explored

1. What is the desired reduction in product card image height? Specific Tailwind class, percentage, or developer judgment?
2. Is the price-name alignment concern in this request the same as REQ-0003, or a different axis? What is the scope boundary?

---

## Key Findings

| # | Finding | Confidence | Impact |
|---|---------|------------|--------|
| 1 | Image height target: h-32 mobile, h-36 on larger screens (responsive); developer may adjust slightly | High | Unblocks story and acceptance criterion |
| 2 | Price alignment is conditional: if REQ-0003 resolves it during QA, this request is image-size only | High | Narrows MVP scope; prevents duplication |
| 3 | Change is pure CSS/Tailwind on product-card component — no schema, no API, no auth | High | Keeps lane as Small Enhancement (no flag upgrades) |

### Finding Detail

**Finding 1 — Image height target confirmed**

The product owner specified h-32 as the mobile target and h-36 on larger screens using responsive Tailwind syntax (`md:h-36` or equivalent). Developer may adjust slightly to maintain card visual balance. Image must remain proportionate and clear — object-cover or equivalent must be preserved to prevent distortion.

**Finding 2 — Price alignment is conditional on REQ-0003**

REQ-0003 (Product Card Price Alignment) is currently Ready for QA and owns the vertical price-gap fix (mt-auto/pt-2 removal). This request must not duplicate that fix. If REQ-0003's fix fully resolves price alignment during QA, REQUEST-COM-PLP-CARD-LAYOUT-001 is scoped to image-size reduction only. If it does not resolve alignment, price alignment becomes in-scope — but must address a different concern (e.g. left-edge or horizontal alignment) without touching REQ-0003's changes.

**Finding 3 — Pure CSS/Tailwind change confirmed**

No Convex schema changes, no API changes, no auth or payment touches. Image URL is already stored in the products table. The product-card component is the only target file.

---

## Constraints Identified

- Do not duplicate REQ-0003's fix (mt-auto/pt-2 removal from price wrapper)
- Image must remain proportionate — object-cover or equivalent must be preserved; no custom cropping logic
- No schema, API, or external integration changes permitted for this request

---

## Decisions Made

| # | Decision | Made By | Rationale |
|---|----------|---------|-----------|
| 1 | Image height: h-32 mobile, h-36 medium+ screens | Product Owner | Confirmed at grilling session 2026-06-25 |
| 2 | Price alignment deferred unless REQ-0003 fails to resolve it | Product Owner | Prevents scope duplication; REQ-0003 owns vertical gap fix |

---

## Assumptions Validated or Invalidated

| Assumption | Outcome | Notes |
|------------|---------|-------|
| Request is pure CSS/Tailwind with no data model impact | Validated | Image URL already in products table; no new fields needed |
| Two asks could be bundled into one release | Validated (conditionally) | Still bundled, but price alignment now conditional — may ship as image-only if REQ-0003 resolves alignment |

---

## Open Questions After Session

No blocking questions remain. All escalated questions from intake have been resolved.

---

## MVP Scope

**Must Have:**
- Product card image height reduced to h-32 on mobile (responsive: h-36 on medium+ screens)
- Image remains proportionate, clear, and not awkwardly cropped (object-cover or equivalent preserved)
- Developer may adjust height class slightly if needed to maintain card visual balance

**Nice to Have (deferred / conditional):**
- Price-name alignment improvement — only in scope if REQ-0003 does NOT resolve price alignment during its QA run; if it does, drop from this request entirely

---

## Out of Scope

| Item | Reason |
|---|---|
| Product detail page (PDP) image sizing (SCR-CUS-0002) | Different screen and component — out of scope for this request |
| Admin-facing product card views | Different context and user role — not part of this request |
| Image cropping configuration or aspect ratio controls | No custom sizing logic; use existing Tailwind utility (object-cover) |
| Convex schema changes | Image URL is already stored; no new fields needed |
| REQ-0003's vertical price gap fix (mt-auto/pt-2 removal) | REQ-0003 owns this fix — do not duplicate |

---

## Next Steps

| # | Action | Owner | Due By |
|---|--------|-------|--------|
| 1 | Write user story with updated acceptance criteria | AI (via /product-stories) | When ready to build |
| 2 | Check REQ-0003 QA outcome to confirm whether price alignment is in or out of scope | Product Owner | After REQ-0003 QA passes |
| 3 | Write lightweight implementation notes | AI (via /product-devplan) | After story is written |

---

## Objects Updated or Created as Result

| Object Type | ID | Action |
|---|---|---|
| Request | REQUEST-COM-PLP-CARD-LAYOUT-001 | Updated — grilling_status: Complete, status: Grilled |
| Assumption | ASMP-COM-PLP-CARD-LAYOUT-001 | Created — md: breakpoint for h-36 |
| Assumption | ASMP-COM-PLP-CARD-LAYOUT-002 | Created — REQ-0003 conditional scope |
| Assumption | ASMP-COM-PLP-CARD-LAYOUT-003 | Created — object-cover for image aspect ratio |

---

## Audit
```
created:      2026-06-25
created_by:   AI
last_updated: 2026-06-25
```

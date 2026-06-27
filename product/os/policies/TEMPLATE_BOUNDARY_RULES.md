# Template Boundary Rules

**Version:** 2.0
**Owner:** Product Lead
**Last Updated:** 2026-06-24

> This document clarifies where one template ends and another begins. When two templates cover similar ground, use these rules to decide which one to use. These rules are authoritative — they override individual template descriptions if there is a conflict.

---

## 1. COMPONENT vs UI_COMPONENT

**Rule:** Use `COMPONENT_OBJECT_TEMPLATE.md` for product/system-level components. Use `UI_COMPONENT_OBJECT_TEMPLATE.md` for frontend code components.

| Template | What it documents | Example |
|---|---|---|
| `COMPONENT_OBJECT_TEMPLATE.md` | A bounded functional area within the product architecture. Conceptual — describes capability boundaries, not code. | "Cart Component", "Payment Component", "Address Component" |
| `UI_COMPONENT_OBJECT_TEMPLATE.md` | A reusable React/HTML component with defined props, states, and visual variants. Code-level — maps to a specific file or component library entry. | `<ProductCard />`, `<CartSummary />`, `<AddressSelector />` |

**Decision test:** If you could describe it in a product spec without mentioning React or JSX, it's a COMPONENT. If it maps to a `.tsx` file or Storybook entry, it's a UI_COMPONENT.

---

## 2. ROADMAP_ITEM vs BACKLOG_ITEM

**Rule:** Use `ROADMAP_ITEM_TEMPLATE.md` for strategic future candidates. Use `BACKLOG_ITEM_TEMPLATE.md` for execution-ready work.

| Template | What it documents | Example |
|---|---|---|
| `ROADMAP_ITEM_TEMPLATE.md` | A candidate for future work that needs discussion, scoring, or a go/no-go decision before entering the backlog. Not yet committed to delivery. | "Introduce loyalty points programme — Q3 candidate" |
| `BACKLOG_ITEM_TEMPLATE.md` | Work that has been accepted, has an estimate, and is in the delivery queue. May or may not be sprint-assigned yet. | "Add promotional code field to checkout — estimated 3 SP, sprint 12 ready" |

**Decision test:** Has the team committed to building it? If yes → BACKLOG_ITEM. If it's still under discussion → ROADMAP_ITEM.

---

## 3. RESEARCH_NOTE vs DISCOVERY_NOTE vs DISCOVERY_EVIDENCE

**Rule:** These three are different phases of the same research chain.

| Template | What it documents | Example |
|---|---|---|
| `RESEARCH_NOTE_TEMPLATE.md` | A planned or completed research study — user interviews, surveys, competitive analysis, data studies. Has a defined methodology and output. | "5-user interview study on checkout abandonment reasons" |
| `DISCOVERY_NOTE_TEMPLATE.md` | An unplanned finding that surfaced during delivery, design, or discovery. Not a study — a midstream observation worth capturing. | "User mentioned during demo they expected to filter by brand, not just category" |
| `DISCOVERY_EVIDENCE_TEMPLATE.md` | A raw supporting artifact that provides evidence for a finding or decision — a recording, screenshot, data export, quote. The source material, not the analysis. | Screenshot of competitor checkout flow, user session recording, Hotjar heatmap |

**Chain:** DISCOVERY_EVIDENCE feeds DISCOVERY_NOTE or RESEARCH_NOTE. RESEARCH_NOTE or DISCOVERY_NOTE feeds ASSUMPTION objects and DECISION objects.

---

## 4. FULL PRD vs PRD_LITE

**Rule:** Use `PRD_OBJECT_TEMPLATE.md` for features requiring formal alignment. Use `PRD_LITE_TEMPLATE.md` for small enhancements only.

| Template | When to Use | Lane |
|---|---|---|
| `PRD_OBJECT_TEMPLATE.md` | New feature, major enhancement, strategic initiative, compliance change, anything requiring UAT or client approval. | Lane 3, 4, 6 |
| `PRD_LITE_TEMPLATE.md` | Small improvement to an existing feature. ≤3 stories. No schema changes. No UAT required. No client commitment. | Lane 2 |

**Hard rules for full PRD:**
- Any change involving schema or API changes → full PRD
- Any change requiring UAT sign-off → full PRD
- Any change with a client commitment → full PRD
- Any change involving more than 3 user stories → full PRD

---

## 5. BUG (Full) vs BUG_MINOR

**Rule:** Severity and impact determine which template to use.

| Template | When to Use | Priority |
|---|---|---|
| `BUG_OBJECT_TEMPLATE.md` | Defect affecting checkout, payments, orders, authentication, data integrity, or any critical user-visible flow. All P0 and P1 bugs. Any bug requiring regression testing or QA sign-off. | P0, P1, P2 |
| `BUG_MINOR_TEMPLATE.md` | Cosmetic, copy, layout, or low-impact visual issue that does not affect user flow, data, or critical functionality. One-line or small fix. | P3, P4 |

**Hard rule:** When in doubt, use `BUG_OBJECT_TEMPLATE.md`. Downgrade to minor only when you are certain the bug has no flow, data, or experience impact.

---

## 6. REQUEST (Full) vs REQUEST_QUICK

**Rule:** Use `REQUEST_OBJECT_TEMPLATE.md` for anything that needs triage. Use `REQUEST_QUICK_TEMPLATE.md` only for pre-triaged, obviously small requests.

| Template | When to Use |
|---|---|
| `REQUEST_OBJECT_TEMPLATE.md` | Any request that needs formal triage, classification, feasibility check, or cross-module review. Any request that may become a feature or has a client commitment. |
| `REQUEST_QUICK_TEMPLATE.md` | A request you already know is small, in-scope, and resolves in ≤3 stories with no schema change. Written by someone who already has the product context to triage it themselves. |

**Default:** Use the full template unless you are confident the request is small. The cost of over-documenting a small request is low. The cost of under-documenting a large request is high.

---

## 7. SCOPE_CHANGE vs CHANGE_NOTE vs CHANGE_NOTE_LITE

**Rule:** Match the governance weight to the magnitude of the change.

| Template | When to Use |
|---|---|
| `SCOPE_CHANGE_TEMPLATE.md` | A material change that affects feature scope, timeline, budget, or requires stakeholder re-approval. This is a formal governance artifact. |
| `CHANGE_NOTE_TEMPLATE.md` | A meaningful midstream design or direction change that needs to be recorded but does not require stakeholder re-approval. |
| `CHANGE_NOTE_LITE_TEMPLATE.md` | A tiny note — a small decision made during delivery that should be captured for traceability but has no broader impact. |

---

## 8. DESIGN vs DESIGN_BRIEF vs FIGMA_LINK vs FIGMA_HANDOFF

**Rule:** These four cover different stages of the design lifecycle.

| Template | What it documents | Stage |
|---|---|---|
| `DESIGN_BRIEF_TEMPLATE.md` | The problem, goals, constraints, and initial direction for a design effort. Created before design starts. | Planning |
| `DESIGN_OBJECT_TEMPLATE.md` | The design artifact record — links to the Figma file, captures decisions, approvals, and screen coverage. | Design phase |
| `FIGMA_LINK_TEMPLATE.md` | A simple reference to a Figma file or frame. No approval tracking, no decisions. Pure link management. | Anytime |
| `FIGMA_HANDOFF_TEMPLATE.md` | The handoff package from designer to engineer — includes component specs, behaviour notes, and dev-ready annotations. | Pre-development |

---

## 9. QA_RUN vs QA_SMOKE_TEST vs UAT_RUN

**Rule:** Different testing phases, different owners.

| Template | What it documents | Owner | When |
|---|---|---|---|
| `QA_RUN_OBJECT_TEMPLATE.md` | Full QA test run covering all test cases, edge cases, and regression for a feature. | QA Lead | During development, before release |
| `QA_SMOKE_TEST_TEMPLATE.md` | A quick sanity check after a hotfix or small release covering core flows only. | Engineer or QA | Post-hotfix, post-deployment |
| `UAT_RUN_OBJECT_TEMPLATE.md` | User acceptance test run by the Product Owner or stakeholder. Formal sign-off. | Product Owner | After QA pass, before release |

---

## 10. RELEASE (Full) vs RELEASE_HOTFIX

**Rule:** Planned vs unplanned.

| Template | When to Use |
|---|---|
| `RELEASE_OBJECT_TEMPLATE.md` | Any release that was planned, scheduled, and went through the normal QA/UAT/approval process. Includes simple releases. |
| `RELEASE_HOTFIX_TEMPLATE.md` | An emergency fix deployed outside the normal release cycle, triggered by a production incident or P0/P1 bug. Requires explicit Engineering Lead and Product Lead sign-off. |

**Hard rule:** A hotfix that was first triaged, then planned, then released in a future sprint is a normal release, not a hotfix. Use `RELEASE_OBJECT_TEMPLATE.md`.

---

## Related

- Template registry: `product/os/templates/TEMPLATE_REGISTRY.md`
- Object map: `product/indexes/TEMPLATE_OBJECT_MAP.md`
- Work type lanes: `product/os/policies/WORK_TYPE_LANES.md`

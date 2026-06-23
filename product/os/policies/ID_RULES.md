# Nuemart Product OS — ID Rules

| Field | Value |
|---|---|
| Version | 2.0 |
| Date | 2026-06-22 |
| Status | Active |
| Owner | Product Owner |
| Enforced by | All Product OS AI Agents |

---

## Migration Note

Version 2.0 supersedes `product/99-operating-system/governance/ID_GENERATION_RULES.md`.

Legacy numeric IDs (REQ-0001, PRD-0001, US-0009, QA-0001, UAT-0001, etc.) created under the previous operating system are preserved as `legacy_id` in object YAML frontmatter. They are NOT deleted, NOT replaced, and NOT invalidated. All legacy IDs remain valid references.

New objects created after 2026-06-22 must use semantic IDs per the rules in this document and per `NOMENCLATURE_AND_ID_SYSTEM.md`.

---

## Core ID Rules

### Rule 1 — New Objects Must Use Semantic IDs

New product objects created after the adoption of this operating system must use semantic IDs per the structure defined in `NOMENCLATURE_AND_ID_SYSTEM.md`.

**Semantic ID structure:**
```
<OBJECT_TYPE>-<PRODUCT_AREA>-<MODULE_OR_SUBMODULE>-<FEATURE_OR_SCOPE_SLUG>-<SEQUENCE_OR_VERSION>
```

Example: `FEATURE-COM-PLP-CAROUSEL` or `PRD-COM-PLP-CAROUSEL-V1`

---

### Rule 2 — Generic Numeric-Only IDs Must Not Be Created for New Objects

The following ID patterns are **prohibited for new objects**:

- `REQ-0003`, `REQ-0004`, etc. (sequential numeric-only request IDs)
- `PRD-0003`, `PRD-0004`, etc. (sequential numeric-only PRD IDs)
- `US-0015`, `US-0016`, etc. (sequential numeric-only story IDs)
- `QA-0002`, `QA-0003`, etc. (sequential numeric-only QA IDs)

These patterns were used in the legacy operating system. They are no longer valid for new objects.

**Why:** Numeric-only IDs are not human-readable, do not carry semantic meaning, and cannot be understood without looking them up. An ID like `STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002` is immediately understandable; `US-0010` is not.

---

### Rule 3 — Existing Numeric IDs Are Preserved as legacy_id

Objects that were created under the legacy system and have numeric IDs retain those IDs as the `legacy_id` field in their YAML frontmatter. The semantic ID becomes the primary `object_id`.

**Example frontmatter:**

```yaml
---
object_id: PRD-COM-PLP-CAROUSEL-V1
legacy_id: PRD-0002
object_type: PRD
canonical_name: PRD-COM-PLP-CAROUSEL-V1
display_name: Promotional Banner Carousel — Product Listing Page PRD V1
status: Approved
---
```

When referencing an object that has a legacy ID, both the semantic ID and the legacy ID are valid references. AI agents must resolve either to the same object.

---

### Rule 4 — Object IDs Must Be Stable After Creation

Once an object is created with an `object_id`, that ID must not change.

**The ID is stable; the name is not.** The `display_name` of an object may change as understanding of the feature evolves. The `object_id` must not change.

**The only exception:** If the original ID was materially wrong (wrong module, wrong feature scope, wrong object type), a new ID may be assigned. When this happens:
1. Create a new object file with the correct ID
2. Add `supersedes: <old_id>` to the new file
3. Add `superseded_by: <new_id>` to the old file
4. Update OBJECT_INDEX.md with both entries
5. Create a Decision Object documenting the ID correction

---

### Rule 5 — Display Names May Change; object_id Must Not Change

`canonical_name` and `display_name` are metadata fields for human readability. They may be updated as the feature is refined, renamed, or better understood.

`object_id` is the permanent identifier. It is referenced by other objects, stored in relationship graphs, and used in traceability chains. It must never change after creation.

---

### Rule 6 — All IDs Must Be UPPERCASE

All segments of a semantic ID must be in UPPERCASE.

- Correct: `FEATURE-COM-PLP-CAROUSEL`
- Incorrect: `feature-com-plp-carousel`, `Feature-COM-PLP-Carousel`

---

### Rule 7 — Use Hyphens Between ID Segments

Segments within an ID are separated by hyphens (`-`). No underscores, no dots, no spaces.

- Correct: `STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002`
- Incorrect: `STORY_COM_PLP_CAROUSEL_AUTOSCROLL_002`, `STORY.COM.PLP.CAROUSEL.AUTOSCROLL.002`

---

### Rule 8 — Use Short But Understandable Slugs

The feature or scope slug segment should be short and descriptive. It does not need to be the full feature name.

**Good slugs:**
- `CAROUSEL` (not `PROMOTIONAL-BANNER-IMAGE-CAROUSEL-AT-TOP-OF-PAGE`)
- `AUTO-SCROLL` (not `AUTOMATIC-SCROLLING-BEHAVIOUR-FOR-CAROUSEL-COMPONENT`)
- `ORDER-TRACKING` (not `REAL-TIME-ORDER-TRACKING-FEATURE-FOR-CUSTOMERS`)
- `STOCK-ALERT` (not `LOW-STOCK-ALERT-NOTIFICATION-SYSTEM`)

**Slug length guideline:** 1–3 words. If you need more than 3 words to describe the feature slug, the slug is too specific. Move specificity into the `display_name`.

---

### Rule 9 — Avoid Spaces, Special Characters, and Vague Words

ID segments must not contain:
- Spaces
- Special characters (`!`, `@`, `#`, `$`, `%`, `&`, `*`, `.`, `,`, `/`)
- Vague words that carry no meaning:
  - `NEW` — everything was new at some point
  - `UPDATE` — this is not descriptive
  - `MISC` — means nothing
  - `GENERAL` — too broad
  - `CHANGE` — not a scope descriptor
  - `THING` — not a product concept

If you find yourself using a vague word, stop and ask: what is the actual capability or concept? Use that instead.

---

### Rule 10 — Avoid Overly Long IDs

IDs should have a maximum of approximately 6 meaningful segments.

**Acceptable:**
```
STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002
```
(6 segments: STORY / COM / PLP / CAROUSEL / AUTOSCROLL / 002)

**Too long:**
```
STORY-COM-PLP-PROMOTIONAL-BANNER-CAROUSEL-AUTO-SCROLL-BEHAVIOUR-002
```

If an ID is getting too long, shorten the slug. If the module/submodule are the same, the slug can be shorter because context is already provided by the module segment.

---

### Rule 11 — Every Object Must Include Both canonical_name and display_name

Every Product Object file must include both fields in its YAML frontmatter:

- `canonical_name` — the `object_id` restated as a string (used for programmatic matching)
- `display_name` — a human-readable title of the object

```yaml
object_id: FEATURE-COM-PLP-CAROUSEL
canonical_name: FEATURE-COM-PLP-CAROUSEL
display_name: Promotional Banner Carousel — Product Listing Page
```

The `display_name` should be clear enough for a new team member to understand what the object represents without having to read the whole file.

---

### Rule 12 — Versions Use V1, V2, V3 Format

Version segments in IDs use uppercase V followed by the version number.

- Correct: `PRD-COM-PLP-CAROUSEL-V1`, `PRD-COM-PLP-CAROUSEL-V2`
- Incorrect: `PRD-COM-PLP-CAROUSEL-1.0`, `PRD-COM-PLP-CAROUSEL-v1`, `PRD-COM-PLP-CAROUSEL-VERSION-1`

Version numbers increment on major revisions (a V2 PRD represents a significantly revised specification, not a minor edit). Minor edits are tracked in the object's `audit_log` field, not by creating a new version ID.

---

### Rule 13 — Releases May Include Date-Based Identifiers

Release objects may include a month-based date segment in the format `YYYY-MM`.

```
RELEASE-COM-PLP-CAROUSEL-2026-06
RELEASE-DEL-CORE-DELIVERY-MVP-2025-11
```

This makes it easy to locate releases by period without having to look up a sequence number.

---

### Rule 14 — Use NEEDS-CLASSIFICATION for Unresolved Segments

If a segment of the ID cannot be determined at the time of object creation (e.g., the module has not yet been classified), use `NEEDS-CLASSIFICATION` as a temporary placeholder.

```
FEATURE-COM-NEEDS-CLASSIFICATION-AUTOSCROLL
```

**Resolution:** The NEEDS-CLASSIFICATION segment must be resolved at the next classification step (G1 gate). An object may not pass G2 with an unresolved NEEDS-CLASSIFICATION ID segment.

---

## ID Validation Rules

Before creating any new Product Object, the AI must validate the proposed ID against the following rules:

1. **No reserved words** — The ID must not contain: NEEDS-CLASSIFICATION (after classification), NEW, UPDATE, MISC, GENERAL, CHANGE, THING
2. **No duplicates** — The ID must not already exist in `product/os/indexes/OBJECT_INDEX.md`
3. **Correct prefix** — The object type prefix must match the actual object type being created
4. **Correct product area code** — The product area code must be one of the defined codes in `NOMENCLATURE_AND_ID_SYSTEM.md`
5. **Correct module code** — The module code must be one of the defined codes in `NOMENCLATURE_AND_ID_SYSTEM.md`
6. **UPPERCASE throughout** — All segments must be uppercase
7. **Hyphens only** — No underscores, spaces, or other separators
8. **Length check** — No more than ~6 meaningful segments

If any validation fails, the AI must not create the object and must present the validation error to the Product Owner.

---

## Legacy ID Compatibility

### How to Handle Objects with Only Legacy IDs

Some objects created during the pre-OS era (Phase 1 through Phase 11) may have only a legacy numeric ID and no semantic ID. When working with these objects:

1. **Do not rename or delete the legacy ID.** It may be referenced in code, commits, changelogs, and external documents.
2. **Add a `semantic_id` field** to the object's YAML frontmatter with the new semantic ID.
3. **Update `canonical_name`** to the semantic ID.
4. **Create a mapping entry** in `MIGRATION_FROM_LEGACY_PRODUCT_OS.md` mapping old ID → new ID.
5. **Update `OBJECT_INDEX.md`** to include the semantic ID entry pointing to the same file.

**Example migration:**

Before:
```yaml
---
id: REQ-0002
title: Promotional Banner Carousel
---
```

After:
```yaml
---
object_id: REQUEST-COM-PLP-CAROUSEL-001
legacy_id: REQ-0002
canonical_name: REQUEST-COM-PLP-CAROUSEL-001
display_name: Promotional Banner Carousel — Product Listing Page Request
semantic_id: REQUEST-COM-PLP-CAROUSEL-001
---
```

---

## Screen ID Rules (Grandfathered from SCREEN_ID_RULES.md)

Screen IDs follow the legacy format established in the original operating system. These IDs are **grandfathered** — existing screen IDs remain valid and must not be changed.

**Legacy screen ID format (still valid):**
- Customer screens: `SCR-CUS-XXXX` (e.g., `SCR-CUS-0001` = Product Listing Page)
- Admin screens: `SCR-ADM-XXXX` (e.g., `SCR-ADM-0001` = Admin Dashboard)
- Delivery screens: `SCR-DEL-XXXX`

**New screens created after 2026-06-22** may use the semantic format:
```
SCREEN-COM-PLP-MAIN
SCREEN-ADM-DASHBOARD-MAIN
```

Or continue using the legacy format — both are valid. The team will standardise screen IDs in a future governance update.

**Existing screen ID registry:** Maintained in `product/00-product-foundation/MASTER_REGISTRY.md`.

---

## MASTER_REGISTRY.md Role

`product/00-product-foundation/MASTER_REGISTRY.md` continues to serve two purposes:

1. **Backward compatibility:** Tracks the next numeric ID for legacy ID formats (REQ-XXXX, PRD-XXXX, US-XXXX, QA-XXXX, UAT-XXXX) so that if a legacy-format ID is ever needed for compatibility purposes, it can be correctly assigned without collision.

2. **Screen ID registry:** Maintains the master list of all screen IDs (both legacy and any new screens added).

**Primary index for new semantic IDs:** `product/os/indexes/OBJECT_INDEX.md` is the canonical index for all semantic IDs. AI agents must check OBJECT_INDEX.md for duplicate detection, not just MASTER_REGISTRY.md.

---

## Cross-References

| Document | Location | Relationship |
|---|---|---|
| NOMENCLATURE_AND_ID_SYSTEM.md | `product/os/policies/` | Full ID structure and naming system |
| OBJECT_INDEX.md | `product/os/indexes/` | Primary index for semantic IDs |
| MASTER_REGISTRY.md | `product/00-product-foundation/` | Legacy numeric ID registry, screen IDs |
| MIGRATION_FROM_LEGACY_PRODUCT_OS.md | `product/os/` | Old→new ID mapping table |
| FEATURE_MASTER.md | `product/graph/` | Feature graph (uses semantic IDs) |
| GOVERNANCE_POLICIES.md | `product/os/policies/` | P001, P003 reference these rules |

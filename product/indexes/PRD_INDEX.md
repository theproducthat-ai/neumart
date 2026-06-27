# PRD Index

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when PRDs are created or change status

---

## PRD Register

| ID | Title | Feature | Status | Author | Last Updated |
|---|---|---|---|---|---|
| PRD-COM-PLP-CAROUSEL-V1 | Promotional Banner Carousel PRD | FEATURE-COM-PLP-CAROUSEL | draft | AI (Product OS V2) | 2026-06-22 |
| [PRD-COM-CART-COUPON-V1](../objects/prds/PRD-COM-CART-COUPON-V1.md) | Discount Coupon System PRD | FEATURE-COM-CART-COUPON | approved | AI (Product OS V2) | 2026-06-25 |

_Note: Run `tools/generate-indexes.js` to populate this index from PRD frontmatter._

---

## PRD Status Definitions

| Status | Meaning |
|---|---|
| `draft` | Being authored, not yet in review |
| `in-review` | Circulated for stakeholder feedback |
| `approved` | Product Lead and Engineering Lead have approved |
| `active` | Feature is in development against this PRD |
| `delivered` | Feature has shipped |
| `superseded` | Replaced by a newer PRD |
| `archived` | Feature cancelled or not proceeding |

---

## When a PRD Is Required

A PRD is required for:
- Standard Feature (new customer-facing functionality)
- Strategic Initiative
- Any feature with more than one user story

A PRD is NOT required for:
- Fast Fix
- Small Enhancement (less than 3 stories)
- Bug fix
- Tech debt

See `product/os/policies/WORK_TYPE_LANES.md` for full artifact requirements by lane.

---

## PRD Quality Checklist

Before a PRD is marked approved:
- [ ] Problem statement clearly defined
- [ ] User jobs-to-be-done articulated
- [ ] Out-of-scope explicitly listed
- [ ] Success metrics defined and linked to METRIC_DICTIONARY.md
- [ ] Acceptance criteria complete for all user stories
- [ ] Engineering Lead has reviewed and confirmed feasibility
- [ ] Design brief attached or design not required explicitly stated

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- `product/objects/prds/`
- `product/os/templates/PRD_OBJECT_TEMPLATE.md` _(if exists)_

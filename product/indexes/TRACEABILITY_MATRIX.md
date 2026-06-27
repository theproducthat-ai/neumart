# Traceability Matrix

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when features are planned, built, or released

---

## Purpose

Maps requirements (requests/OKRs) → features → user stories → releases. Enables forward traceability ("is this requirement implemented?") and backward traceability ("which requirement drove this code?").

---

## Traceability Table

| Request | Feature | User Stories | Release | Status |
|---|---|---|---|---|
| REQ-0001 | _(see feature linked in REQ object)_ | _(see stories in feature object)_ | _(see release in feature object)_ | — |
| REQ-0002 | — | — | — | — |
| REQ-0003 | — | — | — | — |
| REQ-0004 | — | — | — | — |
| REQ-0005 | — | — | — | — |
| REQ-0006 | — | — | — | — |
| REQ-0007 | — | — | — | — |
| REQUEST-COM-PLP-CARD-LAYOUT-001 (REQ-0009) | DISCOVERY-COM-PLP-CARD-LAYOUT-001 | — | — | Grilled |
| REQUEST-COM-CART-COUPON-001 (REQ-0010) | FEATURE-COM-CART-COUPON | US-0024 through US-0035 (12 stories) | — | Dev Complete — QA Ready for Execution — DEVPLAN-COM-CART-COUPON-001 · QA-COM-CART-COUPON-001 |
| REQ-0008 | — | — | — | — |

_Populate by reading REQ frontmatter for `linked_feature`, then reading FEAT frontmatter for `user_stories` and `release`._

---

## OKR → Feature Traceability

| OKR | Initiative | Features | Status |
|---|---|---|---|
| _(populate from OKR objects)_ | — | — | — |

---

## Coverage Check

For full traceability:
- Every REQ that is `approved` or `in-progress` should have a linked FEAT
- Every FEAT that is `in-development` or later should have user stories
- Every released FEAT should have a linked REL

Gaps indicate an incomplete object — run `tools/check-required-fields.js` to surface them.

---

## How to Maintain This

1. When a feature is created: add REQ → FEAT row
2. When stories are created: add FEAT → US rows
3. When stories are released: add REL reference
4. Run `tools/generate-indexes.js` to auto-populate from frontmatter

---

## Related Documents

- [MASTER_OBJECT_INDEX.md](MASTER_OBJECT_INDEX.md)
- [REQUEST_INDEX.md](REQUEST_INDEX.md)
- [FEATURE_INDEX.md](FEATURE_INDEX.md)
- [USER_STORY_INDEX.md](USER_STORY_INDEX.md)
- [RELEASE_INDEX.md](RELEASE_INDEX.md)

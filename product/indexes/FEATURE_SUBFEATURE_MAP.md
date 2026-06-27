# Feature → Sub-feature Map

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Update when features or sub-features are created or changed

---

## Purpose

Maps parent features to their child sub-features. Use this to answer:
- "What are all the parts of the Checkout feature?"
- "Which sub-features make up the Product Listing experience?"
- "Is the carousel banner a sub-feature of the PLP feature?"

---

## What Is a Sub-feature?

A sub-feature is a discrete, nameable behaviour within a parent feature. Sub-features:
- Have their own ID (`SUBFEATURE-[MODULE]-[AREA]-[PARENT_SLUG]-[NAME]`)
- Share the parent feature's module and module area
- May be developed and released independently
- Have their own user stories

Sub-features are stored in `product/objects/features/` (same folder as features) with `object_type: SubFeature` and a `parent_feature` link.

---

## Hierarchy Example

```
FEAT-COM-PLP-001 (Product Listing)
  ├── SUBFEATURE-COM-PLP-CAROUSEL (Promotional Banner Carousel)
  │     ├── US-0001 (auto-scroll behaviour)
  │     └── US-0002 (tap to navigate)
  └── SUBFEATURE-COM-PLP-SORT (Sort Options)
        └── US-0050 (price and newest sort)
```

---

## Feature → Sub-feature Register

| Feature ID | Feature Name | Sub-feature ID | Sub-feature Name | Status |
|---|---|---|---|---|
| _(populate from feature objects with parent_feature set)_ | — | — | — | — |

---

## How to Maintain

When creating a sub-feature object:
1. Set `parent_feature: FEAT-XXX` in the sub-feature frontmatter
2. Add the sub-feature ID to `child_features: []` in the parent feature's frontmatter
3. Add a row to this map

---

## Related Documents

- [MODULE_FEATURE_MAP.md](MODULE_FEATURE_MAP.md)
- [FEATURE_INDEX.md](FEATURE_INDEX.md)
- `product/objects/features/`
- `product/os/templates/SUBFEATURE_OBJECT_TEMPLATE.md`

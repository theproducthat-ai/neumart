# Capability Objects

**Object type**: `capability`  
**ID Format**: `CAP-XXXX` (sequential, e.g., `CAP-0001`)  
**Owner**: Product Lead  
**Template**: `product/os/templates/CAPABILITY_OBJECT_TEMPLATE.md`

---

## What Is a Capability?

A Capability is a named functional ability the product has (or needs). It sits between Module Area and Feature in the hierarchy.

A capability describes **what the system can do** — not how it is built.

Examples:
- `CAP-0001` — Customers can search for products by name
- `CAP-0002` — Customers can filter products by category and price
- `CAP-0003` — Customers can apply a coupon code at checkout

---

## Position in the Hierarchy

```
Module Area  (e.g., Product Listing)
  └── Capability  ← this folder  (e.g., Search Products)
        └── Feature  (e.g., Search bar with autocomplete)
              └── Sub-feature  (e.g., Search history)
```

---

## Relationship to Features

One capability may be delivered through multiple features over time:
- `CAP-0001` (Search Products) was initially delivered as basic text search (FEAT-COM-PLP-001)
- Later enhanced with autocomplete (FEAT-COM-PLP-005)
- Both features deliver the same capability, at increasing maturity levels

---

## Maturity Levels

| Level | Description |
|---|---|
| `none` | Capability does not exist |
| `basic` | Minimal viable implementation |
| `functional` | Meets most user needs |
| `advanced` | Exceeds typical expectations |
| `market-leading` | Best-in-class |

---

## File Format

`CAP-XXXX.md` (e.g., `CAP-0001.md`)

---

## Related

- `product/objects/modules/` — Parent modules
- `product/objects/module-areas/` — Parent module areas
- `product/indexes/MODULE_FEATURE_MAP.md` — Capability → Feature mapping

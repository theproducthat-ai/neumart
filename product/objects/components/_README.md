# Component Objects

**Object type**: `component`  
**ID Format**: `CMP-XXXX` (sequential, e.g., `CMP-0001`)  
**Owner**: Engineering Lead / Designer  
**Template**: `product/os/templates/COMPONENT_OBJECT_TEMPLATE.md`

---

## What Is a Component?

A Component is a reusable UI or system building block that is shared across multiple screens or features. Components are the lowest layer in the hierarchy — they are not deliverables themselves, but they are referenced by features to indicate shared UI implementation.

---

## Position in the Hierarchy

```
Feature / Sub-feature
  └── Component  ← this folder  (shared building blocks used by features)
```

Components are cross-cutting — they can be used by features in any module.

---

## Atomic Design Types

| Type | Description | Examples |
|---|---|---|
| `atom` | Single-purpose UI element | Button, Badge, Input, Icon |
| `molecule` | Composed of atoms | SearchBar (input + button), PriceTag (amount + currency) |
| `organism` | Complex UI section | ProductCard, OrderCard, CartItem |
| `template` | Full-screen layout template | ProductListingLayout, CheckoutLayout |
| `system` | Non-UI system component | Analytics tracker, Error boundary, Auth guard |

---

## When to Create a Component Object

Only create a component object when the component:
- Is used in **3 or more screens**, OR
- Has its own Figma design system entry, OR
- Has complex logic that engineers need to understand before using it

Do not create component objects for trivial elements like a styled `<div>`.

---

## File Format

`CMP-XXXX.md` (e.g., `CMP-0001.md`)

---

## Related

- `product/objects/features/` — Features that use this component
- `product/os/templates/COMPONENT_OBJECT_TEMPLATE.md`

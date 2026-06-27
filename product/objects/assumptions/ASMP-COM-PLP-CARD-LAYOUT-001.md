---
id: ASMP-COM-PLP-CARD-LAYOUT-001
object_type: Assumption
title: "Responsive breakpoint for h-36 is md: (≥768px) in Tailwind"
status: open
priority: low
module_id: MOD-COM
linked_request: REQUEST-COM-PLP-CARD-LAYOUT-001
linked_risks: []
linked_decisions: []
owner: Product Owner
created_by: AI
created_date: 2026-06-25
updated_date: 2026-06-25
version: "1.0"
schema_version: "2.0"
template_version: "1.0"
---

# Assumption Object

**Template status:** Active
**Schema version:** 2.0

---

## Core Fields

| Field | Value |
|---|---|
| Assumption ID | ASMP-COM-PLP-CARD-LAYOUT-001 |
| Title | Responsive breakpoint for h-36 is md: (≥768px) in Tailwind |
| Category | technical |
| Status | open |
| Confidence | High |
| Impact if Wrong | low |

## Statement

> **We assume that** the larger-screen image height target (`h-36`) should apply at the Tailwind `md:` breakpoint (≥768px), meaning the class syntax would be `h-32 md:h-36` on the image wrapper.

## Why We Are Making This Assumption

The product owner specified h-32 for mobile and h-36 for larger screens but did not specify which responsive breakpoint (`sm:`, `md:`, `lg:`) to use. The `md:` breakpoint (≥768px) is the standard Tailwind breakpoint for tablet/desktop transitions in the Nuemart codebase and is the most common choice for product grid layout shifts.

## What We Would Need to Validate It

Developer confirms which breakpoint is already used in the product card and product grid components. If a different breakpoint is already established for layout changes (e.g., `sm:` or `lg:`), use that instead.

## Validation Plan

```
validation_method:  code review (developer checks existing breakpoint usage in product-card.tsx)
validation_owner:   Developer
validation_by:      Before implementation starts
validation_status:  not-started
```

## Outcome

```
result:             TBD
validated_by:       —
validated_date:     —
outcome_note:       If wrong, developer adjusts to the correct breakpoint — low-risk change
```

## Impact on Feature / PRD

Low impact. If the breakpoint is wrong, the developer adjusts the class (e.g., `h-32 sm:h-36`) — no design or functional change. The visual target (tighter image on mobile, slightly larger on desktop) is unchanged.

## Linked Objects

```
linked_request:  REQUEST-COM-PLP-CARD-LAYOUT-001
linked_discovery: DISCOVERY-COM-PLP-CARD-LAYOUT-001
linked_risks:    []
linked_decisions: []
```

## Audit

```
created_by:    AI
created_date:  2026-06-25
updated_date:  2026-06-25
```

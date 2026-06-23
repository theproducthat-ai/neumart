# Nuemart Product OS — Relationship Index

**Version:** 1.0 | **Date:** 2026-06-22 | **Status:** Active

---

## Introduction

This file indexes all known relationships between Product Objects. See `product/graph/RELATIONSHIP_TYPES.md` for relationship definitions. Individual object files are the source of truth for their own relationships; this index exists for fast traversal and graph queries without reading every object file.

---

## Relationship Format

```
SOURCE_ID --[relationship_type]--> TARGET_ID
```

**Available relationship types:**

| Type | Meaning |
|---|---|
| `creates` | A Request creates a Feature |
| `specified_by` | A Feature or Request is specified by a PRD |
| `belongs_to` | A Feature belongs to a Module |
| `has_screen` | A Feature has/affects a Screen |
| `implemented_by` | A Feature is implemented by a Story |
| `tested_by` | A Feature or Story is tested by a QA Run |
| `validated_by` | A Feature is validated by a UAT Run |
| `depends_on` | A Feature or Module depends on another Feature or Module |
| `uses_entity` | A Feature uses a Data Entity |
| `gates` | An object must be complete before another can proceed |
| `released_in` | A Feature is released in a Release object |

---

## Current Known Relationships

### Carousel Feature Chain

```
REQUEST-COM-PLP-CAROUSEL-001 --[creates]--> FEATURE-COM-PLP-CAROUSEL
REQUEST-COM-PLP-CAROUSEL-001 --[specified_by]--> PRD-COM-PLP-CAROUSEL-V1

FEATURE-COM-PLP-CAROUSEL --[belongs_to]--> MODULE-COM
FEATURE-COM-PLP-CAROUSEL --[has_screen]--> SCR-CUS-0001
FEATURE-COM-PLP-CAROUSEL --[specified_by]--> PRD-COM-PLP-CAROUSEL-V1
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-RENDER-001
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-AUTOSCROLL-002
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-NAV-003
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-MOBILE-004
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-SWIPE-005
FEATURE-COM-PLP-CAROUSEL --[implemented_by]--> STORY-COM-PLP-CAROUSEL-CLICK-006
FEATURE-COM-PLP-CAROUSEL --[tested_by]--> QA-COM-PLP-CAROUSEL-RUN-001
FEATURE-COM-PLP-CAROUSEL --[validated_by]--> UAT-COM-PLP-CAROUSEL-RUN-001

PRD-COM-PLP-CAROUSEL-V1 --[specified_by]--> REQUEST-COM-PLP-CAROUSEL-001
QA-COM-PLP-CAROUSEL-RUN-001 --[gates]--> UAT-COM-PLP-CAROUSEL-RUN-001
```

### Delivery Feature Chain

```
REQUEST-DEL-CORE-DELIVERY-MVP-001 --[creates]--> FEATURE-DEL-CORE-DELIVERY-MVP
REQUEST-DEL-CORE-DELIVERY-MVP-001 --[specified_by]--> PRD-DEL-CORE-DELIVERY-MVP-V1

FEATURE-DEL-CORE-DELIVERY-MVP --[belongs_to]--> MODULE-DEL
FEATURE-DEL-CORE-DELIVERY-MVP --[specified_by]--> PRD-DEL-CORE-DELIVERY-MVP-V1
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-SCHEMA-001
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-BACKEND-002
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-003
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-004
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-005
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-006
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-007
FEATURE-DEL-CORE-DELIVERY-MVP --[implemented_by]--> STORY-DEL-CORE-DELIVERY-008
FEATURE-DEL-CORE-DELIVERY-MVP --[uses_entity]--> deliveryTasks
FEATURE-DEL-CORE-DELIVERY-MVP --[depends_on]--> MODULE-COM
FEATURE-DEL-CORE-DELIVERY-MVP --[depends_on]--> MODULE-ADM

PRD-DEL-CORE-DELIVERY-MVP-V1 --[specified_by]--> REQUEST-DEL-CORE-DELIVERY-MVP-001
```

### Module Dependencies

```
MODULE-COM --[depends_on]--> MODULE-USR
MODULE-COM --[depends_on]--> MODULE-INV
MODULE-COM --[depends_on]--> MODULE-PAY
MODULE-ADM --[depends_on]--> MODULE-USR
MODULE-ADM --[depends_on]--> MODULE-INV
MODULE-ADM --[depends_on]--> MODULE-RPT
MODULE-ADM --[depends_on]--> MODULE-PAY
MODULE-INV --[depends_on]--> MODULE-COM
MODULE-INV --[depends_on]--> MODULE-ADM
MODULE-PAY --[depends_on]--> MODULE-USR
MODULE-PAY --[depends_on]--> MODULE-COM
MODULE-PAY --[depends_on]--> MODULE-INV
MODULE-RPT --[depends_on]--> MODULE-COM
MODULE-RPT --[depends_on]--> MODULE-INV
MODULE-RPT --[depends_on]--> MODULE-PAY
MODULE-DEL --[depends_on]--> MODULE-COM
MODULE-DEL --[depends_on]--> MODULE-USR
MODULE-DEL --[depends_on]--> MODULE-ADM
MODULE-DEL --[depends_on]--> MODULE-RPT
```

### Screen Relationships

```
SCR-CUS-0001 --[belongs_to]--> MODULE-COM
SCR-CUS-0002 --[belongs_to]--> MODULE-COM
SCR-CUS-0003 --[belongs_to]--> MODULE-COM
SCR-CUS-0004 --[belongs_to]--> MODULE-COM
SCR-CUS-0005 --[belongs_to]--> MODULE-USR
SCR-CUS-0006 --[belongs_to]--> MODULE-USR
SCR-CUS-0007 --[belongs_to]--> MODULE-USR
SCR-CUS-0008 --[belongs_to]--> MODULE-COM
SCR-CUS-0009 --[belongs_to]--> MODULE-COM
SCR-CUS-0010 --[belongs_to]--> MODULE-COM
SCR-ADM-0001 --[belongs_to]--> MODULE-ADM
SCR-ADM-0002 --[belongs_to]--> MODULE-ADM
SCR-ADM-0003 --[belongs_to]--> MODULE-ADM
SCR-ADM-0004 --[belongs_to]--> MODULE-ADM
SCR-ADM-0005 --[belongs_to]--> MODULE-ADM
SCR-ADM-0006 --[belongs_to]--> MODULE-ADM
SCR-ADM-0007 --[belongs_to]--> MODULE-ADM
SCR-ADM-0008 --[belongs_to]--> MODULE-ADM
SCR-ADM-0009 --[belongs_to]--> MODULE-ADM
SCR-ADM-0010 --[belongs_to]--> MODULE-ADM
SCR-ADM-0010 --[belongs_to]--> MODULE-INV
SCR-ADM-0011 --[belongs_to]--> MODULE-ADM
SCR-ADM-0011 --[belongs_to]--> MODULE-INV
SCR-AUTH-0001 --[belongs_to]--> MODULE-USR
SCR-AUTH-0002 --[belongs_to]--> MODULE-USR
```

---

## Relationship Counts

| Relationship Type | Count | Notes |
|---|---|---|
| `creates` | 2 | One per Request |
| `specified_by` | 4 | 2 Features + 2 PRDs back-linking to Requests |
| `belongs_to` | 31 | 2 Features + 6 Module deps (module-level) + 23 Screens |
| `has_screen` | 1 | Carousel on SCR-CUS-0001 |
| `implemented_by` | 14 | 6 Carousel stories + 8 Delivery stories |
| `tested_by` | 1 | Carousel QA run |
| `validated_by` | 1 | Carousel UAT run |
| `gates` | 1 | QA gates UAT for Carousel |
| `depends_on` | 19 | Module dependency edges |
| `uses_entity` | 1 | Delivery uses deliveryTasks |
| **Total** | **74** | |

---

## Missing Relationships (Gap Flags)

| Gap | Description | Action |
|---|---|---|
| EVAL-0001 not linked | Delivery Evaluation (EVAL-0001) should link to REQUEST-DEL-CORE-DELIVERY-MVP-001 | Add when EVAL object is created in objects/ |
| IMPACT-0001 not linked | Delivery Impact Assessment should link to FEATURE-DEL-CORE-DELIVERY-MVP | Add when IMPACT object is created |
| GRILLING-0001 not linked | Delivery Grilling session should link to REQUEST-DEL-CORE-DELIVERY-MVP-001 | Add when GRILLING object is created |
| DEVPLAN-0001 not linked | Delivery Dev Plan should link to PRD-DEL-CORE-DELIVERY-MVP-V1 | Add when DEVPLAN object is created |
| DEVPLAN-0002 not linked | Carousel Dev Plan should link to PRD-COM-PLP-CAROUSEL-V1 | Add when DEVPLAN object is created |
| Release object missing | RELEASE-COM-PLP-CAROUSEL-2026-06 not yet created | Create when UAT sign-off obtained |
| Delivery QA not linked | No QA run exists for Delivery (expected after dev is complete) | Add when QA is run |
| Delivery UAT not linked | No UAT run exists for Delivery | Add when UAT is run |
| DECISION-* not linked | DEC-001–DEC-014 not yet indexed as DECISION-* objects | Add during decision migration |

---

*Last updated: 2026-06-22*

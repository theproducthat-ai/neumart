# Nuemart Product OS — Enterprise Domain Model

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/DOMAIN_MODEL.md`

---

## Overview

The Nuemart Product OS organises all knowledge about the product into **11 domains**. Each domain models a distinct layer of product reality — from strategy and goals at the top, down through architecture, delivery, and release, with intelligence and governance threading through all layers.

This document defines:
1. Each domain's purpose and primary object types
2. How domains relate to each other
3. How a new request flows across domains
4. How traceability connects Strategy to Release
5. The Nuemart-specific domain instance

---

## Conceptual Domain Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GOVERNANCE (GOV)                                   │
│  Policies · Gates · Decisions · Rules — cross-cuts ALL domains              │
├─────────────────────────────────────────────────────────────────────────────┤
│                         INTELLIGENCE (AI_DOM)                               │
│  Agents · Reasoning Traces · Recommendations — enhances ALL domains         │
├──────────────────┬──────────────────────────────────────────────────────────┤
│  STRATEGY        │                                                          │
│  (STRAT)         │  Vision · Goals · KPIs · Bets · Themes                  │
│                  │               │ informs                                  │
├──────────────────▼──────────────────────────────────────────────────────────┤
│  PORTFOLIO       │                                                          │
│  (PORT)          │  Roadmap · Initiatives · Epics · Evaluations             │
│                  │               │ drives                                   │
├──────────────────▼──────────────────────────────────────────────────────────┤
│  PRODUCT         │                                                          │
│  ARCHITECTURE    │  Products · Modules · Features · Rules · Configs         │
│  (ARCH)          │  ◄─────────────── Central Hub ──────────────────►        │
│                  │   │ contains        │ expressed_as    │ supported_by     │
├──────────────────┘   │                │                 │                  │
│                      ▼                ▼                 ▼                  │
│  EXPERIENCE    DATA & SYSTEM    REQUIREMENT                                 │
│  (EXP)         (DATA)           (REQ)                                       │
│  Personas      Entities         Requests                                    │
│  Journeys      APIs             Discovery                                   │
│  Screens       Events           PRDs                                        │
│  Components    Integrations     Acceptance Criteria                         │
│                                      │ feeds                               │
├──────────────────────────────────────▼──────────────────────────────────────┤
│  DELIVERY (DEL_DOM)                                                         │
│  Stories · Tasks · AI Prompts · Dev Plans · Builds                          │
│                      │ validated_by                                         │
├──────────────────────▼──────────────────────────────────────────────────────┤
│  QUALITY (QA_DOM)                                                           │
│  Tests · Bugs · QA Runs · UAT Runs · Sign-offs                              │
│                      │ released_by                                          │
├──────────────────────▼──────────────────────────────────────────────────────┤
│  RELEASE & OPERATIONS (REL_DOM)                                             │
│  Releases · Release Notes · Rollbacks · Incidents · Monitoring              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Domain 1: Strategy (STRAT)

**Code:** STRAT
**Purpose:** Models the long-term direction of Nuemart as a product — the vision, goals, principles, and strategic bets that everything else must serve. Strategy objects are set by leadership and updated infrequently.

### Primary Object Types

| Type | Role in Strategy |
|---|---|
| VISION | The long-term aspiration for Nuemart. The North Star. |
| PRINCIPLE | Guiding philosophy for product decisions (e.g. "Mobile-first always"). |
| GOAL | Measurable business outcomes with targets and timelines. |
| KPI | Key performance indicators that track progress toward goals. |
| MKTCTX | Market observations and competitive context that shape strategy. |
| BET | Strategic hypotheses the product is placing (e.g. "Promotions on PLP will lift CTR by 15%"). |
| THEME | Thematic groupings of roadmap work that communicate the narrative. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| informs | Portfolio (PORT) | Strategy goals and themes drive initiative and epic creation. |
| evidenced_by | Intelligence (AI_DOM) | Bets and goals are grounded in market data and AI analysis. |
| governed_by | Governance (GOV) | Strategic decisions pass through governance gates. |
| measured_by | Quality (QA_DOM) | KPIs are tracked against released feature outcomes. |

### Nuemart-Specific Notes

- **Current Bets:** Promotional discovery on PLP will increase basket size; Pay Later will increase conversion among price-sensitive users; Sub-30-minute delivery will build brand trust.
- **Current KPIs tracked:** PLP to PDP conversion rate, Cart-to-Order conversion rate, Delivery on-time rate, Pay Later adoption rate, Customer repeat rate.
- **Strategy objects are sparse by design** — Nuemart is an early-stage product; strategy is primarily held in the founder's head. The Product OS will progressively formalise it.

---

## Domain 2: Portfolio (PORT)

**Code:** PORT
**Purpose:** Models how work is organised, prioritised, and scheduled across time horizons. Portfolio objects translate strategy into committed roadmap items and executable epics.

### Primary Object Types

| Type | Role in Portfolio |
|---|---|
| ROADMAP | Time-boxed commitments (by quarter or sprint cycle). |
| INIT | Large cross-epic initiatives spanning multiple modules. |
| EPIC | The primary unit of roadmap delivery. Each epic maps to a Feature or set of Features. |
| EVAL | Structured options assessments (build vs buy, feature A vs B). |
| SCORE | Prioritisation scores (RICE, ICE) for backlog items. |
| CAPACITY | Documented team or resource constraints. |
| DEPENDENCY | Cross-team or cross-system dependencies that need tracking. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| informed_by | Strategy (STRAT) | Initiatives and epics trace back to strategic goals. |
| drives | Product Architecture (ARCH) | Epics create FEATUREs and SUBFEATUREs. |
| requires_impact_assessment | Governance (GOV) | Major epics require impact evaluation. |
| tracked_by | Intelligence (AI_DOM) | AI surfaces capacity issues and dependency conflicts. |

### Nuemart-Specific Notes

- **Current cycle structure:** Nuemart works in 2-week sprints. Portfolio planning is informal; the Product OS is introducing lightweight EPIC tracking.
- **Existing mapped EPICs:** Delivery MVP (EPIC-DEL-MVP-001), PLP Promotional Experience (EPIC-COM-PLP-PROMO-001), Pay Later Integration (EPIC-PAY-PAYLATER-001).
- **Primary DEPENDENCY to track:** PLP Carousel content is dependent on Admin Console having a Banner Management feature (not yet built).

---

## Domain 3: Product Architecture (ARCH)

**Code:** ARCH
**Purpose:** Models the structure of the Nuemart product — the hierarchy of products, modules, sub-modules, capabilities, features, rules, and configurations that constitute what has been built or planned.

Product Architecture is the **central hub** of the domain model. Every other domain either feeds into ARCH (Strategy, Portfolio, Requirement), is expressed through ARCH (Experience, Data & System), or works on ARCH objects (Delivery, Quality, Release).

### Primary Object Types

| Type | Role in Architecture |
|---|---|
| PRODUCT | Top-level product (Customer App, Admin Console, Delivery App). |
| MODULE | Major functional areas (PLP, Checkout, Order Management). |
| SUBMODULE | Sub-divisions within large modules (PLP → Banner, Grid, Filter). |
| CAPABILITY | Cross-cutting platform abilities (Real-time inventory, Notification dispatch). |
| FEATURE | The primary unit of product value — what gets built and shipped. |
| SUBFEATURE | Scoped sub-components of a Feature. |
| CONFIG | Configurable parameters (banner scroll speed, session timeout). |
| RULE | Business rules enforced by the system (Pay Later eligibility). |
| PERMISSION | Access control grants (catalog price edit, order refund). |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| driven_by | Portfolio (PORT) | EPICs and INITIATIVEs drive FEATURE creation. |
| specified_by | Requirement (REQ) | FEATUREs are specified by PRDs and REQUIREMENTs. |
| expressed_as | Experience (EXP) | FEATUREs are expressed on SCREENs via COMPONENTs. |
| supported_by | Data & System (DATA) | FEATUREs are powered by ENTITYs, APIs, and INTEGRATIONs. |
| implemented_by | Delivery (DEL_DOM) | FEATUREs are implemented by STORYs and TASKs. |
| validated_by | Quality (QA_DOM) | FEATUREs are tested and signed off. |
| released_via | Release & Operations (REL_DOM) | FEATUREs go live through RELEASEs. |
| governed_by | Governance (GOV) | FEATUREs are subject to policies and approval gates. |
| enriched_by | Intelligence (AI_DOM) | AI classifies, enriches, and analyses ARCH objects. |

### Nuemart Product Hierarchy

```
Nuemart Product Suite
├── PRODUCT-NUEMART-COM-001 (Customer Commerce App)
│   ├── MODULE-COM-PLP-001 (Product Listing Page)
│   │   ├── SUBMODULE-COM-PLP-BANNER-001 (Banner Area)
│   │   │   └── FEATURE-COM-PLP-CAROUSEL-001 (Promotional Carousel)
│   │   ├── SUBMODULE-COM-PLP-GRID-001 (Product Grid)
│   │   └── SUBMODULE-COM-PLP-FILTER-001 (Filter & Sort)
│   ├── MODULE-COM-PDP-001 (Product Detail Page)
│   ├── MODULE-COM-CART-001 (Shopping Cart)
│   ├── MODULE-COM-CHK-001 (Checkout)
│   ├── MODULE-COM-ADDR-001 (Addresses)
│   ├── MODULE-COM-FAV-001 (Favourites)
│   └── MODULE-COM-ORDHIS-001 (Order History)
├── PRODUCT-NUEMART-ADM-001 (Admin Console)
│   ├── MODULE-ADM-CATMGMT-001 (Catalog Management)
│   ├── MODULE-ADM-ORDMGMT-001 (Order Management)
│   └── MODULE-ADM-USRMGMT-001 (User Management)
└── PRODUCT-NUEMART-DEL-001 (Delivery App)
    ├── MODULE-DEL-DISPATCH-001 (Dispatch)
    └── MODULE-DEL-TRACKING-001 (Tracking)
```

---

## Domain 4: Experience (EXP)

**Code:** EXP
**Purpose:** Models the human side of Nuemart — who uses it, how they navigate it, what they see and do. Experience objects are the design and UX layer of the Product OS.

### Primary Object Types

| Type | Role in Experience |
|---|---|
| PERSONA | Archetypal Nuemart users grounded in research. |
| ROLE | System roles (Customer, Admin, Delivery Agent, Catalog Manager). |
| JOURNEY | End-to-end user flows spanning multiple screens and modules. |
| SCREEN | Individual app screens and pages. |
| COMPONENT | Reusable UI components (ShadCN + custom). |
| ACTION | User actions that trigger system responses. |
| STATE | UI and system states (loading, empty, error, success). |
| NOTIF | Notifications sent to users (push, in-app, SMS, email). |
| CONTENT | Managed content (banners, promotional copy, help text). |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| expressed_by | Product Architecture (ARCH) | Features are expressed as screens and components. |
| informed_by | Requirement (REQ) | Personas and journeys ground requirements in user reality. |
| implemented_by | Delivery (DEL_DOM) | Screens and components are built by engineering stories. |
| tested_by | Quality (QA_DOM) | User flows are validated in QA and UAT. |
| observed_by | Intelligence (AI_DOM) | AI monitors user behaviour signals from production. |

### Nuemart-Specific Notes

- **Tech stack:** Next.js (App Router), ShadCN UI, Tailwind CSS. Components are in `/components/`.
- **Primary personas:** Urban Home Cook (COM), Admin Catalog Manager (ADM), Field Delivery Agent (DEL).
- **Key journeys:** Browse-to-Checkout, Reorder-from-History, Admin-Catalog-Update, Delivery-Dispatch-to-Delivery.
- **ShadCN components** are first-class COMPONENTs in this domain. Custom Nuemart components extend them.
- **SCREEN objects** correspond to Next.js page files in `/app/`.

---

## Domain 5: Data & System (DATA)

**Code:** DATA
**Purpose:** Models the technical substrate of Nuemart — the data models, APIs, integrations, events, and background jobs that power the product.

### Primary Object Types

| Type | Role in Data & System |
|---|---|
| ENTITY | Core data model entities (Convex tables: Product, Order, User, Cart, Address). |
| FIELD | Fields on data entities (with PII classifications). |
| API | Convex functions (queries, mutations, actions) and any REST endpoints. |
| INTEGRATION | External integrations (Razorpay, Clerk, Twilio, Google Maps). |
| EVENT | Domain events emitted by the system (OrderPlaced, StockLow). |
| WORKFLOW | Multi-step automated processes triggered by events. |
| JOB | Scheduled background tasks (stock sync, cart cleanup, GMV report). |
| STORAGE | File storage objects (Convex file storage, product images CDN). |
| AUDIT | System-generated audit trail records for compliance. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| supports | Product Architecture (ARCH) | ENTITYs and APIs power FEATUREs and CAPABILITYs. |
| implements | Delivery (DEL_DOM) | API objects are built by engineering tasks. |
| tested_by | Quality (QA_DOM) | APIs and integrations are tested in QA runs. |
| monitored_by | Release & Operations (REL_DOM) | Events and jobs are monitored post-release. |
| governed_by | Governance (GOV) | Entities with PII are governed by compliance rules. |

### Nuemart-Specific Notes

- **Backend:** Convex (real-time database + serverless functions). All DATA objects correspond to Convex tables and functions.
- **Auth:** Clerk. The USR domain's ENTITY objects include the Clerk user record and the Nuemart customer profile.
- **Key integrations:** Razorpay (payment processing; Pay Later pending), Clerk (auth), internal delivery system.
- **PII-bearing entities:** User (email, phone, name), Address (full address, lat/long), Order (purchase history). All governed by COMPRULE-INDIA-DPDP-001.
- **Events:** The event system is Convex-native (database triggers and scheduled functions). No separate message bus yet.

---

## Domain 6: Requirement (REQ)

**Code:** REQ
**Purpose:** Manages the intake, discovery, and specification of product work. Requirement objects are the bridge between business intent and product definition.

### Primary Object Types

| Type | Role in Requirement |
|---|---|
| REQUEST | Incoming requests for new features or changes. The entry point. |
| PROBLEM | Documented user or business problems. |
| OPP | Growth and improvement opportunities. |
| DISCOVERY | Research and discovery session records. |
| QUESTION | Open questions blocking progress. |
| ASSUMPTION | Documented assumptions. |
| REQUIREMENT | Specific functional or non-functional requirements. |
| PRD | Full Product Requirements Documents. |
| ACCEPTANCE | Acceptance criteria — the definition of done. |
| OUTOFSCOPE | Explicitly excluded items. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| creates | Product Architecture (ARCH) | Approved requests and PRDs create FEATUREs. |
| informed_by | Strategy (STRAT) | Problems and opportunities are grounded in strategic goals. |
| discovered_via | Experience (EXP) | Discovery sessions involve user research and personas. |
| feeds | Delivery (DEL_DOM) | Approved PRDs generate stories and dev plans. |
| validated_by | Quality (QA_DOM) | Acceptance criteria are verified by test cases. |
| governed_by | Governance (GOV) | PRD approval requires governance gate sign-off. |
| enriched_by | Intelligence (AI_DOM) | AI grills requests, derives problems, generates acceptance criteria. |

### Nuemart-Specific Notes

- **Existing legacy REQUEST objects:** REQ-0001 (Delivery MVP → REQUEST-DEL-DISPATCH-MVP-001), REQ-0002 (PLP Carousel → REQUEST-COM-PLP-CAROUSEL-001).
- **Existing legacy PRD objects:** PRD-0001 (→ PRD-DEL-DISPATCH-MVP-V1), PRD-0002 (→ PRD-COM-PLP-CAROUSEL-V1).
- **Grilling process:** New requests are grilled by the PM using the `/product-grill` skill before impact assessment.
- **The AI agent classifies** incoming requests and suggests object_type, product_area_code, module_code, and priority. PM confirms.

---

## Domain 7: Delivery (DEL_DOM)

**Code:** DEL_DOM
**Purpose:** Manages the execution of product work — the stories, tasks, AI prompts, dev plans, and builds that implement the product architecture from approved requirements.

### Primary Object Types

| Type | Role in Delivery |
|---|---|
| STORY | User stories — the primary sprint planning unit. |
| TASK | Technical tasks breaking down stories. |
| PROMPT | AI coding prompts used to generate implementation. |
| DEVPLAN | Phased engineering implementation plans. |
| PR | Git pull request references. |
| BUILD | Build artefacts and deployment events. |
| BLOCKER | Tracked impediments. |
| CHANGELOG | Structured change log entries. |
| INCOMPLETE | Planned work not completed in a cycle. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| implements | Product Architecture (ARCH) | Stories and tasks build FEATUREs. |
| created_from | Requirement (REQ) | Stories are generated from PRDs and acceptance criteria. |
| builds | Data & System (DATA) | Tasks implement APIs, ENTITYs, and INTEGRATIONs. |
| validated_by | Quality (QA_DOM) | Completed builds are tested by QA runs. |
| released_in | Release & Operations (REL_DOM) | Builds are included in RELEASEs. |
| governed_by | Governance (GOV) | Dev plans for high-risk features require gate approval. |
| assisted_by | Intelligence (AI_DOM) | PROMPTs are generated by AI; builds are AI-assisted. |

### Nuemart-Specific Notes

- **Primary delivery tool:** Claude Code (AI-assisted implementation via PROMPT objects).
- **Git workflow:** Feature branches; PRs into main; Vercel preview deploys per PR.
- **Legacy story IDs:** US-0001–US-0014 (→ STORY-DEL-DISPATCH-MVP-001 through 014 and STORY-COM-PLP-CAROUSEL-001 through N).
- **Existing DEVPLANs:** DEVPLAN-0001 (Delivery MVP), DEVPLAN-0002 (PLP Carousel).
- **Incomplete work tracking** is a first-class concept — INCOMPLETE objects are created at sprint end for any committed work not delivered.

---

## Domain 8: Quality (QA_DOM)

**Code:** QA_DOM
**Purpose:** Ensures every delivery is validated before and after release. Quality objects provide the evidence that what was built matches what was specified.

### Primary Object Types

| Type | Role in Quality |
|---|---|
| TESTPLAN | Comprehensive test plans covering a feature or release. |
| TEST | Individual test cases mapped to acceptance criteria. |
| BUG | Defects found during testing or production. |
| REGRISK | Areas at risk of regression from a change. |
| QA | QA execution runs against a build. |
| UAT | User acceptance testing runs. |
| SIGNOFF | Formal sign-off records. |
| LIMITATION | Documented known limitations. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| validates | Product Architecture (ARCH) | QA and UAT runs validate FEATUREs against acceptance criteria. |
| verifies | Requirement (REQ) | Test cases verify specific ACCEPTANCE and REQUIREMENT objects. |
| tests | Delivery (DEL_DOM) | QA runs test specific BUILDs from delivery. |
| gates | Release & Operations (REL_DOM) | QA Complete and UAT Complete gate RELEASE lifecycle transitions. |
| governed_by | Governance (GOV) | QA policies govern test coverage requirements. |
| monitored_by | Intelligence (AI_DOM) | AI surfaces test coverage gaps and regression risks. |

### Nuemart-Specific Notes

- **Existing legacy QA IDs:** QA-0001 (→ QA-DEL-DISPATCH-MVP-001), UAT-0001 (→ UAT-DEL-DISPATCH-MVP-001).
- **QA approach:** Manual QA for UI; Convex test utilities for backend function testing; no automated E2E tests yet (LIMITATION-QA-NOETOEND-001).
- **UAT is PM-led** with occasional founder participation for major features.
- **Sign-off for release** requires both QA sign-off (QA engineer) and UAT sign-off (PM or founder).

---

## Domain 9: Release & Operations (REL_DOM)

**Code:** REL_DOM
**Purpose:** Manages the go-live process and post-release lifecycle of features. Release & Operations objects close the loop from delivery back to strategy by capturing outcomes, incidents, and enhancements.

### Primary Object Types

| Type | Role in Release & Operations |
|---|---|
| RELEASE | A product release event bundling features, builds, and notes. |
| RELNOTE | Customer-facing or internal release notes. |
| ROLLBACK | Documented rollback procedures. |
| INCIDENT | Production incident records. |
| ENHANCEMENT | Post-release improvement requests. |
| REVIEW | Post-release retrospective reviews. |
| MONITOR | Monitoring alert definitions. |
| PLAYBOOK | Support and operations runbooks. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| releases | Product Architecture (ARCH) | FEATUREs are released via RELEASE objects. |
| validates_outcomes_for | Strategy (STRAT) | Post-release reviews validate KPIs and strategic bets. |
| creates | Requirement (REQ) | Incidents and monitoring signals create new REQUESTs. |
| governed_by | Governance (GOV) | Releases require gate approval. |
| monitored_by | Intelligence (AI_DOM) | MONITOR signals are processed by AI for anomaly detection. |

### Nuemart-Specific Notes

- **Release cadence:** Currently ad-hoc; targeting bi-weekly releases as the team matures.
- **Deployment:** Vercel (frontend); Convex cloud (backend). Zero-downtime deploys by default.
- **Monitoring:** Currently manual/Vercel dashboard. MONITOR objects will formalise alert definitions.
- **Incidents:** No formal incident process yet. This domain establishes it.
- **Key post-release concern:** Pay Later (Razorpay) integration will require a detailed ROLLBACK plan and MONITOR set.

---

## Domain 10: Governance (GOV)

**Code:** GOV
**Purpose:** A cross-cutting domain that enforces process, compliance, decision accountability, and quality standards across ALL other domains. Governance objects do not belong to a single lifecycle stage — they thread through all of them.

### Primary Object Types

| Type | Role in Governance |
|---|---|
| GATE | Approval gates that block lifecycle transitions until conditions are met. |
| DECISION | Formal records of product, design, and technical decisions. |
| POLICY | Product and engineering policies (data, security, accessibility). |
| CLASSRULE | Classification rules for the AI agent and PM. |
| IDRULE | ID assignment and format rules. |
| LCRULE | Lifecycle transition rules. |
| RISKRULE | Rules for risk assessment and escalation. |
| COMPRULE | Compliance and regulatory rules. |

### Relationships to Other Domains

| Relationship | Direction | Description |
|---|---|---|
| governs | GOV → all | Policies and rules govern objects in every other domain. |
| gates | GOV → ARCH, REQ, REL_DOM | Gates block transitions in Feature, PRD, and Release lifecycles. |
| explains | GOV → ARCH, EXP, DATA | Decisions explain why choices were made in architecture and design. |
| informed_by | GOV ← AI_DOM | Intelligence domain surfaces governance violations and gaps. |

### Current Nuemart Governance Gates

| Gate ID | What it Guards | Required Before |
|---|---|---|
| GATE-PRD-APPROVAL-001 | PRD approval | Feature moves to Planned |
| GATE-RELEASE-APPROVAL-001 | Release sign-off | Release transitions to Released |
| GATE-PAYLATER-COMPLIANCE-001 | Pay Later compliance | Pay Later feature released |
| GATE-PIIDATA-REVIEW-001 | PII data review | Any feature touching user/order data released |

### Nuemart-Specific Notes

- **Decision records** are the highest-value governance artefact for Nuemart at this stage. Many decisions are currently undocumented.
- **Compliance rules:** India-specific — DPDP Act (data privacy), RBI guidelines (Pay Later / lending), GST (tax on orders).
- **The Product OS itself is governed** by CLASSRULE, IDRULE, and LCRULE objects within this domain.

---

## Domain 11: Intelligence (AI_DOM)

**Code:** AI_DOM
**Purpose:** Makes the AI layer of the Product OS a first-class, auditable domain. Intelligence objects represent AI agents, reasoning traces, recommendations, and detected issues that enhance all other domains.

### Primary Object Types

| Type | Role in Intelligence |
|---|---|
| AGENT | Defined AI agents (classifier, griller, PRD writer, story generator, QA reviewer). |
| AIFLOW | Multi-step AI workflows (Request → Grilling → PRD → Stories). |
| AIPROMPT | Reusable prompt templates for each workflow step. |
| TRACE | Full reasoning traces from AI actions. |
| CONFIDENCE | Formal confidence scores for AI outputs. |
| EVIDENCE | First-class evidence links grounding AI claims. |
| RECOMMEND | AI-generated recommendations for PM action. |
| CONFLICT | Detected conflicts between objects. |
| GAP | Detected gaps in coverage or definition. |

### Relationships to Other Domains

| Relationship | Target Domain | Description |
|---|---|---|
| enhances | All domains | AI agents enrich objects in every domain. |
| classifies | Product Architecture (ARCH) | AI classifier assigns object types and module codes. |
| grills | Requirement (REQ) | AI grilling agent hardens incoming REQUESTs. |
| generates | Delivery (DEL_DOM) | AI generates STORYs, TASKs, and PROMPTs. |
| reviews | Quality (QA_DOM) | AI reviews test coverage and surfaces regression risks. |
| monitors | Release & Operations (REL_DOM) | AI monitors production signals for anomalies. |
| informs | Governance (GOV) | AI surfaces governance violations and GAPs. |

### Nuemart AI Agents

| Agent ID | Name | Role |
|---|---|---|
| AGENT-PRODUCT-OS-CLASSIFIER-001 | Product OS Classifier | Classifies incoming requests into Product Objects |
| AGENT-PRODUCT-OS-GRILLER-001 | Product OS Griller | Asks hardening questions for incoming requests |
| AGENT-PRODUCT-OS-PRDWRITER-001 | PRD Writer | Generates PRDs from approved requests |
| AGENT-PRODUCT-OS-STORYWRITER-001 | Story Writer | Generates user stories from PRDs |
| AGENT-PRODUCT-OS-QAREVIEWER-001 | QA Reviewer | Reviews test coverage; surfaces regression risks |
| AGENT-PRODUCT-OS-DEVPLAN-001 | Dev Planner | Generates implementation plans from stories |
| AGENT-PRODUCT-OS-IMPACTANALYST-001 | Impact Analyst | Assesses impact of requests and changes |

---

## Domain Flow: How a New Request Moves Through the System

This diagram shows how a single incoming request flows across all 11 domains from intake to release.

```
DOMAIN         OBJECTS CREATED / TOUCHED              TRANSITION TRIGGER
─────────────────────────────────────────────────────────────────────────────
INTELLIGENCE   TRACE (AI classifies request)
   │
   ▼
REQUIREMENT    REQUEST (Submitted → Classified)         PM receives request
   │
   ▼
INTELLIGENCE   TRACE (AI grills request)               /product-grill skill
   │
   ▼
REQUIREMENT    QUESTION × N (open questions)           Grilling output
   │           ASSUMPTION × N
   │
   ▼ (questions resolved)
   │
REQUIREMENT    REQUEST (→ Impact Assessment)           All questions resolved
   │
   ▼
INTELLIGENCE   SCORE (RICE priority scoring)           /product-impact skill
   │           RECOMMEND (PM action recommended)
   │
   ▼ (approved)
   │
GOVERNANCE     GATE-PRD-APPROVAL-001                   Request Approved
   │
   ▼
REQUIREMENT    PRD (Draft → In Review → Approved)      /product-prd skill
   │           REQUIREMENT × N
   │           ACCEPTANCE × N
   │           OUTOFSCOPE × N
   │
   ▼
PRODUCT ARCH   FEATURE (Candidate → Planned)           PRD Approved
   │           SUBFEATURE × N
   │           CONFIG × N
   │           RULE × N
   │
EXPERIENCE     SCREEN (linked)                         Design work
   │           COMPONENT (linked)
   │
DATA & SYSTEM  ENTITY (linked)                         Architecture work
   │           API (planned)
   │           EVENT (planned)
   │
PORTFOLIO      EPIC (linked or created)                Sprint planning
   │           ROADMAP (updated)
   │
   ▼
DELIVERY       DEVPLAN (generated)                     /product-devplan skill
   │           STORY × N (generated)                   /product-stories skill
   │           PROMPT × N (generated)                  /product-build-prompt skill
   │           TASK × N
   │
   ▼ (code written)
   │
DELIVERY       BUILD (created)                         PR merged
   │           PR (linked)
   │
   ▼
QUALITY        TESTPLAN (created)                      Feature → QA status
   │           TEST × N
   │           QA (run)
   │           BUG × N (if failures)
   │
   ▼ (QA passed)
   │
QUALITY        UAT (run)                               Feature → UAT status
   │           SIGNOFF (issued)
   │
   ▼
GOVERNANCE     GATE-RELEASE-APPROVAL-001               UAT Complete
   │
   ▼
REL & OPS      RELEASE (created and executed)          Gate approved
   │           RELNOTE (published)
   │           MONITOR (configured)
   │
   ▼ (post-release)
   │
REL & OPS      REVIEW (retrospective)                  2 weeks post-release
   │           ENHANCEMENT × N (backlog)
   │
   ▼
INTELLIGENCE   RECOMMEND (AI analyses KPI signals)     Ongoing
   │
   ▼
STRATEGY       KPI (updated)                           Monthly
               GOAL (progress tracked)
               BET (validated or invalidated)
```

---

## Traceability: Strategy to Release

Every released feature should be traceable, without gaps, from a strategic goal to a production release.

```
VISION-NUEMART-001
  └── GOAL-NUEMART-GMV-Q1-2026
        └── KPI-COM-CART-CONVERSION-001
              └── BET-COM-PLP-PROMOTIONALDISCOVERY-001
                    └── THEME-2026-H1-DISCOVERY
                          └── INIT-COM-DISCOVERY-EXPERIENCE-2026
                                └── EPIC-COM-PLP-PROMOTIONAL-001
                                      └── REQUEST-COM-PLP-CAROUSEL-001
                                            └── PRD-COM-PLP-CAROUSEL-V1
                                                  └── FEATURE-COM-PLP-CAROUSEL-001
                                                        ├── STORY-COM-PLP-CAROUSEL-001
                                                        │     └── PROMPT-COM-PLP-CAROUSEL-001
                                                        │           └── PR-COM-PLP-CAROUSEL-001
                                                        ├── TESTPLAN-COM-PLP-CAROUSEL-001
                                                        │     └── QA-COM-PLP-CAROUSEL-001
                                                        │           └── UAT-COM-PLP-CAROUSEL-001
                                                        │                 └── SIGNOFF-COM-PLP-CAROUSEL-001
                                                        └── RELEASE-2026-02-14-V1
                                                              └── RELNOTE-2026-02-14-001
                                                                    └── KPI-COM-CART-CONVERSION-001 (measured)
```

This is a complete traceability chain. Any gap in this chain is a `GAP` object in the Intelligence domain.

---

## Nuemart Domain Model Instance

This table maps Nuemart's specific modules to their domains and shows which domains are most active for each product area.

| Product Area | Module | Primary Domains Active |
|---|---|---|
| COM (Customer Commerce) | PLP | ARCH, EXP, REQ, DEL_DOM, QA_DOM |
| COM | PDP | ARCH, EXP, DATA |
| COM | CART | ARCH, DATA, DEL_DOM |
| COM | CHK | ARCH, DATA, PAY (via INTEGRATION) |
| COM | ADDR | ARCH, DATA, USR |
| COM | FAV | ARCH, DATA |
| COM | ORDHIS | ARCH, EXP, DATA |
| ADM | CATMGMT | ARCH, DATA, GOV |
| ADM | ORDMGMT | ARCH, DATA, GOV |
| ADM | USRMGMT | ARCH, DATA, GOV, COMPRULE |
| DEL | DISPATCH | ARCH, DATA, DEL_DOM |
| DEL | TRACKING | ARCH, EXP, DATA |
| INV | STOCK | DATA, JOB, MONITOR |
| PAY | RAZORPAY | DATA, INTEGRATION, GOV, COMPRULE |
| PAY | PAYLATER | ARCH, DATA, RULE, COMPRULE |
| USR | AUTH | DATA, INTEGRATION (Clerk), COMPRULE |
| RPT | ANALYTICS | DATA, JOB, MONITOR |

### Domain Health Status (2026-06-22)

| Domain | Coverage | Maturity | Notes |
|---|---|---|---|
| Strategy (STRAT) | Minimal | Low | No formal VISION or GOAL objects yet. BETs are implicit. |
| Portfolio (PORT) | Partial | Low | EPICs exist informally. No ROADMAP objects formalised. |
| Product Architecture (ARCH) | Good | Medium | FEATUREs being formalised. RULE and CONFIG objects sparse. |
| Experience (EXP) | Minimal | Low | No PERSONA or JOURNEY objects formalised. |
| Data & System (DATA) | Partial | Medium | Convex schema exists; not yet mapped to ENTITY objects. |
| Requirement (REQ) | Good | Medium | REQUEST and PRD objects exist (legacy). Formalising now. |
| Delivery (DEL_DOM) | Good | Medium | STORY objects exist (legacy). PROMPT and DEVPLAN active. |
| Quality (QA_DOM) | Partial | Low | QA and UAT runs done; objects not yet formalised. |
| Release & Operations (REL_DOM) | Minimal | Low | No formal RELEASE or MONITOR objects. |
| Governance (GOV) | Minimal | Low | No GATE or POLICY objects formalised. Highest priority gap. |
| Intelligence (AI_DOM) | Active | Medium | Agents active (Claude Code). TRACE objects being introduced. |

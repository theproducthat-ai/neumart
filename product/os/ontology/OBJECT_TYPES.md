# Nuemart Product OS — Object Types Registry

**Version:** 1.0.0
**Last Updated:** 2026-06-22
**Status:** Active
**Owner:** Product OS / Platform Team
**Location:** `product/os/ontology/OBJECT_TYPES.md`

---

## Overview

This registry defines every valid Product Object type in the Nuemart Product OS. Object types are organised into 11 domains. Each type has:

- A canonical **name** (what you call it)
- A **prefix** (used in semantic IDs)
- A **domain** it belongs to
- A **description** of what it models
- An **example ID** showing it in context

When the AI agent classifies a concept as a Product Object, it MUST select a type from this registry. No ad-hoc types are permitted. New types must be proposed via `REQUEST-GOV-OS-OBJECT-TYPE-NNN` and approved by the Product OS governance gate.

---

## Quick Reference Table

| Type | Prefix | Domain | Description | Example ID |
|---|---|---|---|---|
| Product Vision | VISION | Strategy | The long-term aspiration for Nuemart as a product | VISION-NUEMART-001 |
| Product Principle | PRINCIPLE | Strategy | A guiding design or product philosophy | PRINCIPLE-NUEMART-SPEED-001 |
| Business Goal | GOAL | Strategy | A measurable business outcome to achieve | GOAL-NUEMART-GMV-001 |
| KPI | KPI | Strategy | A key performance indicator for tracking progress | KPI-COM-CONVERSION-001 |
| Market Context | MKTCTX | Strategy | A market, competitor, or environmental observation | MKTCTX-INDIA-QUICKCOMMERCE-001 |
| Product Bet | BET | Strategy | A strategic hypothesis the product is placing | BET-COM-PLP-DISCOVERY-001 |
| Roadmap Theme | THEME | Strategy | A thematic grouping of work on the roadmap | THEME-2026-CHECKOUT-SPEED |
| Roadmap Item | ROADMAP | Portfolio | A time-boxed commitment on the product roadmap | ROADMAP-COM-Q1-2026-001 |
| Initiative | INIT | Portfolio | A large coordinated effort spanning multiple epics | INIT-COM-DISCOVERY-2026 |
| Epic | EPIC | Portfolio | A significant chunk of deliverable work | EPIC-COM-PLP-001 |
| Evaluation | EVAL | Portfolio | A structured assessment of options or proposals | EVAL-COM-PLP-SEARCH-001 |
| Priority Score | SCORE | Portfolio | A scored prioritisation of backlog items | SCORE-COM-PLP-CAROUSEL-001 |
| Capacity Constraint | CAPACITY | Portfolio | A limitation on team or system throughput | CAPACITY-ENG-FE-Q1-2026 |
| Dependency | DEPENDENCY | Portfolio | A tracked cross-team or cross-system dependency | DEPENDENCY-COM-PAY-RAZORPAY-001 |
| Product | PRODUCT | Product Architecture | A top-level product (e.g. Nuemart Customer App) | PRODUCT-NUEMART-COM-001 |
| Module | MODULE | Product Architecture | A major product area (e.g. PLP, Checkout) | MODULE-COM-PLP-001 |
| Sub-module | SUBMODULE | Product Architecture | A subdivision of a module | SUBMODULE-COM-PLP-BANNER-001 |
| Capability | CAPABILITY | Product Architecture | A platform-level ability (e.g. Search, Recommendations) | CAPABILITY-COM-SEARCH-001 |
| Feature | FEATURE | Product Architecture | A discrete user-facing deliverable | FEATURE-COM-PLP-CAROUSEL-001 |
| Sub-feature | SUBFEATURE | Product Architecture | A component of a feature | SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL-001 |
| Configuration | CONFIG | Product Architecture | A configurable parameter or toggle | CONFIG-COM-PLP-CAROUSEL-SPEED-001 |
| Rule | RULE | Product Architecture | A business rule enforced by the system | RULE-PAY-PAYLATER-LIMIT-001 |
| Permission | PERMISSION | Product Architecture | An access control permission | PERMISSION-ADM-CATALOG-EDIT-001 |
| Persona | PERSONA | Experience | A archetypal user of the product | PERSONA-COM-HOMECOOK-001 |
| Role | ROLE | Experience | A system role with associated permissions | ROLE-ADM-CATALOG-MANAGER-001 |
| Journey | JOURNEY | Experience | An end-to-end user journey across screens | JOURNEY-COM-BROWSE-TO-CHECKOUT-001 |
| Screen | SCREEN | Experience | A distinct app screen or page | SCREEN-COM-PLP-001 |
| Component | COMPONENT | Experience | A reusable UI component | COMPONENT-COM-PRODUCT-CARD-001 |
| Action | ACTION | Experience | A user action on a screen | ACTION-COM-PLP-ADD-TO-CART-001 |
| State | STATE | Experience | A UI or system state (e.g. empty, loading, error) | STATE-COM-CART-EMPTY-001 |
| Notification | NOTIF | Experience | A notification sent to users | NOTIF-COM-ORDER-CONFIRMED-001 |
| Content | CONTENT | Experience | Managed content (banners, copy, promotions) | CONTENT-COM-PLP-BANNER-DIWALI-001 |
| Data Entity | ENTITY | Data & System | A core data model entity | ENTITY-COM-PRODUCT-001 |
| Field | FIELD | Data & System | A field on a data entity | FIELD-COM-PRODUCT-PRICE-001 |
| API / Function | API | Data & System | An API endpoint or Convex function | API-COM-CART-ADD-ITEM-001 |
| Integration | INTEGRATION | Data & System | An external system integration | INTEGRATION-PAY-RAZORPAY-001 |
| Event | EVENT | Data & System | A system or domain event | EVENT-COM-ORDER-PLACED-001 |
| Workflow | WORKFLOW | Data & System | A multi-step automated process | WORKFLOW-DEL-ORDER-DISPATCH-001 |
| Background Job | JOB | Data & System | A scheduled or async background task | JOB-INV-STOCK-SYNC-001 |
| Storage Object | STORAGE | Data & System | A file storage object or bucket | STORAGE-COM-PRODUCT-IMAGES-001 |
| Audit Record | AUDIT | Data & System | A system-generated audit trail record | AUDIT-ADM-PRICE-CHANGE-001 |
| Request | REQUEST | Requirement | An incoming request for new work or change | REQUEST-COM-PLP-CAROUSEL-001 |
| Problem Statement | PROBLEM | Requirement | A documented product or user problem | PROBLEM-COM-PLP-DISCOVERY-001 |
| Opportunity | OPP | Requirement | An identified growth or improvement opportunity | OPP-COM-PLP-CAROUSEL-001 |
| Discovery Session | DISCOVERY | Requirement | A recorded discovery or research session | DISCOVERY-COM-GROCERY-BROWSING-001 |
| Open Question | QUESTION | Requirement | An unresolved question blocking progress | QUESTION-COM-PLP-CAROUSEL-001 |
| Assumption | ASSUMPTION | Requirement | A documented assumption made during definition | ASSUMPTION-COM-PLP-CAROUSEL-001 |
| Requirement | REQUIREMENT | Requirement | A specific product or system requirement | REQUIREMENT-COM-PLP-CAROUSEL-001 |
| PRD | PRD | Requirement | A Product Requirements Document | PRD-COM-PLP-CAROUSEL-V1 |
| Acceptance Criterion | ACCEPTANCE | Requirement | A testable criterion for completeness | ACCEPTANCE-COM-PLP-CAROUSEL-001 |
| Out-of-Scope Item | OUTOFSCOPE | Requirement | An explicitly out-of-scope item | OUTOFSCOPE-COM-PLP-CAROUSEL-001 |
| User Story | STORY | Delivery | An As a / I want / So that story | STORY-COM-PLP-CAROUSEL-001 |
| Development Task | TASK | Delivery | A technical implementation task | TASK-COM-PLP-CAROUSEL-001 |
| AI Coding Prompt | PROMPT | Delivery | A prompt used to generate code via AI | PROMPT-COM-PLP-CAROUSEL-001 |
| Implementation Plan | DEVPLAN | Delivery | A phased engineering implementation plan | DEVPLAN-COM-PLP-CAROUSEL-001 |
| Pull Request Reference | PR | Delivery | A reference to a git PR | PR-COM-PLP-CAROUSEL-001 |
| Build | BUILD | Delivery | A specific build artefact or deployment | BUILD-2026-02-14-001 |
| Blocker | BLOCKER | Delivery | A tracked blocker on delivery | BLOCKER-COM-PLP-CAROUSEL-001 |
| Change Log | CHANGELOG | Delivery | A change log entry for a feature or release | CHANGELOG-COM-PLP-CAROUSEL-001 |
| Incomplete Work Item | INCOMPLETE | Delivery | Work planned but not completed in a cycle | INCOMPLETE-COM-PLP-CAROUSEL-001 |
| Test Plan | TESTPLAN | Quality | A plan covering all tests for a feature or release | TESTPLAN-COM-PLP-CAROUSEL-001 |
| Test Case | TEST | Quality | An individual test case | TEST-COM-PLP-CAROUSEL-001 |
| Bug | BUG | Quality | A defect found during testing or production | BUG-COM-PLP-CAROUSEL-001 |
| Regression Risk | REGRISK | Quality | An area at risk of regression | REGRISK-COM-PLP-CAROUSEL-001 |
| QA Run | QA | Quality | A QA execution run against a build | QA-COM-PLP-CAROUSEL-001 |
| UAT Run | UAT | Quality | A user acceptance testing run | UAT-COM-PLP-CAROUSEL-001 |
| Sign-off | SIGNOFF | Quality | A formal sign-off record | SIGNOFF-COM-PLP-CAROUSEL-001 |
| Known Limitation | LIMITATION | Quality | A documented known limitation of a feature | LIMITATION-COM-PLP-CAROUSEL-001 |
| Release | RELEASE | Release & Operations | A product release event | RELEASE-2026-02-14-V1 |
| Release Note | RELNOTE | Release & Operations | A customer-facing or internal release note | RELNOTE-COM-PLP-CAROUSEL-001 |
| Rollback Plan | ROLLBACK | Release & Operations | A documented rollback procedure | ROLLBACK-2026-02-14-V1 |
| Incident | INCIDENT | Release & Operations | A production incident record | INCIDENT-COM-PLP-2026-02-20-001 |
| Enhancement | ENHANCEMENT | Release & Operations | A post-release improvement request | ENHANCEMENT-COM-PLP-CAROUSEL-001 |
| Post-release Review | REVIEW | Release & Operations | A post-release retrospective review | REVIEW-2026-02-14-V1 |
| Monitoring Signal | MONITOR | Release & Operations | A monitoring alert or signal definition | MONITOR-COM-PLP-CAROUSEL-CTR-001 |
| Support Playbook | PLAYBOOK | Release & Operations | A support or ops runbook | PLAYBOOK-COM-PLP-CAROUSEL-001 |
| Approval Gate | GATE | Governance | A formal approval gate in the product process | GATE-PRD-APPROVAL-001 |
| Decision | DECISION | Governance | A formal product or design decision | DECISION-COM-PLP-CAROUSEL-001 |
| Policy | POLICY | Governance | A product or engineering policy | POLICY-SECURITY-PII-001 |
| Classification Rule | CLASSRULE | Governance | A rule for classifying objects | CLASSRULE-FEATURE-VS-CAPABILITY-001 |
| ID Rule | IDRULE | Governance | A rule governing ID assignment | IDRULE-SEQUENCE-ASSIGNMENT-001 |
| Lifecycle Rule | LCRULE | Governance | A rule governing lifecycle transitions | LCRULE-FEATURE-GATE-001 |
| Risk Rule | RISKRULE | Governance | A rule for risk assessment | RISKRULE-PAYMENT-CHANGES-001 |
| Compliance Rule | COMPRULE | Governance | A compliance or regulatory rule | COMPRULE-PII-DATA-001 |
| AI Agent | AGENT | Intelligence | A defined AI agent in the Product OS | AGENT-PRODUCT-OS-CLASSIFIER-001 |
| AI Workflow | AIFLOW | Intelligence | A multi-step AI-driven workflow | AIFLOW-REQUEST-TO-PRD-001 |
| AI Prompt Template | AIPROMPT | Intelligence | A reusable prompt template for AI tasks | AIPROMPT-GRILLING-001 |
| AI Reasoning Trace | TRACE | Intelligence | A recorded reasoning trace from an AI agent | TRACE-COM-PLP-CAROUSEL-CLASSIFY-001 |
| Confidence Score | CONFIDENCE | Intelligence | A formal confidence score record | CONFIDENCE-COM-PLP-CAROUSEL-001 |
| Evidence Link | EVIDENCE | Intelligence | A link between a claim and its evidence | EVIDENCE-COM-PLP-CAROUSEL-001 |
| Recommendation | RECOMMEND | Intelligence | An AI-generated recommendation | RECOMMEND-COM-PLP-001 |
| Conflict | CONFLICT | Intelligence | A detected conflict between objects | CONFLICT-COM-PLP-CAROUSEL-001 |
| Gap | GAP | Intelligence | A detected gap in coverage or definition | GAP-COM-PLP-CAROUSEL-001 |

---

## Domain 1: Strategy

Strategy objects define the **why** of Nuemart — the direction, goals, and principles that govern all product decisions. They are created by leadership and product strategy, and they inform everything downstream. Strategy objects are rarely changed; changes require governance sign-off.

### VISION — Product Vision

| | |
|---|---|
| **Prefix** | `VISION` |
| **Domain** | Strategy |
| **Description** | The long-term aspiration statement for the Nuemart product. Defines what Nuemart is trying to become. There is typically one per product area, updated at most annually. A Vision object informs all BET, THEME, and GOAL objects beneath it. |
| **Valid Owners** | CPO, CEO, Founder |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `VISION-NUEMART-001` |
| **Nuemart Example** | "Nuemart — India's most trusted neighbourhood grocery platform, delivering fresh and essential goods in under 30 minutes with zero friction." |

### PRINCIPLE — Product Principle

| | |
|---|---|
| **Prefix** | `PRINCIPLE` |
| **Domain** | Strategy |
| **Description** | A non-negotiable guiding principle that shapes how Nuemart makes product decisions. Principles are used as tiebreakers when tradeoffs arise. Examples: "Speed over completeness", "Trust before monetisation", "Mobile-first always". |
| **Valid Owners** | CPO, PM Lead |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `PRINCIPLE-NUEMART-MOBILEFIRST-001` |

### GOAL — Business Goal

| | |
|---|---|
| **Prefix** | `GOAL` |
| **Domain** | Strategy |
| **Description** | A measurable business outcome with a defined target, timeline, and owner. Goals are OKR-aligned. Every Initiative and Epic should trace back to at least one GOAL. |
| **Valid Owners** | CPO, Business Lead |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `GOAL-NUEMART-GMV-Q1-2026` |

### KPI — Key Performance Indicator

| | |
|---|---|
| **Prefix** | `KPI` |
| **Domain** | Strategy |
| **Description** | A specific, measurable indicator used to track progress toward a GOAL. KPIs have a current baseline value, target value, and measurement frequency. Every FEATURE at P1 or P2 should link to at least one KPI it is expected to move. |
| **Valid Owners** | PM, Analyst |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `KPI-COM-CART-CONVERSION-001` |

### MKTCTX — Market Context

| | |
|---|---|
| **Prefix** | `MKTCTX` |
| **Domain** | Strategy |
| **Description** | A documented market observation, competitive analysis, or environmental factor that is relevant to product strategy. Used to justify BETs and GOALs. |
| **Valid Owners** | PM, Strategy |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `MKTCTX-INDIA-QUICKCOMMERCE-2026` |

### BET — Product Bet

| | |
|---|---|
| **Prefix** | `BET` |
| **Domain** | Strategy |
| **Description** | A strategic hypothesis: "If we invest in X, we believe Y will happen, evidenced by Z." BETs are placed at the initiative or theme level and validated by KPIs over time. Failed BETs are archived, not deleted. |
| **Valid Owners** | CPO, PM |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `BET-COM-PLP-PROMOTIONALDISCOVERY-001` |

### THEME — Roadmap Theme

| | |
|---|---|
| **Prefix** | `THEME` |
| **Domain** | Strategy |
| **Description** | A thematic grouping that organises roadmap work into meaningful narratives (e.g. "Make checkout faster", "Build trust with new customers"). THEMEs group EPICs and INITIATIVEs and are used in roadmap communication. |
| **Valid Owners** | PM Lead, CPO |
| **Lifecycle Model** | Generic Product Object |
| **Example ID** | `THEME-2026-H1-CHECKOUT-SPEED` |

---

## Domain 2: Portfolio

Portfolio objects manage the **what and when** — how work is organised, prioritised, and scheduled across teams and time horizons.

### ROADMAP — Roadmap Item

| | |
|---|---|
| **Prefix** | `ROADMAP` |
| **Domain** | Portfolio |
| **Description** | A time-boxed, committed item on the product roadmap. Links to the THEME, INIT, or EPIC it represents. May have a target quarter or sprint. |
| **Example ID** | `ROADMAP-COM-Q1-2026-PLP` |

### INIT — Initiative

| | |
|---|---|
| **Prefix** | `INIT` |
| **Domain** | Portfolio |
| **Description** | A large coordinated effort spanning multiple EPICs and teams, typically running over one or more quarters. An INIT has a clear success metric and is traceable to a GOAL. |
| **Example ID** | `INIT-COM-DISCOVERY-EXPERIENCE-2026` |

### EPIC — Epic

| | |
|---|---|
| **Prefix** | `EPIC` |
| **Domain** | Portfolio |
| **Description** | A significant chunk of product work that delivers meaningful customer or business value. Breaks down into FEATUREs and STORYs. Fits within a sprint or short cycle. |
| **Example ID** | `EPIC-COM-PLP-PROMOTIONAL-CAROUSEL` |

### EVAL — Evaluation

| | |
|---|---|
| **Prefix** | `EVAL` |
| **Domain** | Portfolio |
| **Description** | A structured options assessment (e.g. build vs buy, feature A vs feature B). Records criteria, options, scores, and the chosen recommendation. |
| **Example ID** | `EVAL-COM-SEARCH-PROVIDER-001` |

### SCORE — Priority Score

| | |
|---|---|
| **Prefix** | `SCORE` |
| **Domain** | Portfolio |
| **Description** | A formal prioritisation score for a backlog item, using a defined scoring model (e.g. RICE, ICE, WSJF). Captures reach, impact, confidence, effort, and the resulting score. |
| **Example ID** | `SCORE-COM-PLP-CAROUSEL-RICE-001` |

### CAPACITY — Capacity Constraint

| | |
|---|---|
| **Prefix** | `CAPACITY` |
| **Domain** | Portfolio |
| **Description** | A documented constraint on team capacity, system throughput, or budget that affects delivery planning. Used to explain gaps or deferrals in the roadmap. |
| **Example ID** | `CAPACITY-ENG-FE-Q1-2026` |

### DEPENDENCY — Dependency

| | |
|---|---|
| **Prefix** | `DEPENDENCY` |
| **Domain** | Portfolio |
| **Description** | A tracked dependency between two objects where one cannot progress without the other. Cross-team or cross-system dependencies are particularly important to track. Distinct from a `depends_on` relationship in that DEPENDENCY is a first-class object with its own status and owner. |
| **Example ID** | `DEPENDENCY-COM-PAY-RAZORPAY-INTEGRATION` |

---

## Domain 3: Product Architecture

Product Architecture objects define the **structure** of the Nuemart product — the hierarchy of products, modules, features, and rules that constitute what has been built.

### PRODUCT — Product

| | |
|---|---|
| **Prefix** | `PRODUCT` |
| **Domain** | Product Architecture |
| **Description** | A top-level product within the Nuemart ecosystem. Currently: Customer App (COM), Admin Console (ADM), Delivery App (DEL). |
| **Example ID** | `PRODUCT-NUEMART-COM-001` |

### MODULE — Module

| | |
|---|---|
| **Prefix** | `MODULE` |
| **Domain** | Product Architecture |
| **Description** | A major functional area of a product. Modules correspond to the top-level navigation sections or backend service boundaries. Nuemart modules: PLP, PDP, CART, CHK, ADDR, FAV, ORDHIS, AUTH, DELIVERY, INVENTORY, REPORTS. |
| **Example ID** | `MODULE-COM-PLP-001` |

### SUBMODULE — Sub-module

| | |
|---|---|
| **Prefix** | `SUBMODULE` |
| **Domain** | Product Architecture |
| **Description** | A named subdivision of a module, used when a module is large enough to warrant internal structure. Example: PLP has sub-modules BANNER, GRID, FILTER, SORT. |
| **Example ID** | `SUBMODULE-COM-PLP-BANNER-001` |

### CAPABILITY — Capability

| | |
|---|---|
| **Prefix** | `CAPABILITY` |
| **Domain** | Product Architecture |
| **Description** | A platform-level ability that may be used across multiple features and modules. Capabilities are not directly visible to users as a single UI element; they underpin multiple features. Example: "Real-time inventory check", "Customer notification dispatch". |
| **Example ID** | `CAPABILITY-COM-REALTIME-INVENTORY-001` |

### FEATURE — Feature

| | |
|---|---|
| **Prefix** | `FEATURE` |
| **Domain** | Product Architecture |
| **Description** | A discrete, deliverable, user-facing (or admin-facing) behaviour. The primary unit of product delivery. Features have owners, acceptance criteria, lifecycle states, and traceability to requirements. |
| **Example ID** | `FEATURE-COM-PLP-CAROUSEL-001` |

### SUBFEATURE — Sub-feature

| | |
|---|---|
| **Prefix** | `SUBFEATURE` |
| **Domain** | Product Architecture |
| **Description** | A distinct component of a FEATURE that can be designed, built, or scoped independently. Used when a feature is large enough that sub-parts need individual tracking. |
| **Example ID** | `SUBFEATURE-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

### CONFIG — Configuration

| | |
|---|---|
| **Prefix** | `CONFIG` |
| **Domain** | Product Architecture |
| **Description** | A configurable system or product parameter. Configs are tunable without code deploys (via env vars, feature flags, or admin console settings). |
| **Example ID** | `CONFIG-COM-PLP-CAROUSEL-SCROLL-SPEED-001` |

### RULE — Rule

| | |
|---|---|
| **Prefix** | `RULE` |
| **Domain** | Product Architecture |
| **Description** | A business rule enforced by the system. Rules define constraints, eligibility, or calculation logic. Example: "Pay Later is only available to verified users with a Nuemart credit score above 600". |
| **Example ID** | `RULE-PAY-PAYLATER-ELIGIBILITY-001` |

### PERMISSION — Permission

| | |
|---|---|
| **Prefix** | `PERMISSION` |
| **Domain** | Product Architecture |
| **Description** | An access control permission grant. Defines what a ROLE can do on a MODULE or FEATURE. |
| **Example ID** | `PERMISSION-ADM-CATALOG-PRICE-EDIT-001` |

---

## Domain 4: Experience

Experience objects model the **human side** of the product — who uses it, how they navigate it, what they see and do.

### PERSONA — Persona

| | |
|---|---|
| **Prefix** | `PERSONA` |
| **Domain** | Experience |
| **Description** | An archetypal user of the Nuemart product, grounded in research. Personas have goals, frustrations, tech comfort, and usage patterns. Every FEATURE should identify which personas it serves. |
| **Example ID** | `PERSONA-COM-HOMECOOK-URBAN-001` |

### ROLE — Role

| | |
|---|---|
| **Prefix** | `ROLE` |
| **Domain** | Experience |
| **Description** | A system role with associated permissions. Roles are assigned to users (Clerk roles). Example roles: Customer, Admin, Catalog Manager, Delivery Agent, Super Admin. |
| **Example ID** | `ROLE-ADM-CATALOG-MANAGER-001` |

### JOURNEY — Journey

| | |
|---|---|
| **Prefix** | `JOURNEY` |
| **Domain** | Experience |
| **Description** | An end-to-end user journey spanning multiple screens and actions. Journeys are the unit of cross-functional design and testing. Example: "Browse → Discover → Add to Cart → Checkout → Receive Order". |
| **Example ID** | `JOURNEY-COM-BROWSE-TO-CHECKOUT-001` |

### SCREEN — Screen

| | |
|---|---|
| **Prefix** | `SCREEN` |
| **Domain** | Experience |
| **Description** | A distinct app screen or page. Screens contain COMPONENTs and are the unit of navigation and design. |
| **Example ID** | `SCREEN-COM-PLP-001` |

### COMPONENT — Component

| | |
|---|---|
| **Prefix** | `COMPONENT` |
| **Domain** | Experience |
| **Description** | A reusable UI component (from the ShadCN / custom component library). Components appear on SCREENs and are the unit of frontend engineering reuse. |
| **Example ID** | `COMPONENT-COM-PRODUCTCARD-001` |

### ACTION — Action

| | |
|---|---|
| **Prefix** | `ACTION` |
| **Domain** | Experience |
| **Description** | A user action on a screen (tap, swipe, type, submit). Actions trigger state changes, API calls, or navigation. |
| **Example ID** | `ACTION-COM-PLP-ADDTOCART-001` |

### STATE — State

| | |
|---|---|
| **Prefix** | `STATE` |
| **Domain** | Experience |
| **Description** | A UI or system state that affects what the user sees or can do. Example states: loading, empty, error, success, partially filled. Every SCREEN should have its key states documented. |
| **Example ID** | `STATE-COM-CART-EMPTY-001` |

### NOTIF — Notification

| | |
|---|---|
| **Prefix** | `NOTIF` |
| **Domain** | Experience |
| **Description** | A notification sent to users — push, in-app, SMS, or email. Notifications have triggers, templates, channels, and opt-out rules. |
| **Example ID** | `NOTIF-COM-ORDER-CONFIRMED-001` |

### CONTENT — Content

| | |
|---|---|
| **Prefix** | `CONTENT` |
| **Domain** | Experience |
| **Description** | Managed content items — promotional banners, marketing copy, onboarding text, help articles. Managed via Admin Console and linked to FEATUREs or SCREENs. |
| **Example ID** | `CONTENT-COM-PLP-BANNER-DIWALI-2026` |

---

## Domain 5: Data & System

Data & System objects model the **technical substrate** of the product — the data, APIs, events, and integrations that power Nuemart.

### ENTITY — Data Entity

| | |
|---|---|
| **Prefix** | `ENTITY` |
| **Domain** | Data & System |
| **Description** | A core data model entity (Convex table or logical domain object). Examples: Product, Order, User, Cart, Address, DeliveryAgent. |
| **Example ID** | `ENTITY-COM-ORDER-001` |

### FIELD — Field

| | |
|---|---|
| **Prefix** | `FIELD` |
| **Domain** | Data & System |
| **Description** | A field on a data entity. Fields have types, constraints, and PII classifications. |
| **Example ID** | `FIELD-COM-ORDER-DELIVERY-ADDRESS-001` |

### API — API / Function

| | |
|---|---|
| **Prefix** | `API` |
| **Domain** | Data & System |
| **Description** | A Convex function (query, mutation, action) or REST endpoint. APIs have input/output schemas, auth requirements, and rate limits. |
| **Example ID** | `API-COM-CART-ADDITEM-001` |

### INTEGRATION — Integration

| | |
|---|---|
| **Prefix** | `INTEGRATION` |
| **Domain** | Data & System |
| **Description** | An integration with an external system or service. Examples: Razorpay (payments), Clerk (auth), Twilio (SMS), Google Maps (delivery routing). |
| **Example ID** | `INTEGRATION-PAY-RAZORPAY-001` |

### EVENT — Event

| | |
|---|---|
| **Prefix** | `EVENT` |
| **Domain** | Data & System |
| **Description** | A domain event emitted when something meaningful happens in the system. Events power notifications, analytics, and workflows. |
| **Example ID** | `EVENT-COM-ORDER-PLACED-001` |

### WORKFLOW — Workflow

| | |
|---|---|
| **Prefix** | `WORKFLOW` |
| **Domain** | Data & System |
| **Description** | A multi-step automated process, often triggered by an EVENT. Example: "Order Placed → Assign Delivery Agent → Notify Customer → Update Inventory". |
| **Example ID** | `WORKFLOW-DEL-ORDER-DISPATCH-001` |

### JOB — Background Job

| | |
|---|---|
| **Prefix** | `JOB` |
| **Domain** | Data & System |
| **Description** | A scheduled or asynchronous background task. Examples: Stock sync from supplier, expired cart cleanup, daily GMV report generation. |
| **Example ID** | `JOB-INV-STOCK-SYNC-DAILY-001` |

### STORAGE — Storage Object

| | |
|---|---|
| **Prefix** | `STORAGE` |
| **Domain** | Data & System |
| **Description** | A file storage bucket, CDN origin, or object storage definition. |
| **Example ID** | `STORAGE-COM-PRODUCT-IMAGES-001` |

### AUDIT — Audit Record

| | |
|---|---|
| **Prefix** | `AUDIT` |
| **Domain** | Data & System |
| **Description** | A system-generated immutable audit trail record for compliance and debugging. |
| **Example ID** | `AUDIT-ADM-PRICE-CHANGE-2026-002` |

---

## Domain 6: Requirement

Requirement objects manage **incoming work definition** — the raw requests, discovery, and structured requirements that feed the product.

### REQUEST — Request

| | |
|---|---|
| **Prefix** | `REQUEST` |
| **Domain** | Requirement |
| **Description** | An incoming request for new work, a change, or a fix. Requests are the entry point into the Product OS. They are grilled, classified, and either approved or rejected. Legacy IDs: REQ-0001, REQ-0002. |
| **Example ID** | `REQUEST-COM-PLP-CAROUSEL-001` |

### PROBLEM — Problem Statement

| | |
|---|---|
| **Prefix** | `PROBLEM` |
| **Domain** | Requirement |
| **Description** | A clearly articulated user, business, or technical problem. Problems are the "why" behind features and requests. A good PROBLEM statement includes: who is affected, what pain they experience, and what evidence supports this. |
| **Example ID** | `PROBLEM-COM-PLP-DISCOVERY-001` |

### OPP — Opportunity

| | |
|---|---|
| **Prefix** | `OPP` |
| **Domain** | Requirement |
| **Description** | An identified opportunity for growth, improvement, or risk reduction. Opportunities are not yet approved work; they are candidates for inclusion in the roadmap. |
| **Example ID** | `OPP-COM-PLP-PROMOTIONAL-DISPLAY-001` |

### DISCOVERY — Discovery Session

| | |
|---|---|
| **Prefix** | `DISCOVERY` |
| **Domain** | Requirement |
| **Description** | A recorded discovery, research, or ideation session. Captures participants, questions explored, findings, and next actions. |
| **Example ID** | `DISCOVERY-COM-GROCERY-BROWSING-001` |

### QUESTION — Open Question

| | |
|---|---|
| **Prefix** | `QUESTION` |
| **Domain** | Requirement |
| **Description** | An unresolved question that must be answered before an object can progress. Questions block lifecycle transitions until resolved. |
| **Example ID** | `QUESTION-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

### ASSUMPTION — Assumption

| | |
|---|---|
| **Prefix** | `ASSUMPTION` |
| **Domain** | Requirement |
| **Description** | A documented assumption made in the absence of data. Assumptions should be validated; unvalidated assumptions at high confidence levels generate risk flags. |
| **Example ID** | `ASSUMPTION-COM-PLP-CAROUSEL-MOBILE-001` |

### REQUIREMENT — Requirement

| | |
|---|---|
| **Prefix** | `REQUIREMENT` |
| **Domain** | Requirement |
| **Description** | A specific, structured product or system requirement (functional or non-functional). Requirements are the building blocks of PRDs. |
| **Example ID** | `REQUIREMENT-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

### PRD — Product Requirements Document

| | |
|---|---|
| **Prefix** | `PRD` |
| **Domain** | Requirement |
| **Description** | A complete Product Requirements Document. A PRD is the primary deliverable of the definition phase. It contains the problem, goals, requirements, scope, acceptance criteria, and open questions for a feature or initiative. Legacy IDs: PRD-0001, PRD-0002. |
| **Example ID** | `PRD-COM-PLP-CAROUSEL-V1` |

### ACCEPTANCE — Acceptance Criterion

| | |
|---|---|
| **Prefix** | `ACCEPTANCE` |
| **Domain** | Requirement |
| **Description** | A single testable criterion that defines what "done" looks like. Written in Given/When/Then format preferred. |
| **Example ID** | `ACCEPTANCE-COM-PLP-CAROUSEL-001` |

### OUTOFSCOPE — Out-of-Scope Item

| | |
|---|---|
| **Prefix** | `OUTOFSCOPE` |
| **Domain** | Requirement |
| **Description** | An explicitly documented item that is NOT in scope for a given feature or PRD. Out-of-scope items prevent scope creep and are referenced in change requests. |
| **Example ID** | `OUTOFSCOPE-COM-PLP-CAROUSEL-VIDEO-001` |

---

## Domain 7: Delivery

Delivery objects manage the **execution** — the stories, tasks, prompts, and builds that implement the product.

### STORY — User Story

| | |
|---|---|
| **Prefix** | `STORY` |
| **Domain** | Delivery |
| **Description** | An As a [user] / I want [goal] / So that [benefit] story. The primary unit of sprint planning. Stories implement FEATUREs and are tested against ACCEPTANCEs. Legacy IDs: US-0001–US-0014. |
| **Example ID** | `STORY-COM-PLP-CAROUSEL-001` |

### TASK — Development Task

| | |
|---|---|
| **Prefix** | `TASK` |
| **Domain** | Delivery |
| **Description** | A technical implementation task breaking down a STORY. Tasks are atomic engineering work items. |
| **Example ID** | `TASK-COM-PLP-CAROUSEL-CONVEX-QUERY-001` |

### PROMPT — AI Coding Prompt

| | |
|---|---|
| **Prefix** | `PROMPT` |
| **Domain** | Delivery |
| **Description** | A structured AI coding prompt used to generate or modify code. PROMPTs are the primary interface between product definition and AI-assisted engineering in the Nuemart workflow. |
| **Example ID** | `PROMPT-COM-PLP-CAROUSEL-COMPONENT-001` |

### DEVPLAN — Implementation Plan

| | |
|---|---|
| **Prefix** | `DEVPLAN` |
| **Domain** | Delivery |
| **Description** | A phased engineering implementation plan. DEVPLANs describe the sequence of implementation phases, tech approach, dependencies, and risks. Legacy IDs: DEVPLAN-0001, DEVPLAN-0002. |
| **Example ID** | `DEVPLAN-COM-PLP-CAROUSEL-001` |

### PR — Pull Request Reference

| | |
|---|---|
| **Prefix** | `PR` |
| **Domain** | Delivery |
| **Description** | A reference to a git pull request. Links the code change to the STORY or TASK it implements. |
| **Example ID** | `PR-COM-PLP-CAROUSEL-001` |

### BUILD — Build

| | |
|---|---|
| **Prefix** | `BUILD` |
| **Domain** | Delivery |
| **Description** | A specific build artefact or deployment event. Builds are linked to QA runs and releases. |
| **Example ID** | `BUILD-2026-02-14-001` |

### BLOCKER — Blocker

| | |
|---|---|
| **Prefix** | `BLOCKER` |
| **Domain** | Delivery |
| **Description** | A tracked impediment preventing a STORY, TASK, or FEATURE from progressing. Blockers have owners, urgency levels, and resolution records. |
| **Example ID** | `BLOCKER-COM-PLP-CAROUSEL-001` |

### CHANGELOG — Change Log

| | |
|---|---|
| **Prefix** | `CHANGELOG` |
| **Domain** | Delivery |
| **Description** | A structured change log entry recording what changed, why, and when for a feature, module, or release. |
| **Example ID** | `CHANGELOG-COM-PLP-CAROUSEL-001` |

### INCOMPLETE — Incomplete Work Item

| | |
|---|---|
| **Prefix** | `INCOMPLETE` |
| **Domain** | Delivery |
| **Description** | Work that was planned for a sprint or cycle but was not completed. Incompletes are tracked, carry-forwarded, and reviewed in retrospectives. |
| **Example ID** | `INCOMPLETE-COM-PLP-CAROUSEL-001` |

---

## Domain 8: Quality

Quality objects ensure every delivery is validated before and after release.

### TESTPLAN — Test Plan

| | |
|---|---|
| **Prefix** | `TESTPLAN` |
| **Domain** | Quality |
| **Description** | A complete test plan for a feature, epic, or release. Includes scope, test types (unit, integration, E2E, manual), test cases, environments, and pass/fail criteria. |
| **Example ID** | `TESTPLAN-COM-PLP-CAROUSEL-001` |

### TEST — Test Case

| | |
|---|---|
| **Prefix** | `TEST` |
| **Domain** | Quality |
| **Description** | An individual test case with preconditions, steps, expected result, and actual result. Maps to an ACCEPTANCE criterion. |
| **Example ID** | `TEST-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

### BUG — Bug

| | |
|---|---|
| **Prefix** | `BUG` |
| **Domain** | Quality |
| **Description** | A defect found during testing or in production. Bugs have severity, priority, reproduction steps, and a fix reference. Legacy IDs: BUG-NNN. |
| **Example ID** | `BUG-COM-PLP-CAROUSEL-OVERLAP-001` |

### REGRISK — Regression Risk

| | |
|---|---|
| **Prefix** | `REGRISK` |
| **Domain** | Quality |
| **Description** | An identified area of the product at risk of regression due to a change. Regression risks drive test prioritisation. |
| **Example ID** | `REGRISK-COM-PLP-GRID-001` |

### QA — QA Run

| | |
|---|---|
| **Prefix** | `QA` |
| **Domain** | Quality |
| **Description** | A QA execution run against a specific BUILD. Records pass/fail per TEST case, overall status, and the QA engineer's sign-off. Legacy IDs: QA-0001. |
| **Example ID** | `QA-COM-PLP-CAROUSEL-001` |

### UAT — UAT Run

| | |
|---|---|
| **Prefix** | `UAT` |
| **Domain** | Quality |
| **Description** | A User Acceptance Testing run. Conducted by PM or business stakeholders against ACCEPTANCE criteria. Records sign-off status. Legacy IDs: UAT-0001. |
| **Example ID** | `UAT-COM-PLP-CAROUSEL-001` |

### SIGNOFF — Sign-off

| | |
|---|---|
| **Prefix** | `SIGNOFF` |
| **Domain** | Quality |
| **Description** | A formal sign-off record for a QA run, UAT run, or release. Records who signed off, when, and any conditions. |
| **Example ID** | `SIGNOFF-COM-PLP-CAROUSEL-001` |

### LIMITATION — Known Limitation

| | |
|---|---|
| **Prefix** | `LIMITATION` |
| **Domain** | Quality |
| **Description** | A documented known limitation of a feature or release. Limitations are communicated to stakeholders and linked to ENHANCEMENTs for future resolution. |
| **Example ID** | `LIMITATION-COM-PLP-CAROUSEL-IE11-001` |

---

## Domain 9: Release & Operations

Release & Operations objects manage the **go-live and post-live** phases.

### RELEASE — Release

| | |
|---|---|
| **Prefix** | `RELEASE` |
| **Domain** | Release & Operations |
| **Description** | A product release event. Links all FEATUREs, BUILDs, QA runs, and UAT runs included in the release. Has a release checklist and rollback plan. |
| **Example ID** | `RELEASE-2026-02-14-V1` |

### RELNOTE — Release Note

| | |
|---|---|
| **Prefix** | `RELNOTE` |
| **Domain** | Release & Operations |
| **Description** | Customer-facing or internal release notes describing what changed, why, and any actions required. |
| **Example ID** | `RELNOTE-2026-02-14-001` |

### ROLLBACK — Rollback Plan

| | |
|---|---|
| **Prefix** | `ROLLBACK` |
| **Domain** | Release & Operations |
| **Description** | A documented rollback procedure for a release. Includes triggers, steps, owner, and communication plan. |
| **Example ID** | `ROLLBACK-2026-02-14-V1` |

### INCIDENT — Incident

| | |
|---|---|
| **Prefix** | `INCIDENT` |
| **Domain** | Release & Operations |
| **Description** | A production incident record. Includes timeline, impact, root cause, fix, and post-mortem reference. |
| **Example ID** | `INCIDENT-COM-2026-02-20-001` |

### ENHANCEMENT — Enhancement

| | |
|---|---|
| **Prefix** | `ENHANCEMENT` |
| **Domain** | Release & Operations |
| **Description** | A post-release improvement request arising from production feedback, incidents, or monitoring signals. Enhancements are candidates for the next cycle. |
| **Example ID** | `ENHANCEMENT-COM-PLP-CAROUSEL-001` |

### REVIEW — Post-release Review

| | |
|---|---|
| **Prefix** | `REVIEW` |
| **Domain** | Release & Operations |
| **Description** | A structured post-release retrospective assessing what went well, what did not, and what to improve. Links to KPIs and BETs to validate outcomes. |
| **Example ID** | `REVIEW-2026-02-14-V1` |

### MONITOR — Monitoring Signal

| | |
|---|---|
| **Prefix** | `MONITOR` |
| **Domain** | Release & Operations |
| **Description** | A monitoring alert or signal definition. Defines the metric, threshold, alert channel, and owner. |
| **Example ID** | `MONITOR-COM-PLP-CAROUSEL-CTR-001` |

### PLAYBOOK — Support Playbook

| | |
|---|---|
| **Prefix** | `PLAYBOOK` |
| **Domain** | Release & Operations |
| **Description** | A support or operations runbook for handling a known class of issue. |
| **Example ID** | `PLAYBOOK-COM-ORDER-CANCELLATION-001` |

---

## Domain 10: Governance

Governance objects enforce **process, compliance, and decision-making quality** across the Product OS.

### GATE — Approval Gate

| | |
|---|---|
| **Prefix** | `GATE` |
| **Domain** | Governance |
| **Description** | A formal approval gate in the product process. Gates block lifecycle transitions until the required approvals and checks are complete. |
| **Example ID** | `GATE-PRD-APPROVAL-001` |

### DECISION — Decision

| | |
|---|---|
| **Prefix** | `DECISION` |
| **Domain** | Governance |
| **Description** | A formal record of a product, design, or technical decision. Includes options considered, rationale, and the decision made. Decisions are immutable once Made. |
| **Example ID** | `DECISION-COM-PLP-CAROUSEL-AUTOSCROLL-001` |

### POLICY — Policy

| | |
|---|---|
| **Prefix** | `POLICY` |
| **Domain** | Governance |
| **Description** | A product or engineering policy that must be followed. Policies govern data handling, security, accessibility, and process. |
| **Example ID** | `POLICY-DATA-PII-HANDLING-001` |

### CLASSRULE — Classification Rule

| | |
|---|---|
| **Prefix** | `CLASSRULE` |
| **Domain** | Governance |
| **Description** | A rule used by the AI agent or PM to classify objects into the correct type. Prevents misclassification. |
| **Example ID** | `CLASSRULE-FEATURE-VS-CAPABILITY-001` |

### IDRULE — ID Rule

| | |
|---|---|
| **Prefix** | `IDRULE` |
| **Domain** | Governance |
| **Description** | A rule governing how semantic IDs are assigned, formatted, and sequenced. |
| **Example ID** | `IDRULE-SEQUENCE-ASSIGNMENT-001` |

### LCRULE — Lifecycle Rule

| | |
|---|---|
| **Prefix** | `LCRULE` |
| **Domain** | Governance |
| **Description** | A rule governing what lifecycle transitions are allowed, and what gates or checks are required at each transition. |
| **Example ID** | `LCRULE-FEATURE-QA-GATE-001` |

### RISKRULE — Risk Rule

| | |
|---|---|
| **Prefix** | `RISKRULE` |
| **Domain** | Governance |
| **Description** | A rule that defines when a risk assessment is required or when a risk level is automatically assigned. |
| **Example ID** | `RISKRULE-PAYMENT-CHANGES-001` |

### COMPRULE — Compliance Rule

| | |
|---|---|
| **Prefix** | `COMPRULE` |
| **Domain** | Governance |
| **Description** | A compliance or regulatory rule derived from legal, privacy, or security requirements. |
| **Example ID** | `COMPRULE-INDIA-DATA-LOCALISATION-001` |

---

## Domain 11: Intelligence

Intelligence objects make the **AI layer** of the Product OS first-class and auditable.

### AGENT — AI Agent

| | |
|---|---|
| **Prefix** | `AGENT` |
| **Domain** | Intelligence |
| **Description** | A defined AI agent within the Product OS. Each agent has a role, capabilities, tools it can call, and a governance owner. |
| **Example ID** | `AGENT-PRODUCT-OS-CLASSIFIER-001` |

### AIFLOW — AI Workflow

| | |
|---|---|
| **Prefix** | `AIFLOW` |
| **Domain** | Intelligence |
| **Description** | A multi-step AI-driven workflow that chains agent actions to produce a product artefact (e.g. Request → Grilling → PRD → Stories). |
| **Example ID** | `AIFLOW-REQUEST-TO-PRD-001` |

### AIPROMPT — AI Prompt Template

| | |
|---|---|
| **Prefix** | `AIPROMPT` |
| **Domain** | Intelligence |
| **Description** | A reusable, versioned prompt template used by AI agents in the Product OS. Templates are governed and tested before use. |
| **Example ID** | `AIPROMPT-GRILLING-TEMPLATE-001` |

### TRACE — AI Reasoning Trace

| | |
|---|---|
| **Prefix** | `TRACE` |
| **Domain** | Intelligence |
| **Description** | A full recorded reasoning trace from an AI agent action. Provides transparency and auditability for AI-generated content. |
| **Example ID** | `TRACE-COM-PLP-CAROUSEL-CLASSIFY-001` |

### CONFIDENCE — Confidence Score

| | |
|---|---|
| **Prefix** | `CONFIDENCE` |
| **Domain** | Intelligence |
| **Description** | A formal confidence score record with methodology, components, and the resulting score. Used for AI classification, estimation, and recommendation objects. |
| **Example ID** | `CONFIDENCE-COM-PLP-CAROUSEL-001` |

### EVIDENCE — Evidence Link

| | |
|---|---|
| **Prefix** | `EVIDENCE` |
| **Domain** | Intelligence |
| **Description** | A first-class link between a claim (in any object) and the evidence that supports it. Evidence links improve AI confidence and audit quality. |
| **Example ID** | `EVIDENCE-COM-PLP-CAROUSEL-001` |

### RECOMMEND — Recommendation

| | |
|---|---|
| **Prefix** | `RECOMMEND` |
| **Domain** | Intelligence |
| **Description** | An AI-generated recommendation for action — e.g. "Prioritise this feature because KPI-X is below target." Recommendations require PM acknowledgement. |
| **Example ID** | `RECOMMEND-COM-PLP-001` |

### CONFLICT — Conflict

| | |
|---|---|
| **Prefix** | `CONFLICT` |
| **Domain** | Intelligence |
| **Description** | A detected conflict between two or more objects — e.g. two requirements that contradict each other, or two features with overlapping scope. Conflicts must be resolved before delivery. |
| **Example ID** | `CONFLICT-COM-PLP-CAROUSEL-GRID-001` |

### GAP — Gap

| | |
|---|---|
| **Prefix** | `GAP` |
| **Domain** | Intelligence |
| **Description** | A detected gap in coverage or definition — e.g. a FEATURE with no acceptance criteria, a REQUEST with no linked PRD, or a module with no test plan. Gaps are surfaced as governance actions. |
| **Example ID** | `GAP-COM-PLP-CAROUSEL-TESTPLAN-001` |

---

## Governance Notes

1. **Adding new types:** Submit a `REQUEST-GOV-OS-OBJECTTYPE-NNN`. Must include: proposed type, prefix, domain, description, example ID, and justification for why an existing type does not suffice.
2. **Deprecating types:** Types cannot be deleted once used. Deprecated types remain in the registry marked `Status: Deprecated`. Existing objects of that type retain their IDs.
3. **Prefix conflicts:** No two types may share a prefix. The registry is the authoritative source for prefix allocation.
4. **Domain assignment:** Domain assignment for a type is fixed at creation. If a type spans domains, it belongs to the domain it most tightly services.

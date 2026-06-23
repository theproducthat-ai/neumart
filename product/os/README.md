# Nuemart Enterprise Product OS — Overview

**Version:** 2.0
**Date:** 2026-06-22

---

This is the home of the Nuemart Enterprise Product Operating System (Product OS). Version 2.0 restructured the Product OS from a folder/document model to an enterprise object-centric model.

---

## What is the Product OS?

The Nuemart Product OS is the complete operating model for product management at Nuemart. It provides:

- A structured way to capture, classify, and track every product concept as a **Product Object**
- AI-powered reasoning for classification, impact assessment, traceability, and gap detection
- Enterprise-grade governance with approval gates, policies, and lifecycle rules
- Full traceability from business goals through to releases
- **Feature-level permanent product knowledge** — not just request-level transient records

The Product OS connects every piece of product work — from an initial idea through grilling, PRD, stories, dev plans, QA, UAT, and release — into a single traceable graph.

---

## Directory Structure

```
product/
├── os/                        ← You are here — operating model
│   ├── ontology/              ← Object schema, types, relationships, lifecycles
│   ├── intelligence/          ← AI agents and reasoning engines
│   ├── policies/              ← Governance, gates, ID rules, risk rules
│   ├── interfaces/            ← How slash commands operate on objects
│   ├── templates/             ← Object templates for new creation
│   ├── README.md              ← This file
│   └── MIGRATION_FROM_LEGACY_PRODUCT_OS.md
│
├── objects/                   ← Source of truth — all Product Objects
│   ├── features/              ← Feature Objects (permanent product knowledge)
│   ├── requests/              ← Request Objects (workflow inputs)
│   ├── prds/                  ← PRD Objects
│   ├── stories/               ← User Story Objects
│   ├── modules/               ← Module Objects
│   ├── qa-runs/               ← QA Run Objects
│   ├── uat-runs/              ← UAT Run Objects
│   ├── releases/              ← Release Objects
│   ├── discovery/             ← Discovery / Grilling Objects
│   ├── risks/                 ← Risk and Impact Objects
│   ├── tasks/                 ← Development Task Objects
│   ├── prompts/               ← Build Prompt Objects
│   ├── bugs/                  ← Bug Objects
│   ├── incidents/             ← Post-release Incident Objects
│   ├── enhancements/          ← Enhancement Request Objects
│   ├── decisions/             ← Decision Objects
│   └── [other object type folders as needed]
│
├── graph/                     ← Relationship and traceability indexes
│   ├── OBJECT_INDEX.md        ← Master index of all Product Objects
│   ├── FEATURE_MASTER.md      ← Master feature tracking table
│   ├── TRACEABILITY_MAP.md    ← Goal → Feature → Story → Release chains
│   ├── MODULE_MAP.md          ← Module and sub-module relationships
│   ├── SCREEN_MAP.md          ← Screen registry and feature mappings
│   ├── DECISION_MAP.md        ← All architectural decisions
│   ├── IMPACT_MAP.md          ← Impact and risk tracking
│   ├── DATA_ENTITY_MAP.md     ← Data entities and ownership
│   └── [other graph indexes as needed]
│
├── views/                     ← Derived human-readable summaries
│   ├── ACTIVE_WORK_VIEW.md    ← What is being worked on right now
│   ├── FEATURE_VIEW.md        ← All features (active, candidate, shipped)
│   ├── REQUEST_VIEW.md        ← All requests and their pipeline status
│   ├── MODULE_VIEW.md         ← All modules and sub-modules
│   ├── ROADMAP_VIEW.md        ← Now / Next / Later roadmap
│   ├── QA_VIEW.md             ← QA runs, bugs, regression risk areas
│   ├── RELEASE_VIEW.md        ← Active and completed releases
│   ├── INCOMPLETE_WORK_VIEW.md← Deferred, descoped, and blocked items
│   └── EXECUTIVE_VIEW.md      ← High-level stakeholder summary
│
└── archive/                   ← Legacy files (not yet migrated)
    └── legacy-product-os/     ← Archive placeholder (files still in original locations)
```

---

## Architecture Principles

1. **`product/objects/` is the source of truth.** Every product concept — feature, request, PRD, story, QA run, release — must have a Product Object file. Objects contain YAML frontmatter with typed relationships and lifecycle metadata.

2. **`product/graph/` is the relationship layer.** Graph indexes are derived from object relationships and provide fast lookup across the product graph. If a graph index conflicts with an object file, the object file wins.

3. **`product/views/` is derived.** Views are human-readable summaries derived from objects and graph indexes. If a view conflicts with an object, the object wins. Views are updated after each slash command run.

4. **`product/os/` is the operating model.** The ontology defines what objects exist and how they relate. Policies define governance rules and gates. Intelligence defines AI reasoning behaviors. Interfaces define how slash commands map to object operations.

5. **Legacy files coexist.** Files in `product/00-product-foundation/` through `product/99-operating-system/` remain valid. Do not delete them. Migrate them to objects incrementally.

---

## Key Entry Points

| Task | Where to go |
|---|---|
| Start new product work | `/product-request` |
| Understand current state | `/product-resume` |
| Find a feature | `product/graph/FEATURE_MASTER.md` |
| Trace a feature end-to-end | `product/graph/TRACEABILITY_MAP.md` |
| See what is being worked on now | `product/views/ACTIVE_WORK_VIEW.md` |
| See the roadmap | `product/views/ROADMAP_VIEW.md` |
| Create a new object | `product/os/templates/` |
| Understand governance gates | `product/os/policies/GOVERNANCE_POLICY.md` |
| Look up ID rules | `product/os/policies/NOMENCLATURE_AND_ID_SYSTEM.md` |
| Understand the migration | `product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md` |

---

## Backward Compatibility

Legacy files in `product/00-product-foundation/` through `product/99-operating-system/` remain active and valid. All legacy IDs (REQ-0001, PRD-0001, US-0001, etc.) remain usable — they are stored as `legacy_id` fields in new Product Objects.

See `product/os/MIGRATION_FROM_LEGACY_PRODUCT_OS.md` for the complete mapping of legacy folders, files, and IDs to their new system equivalents, and for the recommended migration sequence.

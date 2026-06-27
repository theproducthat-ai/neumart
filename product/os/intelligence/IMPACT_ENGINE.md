# IMPACT_ENGINE.md — Superseded

**Status:** SUPERSEDED — Read-only  
**Superseded by:** `IMPACT_GATE_ENGINE.md`  
**Date superseded:** 2026-06-24

---

This file has been renamed to `IMPACT_GATE_ENGINE.md` as part of the Product OS V2 structural cleanup (2026-06-24). The content has been preserved in full under the new name with updated header and clarified scope.

**Do not use this file.** Use `IMPACT_GATE_ENGINE.md` instead.

---

## Why It Was Renamed

The original `IMPACT_ENGINE.md` name was ambiguous alongside the newer `IMPACT_ANALYSIS_ENGINE.md`. The rename makes the distinction clear:

| File | Scope | When to Use |
|---|---|---|
| `IMPACT_GATE_ENGINE.md` | Stage-gate impact checks per request/feature — 12 categories, triggers governance gates, creates Risk and Dependency objects | At G3, G4, G5, G6, G7 gates |
| `IMPACT_ANALYSIS_ENGINE.md` | Strategic blast-radius analysis — cross-module impact, NFR risk, data flow, roadmap dependencies | Before planning starts on complex or cross-module work |

See `PRODUCT_IMPACT_INTERFACE.md` for the `/product-impact` command which invokes both engines at the appropriate workflow step.

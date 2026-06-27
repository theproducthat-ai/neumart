# Experiments

**Object type**: `experiment`  
**ID prefix**: `EXP-`  
**ID format**: `EXP-NNNN`  
**Owner**: Product Manager  
**Template**: `product/os/templates/EXPERIMENT_OBJECT_TEMPLATE.md`

## What Belongs Here

Experiment objects — structured A/B tests, multivariate tests, or feature experiments. Each experiment has a hypothesis, control/variant definition, success metric, and results.

## When to Create

- A feature change needs validated impact before full rollout
- A UX change needs evidence before committing to it
- An experiment work lane is used

## Required Relationships

- **For**: `features/`
- **Uses**: `feature-flags/` (for rollout control)
- **Measures**: `metrics/`
- **Informs**: `decisions/`
- **Logged in**: `analytics/EXPERIMENT_LOG.md`

## Lifecycle / Statuses

`hypothesis` → `designed` → `running` → `analysed` → `decision-made` | `inconclusive` | `stopped-early`

## Required Fields

`id`, `title`, `status`, `hypothesis`, `control`, `variant`, `success_metric`, `guardrail_metric`, `sample_size`, `duration`, `results`, `decision`, `owner`, `created_date`

## Example IDs

- `EXP-0001` — First experiment
- `EXP-0002` — Carousel variant test

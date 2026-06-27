# Experiment Log

**Version**: 2.0  
**Owner**: Product Lead  
**Updated**: Review monthly

---

## Purpose

A living register of all A/B experiments and feature experiments run on Neumart. Used to prevent duplicate experiments, track active tests, and maintain an institutional memory of what was learned.

---

## Active Experiments

_Experiments currently running or in setup._

| ID | Experiment Name | Hypothesis | Start Date | End Date | Status | Owner |
|---|---|---|---|---|---|---|
| — | _(no active experiments)_ | — | — | — | — | — |

---

## Completed Experiments

_Experiments that have concluded with a result._

| ID | Experiment Name | Result | Key Finding | Feature Outcome | Completed Date |
|---|---|---|---|---|---|
| — | _(no completed experiments yet)_ | — | — | — | — |

---

## Experiment Entry Format

When adding a new experiment:

**Active:**
```
| EXP-XXXX | [Name] | [Hypothesis summary] | [YYYY-MM-DD] | [YYYY-MM-DD] | [Setup/Running/Paused] | [Owner] |
```

**Completed:**
```
| EXP-XXXX | [Name] | [Win/Loss/Inconclusive] | [One-sentence finding] | [Shipped/Reverted/Redesigned] | [YYYY-MM-DD] |
```

---

## Experiment Rules Summary

1. Only one experiment at a time per major user flow (to avoid interference)
2. Minimum run duration: 2 weeks (to account for weekly patterns)
3. Minimum statistical significance: p < 0.05 before calling a winner
4. Do not stop experiments early because the result looks good
5. Full experiment objects in `product/objects/experiments/EXP-XXXX.md`

---

## What We Have Learned

_Summary of key learnings from completed experiments — updated quarterly._

_No experiments completed yet. As experiments conclude, add key learnings here as a reference for future hypothesis generation._

---

## Related Documents

- [FEATURE_MEASUREMENT_RULES.md](FEATURE_MEASUREMENT_RULES.md)
- `product/objects/experiments/`
- `product/os/templates/EXPERIMENT_OBJECT_TEMPLATE.md`

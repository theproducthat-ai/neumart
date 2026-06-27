# Feature Measurement Rules

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Defines the rules for measuring whether a feature is working as intended after release. Every significant feature must have a measurement plan before it goes live.

---

## When a Measurement Plan Is Required

| Release Type | Measurement Plan Required? |
|---|---|
| Strategic Initiative | Yes — mandatory |
| Standard Feature | Yes — mandatory |
| Experiment | Yes — mandatory (experiment-specific format) |
| Small Enhancement | Recommended if metric-impacting |
| Fast Fix / Bug fix | No |

A measurement plan must be completed and linked to the release object before release sign-off.

---

## Measurement Plan Contents

Every measurement plan must include:

### 1. Success Metrics
What will you measure to know if the feature worked?
- Must be specific, measurable, and time-bound
- Must be linked to a metric in [METRIC_DICTIONARY.md](METRIC_DICTIONARY.md) or a new metric must be added
- Must include: metric name, current baseline, target, measurement period

### 2. Guardrail Metrics
What metrics must NOT degrade? Guardrail failures trigger immediate investigation.
- Must cover: error rate, performance metrics, core funnel metrics that could be affected

### 3. Analytics Events
Which events will be tracked? All events must be in [EVENT_TAXONOMY.md](EVENT_TAXONOMY.md) before implementation.

### 4. Instrumentation Checklist
- [ ] Events implemented in code
- [ ] Events verified in staging
- [ ] Dashboard exists or will be created for this feature
- [ ] Monitoring alerts configured

---

## Measurement Timeline

| Stage | Action |
|---|---|
| Pre-release | Establish baseline for all success metrics |
| Day 1 post-release | Verify tracking is working |
| Day 3 | First read of key metrics |
| End of hypercare | Full measurement review |
| 30 days post-release | Success/failure decision |
| 90 days post-release | Long-term retention assessment |

---

## Success vs. Failure

A feature is a success when:
- Success metrics have improved from baseline by the target amount within the measurement period
- Guardrail metrics have not degraded
- No unresolved P1/P2 incidents caused by the feature

A feature is inconclusive when:
- Not enough data to determine impact (extend measurement period)
- External factors confound the measurement (note and account for them)

A feature has failed when:
- Success metrics have not improved after the full measurement period
- OR guardrail metrics have degraded and the degradation is attributable to the feature

---

## What to Do After Measurement

| Outcome | Action |
|---|---|
| Success | Document in feature object, feed into investment theme review |
| Inconclusive | Extend measurement period or redesign with more targeted approach |
| Failure | Document learnings, consider reverting or redesigning |
| Guardrail breach | Immediate Engineering response, feature flag off if needed |

**Every measurement outcome must be documented in the feature object** — even failures. Failed experiments are valuable learning.

---

## Experiment-Specific Measurement

For A/B experiments:
- Minimum sample size and statistical significance (p < 0.05) must be calculated before starting
- Minimum run duration must be defined before starting (usually 2+ weeks to avoid novelty effects)
- Do not peek at results early and make decisions — wait for the pre-defined end condition
- See `product/os/templates/EXPERIMENT_OBJECT_TEMPLATE.md`

---

## Related Documents

- [METRIC_DICTIONARY.md](METRIC_DICTIONARY.md)
- [EVENT_TAXONOMY.md](EVENT_TAXONOMY.md)
- [EXPERIMENT_LOG.md](EXPERIMENT_LOG.md)
- `product/os/templates/MEASUREMENT_PLAN_TEMPLATE.md`

# Hypercare Rules

**Version**: 2.0  
**Owner**: Product Lead / Operations Lead

---

## What Is Hypercare?

Hypercare is a structured, elevated monitoring and support period immediately after a significant release. The goal is to catch and resolve issues quickly before they compound, and to confirm the feature is performing as designed.

---

## When Hypercare Is Required

| Release Type | Hypercare Required? | Default Duration |
|---|---|---|
| Strategic Initiative | Yes | 10 business days |
| Standard Feature (new customer-facing) | Yes | 5 business days |
| Small Enhancement (significant UX change) | Optional (Product Lead decides) | 2-3 business days |
| Small Enhancement (minor) | No | — |
| Fast Fix / Bug fix | No | — |

---

## Hypercare Ownership

| Role | Hypercare Responsibility |
|---|---|
| Product Lead | Leads hypercare, owns exit decision |
| Engineering Lead | On standby for rapid fixes, monitors technical metrics |
| Support Lead | Elevated first-line triage, tracks support volume |
| Operations Lead | Oversees operational metrics, coordinates customer communication |

---

## Hypercare Activities

### Daily (every business day during hypercare)

- [ ] Review support ticket volume for the new feature
- [ ] Review error rates and performance metrics
- [ ] Review key product metrics (see measurement plan in release object)
- [ ] Engineering confirms no new alerts triggered overnight
- [ ] Product Lead hosts a brief daily check-in (15 minutes max)

### Immediate (within 2 hours of any P2+ issue)

- [ ] Classify severity (see [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md))
- [ ] Engineering Lead and Product Lead engage
- [ ] Decision: fix forward, feature flag off, or rollback
- [ ] Customer communication if impacted (Operations Lead)

---

## Hypercare Metrics to Watch

These should be defined in the feature's measurement plan, but at minimum monitor:

| Metric | What to Watch For |
|---|---|
| Error rate | Spike above baseline |
| Page load time | Degradation vs. pre-release |
| Support ticket volume | Spike for feature-related contacts |
| Core funnel completion (if affected) | Drop in conversion |
| Feature adoption | Is anyone using it? (sanity check) |

---

## Escalation During Hypercare

During hypercare, the escalation path is shortened:
- P3 issues are reviewed daily (not queued to sprint planning)
- P2 issues trigger an immediate sync (not just Slack)
- Product Lead has authority to fast-track fixes without going through normal prioritisation

---

## Hypercare Exit Criteria

Hypercare ends when **all** of the following are true:
- [ ] Error rate is at or below pre-release baseline
- [ ] No P1/P2 incidents triggered in the last 3 business days
- [ ] Support ticket volume for the feature is at expected level or declining
- [ ] Core success metrics are trending in the right direction
- [ ] Product Lead formally closes hypercare

---

## Hypercare Exit Process

1. Product Lead reviews exit criteria (final hypercare daily check)
2. Engineering Lead confirms no open P1/P2 issues
3. Support Lead confirms ticket volume is stable
4. Product Lead closes hypercare and notifies stakeholders
5. Post-release review scheduled (see `team-operating-model/POST_RELEASE_REVIEW.md`)

---

## Failed Hypercare

If during hypercare a critical issue cannot be resolved quickly:
1. Product Lead and Engineering Lead decide: fix forward or rollback
2. If rollback: feature flag turned off, rollback executed per [BRANCHING_AND_RELEASE_RULES.md](../engineering/BRANCHING_AND_RELEASE_RULES.md)
3. RCA opened even if severity was P2/P3
4. Re-release is treated as a new release with full operations readiness

---

## Related Documents

- [INCIDENT_SEVERITY_MATRIX.md](INCIDENT_SEVERITY_MATRIX.md)
- [OPERATIONS_READINESS_CHECKLIST.md](OPERATIONS_READINESS_CHECKLIST.md)
- [SUPPORT_HANDOVER_RULES.md](SUPPORT_HANDOVER_RULES.md)
- `product/engineering/BRANCHING_AND_RELEASE_RULES.md`
- `product/engineering/FEATURE_FLAG_RULES.md`

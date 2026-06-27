# Operations Readiness Checklist

**Version**: 2.0  
**Owner**: Operations Lead

---

## Purpose

Confirms that operations is ready to support a release before it goes live. This checklist is completed by the Operations Lead and linked to the release object.

Operations readiness is a **release gate** — release cannot proceed without Operations Lead sign-off.

---

## When This Checklist Is Required

| Release Type | Operations Readiness Required? |
|---|---|
| Standard Feature (new customer-facing) | Yes |
| Strategic Initiative | Yes |
| Incident / Emergency patch | At Operations Lead discretion |
| Small Enhancement | Yes (lightweight review) |
| Fast Fix / Bug fix (no UX change) | No |
| Admin-only change | No |
| Backend-only change | No |

---

## Pre-Release Checklist

### Support Readiness
- [ ] Support handover document delivered and signed off by Support Lead
- [ ] Support team briefed on what is changing
- [ ] Known edge cases and error messages documented
- [ ] Escalation path confirmed for new feature issues
- [ ] Workarounds documented for any known limitations

### Operations Readiness
- [ ] Runbook updated (if relevant — for operational process changes)
- [ ] Any operational configuration changes applied to staging and verified
- [ ] Any third-party vendor changes confirmed ready (e.g., payment gateway, logistics provider)
- [ ] Monitoring alerts configured for new feature metrics
- [ ] On-call schedule confirmed for release window and hypercare period

### Communication Readiness
- [ ] Internal stakeholders notified of go-live date and time
- [ ] Customer communication prepared (if customer-facing change)
- [ ] Status page updated or ready to update
- [ ] Account managers briefed on client-impacting changes

### Rollback Readiness
- [ ] Feature flag confirmed operational (if in use)
- [ ] Rollback procedure reviewed and documented in release object
- [ ] Operations Lead knows who to contact to initiate rollback

---

## Release Day Checklist

- [ ] Operations Lead on standby during release window
- [ ] Support Lead on standby during release window
- [ ] Post-deployment smoke test completed
- [ ] Initial monitoring review completed (15 minutes post-release)
- [ ] No P1/P2 incidents triggered
- [ ] Operations Lead provides go/no-go confirmation

---

## Post-Release (Hypercare)

- [ ] Hypercare monitoring schedule in place (see [HYPERCARE_RULES.md](HYPERCARE_RULES.md))
- [ ] Daily hypercare check-in scheduled with Product Lead
- [ ] Support contact volume being tracked for new feature
- [ ] Escalation path shortened during hypercare (documented)
- [ ] Hypercare exit criteria agreed

---

## Sign-Off

| Role | Name | Sign-off Date | Notes |
|---|---|---|---|
| Operations Lead | | | |
| Support Lead | | | |

---

## Related Documents

- [SUPPORT_HANDOVER_RULES.md](SUPPORT_HANDOVER_RULES.md)
- [HYPERCARE_RULES.md](HYPERCARE_RULES.md)
- [ESCALATION_MATRIX.md](ESCALATION_MATRIX.md)
- `product/engineering/BRANCHING_AND_RELEASE_RULES.md`

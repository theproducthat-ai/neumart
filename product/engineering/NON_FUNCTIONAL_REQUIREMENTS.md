# Non-Functional Requirements

**Version**: 2.0  
**Owner**: Engineering Lead

---

## System-Wide NFRs

These apply to all production features of the Neumart platform.

### Performance
| Requirement | Target |
|---|---|
| Page load time (initial) | < 3 seconds on 4G mobile |
| API response time (p95) | < 500ms |
| API response time (p99) | < 2000ms |
| Time to interactive | < 5 seconds on 4G mobile |

### Availability
| Requirement | Target |
|---|---|
| Production uptime | 99.5% monthly |
| Planned maintenance window | Off-peak hours, max 2hrs/month with notice |

### Reliability
| Requirement | Target |
|---|---|
| Payment success rate | > 99% of initiated payments |
| Order creation success rate | > 99.9% |
| Error rate (server errors) | < 0.1% of requests |
| Data integrity | Zero tolerance for data loss or corruption |

### Security
| Requirement | Requirement |
|---|---|
| Authentication | JWT or session-based, no open endpoints for private data |
| Authorisation | Role-based access control enforced server-side |
| Data in transit | HTTPS enforced everywhere |
| Sensitive data | PCI compliance for payment data |
| Input validation | All user inputs validated server-side |
| Secrets management | No secrets in code — use environment variables |

### Accessibility
| Requirement | Standard |
|---|---|
| Customer-facing | WCAG 2.1 Level AA |
| Admin-facing | WCAG 2.1 Level A (target AA) |
| Mobile | Touch targets ≥ 44×44px |

### Scalability
| Requirement | Target |
|---|---|
| Concurrent users | 100 concurrent users at launch, 1000 at scale |
| Order volume | 10,000 orders/day at scale |

---

## Feature-Specific NFR Process

When a feature has specific NFR requirements (beyond system-wide defaults):

1. Engineering Lead documents them in `objects/non-functional-requirements/NFR-XXXX.md`
2. Include in technical design review
3. Verify during QA (add to QA test plan)
4. Monitor post-launch in hypercare

---

## NFR Exceptions

If a feature cannot meet a system-wide NFR:
1. Engineering Lead documents the exception with a reason
2. Product Lead and Engineering Lead agree on an exception
3. Exception logged in the release object and known issues
4. Remediation plan created with a target date

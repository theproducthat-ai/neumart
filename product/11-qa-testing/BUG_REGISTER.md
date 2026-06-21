# Bug Register

Central log of all bugs found during QA or UAT. Every bug found during testing must be logged here before the QA run can close.

---

## How to Use

1. Add a row when a bug is found during QA or UAT.
2. Update the Status column when the bug is fixed or accepted.
3. Link the bug back to the QA run file.
4. Critical and High bugs must be resolved before release. Medium and Low may be accepted with product owner sign-off.

---

## Bug Severity Reference

| Severity | Definition |
|---|---|
| Critical | Feature broken, data corruption, security issue — blocks release |
| High | Core functionality fails for some users — blocks release |
| Medium | Feature works but UX is poor — product owner decides |
| Low | Minor visual or copy issue — logged for future sprint |

---

## Active Bugs

| Bug ID | QA Run | Title | Severity | Steps to Reproduce | Expected | Actual | Status | Fixed In |
|---|---|---|---|---|---|---|---|---|
| BUG-0001 | QA-NNNN | *(bug title)* | Critical / High / Medium / Low | *(steps)* | *(expected)* | *(actual)* | Open / Fixed / Accepted | DEVPLAN-NNNN or — |

---

## Resolved Bugs

*(Move bugs here once they are fixed and verified in a re-test.)*

| Bug ID | QA Run | Title | Severity | Resolution | Fixed In | Verified By | Date |
|---|---|---|---|---|---|---|---|
| BUG-0000 | QA-NNNN | *(title)* | *(severity)* | *(how fixed)* | DEVPLAN-NNNN | *(tester)* | YYYY-MM-DD |

---

## Accepted Bugs (Known Issues)

*(Bugs accepted by product owner as known limitations. Not blocking release.)*

| Bug ID | Title | Severity | Reason Accepted | Target Fix Sprint |
|---|---|---|---|---|
| BUG-0000 | *(title)* | Medium / Low | *(reason)* | *(sprint or "backlog")* |

---

*Last updated: 2026-06-21*

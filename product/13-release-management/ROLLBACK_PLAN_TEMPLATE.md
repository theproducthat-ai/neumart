# Rollback Plan Template

Every release must have a rollback plan written before deployment. This template defines how to write a rollback plan and what to include.

---

## When to Rollback

Rollback if any of the following occur after deployment:

- Critical bug reported in production that was not caught in QA
- Payment flow broken (orders not being created or amounts incorrect)
- Stock deducting incorrectly (overselling or negative stock)
- Authentication broken (users cannot sign in)
- Admin console inaccessible
- Data corruption suspected

---

## Rollback Decision Authority

**Who can decide to rollback:** Product owner, or the developer on-call if product owner is unreachable.

**How to communicate:** Notify product owner via WhatsApp immediately. Log incident in INCIDENT_LOG.md.

---

## Rollback by Release Type

### Code-Only Release (No Schema Change)

| Step | Action |
|---|---|
| 1 | Revert the commit on `main`: `git revert HEAD` |
| 2 | Push revert: `git push origin main` |
| 3 | Vercel redeploys previous version automatically |
| 4 | Verify previous version is live on production URL |
| 5 | Log rollback in INCIDENT_LOG.md |

### Release With Convex Backend Changes (No Schema Change)

| Step | Action |
|---|---|
| 1 | Revert Convex function files to previous version |
| 2 | Run `npx convex deploy` to redeploy previous functions |
| 3 | Revert and push `main` — Vercel redeploys |
| 4 | Verify Convex dashboard shows previous function versions |
| 5 | Log rollback in INCIDENT_LOG.md |

### Release With Schema Change (Highest Risk)

| Step | Action |
|---|---|
| 1 | **Cannot fully rollback schema in Convex** — new fields cannot be removed safely if data has been written |
| 2 | Revert code to not write to new fields |
| 3 | Mark new fields as optional in schema (not required) |
| 4 | Redeploy Convex backend |
| 5 | Monitor for errors |
| 6 | **Do not delete schema fields** — this risks data loss |
| 7 | Log incident and consult Convex documentation |

### Hotfix (Emergency)

| Step | Action |
|---|---|
| 1 | Create a hotfix branch from `main` |
| 2 | Apply fix |
| 3 | Run `pnpm build` and `npx tsc --noEmit` |
| 4 | Deploy: `npx convex deploy` + push to `main` |
| 5 | Verify on production |
| 6 | Log in INCIDENT_LOG.md |

---

## Rollback Communication Template

```
ROLLBACK NOTICE — [YYYY-MM-DD HH:MM]

Feature: [Feature name]
Release: REL-NNNN
Reason: [Brief description of the production issue]
Action taken: [Revert / Hotfix]
Status: [In progress / Complete]
Next step: [Root cause analysis / Fix underway / Release rescheduled]
```

---

*Last updated: 2026-06-21*

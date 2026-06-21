# Release Plan — How to Plan a Release

This document explains how to plan and execute a Nuemart feature release. Claude writes release plans automatically when UAT is signed off.

---

## Rule: No Release Without UAT Sign-off

A release plan must not be created until UAT-NNNN is marked as Passed or Conditional Pass and the UAT sign-off is recorded.

---

## Release ID Format

Release IDs are registered in MASTER_REGISTRY.md:

```
REL-0001   First release
REL-0002   Second release
```

---

## Release Output File

```
product/13-release-management/releases/RELEASE-NNNN.md
```

See `releases/RELEASE-template.md` for the file structure.

---

## Release Types

| Type | Description |
|---|---|
| Feature Release | New feature or module shipped to production |
| Bug Fix Release | One or more bug fixes deployed |
| Hotfix | Emergency fix deployed outside normal release cycle |
| Schema Migration | Release that includes Convex schema changes (high risk) |

---

## Pre-release Checklist (Always)

- [ ] UAT signed off
- [ ] All QA bugs resolved or accepted
- [ ] `pnpm build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npx convex deploy` tested in dev environment
- [ ] All environment variables documented and confirmed in deployment target
- [ ] Schema migration plan confirmed (if schema changed)
- [ ] Rollback plan documented
- [ ] Release notes written

---

## Deployment Steps (Nuemart Stack)

1. Merge feature branch to `main`
2. `npx convex deploy` — deploys Convex backend and schema changes to production
3. `git push` triggers Vercel deployment (Next.js frontend)
4. Monitor Vercel build log for errors
5. Run smoke test on production immediately after deployment

---

## Post-release

1. Run production smoke test (see release plan smoke test section)
2. Monitor for errors for 30 minutes
3. Log release in RELEASE-NNNN.md as Released
4. Update request status to "Released"
5. Create post-release review if required (14-post-release)

---

*Last updated: 2026-06-21*

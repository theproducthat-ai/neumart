# Deployment Guardrails — Nuemart

Rules for deploying to preview and production environments.

---

## Deployment Stack

| Component | Platform | Trigger |
|-----------|---------|---------|
| Next.js app | Vercel | Push to `main` → auto-deploy |
| Convex backend | Convex Cloud | `pnpm backend` (dev) / `convex deploy` (CI) |
| Preview environments | Vercel | PR open/update |

## Pre-Deploy Checklist

Before merging to `main`:
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes locally.
- [ ] Manual testing of changed feature complete.
- [ ] No `.env.local` secrets committed.
- [ ] No `console.log` left in production code paths (use `console.error`/`warn` only for real errors).
- [ ] If schema changed: migration plan documented and tested.
- [ ] If new env var added: Vercel and Convex dashboards updated.

## Convex Deploy

- Dev branch: `convex dev` (watches and hot-reloads).
- Production: `convex deploy` run in CI/CD or manually by the engineering owner.
- Convex functions deploy atomically. Schema changes deploy with function changes.
- Always test schema migrations against a dev deployment before deploying to production.

## Rollback

- Vercel: Instant rollback via Vercel dashboard (previous deployment).
- Convex: Rollback is not automatic. If a bad Convex deploy occurs:
  1. Revert the code change.
  2. Redeploy.
  3. If data was written in a bad state: create a `data-migrations` object and run a correction action.

## Feature Flags

- Use feature flags (via `product/objects/feature-flags/`) for features that need a staged rollout or kill switch.
- Never deploy a half-finished feature without a flag guard.

## Release Gates

See `product/os/policies/APPROVAL_GATES.md` for which releases require sign-off before deploy.

## Prohibited in Production Deploys

- Deploying directly from a local machine without CI checks passing.
- Deploying a `main` branch build that has failing typecheck or lint.
- Removing a Convex index that is actively used by a production query without a migration.
- Deploying a schema change that makes existing documents fail validation.
- Force-pushing to `main`.

## Monitoring After Deploy

- Check Convex dashboard for function errors in the 30 minutes after deploy.
- Check Vercel deployment logs for build or runtime errors.
- Check Core Web Vitals via Vercel Analytics after significant frontend changes.

---

## Related
- `ENVIRONMENT_POLICY.md`
- `OBSERVABILITY_GUARDRAILS.md`
- `DATABASE_GUARDRAILS.md`
- `product/os/policies/APPROVAL_GATES.md`

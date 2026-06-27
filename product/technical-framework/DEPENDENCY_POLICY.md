# Dependency Policy — Nuemart

Rules for adding, removing, and maintaining npm/pnpm dependencies.

---

## Adding a New Dependency

Every new dependency requires:

1. **Justification** — what problem does it solve that cannot be solved with existing packages or a small custom utility?
2. **Bundle size check** — check `bundlephobia.com`. Flag if > 20KB gzipped.
3. **Maintenance check** — last release within 12 months, active issue tracker, no critical open CVEs.
4. **Alternatives considered** — confirm no existing package already covers this.
5. **AI must flag** — AI assistants must never silently add a dependency. Always surface the proposal explicitly.

## Approval Required For

- Any new production dependency.
- Upgrading a major version of a core dependency (Next.js, Convex, Clerk, React, Tailwind).
- Adding a dev dependency that affects build output (e.g., Babel plugins, PostCSS plugins).

No approval needed for: patch/minor version bumps via `pnpm update`.

## Prohibited Packages

Do not add:
- `axios` — use native `fetch`.
- `moment` — use `date-fns` if date utilities are needed.
- `lodash` — use native JS or targeted micro-packages.
- `redux` / `@reduxjs/toolkit` — use Zustand.
- Any database ORM (Prisma, Drizzle, Sequelize) — use Convex.
- Any custom auth library — use Clerk.
- Any UI library outside shadcn/ui ecosystem (MUI, Ant Design, Chakra) without architectural review.

## Removing a Dependency

- Confirm the package is not used anywhere: `grep -r "package-name" neumart/`.
- Remove from `package.json` and run `pnpm install`.
- Document removal in the PR description.

## Security Audits

- Run `pnpm audit` when adding any dependency.
- Run `pnpm audit` quarterly as a maintenance task.
- Critical vulnerabilities must be patched or the package removed. Do not suppress with `audit-level` config.

## Version Pinning

- Dependencies use `^` (caret) ranges for minor/patch auto-updates. This is acceptable for non-core packages.
- Core infrastructure packages (Next.js, Convex, Clerk, React) should be reviewed before major upgrades.
- Do not use `*` or latest tags in production dependencies.

---

## Related
- `TECH_STACK.md`
- `SECURITY_GUARDRAILS.md`
- `AI_CODING_GUARDRAILS.md`

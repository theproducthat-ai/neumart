# Coding Standards — Nuemart

Practical rules for writing code in this codebase. These apply to all contributors and to AI-generated code.

---

## TypeScript

- Strict mode on. No `any`. No `as unknown as X` without a documented reason.
- Prefer `type` over `interface` for object shapes. Use `interface` only for extensible public APIs.
- Derive types from Convex schema using `Doc<"tableName">` and `Id<"tableName">`.
- Export types only when needed by another file. Do not export for the sake of it.
- Use named exports. Default exports only for Next.js pages and layouts (framework requirement).

## Naming

- Files: `kebab-case.tsx` for components, `kebab-case.ts` for utilities and hooks.
- Components: `PascalCase`.
- Hooks: `useCamelCase`.
- Convex functions: `camelCase` (query/mutation/action names).
- Constants: `SCREAMING_SNAKE_CASE`.
- Database table names: `camelCase` plural (Convex convention).

## Imports

- Group: (1) React/Next core, (2) third-party, (3) internal `@/` aliases, (4) relative.
- Use `@/` aliases configured in `tsconfig.json`. No `../../..` chains longer than two levels.

## Component Rules

- One component per file.
- Props interfaces defined in the same file, above the component.
- No inline styles. Use Tailwind classes.
- Use `cn()` from `lib/utils` for conditional class merging.
- Never hardcode colours directly — use Tailwind design tokens.

## Function Rules

- Pure functions where possible.
- Functions over 30 lines should be split or extracted.
- Avoid default exports for utility functions.
- Arrow functions for components and hooks. Regular functions for utilities.

## Error Handling

- Wrap Convex mutation calls in try/catch or use `.then().catch()`.
- Show user-facing errors via Sonner toast, not console.log.
- Log unexpected errors with enough context to diagnose.
- Never swallow errors silently.

## Comments

- Default: no comments.
- Add a comment only when the WHY is non-obvious (constraint, workaround, invariant).
- No TODO comments left in merged code. Convert to a REQ or BLI object.
- No commented-out code in main branch.

## Formatting

- Prettier handles formatting. Do not manually format.
- ESLint handles lint rules. Fix lint errors; do not disable rules inline without a documented reason.
- Max line length: 100 (Prettier default).

## Git

- Commit messages: `type(scope): short description`. Types: feat, fix, chore, refactor, docs, test.
- Branch names: `feat/REQ-NNN-short-description` or `fix/BUG-NNN-short-description`.
- No force-push to main.
- Squash feature branches before merge.

---

## Related
- `FRONTEND_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`
- `TESTING_GUARDRAILS.md`

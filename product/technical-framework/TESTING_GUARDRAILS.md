# Testing Guardrails — Nuemart

Testing expectations and rules. Adapted to the current state of the project (no formal test runner yet).

---

## Current Testing State

No automated test runner is configured. Testing is currently manual + type-checking + lint.

Adding a test runner (Vitest recommended for this stack) is on the roadmap. When added, the rules below apply.

---

## Type Checking (Active Now)

- `pnpm typecheck` must pass before any PR merges.
- TypeScript catches a large class of bugs. Treat type errors as test failures.
- No `// @ts-ignore` or `as any` to pass typecheck.

## Lint (Active Now)

- `pnpm lint` must pass. ESLint rules are enforced.
- Fix the root cause. Do not use `// eslint-disable` inline.

## Manual Testing Checklist (All PRs)

Before marking a PR ready for review:
- [ ] Happy path of the changed feature works end-to-end.
- [ ] Empty state renders correctly (no data, new user).
- [ ] Loading state renders correctly.
- [ ] Error state renders correctly (invalid input, network failure).
- [ ] Mobile layout checked at 390px viewport.
- [ ] No console errors in browser dev tools.

## Unit Tests (When Added)

- Test pure utility functions and data-transformation helpers.
- Do not unit test React component rendering (use integration tests instead).
- Do not mock Convex — test Convex functions against a real Convex dev deployment.

## Integration Tests (When Added)

- Cover critical user flows end-to-end:
  - Browse products → add to cart → checkout → payment.
  - User registration → profile setup.
  - Admin creates product → customer can see it.
- Use Playwright for browser-based integration tests.

## What Not to Test

- shadcn/ui component internals (tested by the library).
- Convex query/mutation infrastructure (tested by Convex).
- Clerk auth flows (tested by Clerk).
- TypeScript types at runtime (that is what the compiler is for).

## Coverage Goals (When Test Runner Added)

- Utility functions: 90%+.
- Critical flows (checkout, auth, order): 80%+ integration coverage.
- UI components: manual + Playwright only.

---

## Related
- `CODING_STANDARDS.md`
- `FRONTEND_GUARDRAILS.md`
- `BACKEND_GUARDRAILS.md`

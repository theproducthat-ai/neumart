# Release Notes Template

Release notes are written for every production deployment. They summarise what changed, what was fixed, and any known issues.

---

## Audience

Release notes may be shared with:
- Internal team
- Business owner / stakeholders
- (Future) customers — public changelog

---

## Release Notes Format

```markdown
# Release — [REL-NNNN] — [YYYY-MM-DD]

## What's New

- [Feature name]: [One sentence description of what it does and the benefit.]
- [Feature name]: [One sentence description.]

## Bug Fixes

- [Bug description]: [What was wrong and what was fixed.]

## Behind the Scenes

- [Infrastructure, schema, or backend change that users won't see but is important.]

## Known Issues

- [Issue]: [What it is and workaround if any.]

## Upgrade Notes

- [Any action required from admin, team, or customers after this release.]
```

---

## Guidelines

- Write in plain language. Avoid technical terms like "Convex mutation" or "TypeScript error".
- Focus on user benefit, not technical implementation.
- List all bug fixes, even minor ones.
- List known issues so the team can monitor for them.
- If a schema migration ran, note that under "Behind the Scenes".

---

*Last updated: 2026-06-21*

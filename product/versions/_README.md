# Versions

Stores version snapshots of major product objects. When a significant change is made to a PRD, feature, roadmap item, technical design, API contract, release plan, or other versioned object, a snapshot is saved here.

## Structure

```
product/versions/
  {object-type}/
    {object-id}/
      v1.md
      v2.md
      ...
```

Examples:
- `product/versions/prds/PRD-0001/v1.md`
- `product/versions/features/FEA-0012/v2.md`
- `product/versions/roadmap-items/RMI-005/v1.md`

## When to Create a Snapshot

See `product/os/policies/VERSIONING_RULES.md` for the full policy.

Short answer: any major PRD, technical design, API contract, or release plan change should produce a snapshot before the change is applied.

## Version History in Objects

Every versioned object should also contain a `version_history` section in its main file. The snapshot in `product/versions/` is the full frozen copy; the inline `version_history` is the summary log.

## Index

`product/indexes/VERSION_INDEX.md`

## Template

`product/os/templates/VERSION_HISTORY_TEMPLATE.md`

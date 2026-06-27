# Product OS Validation Tools

**Version**: 2.0  
**Owner**: Engineering Lead / Product Lead

---

## Overview

These Node.js scripts validate Product OS object integrity, generate indexes, and check for common errors. Run them from the `product/tools/` directory.

---

## Prerequisites

- Node.js 18+
- Run from the project root: `node product/tools/<script>.js`
- Scripts read from `product/objects/` and `product/indexes/`
- No external dependencies required

---

## Scripts

| Script | Purpose | Run Frequency |
|---|---|---|
| `validate-templates.js` | Validates all templates for schema compliance, required fields, registry coverage, and folder-template mapping | Before Level 3 testing, after adding templates |
| `validate-product-os.js` | Full validation suite for objects — runs all checks | Before sprint review, monthly |
| `generate-indexes.js` | Regenerates all index files from object frontmatter | After adding new objects |
| `check-broken-links.js` | Finds broken markdown links between objects | Weekly |
| `check-required-fields.js` | Finds objects with missing required frontmatter fields | Before sprint review |
| `check-status-transitions.js` | Finds objects with invalid or stale status | Weekly |

---

## Quick Start

```bash
# Validate all templates (schema, fields, registry, folder coverage)
node product/tools/validate-templates.js

# Run full object validation
node product/tools/validate-product-os.js

# Regenerate all indexes
node product/tools/generate-indexes.js

# Check for broken links only
node product/tools/check-broken-links.js
```

---

## Output Format

All scripts output:
- `[OK]` for passing checks
- `[WARN]` for issues that should be reviewed
- `[ERROR]` for issues that must be fixed before release

Exit code 0 = no errors. Exit code 1 = errors found.

---

## CI Integration

For automated validation, add to your CI pipeline:

```yaml
- name: Validate Product OS
  run: node product/tools/validate-product-os.js
```

This will fail the build if any `[ERROR]` level issues are found.

---

## Extending the Tools

To add a new check:
1. Add the check function to the relevant script
2. Follow the existing pattern: return `{ status: 'ok'|'warn'|'error', message, objectId }`
3. Update this README with the new check

---

## Related Documents

- `product/indexes/ORPHAN_OBJECTS.md` — populated by validate-product-os.js
- `product/indexes/MASTER_OBJECT_INDEX.md`

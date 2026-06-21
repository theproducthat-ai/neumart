# ID Generation Rules

Defines how IDs are generated for every artifact type in the Nuemart Product OS. Claude generates all IDs. The user never needs to provide or look up IDs manually.

---

## Master Registry

All IDs are tracked in:

```
product/00-product-foundation/MASTER_REGISTRY.md
```

Before creating any artifact, Claude must:
1. Read MASTER_REGISTRY.md to get the Next ID for that artifact type.
2. Create the artifact file with that ID.
3. Update MASTER_REGISTRY.md: increment Last Used and Next ID.

---

## ID Format Reference

| Artifact | ID Format | Example | Registry Key |
|---|---|---|---|
| Request | REQ-NNNN | REQ-0001 | REQ |
| Evaluation | EVAL-NNNN | EVAL-0001 | EVAL |
| PRD | PRD-NNNN | PRD-0001 | PRD |
| User Story | US-NNNN | US-0001 | US |
| Dev Plan | DEVPLAN-NNNN | DEVPLAN-0001 | DEVPLAN |
| QA Run | QA-NNNN | QA-0001 | QA |
| UAT Run | UAT-NNNN | UAT-0001 | UAT |
| Release | REL-NNNN | REL-0001 | REL |
| Screen (Customer) | SCR-CUS-NNNN | SCR-CUS-0001 | SCR-CUS |
| Screen (Admin) | SCR-ADM-NNNN | SCR-ADM-0001 | SCR-ADM |
| Screen (Auth) | SCR-AUTH-NNNN | SCR-AUTH-0001 | SCR-AUTH |
| Bug | BUG-NNNN | BUG-0001 | BUG |
| UAT Feedback | UFB-NNNN | UFB-0001 | UFB |
| Enhancement Backlog | ENH-NNNN | ENH-0001 | ENH |
| Incident | INC-NNNN | INC-0001 | INC |
| Roadmap Decision | RD-NNN | RD-001 | RD |

---

## ID Padding Rules

- All NNNN IDs use 4 digits, zero-padded: 0001, 0002, ..., 0099, 0100.
- RD IDs use 3 digits: 001, 002, ..., 009, 010.

---

## Linked IDs

When a new artifact is created:
- Its ID is written in the Linked IDs table of all related artifacts.
- Example: When PRD-0003 is created, it is linked in REQ-0003, EVAL-0003, and later in US, DEVPLAN, QA, UAT, and RELEASE files.

---

## GRILLING and IMPACT IDs

These two artifact types do NOT have independent IDs in the registry. They inherit the REQ ID:
- Grilling for REQ-0005 → file is `GRILLING-0005.md`
- Impact assessment for REQ-0005 → file is `IMPACT-0005.md`

No registry update needed for GRILLING or IMPACT artifacts.

---

## ID Rules

1. IDs are permanent. Once assigned, an ID is never reused, even if the artifact is cancelled or rejected.
2. The registry must be updated immediately after creating any artifact.
3. If two artifacts are created in the same session, both IDs must be reserved from the registry before writing either file.
4. Never guess or infer an ID. Always read the registry.

---

## Automatic vs Manual ID Assignment

| Situation | Who assigns | How |
|---|---|---|
| User submits a request | Claude | Claude reads registry, assigns next REQ ID |
| Grilling session | Claude | Inherits REQ ID |
| Impact assessment | Claude | Inherits REQ ID |
| PRD is written | Claude | Claude reads registry, assigns next PRD ID |
| User stories are written | Claude | Claude reads registry, assigns sequential US IDs |
| Dev plan is written | Claude | Claude reads registry, assigns next DEVPLAN ID |
| Bug is found in QA | QA tester or Claude | Claude reads registry, assigns next BUG ID |
| Screen needs ID | Claude | See SCREEN_ID_RULES.md |

---

*Last updated: 2026-06-21*

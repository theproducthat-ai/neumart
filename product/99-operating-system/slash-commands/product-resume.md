# /product-resume — Slash Command Definition

Resume an existing Product OS workflow by Request ID, PRD ID, or natural-language title.

---

## How to Use

```
/product-resume REQ-0002
/product-resume PRD-0001
/product-resume Delivery Module
/product-resume discount coupons
```

---

## Purpose

Used when returning to a request in a new session or when switching context between requests. Claude will find the request, identify the latest completed stage, and recommend the correct next step — without the user needing to remember IDs or track progress manually.

---

## What This Command Does

| Step | Claude's Action |
|---|---|
| 1 | Search `REQUEST_REGISTER.md` for matching REQ ID or title |
| 2 | Search `ACTIVE_REQUESTS.md` for active matches |
| 3 | Search `INCOMPLETE_WORK_TRACKER.md` for incomplete matches |
| 4 | Search `MASTER_REGISTRY.md` for any linked IDs |
| 5 | Search roadmap, PRD, and user story folders if needed |
| 6 | If one match: identify the latest completed stage |
| 7 | If multiple matches: present a list and ask the user to choose |
| 8 | Recommend the correct next step based on current status |
| 9 | Ask for confirmation before proceeding |
| 10 | Resume the workflow from the correct stage |

---

## What Claude Never Asks the User

- The REQ ID (user already provided it or Claude found it)
- Which stage to resume from (Claude reads the registers)
- Which skill to use next (Claude decides from status)
- Whether a duplicate exists (Claude checks)

---

## Behaviour for Multiple Matches

If two or more requests match the search term, Claude presents:

```
I found multiple requests matching "delivery":

1. REQ-0003 — Delivery Module (Status: Grilling Complete)
2. REQ-0005 — Delivery Status Tracking (Status: Under Classification)

Which one would you like to resume?
```

The user selects one. Claude proceeds.

---

## Behaviour for No Match

If no match is found:

```
I could not find a request matching "loyalty programme" in REQUEST_REGISTER.md or ACTIVE_REQUESTS.md.

Would you like to:
1. Start a new request with /product-request
2. Search with a different term
```

---

## Same-Session Continuation Rule

`/product-resume` is only needed when:
- Returning to a request in a new session
- Switching from one request to another mid-session

Within the same session, after any Product OS step completes, Claude should ask:
"Do you want me to proceed to the next step?"

If the user replies `yes`, `continue`, `proceed`, or `next`, Claude continues automatically without requiring `/product-resume`.

---

## Files Claude Reads

1. `product/04-request-management/REQUEST_REGISTER.md`
2. `product/04-request-management/ACTIVE_REQUESTS.md`
3. `product/10-development-tracking/INCOMPLETE_WORK_TRACKER.md`
4. `product/00-product-foundation/MASTER_REGISTRY.md`
5. Linked files identified in the register (REQ file, GRILLING file, PRD file, etc.)

---

## Output

After finding the request:

```
**Resuming:** REQ-NNNN — [Title]
**Current status:** [Status from REQUEST_REGISTER.md]
**Latest stage completed:** [Stage]
**Next recommended step:** [Step + skill to invoke]
```

Claude then asks for confirmation and proceeds.

---

## Related Commands

| Command | When to Use Instead |
|---|---|
| `/product-request` | Starting a new request (not resuming) |
| `/product-grill` | Jumping directly to grilling with a known REQ ID |
| `/product-prd` | Jumping directly to PRD writing with a known REQ ID |

---

*Last updated: 2026-06-21*

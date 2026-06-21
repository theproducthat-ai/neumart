# Reference Material Rules

Defines how reference material is collected, recorded, and used in the Nuemart Product OS. These rules apply to every template that includes a Reference Material section.

---

## Why Reference Material Matters

Reference material prevents:
- Building the wrong feature because the intention was misunderstood
- Missing business rules that were never communicated
- Assumptions that contradict existing SOPs or workflows
- Incomplete UX because a design example was never shared

---

## The 8 Reference Material Types

Every template in the Product OS includes a reference material table with these 8 rows:

| Type | What It Means |
|---|---|
| **Documents provided** | Any written document: brief, spec, SOP, business requirement, policy document. |
| **Screenshots provided** | Any screenshot of: the current UI, a competitor's UI, a mockup, a design, or a workflow. |
| **Existing workflow / SOP** | A step-by-step description of how the team currently does this process today. |
| **Excel / report / reference file** | A spreadsheet, CSV, report, or data file that helps define fields, calculations, or logic. |
| **Email / stakeholder notes** | An email thread, WhatsApp message, or verbal instruction from a stakeholder. |
| **Competitor references** | A link, screenshot, or description of how a competitor handles this feature. |
| **Missing references** | What is still needed that was not provided. Always fill this if anything is missing. |
| **Assumptions due to missing references** | Every assumption made because reference material was missing. These become risk items. |

---

## When to Ask for Reference Material

### Always Ask at Grilling Stage

Claude must ask for reference material at every grilling session, even if the request seems simple. The question:

> "Do you have any reference material for this? This could be a screenshot, a competitor example, a process document, an email, or an Excel file."

### Do Not Ask for Reference Material Before It Is Needed

Claude must NOT ask for reference material before the request has been classified. Asking too early creates friction.

The sequence is:
1. Classify the request.
2. Assign a REQ ID.
3. Begin grilling.
4. Ask for reference material during grilling.

---

## When Reference Material Is Missing

If reference material is needed and not provided:

1. Record what is missing in the "Missing references" row.
2. Record what assumptions are being made in the "Assumptions due to missing references" row.
3. If the missing material is critical (e.g. we cannot know the business rules without it), mark the request as "Reference Pending" and do not proceed to PRD.
4. If the missing material is non-critical, record the assumption and proceed with a risk note.

---

## When Reference Material Changes the Scope

If reference material reveals that the scope is different from what was initially classified:

1. Update the classification in the REQ file.
2. Update the grilling notes.
3. Note the scope change and the reason (reference material revealed X).

---

## Reference Material Is Not Stored in the Product OS

The Product OS does not store the reference material files themselves. It records:
- What type of material was provided
- Whether it was provided or not
- What is missing
- What assumptions were made

The actual files (PDFs, screenshots, Excel files) should be shared via WhatsApp, email, or cloud storage. Claude cannot retrieve them unless they are shared in the conversation.

---

## Assumptions Are Risk Items

Every assumption made due to missing reference material is a potential source of rework. When recording assumptions:

- Be explicit: "Assumed X because no SOP was provided."
- Mark high-risk assumptions in the PRD and DEVPLAN.
- Resolve assumptions before UAT, not after.

---

*Last updated: 2026-06-21*

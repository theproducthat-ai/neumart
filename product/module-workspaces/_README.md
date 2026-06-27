# Module Workspaces

Provides a visibility layer for each product module. Each workspace is a structured view linking to all relevant objects for that module — features, bugs, PRDs, stories, metrics, roadmap items, and more.

**Important:** Module workspaces do not contain source-of-truth objects. They link back to `product/objects/`. The workspace exists for visibility; the objects folder is the record.

## Structure

Each module workspace is a single file: `product/module-workspaces/[MODULE-ID].md`

## Creating a Module Workspace

Use the template: `MODULE_WORKSPACE_TEMPLATE.md`

## Index

`product/indexes/MODULE_WORKSPACE_INDEX.md`

## What Workspaces Show (Not Store)

- Module overview and ownership
- All linked features, subfeatures, requests
- Active and deferred work
- Linked PRDs, stories, bugs, risks
- Linked metrics, KPIs, roadmap items
- Linked decisions, designs, APIs
- Open questions and blockers
- Future ideas (linked to roadmap items)

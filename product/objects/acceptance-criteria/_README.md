# Acceptance Criteria

**Object type**: `acceptance-criterion`  
**Owner**: Product Manager  
**Note**: Acceptance criteria are typically embedded directly in `user-stories/` objects rather than stored as separate files. Use this folder only when acceptance criteria are complex enough to warrant a standalone artifact (e.g., a multi-scenario test specification).

## When to Use Standalone Criteria

- A story has 8+ distinct acceptance criteria
- Acceptance criteria are shared across multiple stories
- Regulatory or compliance requirements mandate separate AC documentation

## Standard Practice

For most stories: embed `acceptance_criteria:` directly in the US-NNNN.md frontmatter.

For complex stories: create `ACC-US-NNNN-[description].md` here and link from the story.

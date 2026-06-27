# Questions

**Object type**: `question`  
**Owner**: Product Manager  
**Note**: Open questions register — product, technical, or business questions that need resolution before or during a feature's development. Tracking open questions prevents decision ambiguity from blocking delivery.

## When to Use

- A PRD or story has an unresolved question
- A discovery session produces open questions
- An engineering spike is needed to answer a technical question

## Standard Practice

Most questions are tracked inline within `prds/` or `user-stories/` objects as `open_questions:` fields. Use this folder for questions that:
- Need escalation beyond the product team
- Are shared across multiple objects
- Need formal resolution tracking

## Format

`Q-NNNN.md` with fields:
`id`, `question`, `context`, `raised_by`, `needs_answer_from`, `status`, `answer`, `resolution_date`

Status: `open` → `answered` | `deferred` | `no-longer-relevant`

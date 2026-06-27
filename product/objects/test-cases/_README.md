# Test Cases

**Object type**: `test-case`  
**Owner**: QA Lead  
**Note**: Standalone test case objects — used when test cases need to be tracked, versioned, or reused independently of a QA run. Most test cases are embedded within `qa-tests/` run objects.

## When to Create Standalone Test Cases

- A test case is reused across multiple QA runs (regression suite)
- A test case needs individual sign-off or review
- A test case is complex enough to warrant standalone documentation

## Relationship to qa-tests/

`qa-tests/` stores the QA run with the list of test cases executed.  
`test-cases/` stores reusable test cases that can be referenced from multiple qa-tests.

## Format

`TC-[MODULE]-[FEATURE]-NNNN.md` with fields:
`id`, `title`, `preconditions`, `steps`, `expected_result`, `feature_ref`, `type`, `owner`

Types: `happy-path` | `edge-case` | `negative` | `regression` | `accessibility` | `performance`

# Test Plans

**Object type**: `test-plan`  
**Owner**: QA Lead  
**Note**: Test plan objects — high-level testing strategy documents for a release or feature. Different from `qa-tests/` which are execution records. A test plan defines *what* will be tested and *how*; a qa-test records *what was tested* and *results*.

## When to Create

- Before a major release or Standard Feature test cycle
- When a new module is introduced
- When a new test type (performance, accessibility) is introduced

## Relationship to qa-tests/

`test-plans/` → planning documents  
`qa-tests/` → execution records  

## Format

`TP-[RELEASE-ID].md` with fields:
`id`, `scope`, `test_types`, `environments`, `test_cases_in_scope`, `entry_criteria`, `exit_criteria`, `risks`, `owner`

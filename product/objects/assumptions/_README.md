# Assumptions

**Object type**: `assumption`  
**Owner**: Product Manager  
**Note**: Assumptions are typically embedded as an `assumptions:` field within `prds/`, `features/`, or `user-stories/` objects. Use this folder only for assumptions that are significant, cross-cutting, or need separate tracking.

## When to Use Standalone Assumption Files

- A critical assumption is shared across multiple PRDs or features
- An assumption needs to be formally validated (tracked as a separate work item)
- A project has many assumptions that need collective review

## Format

Create assumption files as `ASSM-NNNN-[description].md` with fields:
`id`, `assumption`, `basis`, `owner`, `validation_method`, `validated_date`, `status`

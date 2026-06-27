# Requirements

**Object type**: `requirement`  
**Owner**: Product Manager  
**Note**: Standalone requirement objects — used when requirements need to be tracked independently of a PRD (e.g., regulatory requirements, platform-wide constraints).

## When to Use

- Regulatory or compliance requirements that apply across multiple features
- Platform-wide non-functional requirements
- Requirements from a client contract that must be tracked individually

## Relationship to PRDs

Most requirements are embedded in PRD objects. Use this folder only for requirements that must be tracked independently — e.g., a legal requirement with its own compliance review lifecycle.

## Format

`REQ-[TYPE]-NNNN.md` with fields:
`id`, `requirement`, `type`, `source`, `applies_to`, `status`, `verified_by`, `owner`

Types: `functional` | `non-functional` | `regulatory` | `contractual` | `platform`

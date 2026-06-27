# Enhancements

**Object type**: `enhancement`  
**Owner**: Product Manager  
**Note**: Enhancement records for improvements to existing features. Enhancements are distinct from bugs (defects) and new features (net-new capabilities). They are improvements or extensions of existing functionality.

## When to Use

- A feature needs an incremental improvement post-release
- User feedback identifies a friction point in existing functionality
- Analytics shows a metric that can be improved with a targeted change

## Relationship to Requests

In V2, enhancements should be tracked as `requests/` objects with `work_type: existing-feature-enhancement` and then promoted to `subfeatures/` or `user-stories/`. This folder provides backward compatibility for V1 enhancement tracking.

## Format

`ENH-[FEAT-ID]-NNNN.md` with fields:
`id`, `feature_ref`, `description`, `source`, `priority`, `status`, `estimated_effort`, `owner`

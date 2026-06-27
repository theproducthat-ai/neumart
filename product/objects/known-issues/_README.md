# Known Issues

**Object type**: `known-issue`  
**ID prefix**: `KI-`  
**ID format**: `KI-NNNN`  
**Owner**: Product Manager / Support Lead  
**Template**: `product/os/templates/KNOWN_ISSUE_TEMPLATE.md`

## What Belongs Here

Known issue records — product issues that are known, documented, and actively managed but not yet fixed. Support and ops use these to inform customers and manage expectations. Known issues are public or internal product limitations.

## When to Create

- A bug is discovered that won't be fixed in the current release
- A workaround exists for a product issue that will take time to properly fix
- A post-release issue is identified during hypercare
- A product limitation needs to be communicated to support and customers

## Required Relationships

- **Related to**: `bugs/`, `incidents/`
- **Informs**: `support-playbooks/`
- **Referenced in**: release notes

## Lifecycle / Statuses

`open` → `workaround-available` → `fix-in-progress` → `resolved` | `accepted-as-limitation`

## Required Fields

`id`, `title`, `status`, `issue_description`, `user_impact`, `workaround`, `fix_eta`, `affected_features`, `reported_by`, `owner`, `created_date`

## Example IDs

- `KI-0001` — First known issue
- `KI-0002` — Second known issue

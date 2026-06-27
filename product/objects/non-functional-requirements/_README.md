# Non-Functional Requirements

**Object type**: `non-functional-requirement`  
**ID prefix**: `NFR-`  
**ID format**: `NFR-NNNN`  
**Owner**: Engineering Lead  
**Template**: `product/os/templates/NFR_OBJECT_TEMPLATE.md`

## What Belongs Here

Non-functional requirement objects — performance, security, scalability, availability, compliance, and accessibility requirements that apply to features or the system as a whole. These are requirements about *how* the system works, not *what* it does.

NFR categories:
- Performance (response time, throughput)
- Scalability (concurrent users, data volume)
- Availability (uptime SLA)
- Security (auth, encryption, vulnerability standards)
- Accessibility (WCAG compliance)
- Reliability (error rate, data integrity)
- Compliance (regulatory, legal)
- Observability (logging, monitoring)

## When to Create

- A feature has specific performance requirements
- A compliance or security requirement applies to a feature
- System-wide NFRs are defined at the start of a release

## Required Relationships

- **For**: `features/`, `technical-designs/`
- **References**: `engineering/NON_FUNCTIONAL_REQUIREMENTS.md`

## Lifecycle / Statuses

`defined` → `verified` | `failed` | `accepted-with-exception`

## Required Fields

`id`, `title`, `status`, `category`, `requirement`, `measurement`, `target_value`, `current_value`, `feature_ref`, `owner`, `created_date`

## Example IDs

- `NFR-0001` — First NFR
- `NFR-0002` — Second NFR

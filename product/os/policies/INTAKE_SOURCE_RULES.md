# Intake Source Classification Rules

**Version**: 2.0  
**Owner**: Product Lead

---

## Purpose

Every request entering the Product OS must capture its source. Source classification determines:
- How urgently it is reviewed
- Who triages it
- What channel it came through
- What additional evidence is required

---

## Source Types

### 1. Business Stakeholder
- **Definition**: Internal business owner, founder, or executive requesting a product change for business reasons
- **Entry object**: `objects/requests/` or `objects/business-cases/`
- **Default urgency**: High (stakeholder-initiated is often strategic)
- **Triage owner**: Product Lead
- **Evidence required**: Business justification, OKR alignment

### 2. Client
- **Definition**: Existing paying client requesting a product change
- **Entry object**: `objects/client-requests/`
- **Default urgency**: High
- **Triage owner**: Product Lead
- **Evidence required**: Client name, contract reference (if contractual), communication evidence
- **Watch for**: Must check if commitment should be created in `objects/client-commitments/`

### 3. Sales
- **Definition**: Sales team request driven by a deal opportunity
- **Entry object**: `objects/sales-requests/`
- **Default urgency**: High (deal-blocking)
- **Triage owner**: Product Lead
- **Evidence required**: Deal name, deal value, deal stage, decision timeline
- **Watch for**: High commercial pressure — ensure product team evaluates objectively

### 4. Support
- **Definition**: Support team surfaces a product gap from user tickets
- **Entry object**: `objects/support-tickets/` → escalated to `objects/requests/`
- **Default urgency**: Medium
- **Triage owner**: Product Manager
- **Evidence required**: Number of affected users, ticket references, pattern description

### 5. Operations
- **Definition**: Operations team cannot complete a task due to a product gap
- **Entry object**: `objects/ops-issues/` → escalated to `objects/requests/`
- **Default urgency**: Medium to High
- **Triage owner**: Product Manager + Operations Lead
- **Evidence required**: Process description, frequency, workaround used

### 6. Engineering
- **Definition**: Engineering team identifies a tech debt, performance issue, or capability gap
- **Entry object**: `objects/internal-ideas/` or `objects/requests/` with `work_type: tech-debt`
- **Default urgency**: Low to Medium
- **Triage owner**: Engineering Lead + Product Lead
- **Evidence required**: Technical justification, risk if not addressed

### 7. QA
- **Definition**: QA team identifies a systemic quality issue or missing test coverage that requires product attention
- **Entry object**: `objects/bugs/` or `objects/requests/`
- **Default urgency**: Medium
- **Triage owner**: QA Lead + Product Manager

### 8. Product
- **Definition**: Product team identifies an opportunity during research, discovery, or competitive analysis
- **Entry object**: `objects/internal-ideas/` → `objects/requests/`
- **Default urgency**: Low to Medium (self-generated)
- **Triage owner**: Product Lead

### 9. Analytics / Data
- **Definition**: Data or analytics identifies a metric opportunity or problem
- **Entry object**: `objects/requests/` with `source_type: analytics`
- **Default urgency**: Medium
- **Triage owner**: Product Manager
- **Evidence required**: Metric data, dashboard reference, significance threshold

### 10. Incident / Post-Production
- **Definition**: A production incident reveals a product gap or bug requiring a change
- **Entry object**: `objects/incidents/` → `objects/bugs/` or `objects/requests/`
- **Default urgency**: Critical to High (post-incident)
- **Triage owner**: Engineering Lead + Product Lead
- **Evidence required**: RCA reference, incident reference

### 11. Compliance / Legal
- **Definition**: A regulatory requirement, legal team input, or compliance audit drives a product change
- **Entry object**: `objects/requests/` with `source_type: compliance`
- **Default urgency**: Critical (compliance deadlines are non-negotiable)
- **Triage owner**: Product Lead + Legal
- **Evidence required**: Regulation/standard reference, deadline, legal team sign-off

### 12. Leadership
- **Definition**: CEO, board, or investor feedback that drives a product direction
- **Entry object**: `objects/requests/` with `source_type: leadership`
- **Default urgency**: High
- **Triage owner**: Product Lead
- **Note**: Leadership inputs must still go through classification — no automatic approval

### 13. Customer Feedback
- **Definition**: Direct feedback from users (NPS, reviews, interviews, surveys)
- **Entry object**: `objects/feedback/` → may escalate to `objects/requests/`
- **Default urgency**: Low (unless pattern is large)
- **Triage owner**: Product Manager
- **Evidence required**: Feedback source, frequency, sentiment data

---

## Required Fields on Every Request

Every request object must capture these source fields:

```yaml
source_type: ""        # One of the 13 types above
source_owner: ""       # Person who submitted the request
source_channel: ""     # Slack | email | meeting | ticket | analytics | survey
source_evidence: ""    # Link or reference to the original source
urgency: ""            # critical | high | medium | low
business_impact: ""    # Description of business impact
customer_impact: ""    # Description of customer impact
revenue_impact: ""     # Estimated revenue impact (£ or %)
operational_impact: "" # Impact on operations
support_impact: ""     # Impact on support team
risk_impact: ""        # Risk if not addressed
deadline: ""           # Hard deadline if applicable
commitment_made: ""    # Has a commitment been made to anyone?
client_visible: false  # Will this be visible to clients?
internal_only: false   # Is this strictly internal?
```

---

## Intake Routing Rules

| Source Type | First Object | Reviewer | SLA |
|---|---|---|---|
| Business stakeholder | requests/ | Product Lead | 3 business days |
| Client | client-requests/ | Product Lead | 1 business day |
| Sales | sales-requests/ | Product Lead | 1 business day |
| Support | support-tickets/ | Product Manager | 2 business days |
| Operations | ops-issues/ | Product Manager | 3 business days |
| Engineering | internal-ideas/ or requests/ | Engineering Lead | Weekly grooming |
| QA | bugs/ or requests/ | QA Lead | 2 business days |
| Product | internal-ideas/ | Product Lead | Weekly grooming |
| Analytics | requests/ | Product Manager | Weekly grooming |
| Incident/post-prod | incidents/ | Engineering Lead | Immediate |
| Compliance/Legal | requests/ | Product Lead | Immediate |
| Leadership | requests/ | Product Lead | 1 business day |
| Customer feedback | feedback/ | Product Manager | Weekly review |

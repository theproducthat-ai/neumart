---
id: MOD-DEL
name: Delivery Management
domain_code: DEL
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-DEL — Delivery Management

## Purpose

The Delivery Management module handles the end-to-end lifecycle of delivery operations — from assigning orders to delivery partners to confirming delivery completion.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-DEL-TASK | Delivery Task | Task list, task detail, pick up, mark delivered, proof of delivery |
| MA-DEL-PARTNER | Partner Management | Delivery partner onboarding, profiles, availability |
| MA-DEL-ZONE | Zone Management | Delivery zone configuration, PIN code coverage, fees |

---

## User Groups

- Primary: Delivery Partners (mobile-first experience)
- Secondary: Admins (oversight and manual assignment)

---

## Key Capabilities

- View and accept delivery tasks
- Mark orders picked up and delivered
- Capture proof of delivery
- Manage delivery partner profiles
- Configure delivery zones and fees

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-COM | Order data for delivery tasks |
| MOD-ADM | Admin oversight of delivery operations |
| MOD-USR | Delivery partner authentication |

---

## Metrics

- On-Time Delivery Rate (MET-0021)
- Delivery Partner Utilisation (MET-0022)
- Order Fulfilment Rate (MET-0020)

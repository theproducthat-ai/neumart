# Nuemart — Product Vision

## What Is Nuemart?

Nuemart is an India-focused online grocery shopping platform built for speed, simplicity and trust. Customers browse products, manage their cart, place orders and pay through Razorpay — all from a clean, mobile-first storefront.

---

## Who Is It For?

**Primary customer:** Household grocery buyers in India who want to order from a curated local grocery store online.

**Primary operator:** A single store owner who manages the product catalogue, inventory and order fulfilment from an admin dashboard.

---

## The Problem

Small Indian grocery stores have no affordable, fast way to let customers order online. Existing platforms either take high commissions, require complex integrations, or are built for global markets (Stripe, etc.) and miss Indian payment methods.

---

## The Solution

A purpose-built, self-owned platform where:
- The store owner controls everything through an admin panel.
- Customers pay through Razorpay — supporting UPI, cards, net banking and wallets.
- There is no dependency on a marketplace or third-party delivery layer.
- The full platform is built on Convex + Next.js and can be self-hosted or deployed to Vercel.

---

## Core Value Proposition

| For customers | For the store owner |
|---|---|
| Browse grocery products easily | Full control over catalogue and prices |
| Mobile-first experience | Real-time order and inventory tracking |
| Pay using UPI, cards, wallets | Webhook-verified payment confirmation |
| Track orders in real time | Admin dashboard — no external tools needed |
| Free delivery with membership | Membership-based loyalty |

---

## North Star Metric

**Orders placed per month through Nuemart** — the truest signal that the platform is delivering value to both the customer and the store.

---

## What Nuemart Is NOT

- Not a marketplace (one store only at this stage).
- Not a delivery management system (fulfilment is manual for now).
- Not a Stripe-based platform (India-first means Razorpay-first).
- Not a subscription SaaS product (store owner hosts their own instance).

---

## Strategic Phases

| Phase | Theme | Status |
|---|---|---|
| 1–10 | MVP Build — Foundation, Catalogue, Cart, Orders | ✅ Complete |
| 11 | Razorpay Payment Integration | 🔲 Next |
| 12 | Razorpay Subscription / Membership | 🔲 Planned |
| 13+ | Delivery tracking, coupons, multi-branch | 🔲 Future consideration |

---

## Design Principles

1. **India-first** — Razorpay, paise, Indian address format, Indian phone numbers.
2. **Store-owner controlled** — Admin has full power; no dependency on external catalogues.
3. **Webhook-verified trust** — Payment is only confirmed server-side via Razorpay webhook.
4. **Convex as the source of truth** — All order, payment, inventory and membership state lives in Convex only.
5. **Simplicity over complexity** — No feature creep. Only what the MVP scope defines.

---

*Last updated: 2026-06-21*

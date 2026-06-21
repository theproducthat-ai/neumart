# Module: Customer Commerce

## Purpose

The customer-facing storefront. Provides the complete grocery shopping experience — from browsing the product catalogue to placing an order.

---

## Status

**Built** — Full browse-to-order flow operational with Pay Later. Razorpay payment integration is the next milestone (Phase 11).

---

## Sub-modules

| Sub-module | File | Status |
|---|---|---|
| Products | `products.md` | Built |
| Product Detail | `product-detail.md` | Built |
| Search & Category Browsing | `search-and-category-browsing.md` | Built |
| Cart | `cart.md` | Built |
| Favourites | `favourites.md` | Built |
| Checkout | `checkout.md` | Built (Pay Later) — Razorpay Pending |
| Orders | `orders.md` | Built |
| Coupons | `coupons.md` | Future Candidate — not built |

---

## Built Features (Summary)

- Product listing with real-time stock status
- Category filter and keyword search
- Product detail page with add-to-cart
- Zustand cart with localStorage persistence and item count badge
- Favourites toggle and list
- Address management (customer flow)
- Checkout with address guard and Pay Later order placement
- Order history and order detail
- Mobile-responsive header with "More" dropdown

---

## Pending Features

- Razorpay Checkout at the `/checkout` screen (Phase 11)
- Razorpay Subscription for free delivery (Phase 12 — separate future phase)
- Cart cleared only after webhook-verified payment (Phase 11 logic change)

---

## Future Candidates

- Discount coupon input at cart / checkout
- Product ratings and reviews
- Recently viewed products
- Order reorder shortcut

---

## Related Modules

| Module | Relationship |
|---|---|
| User Management | Authentication gates all customer routes; addresses gate checkout |
| Inventory Management | Stock levels enforced at order placement; shown on product detail |
| Payment Management | Checkout submits to payment; cart cleared on verified payment |
| Reporting & Analytics | Order data feeds sales reports |

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Razorpay merchant account not yet approved | Checkout cannot complete real payments | Pay Later is the interim model |
| Stock reduced on order placement (not payment) | Potential over-selling if Pay Later orders are cancelled | Phase 11 moves stock deduction to webhook |
| Cart state in localStorage only | Cart lost on new device or browser clear | Acceptable for MVP; server-side cart is a future consideration |

---

*Last updated: 2026-06-21*

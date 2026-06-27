---
id: MOD-COM
name: Customer Commerce
domain_code: COM
object_type: module
status: active
owner: product_lead
version: "2.0"
---

# MOD-COM — Customer Commerce

## Purpose

The Customer Commerce module is the customer-facing shopping experience. It covers everything a customer does from discovering products to placing and tracking an order.

---

## Module Areas

| Area ID | Area Name | Description |
|---|---|---|
| MA-COM-PLP | Product Listing | Product browse, search, filter, sort, promotional banners, categories |
| MA-COM-PDP | Product Detail | Product information, images, price, allergens, nutrition, add to cart |
| MA-COM-CART | Cart | Shopping cart management, quantity, item removal |
| MA-COM-CHK | Checkout | Address selection, delivery slot, payment, order confirmation |
| MA-COM-ADDR | Address Management | Saved delivery addresses, add/edit/delete |
| MA-COM-FAV | Favourites | Saved/favourite products |
| MA-COM-ORDHIS | Order History | Past orders list, order detail, reorder |
| MA-COM-PROFILE | Customer Profile | Account settings, preferences |

---

## User Groups

- Primary: Customers (authenticated)
- Secondary: Guest users (pre-login, limited access)

---

## Key Capabilities

- Browse and search products
- View product details (price, allergens, nutrition)
- Manage cart and checkout
- Pay for orders
- View order history
- Save favourite products
- Manage delivery addresses

---

## Module Dependencies

| Depends On | Reason |
|---|---|
| MOD-PAY | Checkout requires payment processing |
| MOD-INV | PLP and PDP require stock availability data |
| MOD-DEL | Checkout requires delivery zone and slot availability |
| MOD-USR | Logged-in features require user identity |

---

## Metrics

Primary module metrics:
- Search-to-order rate (MET-0003)
- Cart abandonment rate
- Checkout completion rate
- Feature adoption rate (MET-0001)

---

## Related Indexes

- Filter `product/indexes/FEATURE_INDEX.md` by module: COM
- Filter `product/indexes/BUG_INDEX.md` by module: COM
- `product/indexes/MODULE_FEATURE_MAP.md`

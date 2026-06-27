# Event Taxonomy

**Version**: 2.0  
**Owner**: Engineering Lead / Product Lead

---

## Purpose

Defines the naming conventions, required properties, and complete catalog of analytics events tracked in Neumart. Every event fired in the application must be registered here before implementation.

---

## Event Naming Convention

Format: `[object]_[action]`

- Object: the thing the user interacted with (snake_case, singular)
- Action: what the user did (past tense verb)

Examples:
- `product_viewed`
- `cart_item_added`
- `order_placed`
- `search_performed`

Do not use vague names like `button_clicked` or `page_loaded` — be specific about which button and which page.

---

## Required Properties on Every Event

Every event must include these standard properties:

| Property | Type | Description |
|---|---|---|
| `event_name` | string | The event name per taxonomy |
| `timestamp` | ISO 8601 | When the event occurred |
| `session_id` | string | The current session identifier |
| `user_id` | string or null | The authenticated user ID (null if anonymous) |
| `platform` | string | `web` / `mobile_web` / `app` |
| `module` | string | Which app module the event originated from |

---

## Event Catalog

### Commerce (Module: `COM`)

| Event Name | Trigger | Key Properties |
|---|---|---|
| `product_listing_viewed` | Customer views the product listing page | `category`, `page_number` |
| `product_searched` | Customer submits a search query | `query`, `result_count` |
| `product_viewed` | Customer views a product detail | `product_id`, `product_name`, `category`, `source` |
| `cart_item_added` | Customer adds item to cart | `product_id`, `quantity`, `cart_total` |
| `cart_item_removed` | Customer removes item from cart | `product_id`, `quantity`, `cart_total` |
| `cart_viewed` | Customer opens cart | `item_count`, `cart_total` |
| `checkout_started` | Customer begins checkout | `cart_total`, `item_count` |
| `checkout_address_completed` | Customer fills address step | — |
| `checkout_payment_initiated` | Customer submits payment | `payment_method`, `order_total` |
| `order_placed` | Order successfully created | `order_id`, `order_total`, `item_count`, `payment_method` |
| `order_failed` | Order creation failed | `failure_reason`, `payment_method` |
| `banner_viewed` | Promotional banner displayed | `banner_id`, `position` |
| `banner_clicked` | Customer clicks a banner | `banner_id`, `position`, `destination` |
| `favourite_toggled` | Customer favourites/unfavourites product | `product_id`, `action: add/remove` |

### Admin (Module: `ADM`)

| Event Name | Trigger | Key Properties |
|---|---|---|
| `admin_login` | Admin user logs in | `role` |
| `order_status_updated` | Admin changes order status | `order_id`, `from_status`, `to_status` |
| `product_created` | Admin creates new product | `product_id`, `category` |
| `product_updated` | Admin edits product | `product_id`, `fields_changed` |
| `inventory_adjusted` | Admin adjusts stock | `product_id`, `adjustment`, `reason` |
| `report_exported` | Admin exports a report | `report_type`, `date_range` |

### Delivery (Module: `DEL`)

| Event Name | Trigger | Key Properties |
|---|---|---|
| `delivery_assigned` | Order assigned to delivery partner | `order_id`, `partner_id` |
| `delivery_started` | Delivery partner picks up order | `order_id`, `partner_id` |
| `delivery_completed` | Order marked delivered | `order_id`, `actual_delivery_time`, `promised_delivery_time` |
| `delivery_failed` | Delivery attempt failed | `order_id`, `failure_reason` |

### User (Module: `USR`)

| Event Name | Trigger | Key Properties |
|---|---|---|
| `user_registered` | New customer account created | `source` |
| `user_login` | Customer logs in | `method` |
| `user_profile_updated` | Customer updates profile | `fields_changed` |
| `address_added` | Customer adds delivery address | — |

---

## Adding New Events

Before implementing a new event:
1. Define it here — name, trigger, and key properties
2. Get Product Lead approval (to prevent event sprawl)
3. Implement using the standard event properties above plus the event-specific properties
4. Add to the measurement plan for the feature that introduces it

**Never implement an event that is not in this taxonomy.**

---

## Event Properties — Do Not Track

Never include in any event:
- Full card numbers, CVV, or payment credentials
- Passwords or authentication tokens
- Full name + address + date of birth combined (PII aggregation)
- Government ID numbers

When in doubt, ask Engineering Lead before implementing.

---

## Related Documents

- [METRIC_DICTIONARY.md](METRIC_DICTIONARY.md)
- [FEATURE_MEASUREMENT_RULES.md](FEATURE_MEASUREMENT_RULES.md)
- `product/os/templates/MEASUREMENT_PLAN_TEMPLATE.md`

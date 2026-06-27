# Module Dependency Map

**Version**: 2.0  
**Owner**: Engineering Lead / Product Lead  
**Updated**: Update when a new module dependency is identified or resolved

---

## Purpose

Maps the dependencies between modules. Use this when planning cross-module work to identify which teams need to be aligned and which modules could be affected by a change.

---

## Dependency Matrix

A dependency means: the row module **depends on** the column module for some functionality.

| Module | COM | ADM | DEL | INV | PAY | USR | RPT |
|---|---|---|---|---|---|---|---|
| **COM** | — | — | ✓ delivery slots | ✓ stock display | ✓ checkout payment | ✓ auth/profile | — |
| **ADM** | ✓ order data | — | ✓ delivery tasks | ✓ inventory | ✓ financial data | ✓ user accounts | ✓ report data |
| **DEL** | ✓ order data | ✓ admin oversight | — | — | — | ✓ partner auth | — |
| **INV** | ✓ product data | ✓ admin UI | — | — | — | — | — |
| **PAY** | ✓ order data | ✓ admin refunds | — | — | — | — | — |
| **USR** | — | — | — | — | — | — | — |
| **RPT** | ✓ order/cart data | ✓ admin UI | ✓ delivery data | ✓ stock data | ✓ payment data | ✓ user data | — |

---

## Dependency Details

### COM depends on DEL
- Checkout requires delivery zone availability and slot selection
- Order history shows delivery status from DEL module
- **Impact**: DEL changes to zone or slot APIs may break COM checkout

### COM depends on INV
- PLP and PDP show stock status (in stock / out of stock)
- Cart prevents adding out-of-stock items
- **Impact**: INV schema changes to product availability may break COM display

### COM depends on PAY
- Checkout payment initiation uses PAY module's Razorpay integration
- **Impact**: PAY gateway changes directly affect COM checkout completion

### COM depends on USR
- Logged-in features (favourites, order history, address) require authenticated user identity
- **Impact**: USR auth changes may break COM logged-in flows

### ADM depends on all modules
- Admin console is a read/write interface across all modules
- Changes to any module's data model may require ADM updates

### RPT depends on all modules
- Reports consume data from all modules
- Performance-sensitive: large table queries may affect RPT response time

---

## High-Risk Dependency Zones

These combinations create the highest cross-module risk when work is planned:

| Change Area | Risk To | Why |
|---|---|---|
| COM Checkout flow | PAY | Payment initiation is tightly coupled |
| DEL Zone or Slot APIs | COM | Checkout availability depends on this |
| USR Auth session | All | Every authenticated flow across all modules |
| PAY Webhook handling | COM + ADM | Order status depends on payment webhooks |
| INV Stock schema | COM | Product availability display depends on this |

---

## How to Use This Map

Before planning any feature:
1. Identify the primary module
2. Check this map for dependencies
3. For any High-Risk Dependency Zone, ensure the dependent module owner is consulted during planning
4. Add cross-module risks to the RISK_INDEX and feature's impact analysis

---

## Related Documents

- [MODULE_INDEX.md](MODULE_INDEX.md)
- [DEPENDENCY_INDEX.md](DEPENDENCY_INDEX.md)
- `product/os/intelligence/IMPACT_ANALYSIS_ENGINE.md`
- `product/engineering/API_CONTRACT_RULES.md`

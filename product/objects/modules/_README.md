# Module Objects

**Object type**: `module`  
**ID Format**: `MOD-[DOMAIN_CODE]`  
**Examples**: `MOD-COM`, `MOD-ADM`, `MOD-DEL`  
**Owner**: Product Lead  
**Template**: `product/os/templates/MODULE_OBJECT_TEMPLATE.md`

---

## What Is a Module?

A Module is the largest first-class product subdivision below the product itself. It maps to a distinct business/product area with its own user group, domain logic, and engineering ownership.

Every Product OS object (request, feature, bug, story, release, metric) must reference its parent module via `module_id`.

---

## Position in the Hierarchy

```
Product
  └── Domain
        └── Module  ← this folder
              └── Module Area  (product/objects/module-areas/)
                    └── Capability  (product/objects/capabilities/)
                          └── Feature  (product/objects/features/)
```

---

## Module Registry

| ID | Name | Domain Code | User Groups | Status |
|---|---|---|---|---|
| MOD-COM | Customer Commerce | COM | Customers | active |
| MOD-ADM | Admin Console | ADM | Admins | active |
| MOD-DEL | Delivery Management | DEL | Delivery Partners, Admins | active |
| MOD-INV | Inventory Management | INV | Warehouse Staff, Admins | active |
| MOD-PAY | Payment Management | PAY | Customers, Admins | active |
| MOD-USR | User Management | USR | All users | active |
| MOD-RPT | Reporting | RPT | Admins, Operations | active |

---

## When to Create a Module Object

- A new business area is added to the product
- A module's scope changes significantly
- Module-level ownership or capacity needs formal tracking

Module objects are long-lived — they rarely change.

---

## Files in This Folder

`MOD-COM.md`, `MOD-ADM.md`, `MOD-DEL.md`, `MOD-INV.md`, `MOD-PAY.md`, `MOD-USR.md`, `MOD-RPT.md`

---

## Related

- `product/objects/module-areas/` — Module Areas within each module
- `product/indexes/MODULE_INDEX.md` — Flat registry with quick-reference
- `product/indexes/MODULE_FEATURE_MAP.md` — Module → Feature mapping
- `product/indexes/MODULE_ROADMAP_MAP.md` — Module → Roadmap mapping

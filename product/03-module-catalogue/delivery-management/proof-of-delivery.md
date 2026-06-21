# Sub-module: Proof of Delivery

**Module:** Delivery Management  
**Status:** Candidate — not built

---

## Purpose

Captures evidence that an order was successfully delivered — typically a photo of the delivery or a customer signature. Provides accountability for delivery persons and a reference point for dispute resolution.

---

## Intended Behaviour

### Photo Capture

- Delivery person uploads a photo at the delivery location.
- Photo is uploaded to a cloud storage provider (e.g. Convex file storage or an external service like Cloudinary / AWS S3).
- The URL of the uploaded photo is stored as `deliveryTasks.proofUrl`.

### Signature Capture

- Optional alternative to photo: a drawn signature on the delivery person's device.
- Signature is captured as an image and stored the same way as a photo.

### Timestamp

- `deliveryTasks.deliveredAt` is set when proof is captured.
- This serves as the official delivery timestamp.

### Admin Visibility

- Admin can view proof of delivery on the order detail and delivery task detail screens.
- Photo / signature is displayed inline with the order record.

### Customer Visibility

- Customer can optionally see "Delivered — [date/time]" with the photo (PRD decision: is the proof shared with the customer?).

---

## Convex Entity Required

`deliveryTasks.proofUrl` and `deliveryTasks.deliveredAt` fields — see `DATA_ENTITY_MAP.md`.

---

## Storage Considerations

- Convex file storage can be used for simple photo uploads.
- For scale or cost reasons, external storage (Cloudinary, S3) may be preferred.
- File retention policy should be defined (how long are delivery photos kept?).

---

## Pre-requisites to Build

1. Module evaluation approved.
2. Delivery Status sub-module built (proof is captured as part of marking "Delivered").
3. File storage solution decided and configured.

---

*Last updated: 2026-06-21*

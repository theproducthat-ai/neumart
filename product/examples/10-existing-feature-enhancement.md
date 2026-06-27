# Example 10 — Existing Feature Enhancement: Carousel Banner Performance

**Lane**: Small Enhancement  
**Source**: Engineering Lead (internal)  
**Context**: The promotional banner carousel (REQ-0002, FEAT-COM-LIST-00X) was shipped in a previous sprint. This example covers a follow-on enhancement.

---

## 1. Context

The promotional banner carousel was delivered in Sprint 10. Post-release measurement showed that banner_clicked events are firing, but the time-to-first-paint for the carousel images is 1.8 seconds on 4G mobile — significantly above the 500ms target. Users on slower connections see a layout shift as images load.

**Source**: Engineering Lead observed this during post-release monitoring. Analytics data confirmed it.

---

## 2. Classification

- **Request type**: Feature Enhancement (improves existing carousel feature)
- **Module**: COM-PLP (Commerce, Product Listing Page)
- **Work type lane**: Small Enhancement
- **Blocking flags**: None (performance optimization, no schema change)
- **Lane rationale**: Single module, performance fix, < 3 stories, no new UX

---

## 3. What Makes This a "Small Enhancement" and Not a "Fast Fix"?

- A Fast Fix would be appropriate if there was a clear one-line bug (wrong cache header, missing `loading="lazy"`)
- This is an enhancement because the fix requires evaluating multiple approaches (lazy loading strategy, image format, CDN, preloading) and implementing the best one
- It's < 3 stories and doesn't need a PRD, but it does need a brief tech design to document the chosen approach

---

## 4. Tech Design Decision (Brief)

Engineering Lead evaluated three options:
1. Add `loading="lazy"` to image tags — minimal gain (images are above the fold)
2. Convert to WebP format with responsive sizes + preload — medium gain
3. **Serve images from CDN with optimised dimensions + WebP + preload links** — highest gain, chosen

Expected outcome: time-to-first-paint from 1.8s → 350ms on 4G.

Tech design documented in a brief note in the story (not a full TD object, as this is Small Enhancement).

---

## 5. User Story

**US-0050**: As a customer on the product listing page, I want the banner carousel to load visually within 500ms so the page feels fast and I don't see layout shifts.

**Acceptance criteria**:
- Carousel images served from CDN
- Images in WebP format with fallback JPEG
- p95 image load time ≤ 500ms on 4G mobile network simulation
- No visible layout shift (CLS < 0.1)

---

## 6. Object Chain

```
Original feature: FEAT-COM-LIST-00X (carousel, delivered Sprint 10)
  └── REQ-0013 (carousel performance enhancement, Sprint 11)
        └── US-0050 (fast carousel loading)
              └── REL-0012 (Sprint 11 release)
```

**Note**: This is a new request object (REQ-0013), not a reopened version of REQ-0002. Existing features that receive enhancements get new request objects for the enhancement scope.

---

## 7. Measurement

**Before**: Carousel image load p95 = 1,800ms on 4G  
**Target**: ≤ 500ms on 4G  
**Measurement**: Engineering will measure using browser dev tools on 4G simulation on the day of deployment and report results in the release object.

---

## 8. Key Learnings from This Example

- Existing features that need performance work are enhancements, not bugs — unless the feature was specified to be fast and isn't
- Post-release measurement (from the original feature's measurement plan) is how this work was identified — without measurement, it wouldn't have been caught
- Small enhancements to existing features get their own request objects — this keeps the original feature object clean
- Performance enhancements still need acceptance criteria — "faster" is not an acceptance criterion; "p95 load time ≤ 500ms" is

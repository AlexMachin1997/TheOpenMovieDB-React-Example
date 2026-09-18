# Feature: Image

## Problem

The app has an `Image` component with 10 consumers _(measured 2026-09-14)_. It wraps `<img>` and
adds three things: an error fallback, a size, and an accessible name. All three are wrong.

**It reserves no space.** The component writes its `width` and `height` props into both an inline
`style` and the HTML attributes. The attributes only accept a non-negative integer, so every value
the app actually passes — `'100%'`, `'250px'`, `'4rem'`, `'unset'` — is discarded. With no usable
`width`/`height` pair the browser derives no `aspect-ratio`, so nothing on the site reserves layout
space for an image before it loads. Nine of the ten consumers pass a CSS string; only the footer logo
passes integers _(measured 2026-09-14)_.

Four call sites compensate with a Tailwind `aspect-*` class, and three of the four contradict the
dimensions sitting beside them — `aspect-square` on a 250×141 thumbnail, and again on a 130×230
poster _(measured 2026-09-14)_. Nobody noticed, because the props they were fighting were already
inert.

**Its accessible name is the one the caller didn't write.** The component sets `alt`, `aria-label`
and `title` from two props. `aria-label` overrides `alt` on an `<img>`, so `label` is what assistive
technology announces and `alt` only ever surfaces as a mouse tooltip. Every call site passes both,
and they differ — `alt={title}` beside ``label={`Poster for ${title}`}``.

**Its error fallback leaves the site.** A failed image is replaced with a `via.placeholder.com` URL —
a third-party request on an error path — and its `alt` is rewritten to "Failed to load the image,
this is a fallback", which announces our plumbing instead of describing what the image was.

Consumers have started fighting it. `PersonSidebar` passes `width='unset' height='unset'` and then
`!h-[450px] !w-[300px]` to beat the inline style with `!important`.

This is C02 in [`component-inventory.md`](../component-inventory.md) and the foundation the card work
sits on.

## Goals

1. Make the native path impossible to get wrong — space is reserved, the name is correct, and a
   caller cannot silently produce neither.
2. Collapse the accessible name to one prop with no way to shadow it.
3. Keep a failed image local, theme-aware, and still describing its content.
4. Add nothing the browser already does declaratively.

## Scope

**Included** — one `Image` component in `ui-core`: space reservation, a single accessible name, and a
local fallback. Consumer-facing Storybook documentation, as every other `ui-core` component has.

**Not included, but owed** — migrating the app's 10 call sites. It is a separate change, and the
component ships with **migration notes** recording how each existing prop shape maps onto the new
API, so the mapping is not re-derived months later. Those notes are part of this deliverable even
though the migration is not.

**Independently deliverable** — yes.

## Non-Goals

- **Avatars.** `Avatar` already exists in `ui-core` with a Radix-backed fallback and a circular
  surface. `Review`'s round 4rem photo is an `Avatar`, not an `Image`.
- **A loading state.** Once space is reserved the layout no longer jumps, and what remains is
  cosmetic. It also costs a wrapper element on every image to render a placeholder over one. A
  caller who wants one composes `Skeleton` with the `onLoad` callback below.
- **Retrying a failed image.** It fails or it loads.
- **A separate `AspectRatio` component** (C16 in the inventory). CSS `aspect-ratio` is
  [Baseline widely available since September 2021](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio);
  Radix's primitive predates it. A wrapper component also cannot be required by the type system,
  which is the whole mechanism behind requirement 3 below.
- **A `priority` convenience prop.** `loading` and `fetchpriority` are native and pass through.
- **Re-implementing native attributes** — `loading`, `decoding`, `srcset`, `sizes` and
  `fetchpriority` are passed straight through, unrenamed and unwrapped.
- **A CDN or image-transformation layer**, and **art direction** (`<picture>`, media-conditional
  sources).
- **The surface tokens.** Radius, border and background belong to the caller and to the
  design-system audit.

## Requirements

### Functional

1. The component renders a single `<img>` and introduces no wrapper element, in any state.
2. The caller states the image's shape in one of two ways, and the component reserves layout space
   for it before the image loads:
   - **Intrinsic size** — `width` and `height` as integers, written to the HTML attributes so the
     browser derives the ratio itself. For sources whose real dimensions are known at author time.
   - **Ratio** — a `ratio` prop, for when the rendered box must hold a fixed shape regardless of the
     source's own dimensions. TMDB posters are the case: the API returns varying heights that all
     have to occupy a 2:3 box.
3. Supplying neither is not expressible. A caller who deliberately wants an unsized image says so
   explicitly.
4. Supplying both is not expressible. They can disagree, and CSS resolves the disagreement silently
   in favour of the ratio, leaving the integers dead with no indication.
5. `width` and `height` accept integers only. A CSS length is not a valid value.
6. `ratio` accepts a fixed set of ratio literals, not an arbitrary string and not domain names.
7. When `ratio` is used, the image fills its box without distortion by default, and the caller can
   override how.
8. An image that fails to load, and an image with no source to load, render the same fallback. A
   missing image is not an error state — there is a sensible thing to show either way, and the
   caller should not have to branch to get it.
9. The fallback is painted from theme tokens and issues no network request. A fetched fallback fails
   in exactly the case it exists for — a dropped connection takes both requests with it.
10. A caller may override the fallback with an image source. A caller-supplied fallback that itself
    fails falls through to the built-in one, so the final state is always one the component controls.
11. The component's own error handling runs first, then any caller callback. A caller's `onError`
    never replaces the fallback behaviour.
12. A caller callback fires once for a failure of the source they asked for. The internal cascade
    from a custom fallback to the built-in one does not re-fire it.
13. `loading` defaults to `lazy`.

### UI/UX

14. A single prop carries the accessible name. There is no second naming prop that can shadow it.
15. A decorative image is expressible, and is distinguishable from a caller who supplied no name.
16. The fallback is visually distinguishable from a loaded image and correct in both colour schemes.
17. The component applies no radius, border, shadow or background of its own.

### Accessibility

18. The name the caller supplies is the name assistive technology announces.
19. A decorative image exposes nothing to assistive technology — no name, no role.
20. The fallback does not announce the failure. It carries the name the image would have had, or
    nothing at all when the image was decorative.
21. The component sets no `aria-label` and no `title` on the `<img>`.

### Integration

22. The component is exported from `ui-core` and follows the package's existing conventions.
23. It takes the same `className` escape hatch every other `ui-core` component takes, and passes
    through native `<img>` attributes — **except** `width` and `height`, deliberately narrowed by
    requirement 5, and the naming attributes removed by requirement 21.

## Edge Cases & Error Handling

- **`src` is empty or missing.** Renders the fallback. An empty `src` resolves against the page URL
  and re-requests the document in some browsers, so it must never reach the DOM.
- **A caller-supplied `fallback` also fails.** Falls through to the built-in fallback. Warn in
  development — the caller cannot otherwise see their mistake, because the component papers over it.
  Do **not** warn when the primary source fails; that is an expected state, not a bug.
- **`src` changes after a failure.** The error state resets and the new source is attempted. A card
  in a rail that recycles its node must not inherit the previous item's broken state.
- **The same `src` becomes available again.** Nothing happens. There is no retry.
- **The image fails after a successful load** (cache eviction, a revoked blob URL). Same path as an
  initial failure.
- **A caller fixes both dimensions through `className`.** `aspect-ratio` has no effect unless one of
  the box's sizes is automatic, so a caller can satisfy requirement 2 and still reserve nothing —
  `PersonSidebar` does exactly this today. The type system cannot catch it. Document it as a caller
  obligation and warn in development; do not block it.
- **A decorative image that fails.** Renders the fallback, exposing nothing.
- **`alt` is an empty string.** Warn in development unless the caller has explicitly marked the
  image decorative. Empty-by-accident and empty-on-purpose must not look identical.

## Success Criteria

- SC1: Every image the component renders reserves its layout space before the source loads, unless
  the caller has explicitly opted out.
- SC2: There is exactly one way to name an image, and it is the one assistive technology reads.
- SC3: No network request is issued as a result of an image failing.
- SC4: Every shape the app's current call sites need is expressible through the new API without
  `!important`, demonstrated in Storybook rather than asserted.
- SC5: A caller can tell from the documentation which of intrinsic size and ratio their case wants.
- SC6: The mapping from each current prop shape to the new API is written down.

## Acceptance Criteria

- AC1: Given integer `width` and `height`, when the page renders before the source has loaded, then
  the element occupies a box of that ratio.
- AC2: Given a `ratio` and no intrinsic size, when the page renders before the source has loaded,
  then the element occupies a box of that ratio.
- AC3: Given a CSS length such as `'250px'` passed as `width`, when the code is type-checked, then it
  fails to compile.
- AC4: Given neither a `ratio` nor an intrinsic size and no explicit opt-out, when the code is
  type-checked, then it fails to compile.
- AC5: Given both a `ratio` and an intrinsic size, when the code is type-checked, then it fails to
  compile.
- AC6: Given a `ratio` and a source of a different shape, when the rendered image is measured, then
  it fills the box and its content is not distorted.
- AC7: Given a named image that fails to load, when assistive technology reads the element, then it
  announces the name the caller supplied and says nothing about the failure.
- AC8: Given a named image, when the rendered markup is inspected, then the name appears once and
  there is no `aria-label` or `title` on the element.
- AC9: Given an image marked decorative, when assistive technology traverses the page, then the
  element is not reachable — whether or not it loaded.
- AC10: Given an image that fails to load, when network activity is inspected, then no request was
  issued as a result of the failure.
- AC11: Given an empty `src`, when the rendered markup is inspected, then no request for the current
  document URL was issued and the fallback is shown.
- AC12: Given a failed image in each colour scheme, when the fallback is inspected, then it matches
  the scheme in use, including when the scheme is set by the app rather than by the OS.
- AC13: Given a caller-supplied `fallback` that also fails, when the element settles, then the
  built-in fallback is shown and a development warning names the failing fallback.
- AC14: Given a caller passing `onError`, when the image fails, then the fallback is shown **and**
  the caller's handler is invoked exactly once.
- AC15: Given an image that has failed, when `src` is changed to a working source, then the image
  loads and the fallback is no longer shown.
- AC16: Given an image that has failed, when the same source later becomes available, then nothing
  changes.
- AC17: Given `alt=""` with no explicit decorative marking, when the component renders in
  development, then it warns.
- AC18: Given a caller passing `loading`, `decoding`, `srcset`, `sizes` or `fetchpriority`, when the
  rendered markup is inspected, then each appears on the `<img>` unchanged.
- AC19: Given no `loading` value, when the rendered markup is inspected, then `loading="lazy"` is
  present.
- AC20: Given a caller sizing the element through `className`, when the element is measured, then the
  class takes effect without `!important`.

## Decisions

- **`alt` is the name, and it is the only name.** `aria-label` and `title` are removed rather than
  reconciled — `aria-label` on an `<img>` wins over `alt`, which is the exact trap the current
  component fell into.
- **Intrinsic size and ratio both exist, and are mutually exclusive.** They answer different
  questions: integers when the file's dimensions are known, `ratio` when only the slot's shape is.
  The inventory framed `ratio` as replacing the pair — it replaces the *broken string* pair, not the
  native integer one.
- **The contradiction is made unrepresentable rather than warned about**, wherever the type system
  can reach it — no shape at all, both shapes at once, a CSS length where an integer belongs. Where
  it cannot reach (a caller fixing both dimensions in `className`), a development warning and a
  documented obligation.
- **`ratio` takes literals, not names.** `'poster'` is TMDB vocabulary and does not belong in a
  generic library; an arbitrary string removes the constraint that is the prop's whole value.
  Supporting both would give two ways to express one shape.
- **The built-in fallback is painted, not fetched; a caller's override is fetched.** Two mechanisms
  behind one concept, accepted knowingly: the built-in must follow the app's `.dark` class, and an
  image loaded through `src` is sandboxed from the document's CSS variables. The repo's dark mode is
  class-based (`@custom-variant dark (&:is(.dark *))`), so a data-URI SVG using
  `prefers-color-scheme` would follow the OS and desync from the in-app toggle.
- **Absent and failed are one state.** Both have the same sensible answer, so splitting them would
  mean designing a second placeholder and making every caller branch to pick between them.
- **`object-fit` defaults to covering the box.** A ratio without it distorts the source, which trades
  layout shift for squashing. Whether cropping is right for posters is a judgement to make against
  real renders in Storybook, not from the spec.
- **Avatars stay with `Avatar`**, and **`AspectRatio` stays dropped** (C16) — its entire job is the
  `ratio` prop.

## Open Questions

None blocking. One judgement is deliberately deferred to review rather than settled here: whether
`cover` is the right default for posters, or whether cropping loses too much at the edges. It has an
override either way, and it is a call to make against rendered output.

## Design References

- The current component and its ten call sites: `apps/the-open-movie-database/src/components/Core/Image`.
- The existing fallback pattern in the library: `packages/ui-core/src/components/Avatar`.
- Dark mode is class-based: `packages/tailwind-config/src/globals.css:4`.
- `aspect-ratio` behaviour, including why the `auto` form is not used:
  [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio).
- Original scope decisions: [`component-inventory.md`](../component-inventory.md), C02 and the
  "Image scope" note.

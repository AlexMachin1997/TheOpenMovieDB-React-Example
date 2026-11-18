# Feature: Spinner

## Problem

The app's `Loader.tsx` does two jobs behind one `isFixed` flag. It is a spinner, and it is a
full-screen overlay that holds the spinner. Because the two share one component, the spinner cannot
be used on its own inside a rail, a card or a section. Its colours are hardcoded `rgba()` values, so
it ignores the theme, and it announces nothing to assistive technology.

`Loader` has no call sites in the app outside its own story _(measured 2026-11-16)_. The app is being
set up again, and its loading states will need something to render.

`Button` already has its own loading spinner (`<Icon name='loader-circle' className='animate-spin' />`).
It is built and working, and this deliverable leaves it alone.

This is C04 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. A spinner that works on its own wherever content is loading.
2. Loading states that assistive technology announces, and motion that respects the user's
   preference.

## Scope

**Included**: a `Spinner` in `ui-core`.
Consumer-facing Storybook documentation.

**Not included**: the app's loading states. They are built when the app is set up again.

**Independently deliverable**: yes.

## Non-Goals

- **Skeletons.** `Skeleton` already exists in `ui-core`. A spinner and a skeleton answer different
  questions, and choosing between them is the caller's decision.
- **Progress with a known amount.** `Progress` covers that.
- **A delay before the spinner appears**, to avoid a flash on fast loads. The caller controls when
  loading starts, and that is the right place for a delay.
- **Changing `Button`'s loading state** _(decided 2026-11-18)_. `Button` keeps its own spinner
  icon. The two may look different, which is accepted.
- **A loading surface that covers content** _(cut 2026-11-18)_. Data is fetched by route loaders,
  and the router's pending state renders _in place of_ the route, which is a `Spinner` laid out by
  the app. Covering content that is already on screen (dimming it and blocking clicks while it
  refetches, for example after a filter change) is not something the app does yet. Specify it when
  that case turns up. Until then the old `Loader`'s overlay half is not carried over.
- **Colour variants.** The spinner takes its colour from the current text colour.

## Requirements

### Functional

1. `Spinner` renders inline and takes its size from a named size scale, with a default.

### UI/UX

2. The spinner's colour is the current text colour, so it is correct in both colour schemes and on
   any surface.
3. When the user prefers reduced motion, the spinner does not rotate. It pulses its opacity in
   place instead, so it still reads as busy.

### Accessibility

4. A standalone `Spinner` has an accessible name that says loading is in progress. The caller can
   replace the default name, for example "Loading recommendations".
5. A standalone `Spinner` is exposed as a status, without moving focus. See Known limitations for
   when it is announced.
6. The caller can mark a spinner decorative, for use beside visible text that already says what is
   loading. A decorative spinner is not in the accessibility tree.

### Integration

7. The component is exported from `ui-core` and follows the package's existing conventions.
8. It takes the same `className` escape hatch as every other `ui-core` component.

## Edge Cases & Error Handling

- **A spinner inside an element that already has a name.** The caller can mark the spinner
  decorative so the name is not announced twice.

## Success Criteria

- SC1: A spinner can be placed anywhere content loads.
- SC2: Assistive technology users are told when loading starts.
- SC3: No spinner rotates for a user who prefers reduced motion.

## Acceptance Criteria

- AC1: Given a `Spinner` with no props, when the accessibility tree is inspected, then it has a
  status role and a name that says loading is in progress.
- AC2: Given a `Spinner` with a caller-supplied name, when the accessibility tree is inspected, then
  that name is announced instead of the default.
- AC3: Given a `Spinner` marked decorative, when the accessibility tree is inspected, then it is not
  in it.
- AC4: Given a reduced-motion preference, when a `Spinner` is rendered, then it does not rotate and
  its opacity pulses.
- AC5: Given each colour scheme, including a scheme set by the app rather than the OS, when the
  spinner is inspected, then it matches the scheme.

## Decisions

- **The spinner stands alone.** The old `Loader` combined a spinner and a full-screen overlay behind
  one flag, which is what made the spinner unusable on its own. Only the spinner is carried over.
- **Reduced motion swaps the rotation for an opacity pulse** _(decided 2026-11-18)_. A frozen ring
  reads as an empty circle, and hiding it would look like a frozen page. Slowing the rotation, as
  Chrome's guidance suggests, still rotates. A pulse shows activity without movement. It is also the
  library-wide rule recorded for the design-system audit in
  [`planned.md`](../planned.md#design-system-audit): under reduced motion, movement becomes a fade.

## Known limitations

- **A spinner that mounts may not be spoken straight away** _(accepted 2026-11-18)_. A status region
  that appears already holding its text is not announced reliably by every screen reader. A screen
  reader user still finds the spinner when they reach it. This is accepted because data is fetched
  by route loaders, so a page shows one loader at a time. Revisit, for example with one shared live
  region, if components start fetching on their own and several spinners can appear at once.

## Open Questions

None.

## Design References

- The current component: `apps/the-open-movie-database/src/components/Core/Loader/Loader.tsx`.
- `Button`'s loading state: `packages/ui-core/src/components/Button/Button.tsx`.
- The status role: [WAI-ARIA 1.2, `status`](https://www.w3.org/TR/wai-aria-1.2/#status).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C04.

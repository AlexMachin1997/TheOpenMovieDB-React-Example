# Feature: Spinner and loading surface

## Problem

The app's `Loader.tsx` does two jobs behind one `isFixed` flag. It is a spinner, and it is a
full-screen overlay that holds the spinner. Because the two share one component, the spinner cannot
be used on its own inside a rail, a card or a section. Its colours are hardcoded `rgba()` values, so
it ignores the theme, and it announces nothing to assistive technology.

`Loader` has no call sites in the app outside its own story _(measured 2026-11-16)_. The app is being
set up again, and its loading states will need something to render.

The library already has a spinner in one place. `Button` renders `<Icon name='loader-circle'
className='animate-spin' />` while `loading` is true. A second spinner with its own look would give
the library two.

This is C04 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. A spinner that works on its own wherever content is loading.
2. A loading surface that covers a region while its content loads, as a separate component.
3. One spinner look across the library, including `Button`'s loading state.
4. Loading states that assistive technology announces, and motion that respects the user's
   preference.

## Scope

**Included**: a `Spinner` and a loading surface in `ui-core`. `Button`'s loading state renders the
same spinner visual. Consumer-facing Storybook documentation for both.

**Not included**: the app's loading states. They are built when the app is set up again.

**Independently deliverable**: yes.

## Non-Goals

- **Skeletons.** `Skeleton` already exists in `ui-core`. A spinner and a skeleton answer different
  questions, and choosing between them is the caller's decision.
- **Progress with a known amount.** `Progress` covers that.
- **A delay before the spinner appears**, to avoid a flash on fast loads. The caller controls when
  loading starts, and that is the right place for a delay.
- **Colour variants.** The spinner takes its colour from the current text colour.

## Requirements

### Functional

1. `Spinner` renders inline and takes its size from a named size scale, with a default.
2. The loading surface fills the region it is placed in and shows a spinner centred in that region.
   It does not cover the viewport unless the region is the viewport.
3. While the loading surface is shown, the content it covers cannot be interacted with.
4. The loading surface can be shown over existing content or in place of it.
5. `Button`'s loading state renders the same spinner visual as `Spinner`. `Button`'s existing
   loading behaviour (`aria-busy`, the disabled state, the replaced start icon) does not change.

### UI/UX

6. The spinner's colour is the current text colour, so it is correct in both colour schemes and on
   any surface.
7. The loading surface's backdrop uses a theme token and is correct in both colour schemes.
8. When the user prefers reduced motion, the spinner does not rotate. It still shows that something
   is loading.

### Accessibility

9. A standalone `Spinner` has an accessible name that says loading is in progress. The caller can
   replace the default name, for example "Loading recommendations".
10. A standalone `Spinner` is announced when it appears, without moving focus.
11. A spinner inside `Button` adds no name of its own. `Button` already reports itself busy.
12. The content under a loading surface is marked busy while the surface is shown.

### Integration

13. Both components are exported from `ui-core` and follow the package's existing conventions.
14. Both take the same `className` escape hatch as every other `ui-core` component.

## Edge Cases & Error Handling

- **Several spinners on one page.** Each is announced. A page that shows many at once should use one
  loading surface around them, and Storybook documents this.
- **A spinner inside an element that already has a name.** The caller can mark the spinner
  decorative so the name is not announced twice. `Button` does this itself.
- **The loading surface is removed while focus is inside the covered content.** Focus stays where it
  was. The surface never takes focus.
- **A region with no height.** The loading surface needs a height to centre in. With none, it
  collapses to the spinner's own height. Document this as a caller obligation.

## Success Criteria

- SC1: The library has one spinner visual, and `Button` uses it.
- SC2: A spinner can be placed anywhere content loads, without an overlay.
- SC3: Assistive technology users are told when loading starts.
- SC4: No spinner rotates for a user who prefers reduced motion.

## Acceptance Criteria

- AC1: Given a `Spinner` with no props, when the accessibility tree is inspected, then it has a
  status role and a name that says loading is in progress.
- AC2: Given a `Spinner` with a caller-supplied name, when the accessibility tree is inspected, then
  that name is announced instead of the default.
- AC3: Given a `Spinner` marked decorative, when the accessibility tree is inspected, then it is not
  in it.
- AC4: Given a loading `Button`, when the rendered spinner is compared with a `Spinner` of the same
  size, then they are the same visual.
- AC5: Given a loading `Button`, when the accessibility tree is inspected, then the button reports
  busy and its spinner adds no name.
- AC6: Given a reduced-motion preference, when a `Spinner` is rendered, then it does not rotate.
- AC7: Given a loading surface over content, when the user clicks or tabs into the covered content,
  then nothing in it receives the click or the focus.
- AC8: Given a loading surface over content, when the accessibility tree is inspected, then the
  covered content is marked busy.
- AC9: Given a loading surface inside a region smaller than the viewport, when it is measured, then
  it covers that region and nothing outside it.
- AC10: Given each colour scheme, including a scheme set by the app rather than the OS, when the
  spinner and the surface's backdrop are inspected, then both match the scheme.

## Decisions

- **Two components, not one with a flag.** The flag is what made the current spinner unusable on its
  own.
- **The surface covers its region, not the viewport.** A full-page loading state is the same surface
  placed around the page. A viewport-fixed mode would bring back the problem the split removes.
- **`Button` adopts the spinner visual, not the `Spinner` component as-is.** `Button` must not get a
  second accessible name or a status announcement. How the two share the visual is a planning
  decision.
- **Reduced motion stops the rotation rather than hiding the spinner.** A loading state with nothing
  visible would look like a frozen page.

## Open Questions

None.

## Design References

- The current component: `apps/the-open-movie-database/src/components/Core/Loader/Loader.tsx`.
- `Button`'s loading state: `packages/ui-core/src/components/Button/Button.tsx`.
- The status role: [WAI-ARIA 1.2, `status`](https://www.w3.org/TR/wai-aria-1.2/#status).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C04.

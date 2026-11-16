# Feature: Separator

## Problem

The app draws dividers by hand with `border-b border-solid border-gray-400`. There are 9 of them
_(measured 2026-11-16)_: 7 on the `<section>` elements of the two resource templates and 2 on blocks
in `EntertainmentSidebar.tsx`. Each one hardcodes a raw palette colour, so none of them follows the
theme in dark mode.

The library has no separator, so the only options a caller has are a border class or a bare `<hr>`.
A bare `<hr>` is announced as a separator by assistive technology every time. That is wrong for a
line that is only decoration, and an `<hr>` can only be horizontal.

This is C17 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. One themed divider that callers use instead of a border class.
2. Decorative by default, so a purely visual line adds nothing to the accessibility tree.
3. A semantic separator when the caller asks for one.
4. Horizontal and vertical orientation.

## Scope

**Included**: a `Separator` component in `ui-core`, with consumer-facing Storybook documentation as
every other `ui-core` component has.

**Not included**: replacing the app's 9 border classes. The app is being set up again, so that work
happens there. Some of the 9 are borders on `<section>` elements and may stay borders. That choice
belongs to the migration, not to this component.

**Independently deliverable**: yes.

## Non-Goals

- **A labelled separator** ("— or —" with text in the middle). Nothing in the app or on TMDB needs
  one.
- **Variants** for thickness, dashed lines or colour. The line takes its colour from the theme's
  border token. A one-off change uses `className`.
- **Spacing.** The separator has no margin. Space around it comes from the parent's `gap`.

## Requirements

### Functional

1. The component renders one element and no wrapper.
2. It takes an orientation, horizontal or vertical. Horizontal is the default.
3. A horizontal separator fills the width of its container. A vertical separator fills the height
   of its container.
4. It is decorative by default. The caller can mark it semantic.

### UI/UX

5. The line uses the theme's border token and is correct in both colour schemes.
6. The line is one pixel thick in either orientation.
7. The component has no margin or padding.

### Accessibility

8. A decorative separator exposes nothing to assistive technology.
9. A semantic separator is exposed with the separator role.
10. A semantic vertical separator reports its orientation as vertical. A semantic horizontal
    separator reports horizontal, which is the role's default.

### Integration

11. The component is exported from `ui-core` and follows the package's existing conventions.
12. It takes the same `className` escape hatch as every other `ui-core` component, and passes native
    attributes through.

## Edge Cases & Error Handling

- **A vertical separator in a container with no height.** It renders with no visible length. This is
  the caller's layout to fix. Document it in Storybook, because a flex row with `items-center` is
  the usual cause.
- **A separator used as the first or last child.** Nothing special happens. Hiding it is not the
  component's job.

## Success Criteria

- SC1: Every divider the app draws today can be drawn with the component, without a raw colour.
- SC2: A decorative separator adds nothing to the accessibility tree.

## Acceptance Criteria

- AC1: Given no props, when the accessibility tree is inspected, then the separator is not in it.
- AC2: Given the semantic option, when the accessibility tree is inspected, then the element has the
  separator role.
- AC3: Given the semantic option and vertical orientation, when the accessibility tree is inspected,
  then the element reports a vertical orientation.
- AC4: Given no orientation, when the element is measured inside a container, then it is as wide as
  the container and one pixel tall.
- AC5: Given vertical orientation inside a flex row with a height, when the element is measured,
  then it is as tall as the row and one pixel wide.
- AC6: Given each colour scheme, including a scheme set by the app rather than the OS, when the line
  colour is inspected, then it is the theme's border colour for that scheme.
- AC7: Given a `className`, when the element is inspected, then the class is applied.

## Decisions

- **Decorative is the default.** Most dividers are visual. Making the semantic one opt-in means the
  common case is correct without the caller knowing about the role.
- **No `<hr>` for the vertical case.** An `<hr>` is always a horizontal separator to assistive
  technology. The decorative state must also be removable from the accessibility tree. Which element
  is rendered in each state is a planning decision. The observable behaviour is fixed by
  requirements 8–10.

## Open Questions

None.

## Design References

- The 9 hand-rolled dividers: `ViewEntertainmentResource.tsx` (6), `ViewPersonResource.tsx` (1),
  `EntertainmentSidebar.tsx` (2), all under `apps/the-open-movie-database/src/components`.
- The separator role and its implicit horizontal orientation:
  [WAI-ARIA 1.2, `separator`](https://www.w3.org/TR/wai-aria-1.2/#separator).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C17.

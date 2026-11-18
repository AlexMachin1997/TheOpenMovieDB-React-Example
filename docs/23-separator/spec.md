# Feature: Separator

## Problem

The app draws dividers by hand with `border-b border-solid border-gray-400`. There are 9 of them
_(measured 2026-11-16)_: 7 on the `<section>` elements of the two resource templates and 2 on blocks
in `EntertainmentSidebar.tsx`. Each one hardcodes a raw palette colour, so none of them follows the
theme in dark mode.

The library has no separator, so the only option a caller has is a border class or an unstyled
`<hr>`.

This is C17 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. One themed horizontal divider that callers use between sections instead of a border class.
2. The platform's own element, with its native meaning, and nothing added on top.

## Scope

**Included**: a `Separator` component in `ui-core`, with consumer-facing Storybook documentation as
every other `ui-core` component has.

**Not included**:

- Replacing the app's 9 border classes. The app is being set up again, so that work happens there.
  Some of the 9 are borders on `<section>` elements and may stay borders. That choice belongs to the
  migration, not to this component.
- **Dividers inside other components.** Social links ([`27`](../27-social-links/spec.md)) draws its
  own border between groups, because a divider inside a `<ul>` must not be an extra item. `Select`
  keeps `CommandSeparator`, because cmdk hides it during search and a `listbox` may only contain
  options and groups.

**Independently deliverable**: yes.

## Non-Goals

- **A vertical separator.** An `<hr>` is horizontal to assistive technology. The only vertical
  divider in the app is the social links one, which is a border inside that component.
- **A decorative mode.** An `<hr>` is a thematic break, and a screen reader announcing "separator"
  between two sections is accurate. Nothing needs it hidden.
- **A labelled separator** ("— or —" with text in the middle). Nothing in the app or on TMDB needs
  one.
- **Variants** for thickness, dashed lines or colour. The line takes its colour from the theme's
  border token. A one-off change uses `className`.
- **Spacing.** The separator has no margin. Space around it comes from the parent's `gap`.

## Requirements

### Functional

1. The component renders a single `<hr>` and no wrapper.
2. It fills the width of its container.

### UI/UX

3. The line uses the theme's border token and is correct in both colour schemes.
4. The line is one pixel thick.
5. The component has no margin or padding. Browser default margins on `<hr>` are removed.

### Accessibility

6. The element keeps its native separator semantics. The component sets no role and no ARIA
   attributes.

### Integration

7. The component is exported from `ui-core` and follows the package's existing conventions.
8. It takes the same `className` escape hatch as every other `ui-core` component, and passes native
   `<hr>` attributes through.

## Edge Cases & Error Handling

- **A separator used as the first or last child.** Nothing special happens. Hiding it is not the
  component's job.
- **A separator placed inside a list.** Invalid HTML. Document in Storybook that a divider between
  list items is a border on the item, as social links does.

## Success Criteria

- SC1: Every divider between sections in the app today can be drawn with the component, without a
  raw colour.
- SC2: The component is an `<hr>` with nothing added that the platform already provides.

## Acceptance Criteria

- AC1: Given the component, when the markup is inspected, then it is a single `<hr>` with no role or
  ARIA attribute added.
- AC2: Given the component, when the accessibility tree is inspected, then it has the separator role.
- AC3: Given the component inside a container, when it is measured, then it is as wide as the
  container, one pixel tall, and has no margin.
- AC4: Given each colour scheme, including a scheme set by the app rather than the OS, when the line
  colour is inspected, then it is the theme's border colour for that scheme.
- AC5: Given a `className`, when the element is inspected, then the class is applied.

## Decisions

- **A plain `<hr>`, horizontal only** _(decided 2026-11-18)_. The earlier draft had an orientation
  and a semantic opt-in. Nothing needed either: every divider in the app is horizontal between
  sections, where the `<hr>` meaning is correct, and the one vertical divider (social links) sits
  inside a list, where any element would be wrong.
- **Dividers inside a component belong to that component.** Social links uses a border on the first
  item of a new group. `Select` keeps cmdk's separator. The shared part is the 1px border-token
  line, which is a token, not a component.

## Open Questions

None.

## Design References

- The 9 hand-rolled dividers: `ViewEntertainmentResource.tsx` (6), `ViewPersonResource.tsx` (1),
  `EntertainmentSidebar.tsx` (2), all under `apps/the-open-movie-database/src/components`.
- `<hr>` and its thematic-break meaning:
  [HTML Standard, the `hr` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element).
- `Select`'s separator: `packages/ui-command/src/components/Command` (`CommandSeparator`).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C17.

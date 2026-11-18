# Feature: Horizontal rail

## Problem

TMDB shows most collections as a row of cards that scrolls sideways: top-billed cast,
recommendations, media, known-for. The app builds each row by hand as a `<div>` with
`flex w-full overflow-…`. There are 6 in the templates (5 in `ViewEntertainmentResource.tsx`, 1 in
`ViewPersonResource.tsx`) and 5 more in card stories _(measured 2026-11-16)_. The inventory's earlier
figure of 16 came from a different count. Re-measure before planning.

The hand-built rows disagree with each other and share the same gaps:

- **Three different overflow rules.** `overflow-y-auto`, `overflow-x-scroll` and `overflow-auto`.
  They all scroll sideways, because a non-visible `overflow-y` forces `overflow-x` to `auto`, but
  `overflow-x-scroll` shows a scrollbar even when nothing overflows.
- **No list semantics.** A screen reader hears a run of unrelated items, with no count and no name
  for the group.
- **Spacing on the children.** One row uses `space-x-4`, and the others rely on margins inside each
  card. That is the margin pattern `TopBilledCastMember` is overridden to fight
  (see [Card is parts](../component-inventory.md#card-is-parts-not-a-wrapper)).
- **Keyboard reach depends on the items.** When a card has a link, Tab reaches it and the browser
  scrolls it into view. When a row holds nothing focusable, a keyboard user cannot scroll it at all.

This is C10 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. One component for every sideways-scrolling collection.
2. A named list that assistive technology can count and navigate.
3. Scrollable with a mouse, a trackpad, touch and the keyboard, whatever the items contain.
4. Spacing set by the rail, not by the items.

## Scope

**Included**: a horizontal rail in `ui-core`, named `HorizontalScroll`, with consumer-facing Storybook documentation.

**Not included**: the cards that go in it (C01 and the app's card components). Migrating the app's
rows also happens when the app is set up again.

**Independently deliverable**: yes. It holds any content, so it does not wait for `Card`.

## Non-Goals

- **Virtualisation.** TMDB rows hold tens of items, not thousands.
- **Loading more items at the end of the row.** Infinite scroll is app-level (C34).
- **An edge fade or other scroll hint.** See Decisions.
- **Autoplay or carousel behaviour.** Nothing moves unless the user moves it.
- **A "View all" link.** That is the app's markup, placed after the rail.

## Requirements

### Functional

1. The rail lays its items out in one row and scrolls sideways when they overflow.
2. When the items fit, nothing scrolls and no scrollbar shows.
3. The gap between items is set by the rail, from the spacing scale, with a default.
4. Each item keeps its own width. Items do not shrink to fit the row. The rail takes any children,
   and each child becomes one list item, wrapped by the rail. The caller never writes the list-item
   markup. A fragment's children each become their own item, and empty
   children (`null`, `false`) produce no item.

### UI/UX

5. The rail can be scrolled with a mouse wheel, a trackpad, a touch swipe and a scrollbar.
6. The rail adds no background, border or radius of its own.

### Accessibility

7. The rail is exposed as a list, and each item as a list item.
8. The list has an accessible name. The caller supplies it, usually by pointing at the section's
   visible heading.
9. Tabbing to a focusable item inside the rail scrolls that item fully into view.
10. A rail whose items contain nothing focusable can still be scrolled from the keyboard.
11. A rail whose items contain focusable content adds no extra tab stop of its own.

### Integration

12. The component is exported from `ui-core` and follows the package's existing conventions.
13. It takes the same `className` escape hatch as every other `ui-core` component.

### Scroll buttons

14. The rail has a previous and a next button. They are always in the DOM, whether or not the row
    overflows, so a focused button is never removed.
15. When nothing overflows, both buttons are unavailable and stay hidden.
16. The buttons are visible while the pointer is over the rail or focus is inside it, and hidden
    otherwise. Hidden means invisible, not removed, so a keyboard user never tabs onto something
    that isn't shown.
17. On a device with no hover, the buttons are not shown. Swiping scrolls the row.
18. At the start of the row, the previous button is unavailable. At the end, the next button is
    unavailable. An unavailable button keeps focus, stays in the tab order, and is announced as
    unavailable. Pressing it does nothing.
19. Each press scrolls by about the rail's visible width.
20. Each button has an accessible name that says which way it scrolls. The buttons are the only tab
    stops the rail itself adds. Requirement 11 is about the scroll area, not these buttons.
21. The motion of a button scroll respects a reduced-motion preference.

### Snapping

22. When a scroll ends close to an item's leading edge, the row settles with that edge aligned.
    When it ends well between two items, it stays where the user left it. A scroll is never pulled
    back against the user.

## Edge Cases & Error Handling

- **The rail resizes until nothing overflows while a button has focus.** The button stays, becomes
  unavailable, and keeps focus (requirement 14).
- **No items.** Nothing renders. An empty state is the caller's job (C35 is app-level).
- **One item.** It renders as a list of one.
- **Children wrapped in a fragment, or conditionally rendered.** Each real child is one item. A
  fragment never becomes a single item, and a `false` or `null` child never becomes an empty one.
- **An item wider than the rail.** The rail scrolls to show all of it.
- **A focused item that is only half visible.** Focusing it scrolls it fully into view (requirement
  9).
- **Right-to-left pages.** Out of scope until the RTL question in
  [`planned.md`](../planned.md#rtl--reading-direction) is settled. The rail must not hard-code
  anything that stops it from mirroring later.

## Success Criteria

- SC1: Every sideways row in the app can be built with the rail, with no overflow or spacing classes
  at the call site.
- SC2: A screen reader user hears a named list with a count.
- SC3: A keyboard user can scroll every rail, whatever its items contain.

## Acceptance Criteria

- AC1: Given items wider in total than the rail, when it renders, then they sit in one row and the
  rail scrolls sideways.
- AC2: Given items that fit, when it renders, then the rail does not scroll and shows no scrollbar.
- AC3: Given a rail with a name, when the accessibility tree is inspected, then it is a list with
  that name, and each item is a list item.
- AC4: Given items containing links, when the user tabs to a link that is off-screen, then the rail
  scrolls until that item is fully visible.
- AC5: Given items containing links, when the user tabs through the page, then the rail itself adds
  no tab stop.
- AC6: Given items with no focusable content, when the user tabs to the rail and presses the arrow
  keys, then it scrolls.
- AC7: Given no gap setting, when the items are measured, then the space between them is the default
  gap, and the items carry no margin from the rail.
- AC8: Given items with a fixed width, when the row overflows, then each item keeps that width.
- AC9: Given a rail that overflows, when the pointer moves over it or focus moves inside it, then
  both buttons become visible. When neither is true, they are not visible.
- AC10: Given a rail that does not overflow, when the buttons are inspected, then both are present,
  hidden and announced as unavailable.
- AC11: Given a rail scrolled to the start, when the buttons are inspected, then previous is
  unavailable and next is available. At the end it is the other way round.
- AC12: Given focus on the next button, when it is pressed until the end of the row, then focus
  stays on the button once it is unavailable.
- AC13: Given a press of either button, when the scroll settles, then the row has moved by about
  the visible width, in that direction.
- AC14: Given a device with no hover, when the rail renders, then the buttons are not shown.
- AC15: Given a reduced-motion preference, when a button is pressed, then the row jumps with no
  animated scroll.
- AC16: Given a scroll that ends a few pixels past an item's edge, when it settles, then that edge
  is aligned. Given a scroll that ends midway between two items, then the row stays where it
  stopped.
- AC17: Given focus on a scroll button, when the rail widens until nothing overflows, then focus
  stays on that button.
- AC18: Given two cards inside a fragment and a `false` child, when the rail renders, then the list
  has two items.

## Decisions

- **A list, not a group of divs.** Collections of like items are lists, and the count is useful.
- **The rail owns the gap.** Spacing on the items is what made each row different.
- **Keyboard scrolling comes from focusable content first.** A tab stop for the rail itself is only
  added when nothing inside it can take focus, so a row of links doesn't add a pointless stop.

- **Scroll buttons that show on hover or focus** _(decided 2026-11-16)_. This is the pattern
  Amazon Prime Video uses. Without buttons, a mouse user with no horizontal wheel has to drag the
  scrollbar. Showing them only on hover or focus keeps rails visually quiet. Showing them on focus
  as well as hover is what stops keyboard users from tabbing onto invisible controls. The native
  CSS `::scroll-button()` was considered and rejected for now: Firefox and Safari did not support
  it as of Chrome's March 2025 write-up, which is below the support floor. Check that again before
  planning, because it would remove the JavaScript.

- **Snapping only when the user stops near an edge** _(decided 2026-11-16)_. That is CSS's
  `proximity` behaviour rather than `mandatory`. It keeps rows tidy after a button press without
  fighting a trackpad.

- **No edge fade; a partly visible item is the cue** _(decided 2026-11-16)_. Design-system
  guidance (Volvo Cars' Reel) recommends a partially visible item at the edge to signal more
  content, and a fade dims exactly that item. The rail does not enforce it, because whether an item
  is cut off depends on the widths the caller gives the items. Storybook documents it as guidance.

- **Buttons are never removed or natively disabled** _(decided 2026-11-18)_. Both drop focus to the
  page in some browsers. Guidance from eBay's carousel and the ARIA Practices discussion is to keep
  the controls in the DOM and focusable, and mark the inactive one as unavailable. "Nothing
  overflows" is simply both ends being reached at once, so it needs no separate tracking.
- **The scroll-edge tracking stays inside the rail** _(decided 2026-11-18)_. It is generic (can this
  element scroll further either way?) and could serve a crowded `Tabs` strip or a wide table later.
  It is exported from `ui-core` when a second component needs it, not before. Reassess during
  implementation.

- **The rail wraps its children itself** _(decided 2026-11-18)_. The caller passes any children and
  never writes list-item markup. The cost is that the rail has to flatten fragments and skip empty
  children itself, which requirement 4 covers.

- **Named `HorizontalScroll`** _(decided 2026-11-18)_. `Carousel` was avoided: in the ARIA
  Practices it means slides shown one at a time, which this is not.

## Open Questions

None.

## Design References

- Partially visible content as the scroll cue:
  [Volvo Cars design system, Reel](https://designsystem.volvocars.com/web/components/reel/usage/).

- The hand-built rows: `ViewEntertainmentResource.tsx` lines 193, 306, 336, 360 and 405, and
  `ViewPersonResource.tsx` line 60, under `apps/the-open-movie-database/src/components/Templates`.
- Making a scroll region keyboard reachable:
  [axe rule `scrollable-region-focusable`](https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C10.

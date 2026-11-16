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

**Included**: a horizontal rail in `ui-core`, with consumer-facing Storybook documentation.

**Not included**: the cards that go in it (C01 and the app's card components). Migrating the app's
rows also happens when the app is set up again.

**Independently deliverable**: yes. It holds any content, so it does not wait for `Card`.

## Non-Goals

- **Virtualisation.** TMDB rows hold tens of items, not thousands.
- **Loading more items at the end of the row.** Infinite scroll is app-level (C34).
- **Autoplay or carousel behaviour.** Nothing moves unless the user moves it.
- **A "View all" link.** That is the app's markup, placed after the rail.

## Requirements

### Functional

1. The rail lays its items out in one row and scrolls sideways when they overflow.
2. When the items fit, nothing scrolls and no scrollbar shows.
3. The gap between items is set by the rail, from the spacing scale, with a default.
4. Each item keeps its own width. Items do not shrink to fit the row.

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

## Edge Cases & Error Handling

- **No items.** Nothing renders. An empty state is the caller's job (C35 is app-level).
- **One item.** It renders as a list of one.
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

## Decisions

- **A list, not a group of divs.** Collections of like items are lists, and the count is useful.
- **The rail owns the gap.** Spacing on the items is what made each row different.
- **Keyboard scrolling comes from focusable content first.** A tab stop for the rail itself is only
  added when nothing inside it can take focus, so a row of links doesn't add a pointless stop.

## Open Questions

- **Q1: Previous and next buttons?** As far as I remember, TMDB has none and its rows scroll with a
  mouse wheel and a visible scrollbar. Check this on the live site before deciding, because the site
  refused a scripted fetch on 2026-11-16. Buttons help mouse users without a horizontal wheel. They also add two controls per
  rail, tab stops, and rules for when each is disabled. Without them, a mouse user without a
  trackpad drags the scrollbar.
- **Q2: Snap to items?** Scroll snapping stops the row with an item edge aligned, so a card is never
  left half-cut. It can also feel sticky with a trackpad. Check on the live site whether TMDB snaps.
- **Q3: A visible edge hint?** A fade at an edge that has more content shows the row scrolls. I think
  TMDB fades the right edge, but that is not verified. It needs a background token to fade into. That could make it depend on
  the design-system audit.

## Design References

- The hand-built rows: `ViewEntertainmentResource.tsx` lines 193, 306, 336, 360 and 405, and
  `ViewPersonResource.tsx` line 60, under `apps/the-open-movie-database/src/components/Templates`.
- Making a scroll region keyboard reachable:
  [axe rule `scrollable-region-focusable`](https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C10.

# Feature: One list per Command

## Problem

`Command` renders two nested lists on every path. A plain `Select` produces this today:

```
div[data-slot=command]              overflow-hidden, h-full        ← clips, never scrolls
  input[role=combobox]
  div[data-slot=command-list]       role=listbox, max-h-300, overflow-y-auto   ← CommandInterface
    div[data-slot=command-list]     role=listbox, max-h-300, overflow-y-auto   ← the list variant
      div[role=option] × n
```

`CommandList` itself is not wrong. It is the scroll container and always was, and `Command`'s own
`overflow-hidden` clips rather than scrolls. The defect is that `CommandList` gets rendered **twice**
— once by `CommandInterface`, once by whichever list variant is nested inside it — and nothing tells
the inner one it is already inside an outer one. Five variants do this: `CommandListItems`,
`CommandGroupedList`, `CommandVirtualizedList`, `CommandGroupedVirtualizedList`, and `ui-forms`'
`SelectListItems`.

Two consequences follow, and only the first is observable today.

**A `listbox` nested inside a `listbox`.** `cmdk` emits `role="listbox"` on `Command.List` (verified
in `cmdk@1.1.1`, alongside `combobox`, `option`, `group` and `separator`). The combobox's
`aria-activedescendant` therefore points into the inner list, and the outer list owns a child that is
not an option. That is an `aria-required-children` violation, live on every `Command` story and every
`Select` story.

**Two scroll parents.** Latent rather than broken, because both carry the same `max-h-[300px]`, so
the inner list never overflows the outer one and the outer never actually scrolls. It bites as soon
as the two differ — which callers can already cause: `Command.stories.tsx:659` passes
`className='max-h-[300px]'` to an inner list, and `CommandVirtualizedList` takes a `maxHeight` prop.
For the virtualized variants this matters most: `getScrollElement` returns the **inner** node, so if
the outer ever scrolls the virtualizer measures against the wrong element and renders the wrong
window of rows.

This is why the defect has gone unnoticed. The two containers mask each other.

## Goals

1. One scroll container per list, so scrolling behaves predictably.
2. One `listbox` per combobox, so assistive technology sees a valid structure.
3. A virtualized list measures against the element that actually scrolls.

## Scope

- **Included**: giving `CommandInterface` sole ownership of the single `CommandList`; making the five
  list variants render into it rather than creating their own; pointing both virtualizers at the
  owning scroll element; enforcing the result with accessibility assertions on the `Command` and
  `Select` story suites.
- **Not included**: `Command`'s public surface, its filtering, its keyboard model, or its visual
  design. `Select`'s public API. Removing `CommandList` from the public exports — standalone
  composition must keep working.

## Non-Goals

- Replacing `cmdk` or `@tanstack/react-virtual`.
- Changing the default `max-h-[300px]`, or any list's visual dimensions.
- Consolidating `SelectListItems` with `CommandListItems`, which is near-duplicate but a separate
  question.

## Requirements

1. Exactly one scroll container wraps a list, verified for the plain, grouped, virtualized and
   grouped-virtualized variants of both `Command` and `Select`.
2. Exactly one element with `role="listbox"` exists per open `Command`.
3. Virtualized lists measure against the element that scrolls, and their `maxHeight` prop still
   controls the height of that element.
4. A list variant used **without** `CommandInterface` — composed directly under `Command` — keeps
   working exactly as it does today.
5. `@repo/ui-command`'s public surface is unchanged.

## Edge Cases & Error Handling

- **Publishing a DOM node down the tree fails silently if done with a ref.** A ref mutation is not a
  state change, so nothing re-renders when the node attaches. This works today only because the ref
  and the virtualizer live in the _same_ component, where the virtualizer's effect runs after the ref
  is populated in the same commit. Once the node is created by a parent and read by a child, the
  child must re-render when the node arrives — otherwise `getScrollElement()` returns `null`
  forever and the virtualizer never measures. The symptom is an empty list, not an error.
- **Removing a scroll container changes scroll position and keyboard scroll-into-view.** `cmdk`
  scrolls the active option into view against whichever ancestor scrolls; verify keyboard navigation
  through a long list, not just rendering.
- **`cmdk` sets `--cmdk-list-height` on `Command.List`.** With two lists, the outer value is derived
  from a child that is itself constrained. Check nothing depends on the current (wrong) value.
- **Turning axe to `error` will surface unrelated pre-existing violations**, because a11y is `todo`
  globally in `preview.ts`. Those are real defects: fix or record them, do not weaken the guard.
- **Verify behaviour, not structure.** Counting elements by computed `overflow-y` couples the tests
  to internals that are expected to change. Assert what assistive technology sees.

## Acceptance Criteria

- **AC1** — `CommandInterface` renders exactly one `CommandList`, and no list variant renders a
  second inside it.
- **AC2** — An open `Command` and an open `Select` each expose exactly one `role="listbox"`, asserted
  in the interaction suite.
- **AC3** — `a11y: { test: 'error' }` is enabled on the `Command` and `Select` story metas and the
  suite is green, with any unrelated violations found along the way either fixed or recorded.
- **AC4** — Both virtualizers scroll and measure against the owning list; the 5 000-item stories
  still select an item near the end of the list.
- **AC5** — `CommandVirtualizedList`'s `maxHeight` prop still changes the height of the scrolling
  element.
- **AC6** — A list variant composed directly under `Command`, without `CommandInterface`, still
  renders its own scroll container and behaves as before — covered by a story.
- **AC7** — `@repo/ui-command`'s built `dist/index.d.ts` is unchanged.
- **AC8** — Keyboard navigation scrolls the active option into view in every variant.

## Open Questions

- Should `SelectListItems` simply become `CommandListItems`? It duplicates it almost exactly, adding
  only a `className` pass-through and a prop spread. Deliberately left out of scope above, but this
  is the natural moment to ask.

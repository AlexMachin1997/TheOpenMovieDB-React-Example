# 17 — One list per Command · as-built

Status: **shipped.**

Spec: [`spec.md`](spec.md). Its acceptance criteria were amended mid-implementation; the originals
and the reasoning are in
[Decisions taken during implementation](#decisions-taken-during-implementation).

## What shipped

**`CommandList` is rendered by whoever composes the palette. List variants render items only.**

Unconditionally — no context, no nesting detection, no branch. `CommandInterface` renders the list
for you; composing by hand means writing it yourself. A sixth list variant added later cannot
reintroduce the defect, because there is nothing for its author to opt into or forget.

- [x] `CommandListItems` and `CommandGroupedList` return a fragment; both drop `className`, having no
      element of their own to put it on.
- [x] `CommandVirtualizedList` and `CommandGroupedVirtualizedList` drop their `CommandList` and
      `parentRef`, and resolve the scroll element through the new `useCommandScrollElement`. Their
      `className` moves to the positioning container they do own.
- [x] `SelectListItems` delegates to `CommandListItems`, closing the spec's open question.
- [x] `maxHeight` removed from `IVirtualizationProps` and `CommandVirtualizedList`.
- [x] `a11y: { test: 'error' }` on the `Command` and `Select` story metas, with two documented rule
      exceptions (below).
- [x] New `Manual Composition` story covering AC5 and AC6.
- [x] Keyboard scroll-into-view assertions (AC8) on all four variants — `CommandVirtualizedList`,
      `CommandGroupedVirtualizedList`, `CommandGroupedList`, and `CommandListItems` via the manual
      composition story.

## How the virtualizers find their scroll element

`useCommandScrollElement` —
`packages/ui-command/src/components/Command/hooks/useCommandScrollElement.ts`, deliberately not
exported from `hooks/index.ts`.

The spec warned that publishing the node downward with a ref fails silently, and it is right. React
commits in two passes: mutation inserts every DOM node for the whole tree, then layout attaches refs
and runs `useLayoutEffect` **children first, parents last**. So a descendant's layout effect runs
_before_ an ancestor's ref attaches, `getScrollElement()` returns `null`, and because a ref
assignment schedules no re-render, it returns `null` forever. The symptom is an empty list and no
error.

Only React's bookkeeping is behind, though — mutation already put the node in the document. So the
child looks the node up instead of being handed it:

```tsx
const sizerRef = React.useRef<HTMLDivElement>(null);

// Must be declared before useVirtualizer
const getScrollElement = useCommandScrollElement(sizerRef);

const virtualizer = useVirtualizer({ getScrollElement, count, estimateSize, overscan });
```

The hook is a `useLayoutEffect` doing `sizerRef.current?.closest('[data-slot="command-list"]')` into
a plain ref, returning a stable getter. Two facts make it land on the first commit:

- `useVirtualizer` re-polls `getScrollElement()` on **every** render — `_willUpdate()` is registered
  in a `useIsomorphicLayoutEffect` with no dependency array (`@tanstack/react-virtual@3.13.12`,
  `dist/esm/index.js:24-26`).
- Effects fire in hook-declaration order, so declaring the hook above `useVirtualizer` populates the
  ref before that poll.

Render count is unchanged from before: `parentRef.current` was null on the old first render too, and
the correcting render came from the virtualizer either way — attaching `observeElementRect` measures
once synchronously (`@tanstack/virtual-core`, `dist/esm/index.js:30`) → `maybeNotify` → `rerender`,
inside a layout effect, before paint.

**The tradeoff**: a DOM query rather than a data flow. It depends on `data-slot="command-list"`
staying on that element and on the hook preceding `useVirtualizer`. Break either and the virtualizer
renders nothing, silently. Mitigated by keeping the selector in the hook — one call site to grep —
and by the 1 000- and 5 000-item stories, which select an item near the end of the list and so fail
loudly if the scroll element is null.

Rejected: holding the node in `useState` (the Radix idiom — correct, but re-renders at mount to buy
nothing here) and `useSyncExternalStore` over a ref (works, scopes the re-render to the consumer, but
is machinery `closest()` makes unnecessary).

## What cmdk was actually doing

Two findings from reading `cmdk@1.1.1`'s source that the spec did not know, both fixed as a
side-effect of there being one list:

- **Duplicate DOM ids.** `Command.List` renders `id={listId}` from cmdk's root context, and both
  lists read the same context — so both carried the same `id`, and the combobox's
  `aria-controls={listId}` was ambiguous.
- **The keyboard model worked by accident.** cmdk's root keeps a single `listInnerRef`, composed onto
  each `Command.List`'s sizer, so the last list to mount won. Every item query it makes —
  `getValidItems`, filtering, sorting, `scrollSelectedIntoView` — runs `querySelectorAll` through
  that one ref. It resolved only because the outer sizer happened to contain the inner list's items.

Nothing in the repo reads `--cmdk-list-height`, so the outer list's previously-wrong value was
unused.

## Decisions taken during implementation

### D1 — Variants drop the list unconditionally, rather than detecting nesting

The spec's AC1 gave `CommandInterface` sole ownership and left the variants to render into it, which
needs a context so each variant knows it is nested. Rejected: that context is a thing every future
variant must opt into, and forgetting it silently reinstates the bug. Rendering items unconditionally
has nothing to forget.

Cost: composing a variant directly under `Command` now means writing the `CommandList` yourself. Zero
callers were affected — every usage in the repo goes through `CommandInterface`.

### D2 — `maxHeight` deleted, not rewired

The spec's AC5 required `maxHeight` to keep resizing the scrolling element, which would have meant a
channel from the variant back up to the list's owner. Nothing in the repo passed `maxHeight`, and
`CommandGroupedVirtualizedList` declared it while silently ignoring it — so removal deleted an
inconsistency instead of wiring one up, and left one way to size the list: `className` on the
`CommandList`, which `cn()`/tailwind-merge resolves cleanly against the base `max-h-[300px]`.

This is the only public type removal beyond the two `className` props. AC7 was narrowed accordingly.

### D3 — AC2 is enforced by the axe gate, not a bespoke assertion

A nested `listbox` fails `aria-required-children`, which the gate runs on **every** story rather than
the handful a hand-written listbox count would have covered. An `expectSingleListbox` helper was
written, then removed as redundant.

## The a11y gate, and what it surfaced

Turning axe from `todo` to `error` surfaced five pre-existing defects. Three fixed, two deferred with
a documented rule exception on both story metas.

**Fixed**

| Rule                     | Cause                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-required-children` | `CommandSeparator` is `role="separator"`, invalid inside a `listbox`. Now `aria-hidden` — it is decorative, and `CommandGroup` already carries the semantics.                               |
| `color-contrast`         | `CommandShortcut` at `text-muted-foreground` was 4.34:1 on a selected item's `bg-accent`. Now follows the item's selected state via `group-data-[selected=true]:text-accent-foreground`.    |
| `list`                   | `MultiSelect`'s `+N` overflow badge was a `<span>` child of a `<ul>`. Now wrapped in `<li>`, with `overflowRef` moved onto it so the imperative show/hide still targets a measured element. |

**Deferred, with the rule disabled and a comment on both metas**

- `scrollable-region-focusable` (11 hits) — the listbox is `tabindex="-1"` because
  `aria-activedescendant` requires focus to stay on the combobox input, so arrow keys are what
  traverse and scroll the list. axe cannot see scrolling driven from another element. Making the list
  a Tab stop would move focus off the element that owns `aria-activedescendant` and break
  announcement. The same finding ships in shadcn/ui, Radix and Headless UI.
- `aria-dialog-name` (9 hits) — Radix's `PopoverContent` is `role="dialog"` with no accessible name.
  That is `ui-overlays`' surface, and the roadmap already assigns it to deliverable `18` ("removing
  the caller's ability to forget an accessible name at all").

## Found, not fixed

- **`aria-activedescendant` can point at an unrendered node.** cmdk sets it to the active option's
  id, but a virtualized list only renders a window — so when the active option falls outside it, the
  id dangles and axe fails `aria-valid-attr-value`. Reproduced by arrowing deep and then searching,
  with the attribute still dangling after the sequence had settled, so it is not a sub-frame
  transient. A real gap: a screen reader cannot announce an element that is not in the DOM. Fixing
  it means always rendering the active option, or dropping the attribute while its target is absent
  — neither is a change to make in passing, and it is a different defect from list nesting.
- **`Select.stories.tsx`'s `Empty State` picked the wrong dialog.** It chose the "visible" popover by
  `pointerEvents !== 'none'`, which can match a closed one mid-exit-animation. Changed to
  `data-state === 'open'`. Not a refactor regression: with the gate off, that file was 20/20 green
  against these source changes.
- **`Command.stories.tsx` has two `play()` blocks whose comments contradict their assertions** —
  "should close after selection", then `toBeInTheDocument()` on an element that was never going to
  disappear. Left alone: `VirtualizedList` and `GroupedVirtualizedList` render inline rather than in
  a popover, so "closes" is the wrong expectation and correcting it means deciding what those stories
  should actually prove. The new `Manual Composition` story does not repeat the pattern — it asserts
  the `onSelect` handler fired, via rendered state.
- **`docs/04-ui-forms-primitive-migration/plan.md` is not prettier-clean in `HEAD`.** Untouched here;
  fixing it belongs in its own commit.

## Follow-on, fixed in the same session

Not part of the deliverable — the spec puts `Command`'s filtering out of scope — but found here,
small, and authorised in-session rather than deferred.

**Filtering did not reset a virtualized list's scroll position.** A search issued while the list was
scrolled left it wherever it was. If the new result set was still taller than the viewport the
browser had no reason to clamp the offset to zero, so the top matches sat above the window and,
being virtualized, were never rendered at all — cmdk selected the first match but could not scroll
it into view, because the node did not exist. It looked intermittent only because a filtered set
shorter than the viewport does clamp, and so appeared to recover.

Fixed by `useResetScrollOnSearch`: a layout effect keyed on `searchValue` that scrolls the
virtualizer back to zero. Layout rather than passive, so the correction lands before paint. Only the
search term resets the position — a caller replacing `options` keeps its place, which is what an
append-a-page case wants.

Proven before fixing: a failing assertion in the `Virtualized List` story (search `1` while
scrolled, expect `Option 1`) reproduced it, then passed. `Grouped Virtualized List` carries its own
check, scrolling the element directly rather than arrowing so that it tests scroll position alone.

This also retired a workaround — that story's AC8 assertion had been moved onto the unfiltered list
_because_ of this bug.

## Verification

- `pnpm turbo run build --force` — 11/11, `check-types` included.
- `pnpm lint` — 11/11, 0 errors, 0 warnings.
- `npx prettier --check .` — clean apart from the pre-existing `docs/04` file above.
- `cd apps/storybook && npx vitest run` — **386 passed, 41 files, 27 skipped**, with axe blocking on
  `Command` and `Select`. One test above the previous baseline of 385: the new `Manual Composition`
  story.
- **AC7** — `dist/**/*.d.ts` diffed against a build of the stashed, unmodified tree. The only
  differences are the documented type removals, added JSDoc, and the new
  `useCommandScrollElement.d.ts`, which no barrel re-exports.

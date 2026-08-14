# Feature: Component consolidation

Two component trees carry structure that costs maintenance without buying anything. They are
independent of each other and can ship separately — the acceptance criteria below are split
accordingly, so a half-done state is visible rather than hidden behind one row status.

## Problem

### Selects (`ui-forms`)

**Five components are near-empty pass-throughs** to `@repo/ui-command` equivalents:
`SelectGroup.tsx` (5 lines), `SelectSeparator.tsx` (5), `SelectGroupedListItems.tsx` (7),
`SelectListItemsVirtualized.tsx` (8), `SelectGroupedItemsVirtualized.tsx` (14). Each is a file, an
export and an indirection a reader must follow to discover it does nothing.

**There are two nested scroll containers.** `SelectListItems` renders a `CommandList`
(`SelectListItems.tsx:17`) inside the one `CommandInterface` already provides
(`CommandList.tsx:10`). That is a behavioural bug, not just noise.

**Dead types remain** — `IBaseSelectProviderProps` at `Selects/types/select-context.ts:12`.

**Two contexts sit layered**, `command-context.tsx` and `select-context.tsx`, both modelling
selection state. That duplication is plausibly why the wrappers exist at all.

### Dialog and Sheet (`ui-overlays`)

Two near-identical trees — 20 and 24 entries — both wrapping `@radix-ui/react-dialog`, differing
substantively only in that Sheet slides from an edge. Several files are byte-identical and several
more differ by one class, so a change to overlay behaviour must be made twice. They have already
drifted in ways nobody intended: the close-button API is configurable on Dialog and hardcoded on
Sheet; files named `…Provider.tsx` contain no provider (`SheetProvider.tsx` exports the `Sheet`
root); and Radix's required accessible name is unguarded, so an overlay can ship without one.

Two items originally in this scope **already shipped** under
[`11-correctness-bugs`](../11-correctness-bugs/plan.md) and are not repeated: the `SelectProvider`
context memoization, and the `SheetProvider` controlled-mode imperative-ref fix.

## Goals

1. A reader following an import arrives at code that does something.
2. One scroll container per list, so scrolling behaves predictably.
3. Overlay behaviour is defined once, so a fix reaches both Dialog and Sheet.
4. An overlay cannot ship without an accessible name.

## Scope

- **Included**: replacing the five pass-through wrappers with direct re-exports; removing the nested
  `CommandList`; deleting dead types; making Sheet a variant of a shared Dialog base; unifying the
  close-button API; renaming the misnamed `…Provider` files; guarding the required a11y `Title`.
- **Not included**: changing `Select`'s or the overlays' public APIs beyond the close button.
  Merging the two selection contexts — an open question below, possibly its own deliverable.
  `DropdownMenu`, `HoverCard` and `Popover`. The duplicate barrels, which
  [`13-exports-conventions`](../13-exports-conventions/spec.md) removes repo-wide.
- **Ordering**: landing after `13` avoids touching the same barrels twice.

## Non-Goals

- Rewriting `Select`'s rendering or virtualization strategy.
- Changing `ui-command`'s public surface, or either overlay's animation and visual design.
- Replacing the Radix primitives.

## Requirements

1. `Select`'s public API and rendered output unchanged, except the nested-scroll fix.
2. Exactly one scroll container wraps a `Select` list.
3. Dialog and Sheet share their common behaviour rather than duplicating it, and expose the same
   close-button API.
4. A file named for a provider contains one, or is renamed.
5. An overlay rendered without an accessible title fails loudly — in development, in tests, or at
   type level.
6. Anything deleted must be provably unused first.

## Edge Cases & Error Handling

- **Nested scroll containers mask each other.** Removing the inner one may change scroll position,
  keyboard scroll-into-view, or virtualization measurement — virtualized lists depend on the scroll
  parent. Verify the virtualized variants specifically.
- **A "pass-through" may not be pure.** Two of the five are 8 and 14 lines; check each for defaulted
  props or class merging before replacing it with a re-export.
- **Re-exporting instead of wrapping changes `displayName`**, which Storybook docs and name-based
  selectors may rely on.
- **Sheet's edge-slide is the real difference** and must survive for every side, not just one.
- **Radix keeps closed overlay DOM mounted during exit animations.** This has already made a test in
  this repo pass for the wrong reason — assert on state, not mere presence.
- **Guarding the `Title` may break existing call sites.** Those are real accessibility defects; fix
  or record them, do not weaken the guard.

## Acceptance Criteria

**Selects**

- [ ] The five pass-through wrappers are gone, replaced by re-exports, each confirmed pure first.
- [ ] Exactly one scroll container wraps a `Select` list — verified for the plain, grouped,
      virtualized and grouped-virtualized variants.
- [ ] `IBaseSelectProviderProps` and any other dead types are gone, with zero references remaining.
- [ ] `Select`'s public API is unchanged, and its Storybook interaction suite passes including the
      virtualized stories.

**Dialog / Sheet**

- [ ] Sheet is a variant of a shared base; no byte-identical file pairs remain between the trees.
- [ ] Both expose the same close-button API, and no `…Provider.tsx` lacks a provider.
- [ ] An overlay without an accessible title fails loudly, demonstrated by a failing case.
- [ ] The controlled-mode imperative ref still works for both, covered by a test so the `11` fix
      cannot silently regress.
- [ ] Rendered output and animation behaviour unchanged for Dialog and for every Sheet side.

## Open Questions

- Collapse `CommandProvider` and `SelectProvider` into one selection context, or keep them layered?
  Both model selection state, and that duplication is plausibly the root cause of the wrappers. If
  collapsing proves substantial, it should become its own deliverable rather than expanding this one.

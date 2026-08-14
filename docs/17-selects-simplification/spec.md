# Feature: Selects simplification

## Problem

`ui-forms`'s `Selects` carries structure that costs maintenance without buying anything.

**Five components are near-empty pass-throughs** to `@repo/ui-command` equivalents —
`SelectGroup.tsx` (5 lines), `SelectSeparator.tsx` (5), `SelectGroupedListItems.tsx` (7),
`SelectListItemsVirtualized.tsx` (8), `SelectGroupedItemsVirtualized.tsx` (14). Each is a file, an
export and an indirection that a reader has to follow to discover it does nothing.

**There are two nested scroll containers.** `SelectListItems` renders a `CommandList`
(`SelectListItems.tsx:17`) inside the one `CommandInterface` already provides
(`CommandList.tsx:10`). Two scroll containers nested inside each other is a real behavioural bug,
not just structural noise.

**Dead types remain.** `IBaseSelectProviderProps` is still declared at
`Selects/types/select-context.ts:12`.

**Two contexts sit layered** — `command-context.tsx` in `ui-command` and `select-context.tsx` in
`ui-forms` — both modelling selection state.

The `SelectProvider` context-memoization item that was originally part of this work **already
shipped** under [`11-correctness-bugs`](../11-correctness-bugs/plan.md) and is not repeated here.

## Goals

1. A reader following a `Select` import arrives at code that does something.
2. One scroll container per list, so scrolling behaves predictably.
3. No declared types without users.

## Scope

- **Included**: replacing the five pass-through wrappers with direct re-exports from
  `@repo/ui-command`; removing the nested `CommandList`; deleting dead types.
- **Not included**: changing the `Select` public API. Merging or splitting the two contexts — that
  is an open decision (below) and may turn out to be its own deliverable. Anything about which
  package `Select` lives in.
- **Can be delivered independently**: yes.

## Non-Goals

- Rewriting `Select`'s rendering or virtualization strategy.
- Changing `ui-command`'s public surface.
- Performance work beyond removing the redundant container.

## Requirements

1. `Select`'s public API and rendered output must be unchanged, except for the nested-scroll fix.
2. The nested `CommandList` must be removed such that exactly one scroll container wraps the list.
3. Anything deleted must be provably unused first.
4. Existing Storybook interaction coverage for `Select` must still pass.

## Edge Cases & Error Handling

- **Nested scroll containers can mask each other.** Removing the inner one may change scroll
  position, keyboard scroll-into-view, or virtualization measurement. Virtualized lists depend on
  the scroll parent — verify the virtualized variants specifically, not just the plain list.
- **A "pass-through" may not be pure.** Two of the five are 8 and 14 lines; check each for defaulted
  props or class merging before replacing it with a re-export.
- **Re-exporting instead of wrapping changes `displayName`**, which the Storybook docs and any
  name-based test selectors may rely on.

## Acceptance Criteria

- [ ] The five pass-through wrappers are gone, replaced by re-exports, with each one confirmed pure
      before removal.
- [ ] Exactly one scroll container wraps a `Select` list; verified for the plain, grouped,
      virtualized and grouped-virtualized variants.
- [ ] `IBaseSelectProviderProps` and any other dead types are gone, with zero remaining references.
- [ ] `Select`'s public API is unchanged.
- [ ] The Storybook interaction suite for `Select` passes, including the virtualized stories.

## Open Questions

- Collapse `CommandProvider` and `SelectProvider` into one selection context, or keep them layered?
  Both model selection state, and the duplication is the reason `Select` needs wrappers at all — so
  this may be the root cause rather than a separate concern. If collapsing turns out to be
  substantial, it should become its own deliverable rather than expanding this one.

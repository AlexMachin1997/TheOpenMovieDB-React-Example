# D1 — Consolidate & test grouping logic

**Phase:** 1 · **Size:** S · **Depends on:** D0 · **Status:** todo

## Goal

Make `groupOptions` in `ui-command` the single source of truth for option grouping,
remove the two divergent re-implementations, and lock the behaviour down with unit tests.
This also drives grouped mode in `Selects`, so fixing it here fixes both packages.

## Why

Grouping is currently implemented **three times**, and the copies disagree:

- Canonical, correct: [`utils/grouping.ts:11`](../../packages/ui-command/src/components/Command/utils/grouping.ts) — keeps ungrouped options under the `undefined` key.
- Inline duplicate: [`CommandGroupedList.tsx:18-47`](../../packages/ui-command/src/components/Command/components/CommandGroupedList.tsx) re-implements the same group+sort in a `useMemo` (and is therefore untestable).
- Buggy duplicate: [`useCommandGroupedOptions.ts:32`](../../packages/ui-command/src/components/Command/hooks/useCommandGroupedOptions.ts) does `if (!option.group) return`, so ungrouped options are **silently dropped** and `hasUngrouped` is always false. It is exported on the public API but unused.

The pure functions in `utils/grouping.ts` encode subtle ordering rules (separators between
groups, headers only for named groups, `groupOrder` precedence, ungrouped top/bottom) and
have no tests.

## Scope

- Point `CommandGroupedList` at `groupOptions`/`getVirtualizedItems` instead of its inline copy.
- Delete `useCommandGroupedOptions` (unused + buggy) **or** rewrite it to wrap
  `groupOptions` in `useMemo`. Recommend delete unless a consumer needs the hook shape.
- Remove it from the public barrel if deleted.
- Unit-test the pure functions.

## Out of scope

- Selects pass-through cleanup (that's D8; this deliverable keeps Selects working via the
  shared functions it already consumes).
- Virtualization/keyboard-nav behaviour changes.

## Approach

- [ ] Refactor [`CommandGroupedList.tsx:18-47`](../../packages/ui-command/src/components/Command/components/CommandGroupedList.tsx) to call `groupOptions(...)`.
- [ ] Delete `useCommandGroupedOptions.ts` and its export in `hooks/index.ts` (or fix + adopt).
- [ ] Add `utils/grouping.test.ts` covering `groupOptions`, `getVirtualizedItems`, `getEstimatedItemHeight`.
- [ ] Tidy the dead ternary: `groupOrder = []` default makes `groupOrder ? … : …`
      always take the truthy branch ([`grouping.ts:38-43`](../../packages/ui-command/src/components/Command/utils/grouping.ts)).

## Acceptance criteria

- [ ] Only one grouping implementation remains; `grep` for the group+sort algorithm finds
      it in exactly one place.
- [ ] Tests assert ungrouped options are **kept** (top and bottom placement), `groupOrder`
      precedence, alphabetical fallback, separator-before-every-group-except-first, and
      headers only for named groups.
- [ ] A test reproduces the old ungrouped-dropping bug and now passes.
- [ ] `ui-command` and `Selects` Storybook grouped stories still render identically.

## Open decision

Delete `useCommandGroupedOptions` vs. keep it as a thin memoized wrapper — depends on
whether any app imports the hook directly. Default: delete.

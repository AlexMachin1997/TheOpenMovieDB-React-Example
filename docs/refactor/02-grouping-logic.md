# D1 — Consolidate & test grouping logic

**Phase:** 1 · **Size:** S · **Depends on:** D0 · **Status:** ✅ done

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

- [x] Refactor [`CommandGroupedList.tsx:18-47`](../../packages/ui-command/src/components/Command/components/CommandGroupedList.tsx) to call `groupOptions(...)`.
- [x] Delete `useCommandGroupedOptions.ts` and its export in `hooks/index.ts` (or fix + adopt). — took the "fix + adopt" path (see Outcome below), not deletion.
- [x] Add `utils/grouping.test.ts` covering `groupOptions`, `getVirtualizedItems`, `getEstimatedItemHeight`. — landed as `grouping.spec.ts` (+ `filtering.spec.ts`, `emptyMessage.spec.ts`), 20 tests total.
- [x] Tidy the dead ternary: `groupOrder = []` default makes `groupOrder ? … : …`
      always take the truthy branch ([`grouping.ts:38-43`](../../packages/ui-command/src/components/Command/utils/grouping.ts)).

## Acceptance criteria

- [x] Only one grouping implementation remains; `grep` for the group+sort algorithm finds
      it in exactly one place (`utils/grouping.ts`).
- [x] Tests assert ungrouped options are **kept** (top and bottom placement), `groupOrder`
      precedence, alphabetical fallback, separator-before-every-group-except-first, and
      headers only for named groups.
- [x] A test reproduces the old ungrouped-dropping bug and now passes (the `groupOptions`
      "ungrouped kept" spec — the exact contract the old hook violated).
- [~] `ui-command` and `Selects` Storybook grouped stories still render identically —
      behaviourally guaranteed (all consumers now route through the unit-tested `groupOptions`);
      the Storybook `play()` run was not executed in this session.

## Outcome

Resolved the open decision **in favour of keeping** `useCommandGroupedOptions`: it was rewritten
as a thin memoized wrapper around `groupOptions` and **adopted inside `CommandGroupedList`** (which
dropped its inline copy). This collapses all three implementations onto `groupOptions` and fixes
the hook's two bugs (dropped ungrouped options, dead `ungroupedPosition`) by construction.

Also, beyond the original scope:

- Extracted two more inline pure computations for testability: `filterOptions` (`utils/filtering.ts`,
  from `CommandProvider`) and `getEmptyMessage` (`utils/emptyMessage.ts`, from `CommandEmpty`).
- Proof-first at the pure-util layer only — **no jsdom/Testing Library** added (the hook is covered
  transitively once it delegates). Tests are one `.spec.ts` per module (`grouping`, `filtering`,
  `emptyMessage`), 20 tests total, all green.
- `grouping.ts`'s `filter(Boolean)` narrowing was preserved (intentional, ts-reset-powered); only the
  unreachable `groupOrder` ternary branch was collapsed.
- Wired `vitest/globals` into `ui-command`'s `tsconfig` (first test in a library package).
- Updated the `vitest-testing` skill to the one-spec-per-module / describe-per-function convention.

## Open decision

Delete `useCommandGroupedOptions` vs. keep it as a thin memoized wrapper — depends on
whether any app imports the hook directly. Default: delete.

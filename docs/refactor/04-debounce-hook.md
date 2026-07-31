# D3 — Extract `useDebouncedValue` hook

**Phase:** 1 · **Size:** M · **Depends on:** D0 · **Status:** todo

## Goal

Extract the debounce + controlled/uncontrolled sync logic that is currently inlined and
duplicated in `DebouncableInput` and `Search` into one tested hook, and delete the
duplication (including the second copy of state that `Search` keeps).

## Why

The same logic lives in two places and is only reachable by mounting the DOM:

- [`DebouncableInput.tsx:21-43`](../../packages/ui-core/src/components/DebouncableInput/DebouncableInput.tsx) — initial-value resolution, external-value sync effect, `react-use` `useDebounce` + emit guard.
- [`Search.tsx:27-35`](../../packages/ui-core/src/components/Search/Search.tsx) — the identical `x !== undefined ? String(x) : …` ternary and sync effect, **plus** its own `localValue` state layered on top of `DebouncableInput`'s internal state (double state for one string).

Storybook covers this with **real timers** — stories wait 400-600ms of wall-clock
([`DebouncableInput.stories.tsx:45,50,105`](../../packages/ui-core/src/components/DebouncableInput/DebouncableInput.stories.tsx); [`__fixtures__/interactions.ts`](../../packages/ui-core/src/components/DebouncableInput/__fixtures__/interactions.ts)), which is slow and flaky.

## Scope

- Create `useDebouncedValue(value, { debounceMs, onValueChange })` (natural home:
  `ui-core`, or `@repo/core` if you want it framework-shared — see decision).
- Rewrite `DebouncableInput` and `Search` to consume it; remove Search's redundant
  `localValue`. Derive Search's clear-button visibility from the single source of truth.
- Unit-test the hook with fake timers.
- Once the hook is tested, simplify or delete the real-timer story fixture.

## Out of scope

- Visual/markup changes to either component beyond removing duplicated state.
- The `Search` double-`className` bug and the `data-slot`-in-class-string issue — those are
  correctness fixes in D4.

## Approach

- [ ] Write the hook: resolve initial value, sync on external `value` change, debounce
      emits via `onValueChange`, guard against emitting the initial/unchanged value.
- [ ] Add `useDebouncedValue.test.ts` using `vi.useFakeTimers()` + `renderHook`.
- [ ] Refactor `DebouncableInput` to use it.
- [ ] Refactor `Search` to use it; delete `localValue`; single-source clear-button visibility.
- [ ] Replace/trim the real-timer story fixture now that logic is unit-tested.

## Acceptance criteria

- [ ] One hook owns debounce + sync; neither component re-implements it.
- [ ] `Search` no longer holds a second copy of the value state.
- [ ] Hook tests cover: debounce delay, rapid changes coalescing to one emit, external
      `value` update syncing in, no emit on initial mount.
- [ ] Existing `DebouncableInput`/`Search` stories still behave the same for the user.

## Open decision

Put the hook in `ui-core` (React UI package, alongside its only consumers) vs `@repo/core`
(if you foresee non-`ui-core` consumers). Default: `ui-core`.

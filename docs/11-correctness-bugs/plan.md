# Implementation plan: Correctness bug fixes

Status: **shipped.** This is the as-built record. Built on the test harness in
[`07-test-harness`](../07-test-harness/plan.md). Migrated from the legacy refactor track, where this
was `D4`; it was written as a single file, so there is no separate `spec.md` or `discovery.md`.

> **Scope note.** The commit that shipped this (`f8d5590`) also fixed bullets belonging to other
> pieces of work: it externalized `react`/`react-dom` in `vite-config` (see
> [`12-build-dependency-tooling`](../12-build-dependency-tooling/spec.md)), and both memoized the
> `SelectProvider` context and fixed the `SheetProvider` controlled-mode ref (see
> [`14-component-consolidation`](../14-component-consolidation/spec.md)). Those deliverables record
> what remains. This overreach is part of why the legacy roadmap's statuses rotted.

## Goal

Fix the confirmed correctness/a11y bugs found in review, each with a regression test. Every
item below is an independent checkbox — this deliverable can be split per package or shipped
partially without breaking anything.

## Why

These are real defects (not style), several masked only by the absence of tests. Ship them
early so later refactors build on correct behaviour.

## Bugs (each ships with a test)

- [x] **Conditional hook in `CommandSearch`.** `if (!enabledSearch) return null` sits above
      a `useCallback` → Rules-of-Hooks violation; crashes when `enabledSearch` toggles at
      runtime. Move the early return below all hooks.
      [`CommandSearch.tsx:34-42`](../../packages/ui-command/src/components/Command/components/CommandSearch.tsx)
      — already fixed in a prior commit (comment + `HANDOVER.md` confirm it); checkbox was
      stale. No new test added: toggling `enabledSearch` isn't a user-driven interaction
      Storybook's `play()` model fits naturally.
- [x] **`Progress` never forwards `value` to Radix.** `value` is destructured out and used
      only for the CSS transform/label, never passed to `ProgressPrimitive.Root`, so there's
      no `aria-valuenow`/`data-state`. Pass `value` (and `max`) to `Root`.
      [`Progress.tsx:11-27`](../../packages/ui-core/src/components/Progress/Progress.tsx)
- [x] **`CheckboxGroup` swallows changes when uncontrolled.** `handleValueChange` is gated
      on `isControlled`, so with no `value` prop selection fires nothing. Handle the
      uncontrolled path.
      [`CheckboxGroup.tsx:33-52`](../../packages/ui-core/src/components/CheckboxGroup/CheckboxGroup.tsx)
      — resolved by making `CheckboxGroup` controlled-only (`value`/`onChange` now required,
      `defaultValue` removed) rather than maintaining a second internal state machine; see
      note below.
- [x] **`CheckboxLabel` / `RadioLabel` drop `...props`.** Typed as full Label props but only
      destructure 4 keys, silently discarding `ref`/`id`/`onClick`/etc. Spread the rest.
      [`CheckboxLabel.tsx:5`](../../packages/ui-core/src/components/Checkbox/components/CheckboxLabel.tsx) · [`RadioLabel.tsx:5`](../../packages/ui-core/src/components/Radio/components/RadioLabel.tsx)
- [x] **`CheckboxGroup` `peer-disabled` never triggers.** Label renders before the checkbox,
      but Tailwind `peer-*` needs the peer to precede the target. Reorder or restructure.
      [`CheckboxGroup.tsx:112-124`](../../packages/ui-core/src/components/CheckboxGroup/CheckboxGroup.tsx)
- [x] **Sheet imperative ref is a no-op in controlled mode.** `open()/close()/toggle()` call
      `setIsOpen`, but render ignores it when the `open` prop is set; call `onOpenChange`
      when controlled. (Consider extracting `useSheetState(props, ref)` and testing it.)
      [`SheetProvider.tsx:6-29`](../../packages/ui-overlays/src/components/Sheet/components/SheetProvider.tsx)
      — fixed in place (no separate hook extracted; the fix was small enough to keep inline).
- [x] **`Search` applies `className` to both wrapper and inner input.** A consumer's
      width/border hits both elements. Apply it to one.
      [`Search.tsx:50,58`](../../packages/ui-core/src/components/Search/Search.tsx)
- [x] **`Progress` default `className` replaces the track colour** instead of merging (it's a
      default param, not part of the `cn(...)` base). Move the base class into `cn` so
      consumer `className` appends.
      [`Progress.tsx:6,17`](../../packages/ui-core/src/components/Progress/Progress.tsx)
- [x] **`SelectItemClear` `iconSize` prop is a no-op** — passes a `'sm'|'md'` string to a
      lucide icon that wants a number, while size is fixed by `className`. Remove the prop or
      wire it correctly.
      [`SelectItemClear.tsx:86`](../../packages/ui-forms/src/components/Selects/components/SelectItemClear.tsx)
      — removed (matches the acceptance criterion's explicit allowance below); call sites in
      `MultiSelect`/`SingleSelect` updated.
- [x] **`Search.variants.ts` emits `data-slot="…"` as a class token**, not an attribute.
      Move it to a real prop on the element.
      [`Search.variants.ts:6`](../../packages/ui-core/src/components/Search/Search.variants.ts)

## Related perf (fold in if cheap, else defer to `14`)

- [x] `SelectProvider` context value unmemoized / new `Set` every render.
      [`SelectProvider.tsx:64-70`](../../packages/ui-forms/src/components/Selects/components/SelectProvider.tsx)

## Design deviation: `CheckboxGroup` is now controlled-only

While fixing the uncontrolled-mode bug, we decided (per explicit direction, mid-implementation)
to drop uncontrolled support entirely rather than add a second internal state machine to keep
both modes working — individual Radix Checkboxes have no group primitive of their own, so an
uncontrolled `CheckboxGroup` would just be a second, easily-desynced source of truth for the
same selection. `value`/`onChange` are now required; `defaultValue` is removed. This is a public
prop-signature change beyond the `iconSize` removal the acceptance criteria below originally
scoped — no other consumers of `@repo/ui-forms`'s `CheckboxGroup` exist in the monorepo (the
app-level `CheckboxGroup` under `apps/the-open-movie-database` is a separate, unrelated
component), so this shipped as part of `11` rather than a follow-up.

## Additional fixes discovered while verifying `11`

Two more pre-existing bugs surfaced (and got fixed) while getting Select/Command actually
testable end-to-end:

- **Every package's library build bundled its own private copy of React.**
  `packages/vite-config/react-library.ts` (the shared Vite config used by `ui-core`,
  `ui-command`, `ui-overlays`, `ui-forms`) computed a `pkgDependencies` list intended to
  auto-externalize each package's own dependencies, but never actually passed it to Rollup's
  `external` check — so `react`/`react-dom` got inlined into every package's `dist/`. Anything
  composing components from two of these packages in the same tree (e.g. `ui-forms`'s `Select`
  rendering `ui-command`'s `CommandProvider`) hit "Cannot read properties of null (reading
  'useState')" from two live React instances. Fixed by explicitly externalizing
  `react`/`react-dom`/`react/jsx-(dev-)runtime` in the shared config — this was blocking
  Select/Command from rendering at all in the Storybook Vitest browser project, so their tests
  below couldn't be verified before this landed.
  [`react-library.ts`](../../packages/vite-config/react-library.ts)
- **`Select` always closes the popover on selection, even in multi-select mode.**
  `Select.tsx` never overrode `CommandProvider`'s `closeOnSelect` default (`true`), so every
  pick — single or multi — called `close()`. This was invisible in most existing tests only
  because Radix keeps a closed popover's DOM present during its exit animation, and a second
  `selectOption()` fired immediately after usually clicked the still-lingering (but already
  closing) element before it was actually removed — a timing race, not real "stays open"
  behaviour. It surfaced as a genuine, reproducible failure in `Multi / Virtualized (5 000
items)`, the one multi-select story with a real ~350ms wait (the search debounce) between
  two picks — long enough for the animation to finish and the dialog to be truly gone. Fixed
  by passing `closeOnSelect={type === 'single'}` explicitly.
  [`Select.tsx`](../../packages/ui-forms/src/components/Selects/Select.tsx)
- Also fixed along the way: `getSearchInput()` and an inline duplicate in `Select.stories.tsx`
  queried the search box by `role="combobox"` (copy-pasted from the trigger's own role) instead
  of `role="textbox"`, and `getOption()` used a non-retrying `getByRole` instead of
  `findByRole`, both masked by the React-duplication crash above until it was fixed.
  [`interactions.ts`](../../packages/ui-forms/src/components/Selects/__fixtures__/interactions.ts)

## Discovered but out of scope (pre-existing, unrelated to these fixes)

- `apps/storybook`'s story glob (`../../../packages/**/src/**/*.stories.tsx`) follows pnpm's
  nested workspace symlinks, so many stories are picked up twice more under paths like
  `packages/ui-forms/node_modules/@repo/ui-core/src/...` — those duplicate copies fail to
  resolve their own `~/` tsconfig-paths alias. Pre-existing, affects most packages' stories,
  not just the ones touched here.

## Out of scope

- The nested-`CommandList` scroll bug (structural — `14`).
- Grouping fork bug (`08`) and date bug (`09`) — their own deliverables.
- `Slider` hardcoded colours and other theming/consistency items (`13`/`14`).

## Acceptance criteria

- [x] Each fixed bug has a test that fails before the fix and passes after — as Storybook
      `play()` interaction tests (this repo's convention for component-level tests), not
      `.spec.tsx` files.
- [x] `Progress` exposes `aria-valuenow` (assert in a test).
- [x] ~~Uncontrolled~~ `CheckboxGroup` fires `onChange` and updates — superseded: `CheckboxGroup`
      is now controlled-only (see design deviation above), so this is verified for the
      controlled path instead.
- [x] `CommandSearch` mounts/unmounts cleanly with `enabledSearch` toggling (no hook warning) —
      verified as already fixed; no dedicated test added (see note above).
- [x] No public prop signatures change except removing genuinely dead props (`iconSize`) and
      `CheckboxGroup` becoming controlled-only (see design deviation above).

## Suggested split (if you want smaller sessions)

- **D4a** ui-command + ui-overlays (conditional hook, Sheet ref)
- **D4b** ui-core (Progress ×2, Search ×2)
- **D4c** ui-forms (CheckboxGroup ×2, Labels, SelectItemClear)

# D4 — Correctness bug fixes

**Phase:** 1 · **Size:** M · **Depends on:** D0 · **Status:** todo

## Goal

Fix the confirmed correctness/a11y bugs found in review, each with a regression test. Every
item below is an independent checkbox — this deliverable can be split per package or shipped
partially without breaking anything.

## Why

These are real defects (not style), several masked only by the absence of tests. Ship them
early so later refactors build on correct behaviour.

## Bugs (each ships with a test)

- [ ] **Conditional hook in `CommandSearch`.** `if (!enabledSearch) return null` sits above
      a `useCallback` → Rules-of-Hooks violation; crashes when `enabledSearch` toggles at
      runtime. Move the early return below all hooks.
      [`CommandSearch.tsx:34-42`](../../packages/ui-command/src/components/Command/components/CommandSearch.tsx)
- [ ] **`Progress` never forwards `value` to Radix.** `value` is destructured out and used
      only for the CSS transform/label, never passed to `ProgressPrimitive.Root`, so there's
      no `aria-valuenow`/`data-state`. Pass `value` (and `max`) to `Root`.
      [`Progress.tsx:11-27`](../../packages/ui-core/src/components/Progress/Progress.tsx)
- [ ] **`CheckboxGroup` swallows changes when uncontrolled.** `handleValueChange` is gated
      on `isControlled`, so with no `value` prop selection fires nothing. Handle the
      uncontrolled path.
      [`CheckboxGroup.tsx:33-52`](../../packages/ui-forms/src/components/CheckboxGroup/CheckboxGroup.tsx)
- [ ] **`CheckboxLabel` / `RadioLabel` drop `...props`.** Typed as full Label props but only
      destructure 4 keys, silently discarding `ref`/`id`/`onClick`/etc. Spread the rest.
      [`CheckboxLabel.tsx:5`](../../packages/ui-forms/src/components/Checkbox/components/CheckboxLabel.tsx) · [`RadioLabel.tsx:5`](../../packages/ui-forms/src/components/Radio/components/RadioLabel.tsx)
- [ ] **`CheckboxGroup` `peer-disabled` never triggers.** Label renders before the checkbox,
      but Tailwind `peer-*` needs the peer to precede the target. Reorder or restructure.
      [`CheckboxGroup.tsx:112-124`](../../packages/ui-forms/src/components/CheckboxGroup/CheckboxGroup.tsx)
- [ ] **Sheet imperative ref is a no-op in controlled mode.** `open()/close()/toggle()` call
      `setIsOpen`, but render ignores it when the `open` prop is set; call `onOpenChange`
      when controlled. (Consider extracting `useSheetState(props, ref)` and testing it.)
      [`SheetProvider.tsx:6-29`](../../packages/ui-overlays/src/components/Sheet/components/SheetProvider.tsx)
- [ ] **`Search` applies `className` to both wrapper and inner input.** A consumer's
      width/border hits both elements. Apply it to one.
      [`Search.tsx:50,58`](../../packages/ui-core/src/components/Search/Search.tsx)
- [ ] **`Progress` default `className` replaces the track colour** instead of merging (it's a
      default param, not part of the `cn(...)` base). Move the base class into `cn` so
      consumer `className` appends.
      [`Progress.tsx:6,17`](../../packages/ui-core/src/components/Progress/Progress.tsx)
- [ ] **`SelectItemClear` `iconSize` prop is a no-op** — passes a `'sm'|'md'` string to a
      lucide icon that wants a number, while size is fixed by `className`. Remove the prop or
      wire it correctly.
      [`SelectItemClear.tsx:86`](../../packages/ui-forms/src/components/Selects/components/SelectItemClear.tsx)
- [ ] **`Search.variants.ts` emits `data-slot="…"` as a class token**, not an attribute.
      Move it to a real prop on the element.
      [`Search.variants.ts:6`](../../packages/ui-core/src/components/Search/Search.variants.ts)

## Related perf (fold in if cheap, else defer to D8)

- [ ] `SelectProvider` context value unmemoized / new `Set` every render.
      [`SelectProvider.tsx:64-70`](../../packages/ui-forms/src/components/Selects/components/SelectProvider.tsx)

## Out of scope

- The nested-`CommandList` scroll bug (structural — D8).
- Grouping fork bug (D1) and date bug (D2) — their own deliverables.
- `Slider` hardcoded colours and other theming/consistency items (D6/D9).

## Acceptance criteria

- [ ] Each fixed bug has a test that fails before the fix and passes after.
- [ ] `Progress` exposes `aria-valuenow` (assert in a test).
- [ ] Uncontrolled `CheckboxGroup` fires `onChange` and updates.
- [ ] `CommandSearch` mounts/unmounts cleanly with `enabledSearch` toggling (no hook warning).
- [ ] No public prop signatures change except removing genuinely dead props (`iconSize`).

## Suggested split (if you want smaller sessions)

- **D4a** ui-command + ui-overlays (conditional hook, Sheet ref)
- **D4b** ui-core (Progress ×2, Search ×2)
- **D4c** ui-forms (CheckboxGroup ×2, Labels, SelectItemClear)

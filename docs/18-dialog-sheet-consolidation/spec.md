# Feature: Dialog/Sheet consolidation

## Problem

`Dialog` and `Sheet` in `ui-overlays` are two near-identical component trees — 20 and 24 entries
respectively. Both wrap `@radix-ui/react-dialog`; the substantive difference is that Sheet slides
from an edge. Several files are byte-identical between the two trees and several more differ by a
single class, so a change to overlay behaviour has to be made twice, and the two have already
drifted in ways that are not deliberate:

- **The close-button API differs for no reason.** Dialog's is configurable; Sheet hardcodes it.
- **Files named `…Provider.tsx` contain no provider.** `SheetProvider.tsx` exports the `Sheet` root
  component. The name actively misleads.
- **The required accessibility `Title` is unguarded.** Radix's dialog requires an accessible name;
  nothing here enforces it, so an overlay can ship without one.
- Both trees carry the duplicate `Component.tsx` / `index.ts` barrels covered by
  [`15-exports-conventions`](../15-exports-conventions/spec.md).

The `SheetProvider` controlled-mode imperative-ref bug that was originally part of this work
**already shipped** under [`11-correctness-bugs`](../11-correctness-bugs/plan.md) — `open()`,
`close()` and `toggle()` now route through `onOpenChange`. It is not repeated here.

## Goals

1. Overlay behaviour is defined once, so a fix applies to both Dialog and Sheet.
2. A file's name describes what is in it.
3. An overlay cannot ship without an accessible name.

## Scope

- **Included**: making Sheet a variant of a shared Dialog base rather than a parallel copy;
  standardising on single-file-per-overlay; unifying the close-button API; renaming the misnamed
  `…Provider` files; guarding the required a11y `Title`.
- **Not included**: changing either component's public props beyond unifying the close button.
  `DropdownMenu`, `HoverCard` or `Popover` — this is Dialog and Sheet only. The barrel duplicates,
  which `15` removes repo-wide.
- **Can be delivered independently**: yes, though landing after `15` avoids touching the same
  barrels twice.

## Non-Goals

- Changing the animation or visual design of either overlay.
- Replacing the Radix primitive.
- Adding new overlay types.

## Requirements

1. Dialog and Sheet must share their common behaviour rather than duplicating it.
2. Both must expose the same close-button API.
3. A file named for a provider must contain one, or be renamed.
4. An overlay rendered without an accessible title must fail loudly — in development, in tests, or
   at type level. Which of those is an implementation decision.
5. Public rendered output and animation behaviour must be unchanged.

## Edge Cases & Error Handling

- **Sheet's edge-slide is the real difference** and must survive consolidation for all sides.
  Verify each side, not just one.
- **Radix's exit animations keep closed DOM mounted.** This has already caused a test to pass for
  the wrong reason elsewhere in this repo — assert on state, not merely on presence.
- **Guarding the `Title` may break existing call sites** that omit it. Those are real
  accessibility defects; fix them or record them, but do not weaken the guard to accommodate them.
- **Consolidation must not reintroduce the controlled-mode ref bug** fixed in `11`. Cover it with a
  test so it cannot silently regress.

## Acceptance Criteria

- [ ] Sheet is a variant of a shared base; no byte-identical file pairs remain between the two
      trees.
- [ ] Dialog and Sheet expose the same close-button API.
- [ ] No file named `…Provider.tsx` lacks a provider.
- [ ] An overlay without an accessible title fails loudly, demonstrated by a failing case.
- [ ] The controlled-mode imperative ref still works for both, covered by a test.
- [ ] Rendered output and animation behaviour are unchanged for Dialog and for every Sheet side.

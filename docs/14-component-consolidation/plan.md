# Component consolidation — as built

Status: **shipped.**

The [spec](spec.md) as originally written contained two pieces of work that were not consolidation
and one criterion that could not be met. Reviewing it against the code before implementing is what
surfaced that, so the first commit here is documentation: `14` was narrowed, and
[`17-command-list-nesting`](../17-command-list-nesting/spec.md) and
[`18-overlay-api`](../18-overlay-api/spec.md) were split out of it.

## Steps

- [x] **Split the spec.** `14` narrowed to consolidation; `17` and `18` written; roadmap updated;
      native `<dialog>` recorded under **Planned**.
- [x] **Selects.** Five pass-through wrappers deleted, replaced by aliased re-exports.
      `IBaseSelectProviderProps` deleted. The layered-contexts decision recorded in source.
- [x] **Overlays.** Internal `Overlay` module added; Sheet became a `side` variant of a shared
      surface; close-button API unified; two prop-spread defects fixed; `SheetProvider.tsx` renamed;
      `ISheetRef` deleted.
- [x] **Accessible name.** axe promoted to `error` on both overlay story files; `CommandDialog`
      fixed; `RefBased` given a `play()`; seven heading-order violations fixed.

## Decisions

### D1 — the nested scroll container belongs to `ui-command`

The spec pinned it to `SelectListItems.tsx`. In fact `CommandInterface` renders the outer
`CommandList` and every list variant renders another inside it, so `Select` shows a `role="listbox"`
nested in a `role="listbox"` — and so does every `Command` story. Fixing it needed changes in a
package `14` was not scoped to, and the virtualization measurement work was the riskiest part of the
original plan. Split to `17` rather than smuggled in here.

Only the a11y half is currently observable. The two scroll parents mask each other, because both cap
at `max-h-[300px]` so the inner never overflows the outer.

### D2 — the overlay content API is a feature, not consolidation

`Content` taking `title` / `description` / `footer`, wiring `aria-labelledby` from a `useId()`, and
generalising Sheet's imperative ref all apply equally to `Dialog`, `Sheet` and `Popover`. Split to
`18`, written for all three rather than for the two this deliverable happened to touch.

### D3 — the wrappers keep their Select-facing names

`SelectGroup` and the rest are now `export { CommandGroup as SelectGroup }`. Deleting the names
outright was possible — `SelectGroup` and `SelectSeparator` have no consumers anywhere in the repo —
but `Select` and `Command` are deliberately separate components, and someone composing a `Select`
should not have to reach for `Command*` names to do it. The public surface is unchanged: all 27
`@repo/ui-forms` runtime exports are byte-identical to before.

### D4 — the contexts stay layered

Closed the spec's open question. `Command` is standalone and must keep working on its own — as a
search dialog, for instance — so folding selection state into it would couple the two. They are also
disjoint: `ISelectContext` carries three fields, `ICommandContext` eleven, and `CommandProvider`
additionally owns the Radix `Popover` root.

### D5 — Sheet's close button changed appearance, deliberately

The drift was not only structural: Dialog's icon is 24px against Sheet's 16px, and their open-state
backgrounds differed. Unifying only the API would have satisfied "rendered output unchanged" while
leaving the drift the spec calls unintended. The call was to unify fully, so Sheet's button adopts
Dialog's. This is visible on every Sheet story and is the one intentional visual change in the
deliverable.

### D6 — `Sheet` is a `cva` variant, not a shared constant

The first cut extracted the shared classes into an `overlay.classes.ts` of plain string constants.
Replaced with `Overlay.variants.ts` following the repo's established `*.variants.ts` / `cva`
convention (`Alert`, `Badge`, `Icon`, `Label`, `Search`). The surface takes a `side` variant whose
`center` value is Dialog and whose four edge values are Sheet, which makes "Sheet is a variant of a
shared base" literally true rather than a description. The motion every edge shares sits in one
constant instead of being repeated four times.

### D7 — the uncontrolled `onOpenChange` branch was also broken

Fixing the Sheet root's spread order exposed a second defect underneath it. The old code chose
_either_ internal state _or_ the caller's callback, and the trailing `{...props}` then reinstated the
caller's — so an uncontrolled Sheet given an `onOpenChange` prop updated nothing and could not open.
It now does both: moves the state the render reads, and notifies the caller.

## What was left undone

- **`PopoverProvider.tsx` is still misnamed.** It exports a Radix `Root` wrapper containing no
  provider, exactly like `SheetProvider.tsx` did. Popover is out of scope, so it travels with the
  rest of Popover rather than being fixed piecemeal.
- **The eight byte-identical duplicate barrels remain**, including `Dialog/index.ts` and
  `Sheet/index.ts`. Left for [`13-exports-conventions`](../13-exports-conventions/spec.md) to settle
  once, along with the barrel strategy question `13` still has open.
- **The a11y guard reaches 2 of 26 overlay stories.** axe only judges an overlay a test actually
  opens; a story with no `play()` passes even with no `Title` at all, verified by removing one and
  watching the suite stay green. Closing the gap means a `play()` on every overlay story, left to
  `18` where they are rewritten anyway.
- **`SelectListItems` still duplicates `CommandListItems`** almost exactly. It is `17`'s concern.
- **`ui-forms/package.json` declares `@repo/ui-command` twice**, in `dependencies` and
  `devDependencies` — already recorded in
  [`12-build-dependency-tooling`](../12-build-dependency-tooling/plan.md).

## Verification

Run from a fully rebuilt tree; Turbo's cache is shared across worktrees, so `--force` is not
optional here.

| Claim                           | Evidence                                                                                                                                                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Select`'s public API unchanged | All 27 `@repo/ui-forms` runtime exports byte-identical to the pre-change list. Every declaration-tree delta is a deleted wrapper or the alias replacing it.                                                                        |
| Overlay public API unchanged    | All 44 `@repo/ui-overlays` runtime exports byte-identical. Only `showCloseButton` / `icon` added to `ISheetContent`.                                                                                                               |
| No byte-identical file pairs    | Every Dialog file diffed against its Sheet counterpart; none match.                                                                                                                                                                |
| Output unchanged                | `overlaySurfaceVariants` compared programmatically against the previous literals: Dialog's surface, all four Sheet sides and the backdrop produce identical class sets. Sheet's close button is the one deliberate exception (D5). |
| Dead types gone                 | `IBaseSelectProviderProps` and `ISheetRef` return zero references outside `docs/`.                                                                                                                                                 |
| The `11` ref fix cannot regress | `RefWithControlled` (controlled) and `RefBased` (uncontrolled) both assert on `data-state`, not on presence.                                                                                                                       |
| Missing accessible name fails   | Captured below.                                                                                                                                                                                                                    |
| No regressions                  | 384 passed, 27 skipped. Lint 18 + 20 warnings, 0 errors. `check-types` green across 19 tasks.                                                                                                                                      |

### The captured failure

With `SheetTitle` replaced by a plain `div` in `RefBased` — text still present, accessible name gone:

```
FAIL  packages/ui-overlays/src/components/Sheet/Sheet.stories.tsx > Ref Based
expect(received).toHaveNoViolations(expected)
Expected the HTML found at $('#radix-«r0»') to have no violations:
"ARIA dialog and alertdialog nodes should have an accessible name (aria-dialog-name)"
Fix any of the following:
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or
  references elements that are empty
  Element has no title attribute
```

### One pre-existing failure, not ours

`packages/ui-core/src/components/Calendar/Calendar.stories.tsx > Basic` fails on an untouched tree —
clicking a selected day should deselect it and does not. Baselined before any change here and
recorded in [`local-development`](../../.claude/skills/local-development/SKILL.md) so it is not
misread as a regression. Not adopted.

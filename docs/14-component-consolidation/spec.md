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

**Dead types remain** — `IBaseSelectProviderProps` at `Selects/types/select-context.ts:12`.

### Dialog and Sheet (`ui-overlays`)

Two near-identical trees — 20 and 24 entries — both wrapping `@radix-ui/react-dialog`, differing
substantively only in that Sheet slides from an edge. Several files are byte-identical and several
more differ by one class, so a change to overlay behaviour must be made twice. They have already
drifted in ways nobody intended: the close-button API is configurable on Dialog and hardcoded on
Sheet; files named `…Provider.tsx` contain no provider (`SheetProvider.tsx` exports the `Sheet`
root); and Radix's required accessible name is unguarded, so an overlay can ship without one.

Two further defects surfaced while reviewing this spec against the code, both from spreading
`{...props}` after the value it should not override:

- `SheetClose.tsx:10-12` reads `props.className`, then spreads `{...props}` afterwards — so a
  caller's `className` silently discards the `cn()` merge. The same applies to its `tabIndex`.
- `SheetProvider.tsx:30` spreads `{...props}` after `open`, re-overriding the value the
  controlled/uncontrolled branch just computed.

## Work split out of this deliverable

Reviewing this spec against the code found two pieces of work inside it that are not consolidation.
Both now have their own specs, so this deliverable stays what its title says.

**The nested-scroll bug is not a `Select` bug.** An earlier draft of this spec pinned it to
`SelectListItems.tsx:17`. In fact `CommandInterface` renders the outer `CommandList` and every list
variant renders another inside it, producing a `role="listbox"` nested in a `role="listbox"` on
every `Command` story as well as every `Select`. It belongs to `@repo/ui-command`, and the
virtualization measurement change it requires is the riskiest part of the original scope. See
[`17-command-list-nesting`](../17-command-list-nesting/spec.md).

**A convenience API for overlay content is a new feature, not consolidation.** Having `Content` take
`title` / `description` / `footer` props, wiring `aria-labelledby` automatically, and generalising
Sheet's imperative ref API generalises across `Dialog`, `Sheet` and `Popover`. See
[`18-overlay-api`](../18-overlay-api/spec.md).

Two items originally in this scope **already shipped** under
[`11-correctness-bugs`](../11-correctness-bugs/plan.md) and are not repeated: the `SelectProvider`
context memoization, and the `SheetProvider` controlled-mode imperative-ref fix.

## Goals

1. A reader following an import arrives at code that does something.
2. Overlay behaviour is defined once, so a fix reaches both Dialog and Sheet.
3. An overlay cannot ship without an accessible name.

## Scope

- **Included**: replacing the five pass-through wrappers with direct re-exports; deleting dead types;
  making Sheet a variant of a shared Dialog base; unifying the close-button API; renaming the
  misnamed `…Provider` files; fixing the two prop-spread ordering defects; enforcing the required
  a11y accessible name in the test suite.
- **Not included**: changing `Select`'s or the overlays' public APIs beyond the close button.
  Merging the two selection contexts — closed as a decision below, not carried forward.
  `DropdownMenu`, `HoverCard` and `Popover`. The nested `CommandList` (`17`) and the overlay content
  API (`18`). The duplicate barrels, which [`13-exports-conventions`](../13-exports-conventions/spec.md)
  removes repo-wide.
- **Ordering**: `13` is *not* a prerequisite. Barrel edits here are confined to the five entries in
  `Selects/components/index.ts`; the eight byte-identical duplicate barrels — including
  `Dialog/index.ts` and `Sheet/index.ts` — are left untouched for `13`.

## Non-Goals

- Rewriting `Select`'s rendering or virtualization strategy.
- Changing `ui-command`'s public surface, or either overlay's animation and visual design.
- Replacing the Radix primitives.

## Requirements

1. `Select`'s public API and rendered output unchanged.
2. Dialog and Sheet share their common behaviour rather than duplicating it, and expose the same
   close-button API.
3. A file named for a provider contains one, or is renamed.
4. An overlay rendered without an accessible title fails the test suite.
5. Anything deleted must be provably unused first.

### Deliberate deviations

**Sheet's close button changes appearance.** The drift between the two close buttons was not only
structural: Dialog's icon is 24px (`Icon` `size='xl'`) against Sheet's 16px (`Icon`'s `md` default),
and their open-state backgrounds differ (`bg-accent` + `text-muted-foreground` against
`bg-secondary`). Unifying only the *API* would have satisfied the criterion above while leaving the
drift the Problem section calls unintended. The call was made to unify fully, so Sheet's close button
adopts Dialog's: a 24px icon, the accent open state, `cursor-pointer`, a `data-slot`, and the three
`[&_svg…]` rules it previously lacked. This is a visible change on every Sheet story and is
intentional. Everything else — Dialog's surface, all four Sheet surfaces, the backdrop — is
unchanged, proven by comparing composed class sets rather than by eye.

**A file named for a provider that isn't one.** Requirement 3 also indicts `PopoverProvider.tsx`, which exports `PopoverProvider` — a Radix `Root`
wrapper containing no provider — and is aliased to `Popover` at its barrel. Popover is explicitly out
of scope here, so this one is **knowingly left in place** and travels with the rest of Popover rather
than being fixed piecemeal.

## Edge Cases & Error Handling

- **A "pass-through" may not be pure.** Two of the five are 8 and 14 lines; check each for defaulted
  props or class merging before replacing it with a re-export.
- **Re-exporting instead of wrapping changes `displayName`**, which Storybook docs and name-based
  selectors may rely on.
- **Sheet's edge-slide is the real difference** and must survive for every side, not just one.
- **Radix keeps closed overlay DOM mounted during exit animations.** This has already made a test in
  this repo pass for the wrong reason — assert on state, not mere presence.
- **Enforcing the accessible name may break existing call sites.** Those are real accessibility
  defects; fix or record them, do not weaken the guard. Turning axe to `error` on a story file will
  also surface unrelated pre-existing violations, because a11y is `todo` globally.

## Acceptance Criteria

**Selects**

- [ ] The five pass-through wrappers are gone, replaced by re-exports, each confirmed pure first.
- [ ] `IBaseSelectProviderProps` and any other dead types are gone, with zero references remaining.
- [ ] `Select`'s public API is unchanged, and its Storybook interaction suite passes including the
      virtualized stories.

**Dialog / Sheet**

- [ ] Sheet is a variant of a shared base; no byte-identical file pairs remain between the trees.
- [ ] Both expose the same close-button API, and no `…Provider.tsx` lacks a provider — except
      `PopoverProvider.tsx`, recorded above as a deliberate deferral.
- [ ] The two prop-spread ordering defects are fixed, so a caller's `className` on `SheetClose` and
      a caller's `open` on the Sheet root both behave as written.
- [ ] An overlay without an accessible title fails the suite, demonstrated by a captured failure.
- [ ] Sheet's controlled-mode imperative ref still works, covered by a test so the `11` fix cannot
      silently regress — and the uncontrolled path is covered too.
- [ ] Rendered output and animation behaviour unchanged for Dialog and for every Sheet side —
      except Sheet's close button, deliberately excepted below.

## Decisions

**Keep `CommandProvider` and `SelectProvider` layered.** An earlier draft left this open. It is
closed: the split is deliberate. `Command` is a standalone component that merely *happens* to be what
`Select` is built from, and must keep working on its own — as a search dialog, for instance. Merging
the contexts would couple the two. The code agrees: `ISelectContext` carries three fields,
`ICommandContext` eleven, they are strictly disjoint, and `CommandProvider` additionally owns the
Radix `Popover` root. Merging buys nothing, and it is not why the wrappers exist.

**`Dialog` has no imperative ref API.** An earlier acceptance criterion required the controlled-mode
imperative ref to work "for both". `IDialog` is Radix `Root` props and exposes no ref API at all —
only `Sheet` has one, added under `11`. The criterion above is restated as Sheet-only. Generalising
that API to `Dialog` and `Popover` is [`18-overlay-api`](../18-overlay-api/spec.md).

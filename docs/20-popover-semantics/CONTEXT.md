# Context: Popover semantics (20)

Vocabulary, decisions and open questions for [`20-popover-semantics`](spec.md). Written during
grilling; updated as answers land. The spec states _what_ is built; this file records _why_, and what
the words mean.

## Vocabulary

**Popover** — the anchored, non-modal surface in `@repo/ui-overlays`. Four call sites:
`CommandProvider`, `Select` (`SelectTrigger` + `SelectInterface`), `SingleDatePicker`,
`DateRangePicker`. Not `DropdownMenu` or `HoverCard`, which share its wrapper shape but stay on Radix.

**Phase 1 / Phase 2** — Phase 1 is semantics and structure, still on Radix. Phase 2 swaps the
primitive for `popover="auto"` plus CSS anchor positioning, behind the raised support floor.

**The role follows the name** — DD-2's rule. A named popover is `role="group"`; an unnamed one has no
role; a caller-supplied `role` beats both.

**Anchor name** — the `<dashed-ident>` set as `anchor-name` on the trigger (or `PopoverAnchor`) and
`position-anchor` on the content. Caller-supplied or generated from `React.useId()` (DD-8).

**Light dismiss** — closing because the user clicked outside the popover. A close source in its own
right (`'light-dismiss'`), distinct from `Dialog`'s `'backdrop'`.

**Veto** — as in [`18`](../18-overlay-api/CONTEXT.md): `onRequestClose(event)` plus
`event.preventDefault()` refuses a close, and the overlay stays genuinely open.

## Architecture Decisions

### ADR-1 — `title` and `description` are props on `PopoverContent`, with no compound parts (2026-09-11)

**Status**: Decided.

**Decision**: `PopoverTitle` and `PopoverDescription` are not built. A popover is named by
`aria-labelledby`, `aria-label` or the `title` prop, ranked in that order, and described by
`aria-describedby` or the `description` prop.

**Rationale**: every extra part is one more thing a caller has to learn and assemble. The compound
parts on `Dialog` exist as an escape hatch for custom header markup; `title` and `description` are
already `ReactNode`, so they can hold an icon or formatting, and no popover call site needs more than
that. A popover with no visible title uses `aria-label`, which `18`'s ADR-5 already prefers over a
visually-hidden heading.

**Alternative considered**: mirror `Dialog` exactly (DD-3). Rejected — consistency with `Dialog`
holds for the _props_, which is what a caller actually learns; the compound parts are the rarely-used
half.

**Consequence — the spec is owed edits.** Requirement 7 loses `PopoverTitle` / `PopoverDescription`.
Requirement 8 and AC7 rank three routes, not four. The "no visible title" edge case loses its
visually-hidden `PopoverTitle` route. Goal 3 and DD-3 are narrowed to "the same props as `Dialog`".

**Consequence**: `Popover` never uses `useOverlayLabelling`'s title/description registration, and
the "both a `title` prop and a compound title" warning cannot fire for it.

**Noted against it**: shadcn's current Popover docs go the other way, with `PopoverHeader` /
`PopoverTitle` / `PopoverDescription` compound parts
([ui.shadcn.com](https://ui.shadcn.com/docs/components/radix/popover), checked 2026-09-11). Recorded
so a future reader comparing against shadcn knows the difference is deliberate.

### ADR-2 — `PopoverAnchor` is removed; the trigger is always the anchor (2026-09-11)

**Status**: Decided.

**Decision**: `PopoverAnchor` is deleted from `ui-overlays` and its exports. A popover attaches to its
`PopoverTrigger`. Every current call site already does: the date pickers' trigger is a `Button`, and
`Select`'s is `SelectTrigger`.

**Rationale**: it has zero call sites in `packages/` and `apps/`, and shadcn's current docs no longer
show it. A part nobody uses is still a part every caller has to read past.

**Consequence**: requirement 11 is deleted, and DD-8's "`PopoverAnchor` finally earns its place"
no longer applies. If a popover ever needs to attach to something other than its trigger, the part
comes back then.

### ADR-3 — No `PopoverClose` part (2026-09-11)

**Status**: Decided.

**Decision**: `PopoverClose` is not built. The public parts are `Popover`, `PopoverTrigger` and
`PopoverContent`.

**Rationale**: the same minimum-parts principle as ADR-1 and ADR-2. Nothing needs it today, and the
optional X (`showCloseButton`) covers the common case.

**Consequence**: a popover with its own "Done" or "Cancel" button is controlled — the caller holds
`open` and sets it to `false`. Requirement 7 is deleted entirely (with ADR-1 it has nothing left),
and AC9's close routes are Escape, a click outside, and the X button.

### ADR-4 — A popover's name is optional, and guidance replaces enforcement (2026-09-11)

**Status**: Decided.

**Decision**: no type or runtime rule forces a popover to have a name. A popover without `title`,
`aria-label` or `aria-labelledby` is valid. Content popovers are _encouraged_ to pass a `title`, and
the stories and component docs show that as the normal way to write one.

**Rationale**: a popover's accessibility comes mostly from the component (the trigger's expanded
state, focus moving in, Escape and focus return) and from its contents being accessible in their own
right — a `Field` inside one already announces its label and description through `htmlFor` and
`aria-describedby`. The APG grades a `group` name _discretionary_ (fact 5), and screen readers skip an
unnamed group (fact 6), so an unnamed popover reads as its contents, which is correct for `Select`.
A name adds a boundary announcement ("Filters, group") and nothing else.

**Alternative considered**: require a name in the types. Rejected — it would force `Select` to name a
wrapper around an already-named listbox, adding an announcement no guideline asks for.

**Consequence**: where the guidance lives — a component-level hint, `Popover.mdx`, or both — is
tied to the spec's `Popover.mdx` open question.

### ADR-5 — No popover is a dialog, date pickers included (2026-09-11)

**Status**: Decided. Confirms DD-1 and DD-2 against the sources in facts 5–7.

**Decision**: every popover follows one rule — `role="group"` when it has a name, no role when it
does not. The date pickers get no special case: no `role="dialog"`, no invented name, and their
trigger stops emitting `aria-haspopup="dialog"`.

**Rationale**: a popover is not a dialog. The APG requires a dialog to keep Tab inside it, and a
popover lets Tab move out, so the role would be a promise the component breaks. The popover authors'
view that a non-modal dialog is acceptable (fact 7) was weighed and not followed. A dialog also
requires a name, which ADR-4 does not guarantee. The calendar names itself regardless (fact 9), so a
date picker used without a `Field` is still announced by month, day and navigation.

**Alternatives considered**: a dialog that keeps Tab inside (the APG date picker example) — rejected,
a focus trap in a non-modal popover. A dialog that lets Tab out (roughly today) — rejected, it
contradicts the APG.

**Consequence — spec edits owed.** Requirement 5 and AC6 ("both date pickers' calendars are named")
are dropped; the replacement is that neither date picker's popup or trigger claims a dialog.

**Noted against it**: the general `accessibility-standards` skill lists
`<button aria-haspopup="dialog" aria-expanded>` as the calendar trigger. It was deliberately left
unchanged — the skill holds general rules, not this library's decisions — so a reader following it
should expect this deliverable to differ.

### ADR-6 — A slim Phase 1: semantics and naming only; everything about closing waits (2026-09-11)

**Status**: Decided. Answers which phase requirements 12–15 belong to, and supersedes Scope's
Phase 1 list.

**Decision**: Phase 1, on Radix, is `title` / `description` on `PopoverContent`, the role rule
(ADR-5), the trigger dropping `aria-haspopup="dialog"`, `Select`'s trigger `aria-controls` pointing
at its listbox, the two `aria-dialog-name` suppressions removed, the `Select` test helpers rewritten,
and `Popover` stories. Phase 2 takes everything else: removing Radix, positioning, the fade,
`onRequestClose` and its close sources, the optional X button (`showCloseButton`), and preferring an
`[autofocus]` element.

**Rationale**: Radix is being removed, so close handling built on it would be written twice. Adding
an optional `onRequestClose` in Phase 2 breaks no caller, so it does not violate "the Phase 1 API is
unchanged". Focus on open needs no Phase 1 work because Radix already does it (fact 10). Phase 1
then contains only work that survives the swap unchanged, and fixes the shipping accessibility
defects without waiting on Phase 2's unknowns.

**Alternative considered**: one deliverable with no phases. Rejected — the support-floor reason for
splitting is gone (DD-5 decided it), but Phase 2's unknowns (whether Escape is testable on a native
popover, the `Select` host element) would then block the accessibility fixes.

**Consequence**: Scope's "split exists because only the second needs the floor raised" is no longer
the reason and needs rewording. Requirements 12–15, 9 and AC8–AC9 are tagged Phase 2. `18`'s
`useOverlayLabelling` warning is not used in Phase 1 (ADR-4).

**Revised by ADR-17**: `onRequestClose` and its close sources are no longer part of Phase 2 — a
popover close cannot be refused.

### ADR-7 — Callers cannot set a popover's role (2026-09-11)

**Status**: Decided.

**Decision**: `PopoverContent` does not accept `role`. The component alone decides it, per ADR-5.

**Rationale**: no call site sets one, and it is the only route back to an unnamed `role="dialog"`.
The role belongs to the component's internals, now and after Phase 2. If a real need appears, the
override comes back then.

**Consequence**: requirement 3 and AC3 are deleted. Requirement 10 (warn when a role has no name) has
nothing left to guard, since a role only exists alongside a name, and is deleted too. Because
`IPopoverContent` extends Radix's props today, `role` has to be removed from the type explicitly, or
callers can still pass it.

### ADR-8 — Every id a popover needs is generated internally (2026-09-11)

**Status**: Decided.

**Decision**: the title id, description id and (Phase 2) anchor name are generated with
`React.useId()`. None of them can be supplied by a caller.

**Rationale**: with no compound parts (ADR-1) and no `PopoverAnchor` (ADR-2), nothing outside the
component ever needs to reference these ids. A caller who wants to point at their own element uses
`aria-labelledby`, which already wins the naming ranking. `Dialog` and `Sheet` generate their title
ids the same way (`DialogContent.tsx:22`).

**Consequence — DD-8 simplifies.** The anchor always sits on the trigger and its name is always
generated, so two popovers cannot share one. The "caller may supply the name" option, the
duplicate-name warning, and that edge case are deleted; AC11 shrinks to "generated anchor names are
stable across re-renders and valid `<dashed-ident>`s". The `«r0»` sanitising step still applies.

### ADR-9 — `title` renders as plain text, not a heading (2026-09-11)

**Status**: Decided.

**Decision**: the `title` prop renders a non-heading element, referenced by `aria-labelledby`.
There is no prop to choose a heading level.

**Rationale**: the correct heading level depends on the headings above the trigger on each page,
which `PopoverContent` cannot see — a fixed `h2` or `h3` is a guess that breaks the page outline
somewhere. Unlike a modal dialog, a popover leaves the page visible, so its heading would join the
page's heading list while open. The `group` role already announces the title on entry, so a heading
adds nothing a screen reader user needs.

**Alternative considered**: a `titleLevel` prop. Rejected as complexity nothing needs yet.

**Consequence**: this differs from `Dialog`, whose title is an `<h2>`. That is deliberate: a modal
dialog hides the page, so its heading has no outline to break.

### ADR-10 — `Popover.mdx` waits for the `ui-overlays` docs session (2026-09-11)

**Status**: Decided. Answers the spec's fourth open question.

**Decision**: no `.mdx` in this deliverable. Caller guidance goes in a description on the `title` prop
and in the `Popover` stories' descriptions. The page itself is recorded in
[`planned.md`](../planned.md#storybook-docs-pages-for-ui-overlays), alongside `Dialog` and `Sheet`.

**Rationale**: the spec's case for writing it now was the anchor-name contract, a caller obligation
with nowhere else to live. ADR-8 removed that obligation. What remains (name a content popover; no
`role` prop) is short enough for a prop description, and `ui-overlays` has no `.mdx` for any
component yet, so a page here would set the layout from one case — the reason `18` deferred its own.

### ADR-11 — `DateRangePicker` flips like every other popover (2026-09-11)

**Status**: Decided. Answers the spec's `collisionPadding` open question.

**Decision**: in Phase 2 `DateRangePicker` drops both `avoidCollisions={false}` and
`collisionPadding={50}`, and flips to open above its trigger when there is no room below. Neither
prop survives on `PopoverContent`.

**Rationale**: consistency — it is the only popover that refuses to flip, and a calendar running off
the bottom of the screen is worse than one opening above. `collisionPadding` does nothing today
(fact 1), so dropping it changes no behaviour. The setting dates from the component's first commit
(`c0177dc`, 2025-08-16) with no recorded reason. Other libraries flip by default: React Aria
(`shouldFlip` defaults to `true`), Mantine (flip and shift on by default), and shadcn's own range
picker example passes only `align="start"`.

**Consequence**: requirement 17 (`avoidCollisions={false}` maps to `position-try-fallbacks: none`)
is deleted, since no caller needs it. Discovery's success criterion 7 and AC13 ("both date pickers
flip") become true, where today they are false for the range picker.

### ADR-12 — The `popover` attribute always sits on `PopoverContent`'s own wrapper (2026-09-11)

**Status**: Decided. Answers the spec's first open question.

**Decision**: `PopoverContent` always renders its own element and puts `popover` on it. It is not
polymorphic. For `Select` that is the element `SelectInterface` renders as `PopoverContent`, with
`cmdk`'s search input, listbox and empty state inside it.

**Rationale**: the tidier option — `popover` on `Select`'s listbox directly — would leave the search
input outside the popover (fact 2): still painted when the popover hides, and a click on it would
count as a light dismiss.

**Consequence**: the question of whether `cmdk`'s virtualised list can also be the positioned box
disappears, because it never is. `SelectTrigger`'s `aria-controls` still points at the listbox
inside the wrapper, not at the wrapper (fact 12).

### ADR-13 — A popover closes on Escape, a click outside, or focus leaving it (2026-09-11)

**Status**: Decided. How Tab behaves inside is still open.

**Decision**: in Phase 2, focus moving outside a popover closes it, alongside Escape and a click
outside. Like the others, it goes through `onRequestClose`, with its own close source.

**Rationale**: it keeps today's Radix behaviour (fact 4), so Phase 2 is not a regression there, and a
popover left open over the form after focus has moved on is the failure a user would notice. A native
`popover="auto"` does not do this on its own, so the library adds it.

**Consequence**: `OverlayCloseSource` gains a focus-out source as well as `'light-dismiss'`
(requirement 15), and AC9 gains a route.

**Revised by ADR-17**: no close sources and no `onRequestClose` for popovers. Focus leaving still
closes the popover; the caller learns of it through `onOpenChange(false)`, like every other route.

### ADR-14 — Tab moves out of a popover, and closes it; no looping (2026-09-11)

**Status**: Decided. Answers the question ADR-13 left open.

**Decision**: in Phase 2, Tab past a popover's last focusable element moves focus to whatever
follows the popover, and ADR-13 closes it. Shift+Tab past the first does the same in reverse. The
popover never loops Tab inside itself, whatever it contains.

**Rationale**: it is the native `popover="auto"` default, it matches the
[APG select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
(Tab closes the listbox and moves on), and it keeps ADR-5 honest: containing Tab is what makes
something a dialog. Accessibility is about the announcement matching the behaviour — a group that
lets Tab out is consistent; a group that loops Tab is not.

**Alternatives considered**:
- _Loop Tab in every popover_, as Radix does today (fact 4). Accessible only as a named non-modal
  dialog, so it would reverse ADR-4 and ADR-5, and it leaves Tab stuck on `Select`'s search input.
- _Split by kind_ — pickers let Tab out; content popovers with a title and close button become named
  dialogs that loop Tab. The more precise answer, since a titled popover with an X genuinely is
  window-like. Rejected for now as two behaviours plus a rule for choosing between them. **Revisit
  if a caller asks for a contained popover.**

**Consequence — a temporary mismatch in Phase 1.** Radix hardcodes the loop, so between Phase 1 and
Phase 2 popovers are announced as a group (or nothing) while still looping Tab. Accepted as
temporary, and still an improvement on an unnamed `role="dialog"`.

**Consequence**: a titled popover with a form closes if the user Tabs past its last control.
_Revised by ADR-17_: a caller cannot refuse that close. If it becomes a problem, it is the case for
the split-by-kind alternative above, not for a veto.

### ADR-15 — `side` and `align` survive; `sideOffset` does not (2026-09-11)

**Status**: Decided.

**Decision**: `PopoverContent` keeps `side` and `align` in Phase 2. `sideOffset` is removed, and every
popover uses the same gap from its trigger.

**Rationale**: `DateRangePicker` is the only caller of any positioning prop
(`align='start' side='bottom' sideOffset={8}`). `align` changes how a wide calendar lines up with a
narrow trigger. `side` is kept as a basic positioning choice, even though no caller sets it to
anything but the default. `sideOffset` has no reason beyond one call site's 8px against the default
4px, and a single gap is consistent with ADR-11.

**Consequence**: requirement 16 loses `sideOffset`. `DateRangePicker` moves from an 8px gap to the
shared one. Keeping `side` means `left` and `right` placements, and their horizontal flips, need
position fallbacks and geometric tests of their own, with no current caller exercising them.

### ADR-16 — The Chrome floor rises to 137, so the browser knows each popover's trigger (2026-09-11)

**Status**: Decided. Revises DD-5's Chrome figure; Firefox 147 and Safari 26 are unchanged.

**Decision**: Phase 2 opens a popover with its trigger registered (`showPopover({ source })`), and
the support floor becomes Chrome 137 / Firefox 147 / Safari 26.

**Rationale**: without a registered trigger, clicking the trigger of an open popover closes and
reopens it (fact 13). Registering it is the browser's own fix, with no workaround to write or test.
DD-5 already accepted a raised floor in exchange for platform behaviour; Chrome 137 (May 2025) is a
small further step for a self-updating browser. No reason not to was found; problems are handled if
they appear.

**Alternative considered**: keep Chrome 125 and ignore a light dismiss that starts on the trigger, by
hand. Rejected as a workaround for something the platform already solves.

**Consequence**: DD-5's usage figures (90.7% → 84.1%) were measured for Chrome 125 and need
rechecking when Phase 2 rewrites the root README's browser-support section. Registering the trigger
also creates an implicit anchor, which may make ADR-8's generated anchor names unnecessary —
unverified, and a planning check.

### ADR-17 — A popover close cannot be refused (2026-09-11)

**Status**: Decided. Reverses requirements 13–15; reinstates `18`'s ADR-8 ("`Popover` cannot veto")
for a different reason.

**Decision**: `Popover` keeps the browser's automatic closing (`popover="auto"`). There is no
`onRequestClose` and no close source. Escape, a click outside, focus leaving and the X button all
close the popover, and the caller is told through `onOpenChange(false)`.

**Rationale**: the browser does not let a `popover="auto"` close be refused — `beforetoggle` for
closing is not cancelable, and a real outside click closes the popover even with every pointer and
mouse event prevented (fact 14). Refusing would mean taking over Escape and light dismiss ourselves.
No popover in the repo needs to refuse a close; the motivating case, a half-filled form, lives in
`Dialog` and `Sheet`, which keep their veto. This follows the rule applied throughout: the platform
default, until someone asks for more.

**Alternative considered**: `popover="manual"`, with Escape, outside clicks and focus-out written by
the library. Every route becomes refusable and synthetic test input works, at the cost of owning the
dismissal logic Radix owned. **This is the route if a veto is ever requested.**

**Consequence — spec edits owed.** Requirements 13, 14 and 15 are deleted. AC9 becomes: Escape, a
click outside, focus leaving and the X button each close the popover and call `onOpenChange(false)`
once. Discovery's "cancellable close" row is wrong (fact 14). Goal 3's "same API as `Dialog`" now
excludes closing as well as the compound parts.

**Consequence — tests.** Synthetic input reaches neither native Escape nor light dismiss (fact 14),
so Phase 2 needs a keyboard path for Escape, as `18` did, and a way for `play()` to click outside
that the popover responds to. The mechanism is the implementation plan's.

## Follow-ups this grilling surfaced

Not part of this deliverable.

- **A date picker outside a `Field` loses its purpose once a date is picked.** With no `Field` and no
  `aria-label`, the trigger's name is its visible text: "Pick a date", then "12 Sep 2026". A screen
  reader user no longer hears what the date is _for_. Needs its own session — likely a descriptive
  hint or a required name on the date pickers.

## Facts established (verified, not assumed)

1. **`DateRangePicker` does not flip today.** `avoidCollisions={false}` removes both `flip()` and
   `shift()` from the middleware stack. `collisionPadding` then only feeds `size()`'s
   `--radix-popper-available-height` and `hide()`; nothing reads the first and the second is not
   enabled, so `collisionPadding={50}` currently does nothing. Checked in
   `@radix-ui/react-popper@1.2.8`, `dist/index.mjs:106-126`.
2. **The `Select` popup is not the listbox.** `CommandInterface` renders `CommandSearch`,
   `CommandList` and `CommandEmpty` as siblings inside `PopoverContent`. Only `CommandList` is the
   listbox.
3. **Radix can already refuse a popover close, except `PopoverClose`.** Escape, pointer-down outside
   and focus outside each run the caller's handler first and dismiss only
   `if (!event.defaultPrevented)` — `react-dismissable-layer@1.1.11`, `dist/index.mjs:47-65`.
   `PopoverClose` calls `onOpenChange(false)` directly and cannot be refused
   (`react-popover@1.1.15`, `dist/index.mjs:278`). `18`'s ADR-8 ("`Popover` cannot veto") was about
   `onOpenChange`, not these handlers.
4. **Radix loops Tab inside every popover, and closes it when focus leaves by any other route.**
   _Corrected 2026-09-11; first recorded as "Tab out of a popover closes it", which is wrong._
   `PopoverContent` wraps its children in a focus scope with `loop: true` hardcoded, modal or not
   (`react-popover@1.1.15`, `dist/index.mjs:225`). Tab on the last focusable element moves to the
   first, and Shift+Tab on the first moves to the last (`react-focus-scope@1.1.7`,
   `dist/index.mjs:102-121`), so the keyboard alone cannot leave. Focus leaves only by a click or
   programmatically, and that closes it (`onFocusOutside`, `react-popover`, `dist/index.mjs:237-238`).
   Two consequences, from reading the code rather than running it:
   - **DD-1's premise is false for today's popovers.** "A dialog contains its tab sequence — ours
     does not": on Radix, ours effectively does. It becomes true only once Phase 2 removes Radix,
     since a native `popover="auto"` neither loops Tab nor closes on focus loss.
   - **Tab does nothing in an open `Select`.** Its only tabbable element is `cmdk`'s search input
     (the listbox is `tabIndex={-1}`), so it is both first and last, and Tab is prevented and
     refocuses it. The [APG select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
     closes the listbox on Tab and moves focus on.
5. **A name on a group is optional; on a dialog it is required; on a bare `<div>` it is prohibited.**
   The APG's naming table grades `group` _discretionary_, `dialog` and `listbox` _required_, and
   `generic` _prohibited_ ([APG, names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)).
6. **Chrome, Edge and Firefox already give a role-less popover `role="group"`; Safari does not.**
   An unnamed group is usually skipped by screen readers; naming it is what makes the boundary
   announced ([hidde.blog, 2024-03-21](https://hidde.blog/popover-semantics/);
   [browser-compat-data#29566](https://github.com/mdn/browser-compat-data/issues/29566), open). So in
   Phase 2 "no role" means "an unnamed group" in three engines, which reads the same.
7. **The popover authors say the role should match the purpose, and do not agree with DD-1.**
   `listbox` for a select's popup, `menu` for actions, and a non-modal `dialog` for window-like
   content ([hidde.blog](https://hidde.blog/popover-semantics/),
   [scottohara.me, 2025](https://www.scottohara.me/blog/2025/03/14/popovers.html)). The APG still
   says non-modal dialogs contain their tab sequence
   ([APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)). This tension is
   unresolved in the spec.
8. **Every `PopoverTrigger` also claims a dialog.** Radix's trigger sets `aria-haspopup: "dialog"`
   alongside `aria-expanded` and `aria-controls` (`react-popover@1.1.15`, `dist/index.mjs:90-92`).
   `SelectTrigger` overrides it with `listbox`; both date pickers inherit `dialog`. The spec only
   addresses the content's role, so removing `role="dialog"` there would leave the date pickers'
   triggers announcing a dialog that no longer exists.
9. **The calendar already names itself.** `react-day-picker@9.9.0` renders each month as
   `role="grid"` with `aria-label` set to the month, e.g. "September 2026", formatted through the
   picker's `locale` (`dist/esm/DayPicker.js:249`, `labels/labelGrid.js`). Its navigation buttons and
   day cells carry their own labels too. None of this depends on `Field`.
10. **Radix already moves focus in on open.** Its focus scope focuses the first tabbable element,
    links excluded, unless the mount event is cancelled (`react-focus-scope@1.1.7`,
    `dist/index.mjs:77-81`). It does not prefer an `[autofocus]` element.
11. **The `Select` suite is the only popover test code that queries `role="dialog"`.** Four helpers
    in `Selects/__fixtures__/interactions.ts` and five queries in `Select.stories.tsx`. The date
    picker stories' `findByRole('dialog')` queries target a `Sheet`, not the popover.
    `Form.stories.tsx` contains no `dialog` query, so discovery's `Form.stories.tsx:431` citation is
    stale.
12. **`cmdk` owns the listbox's id, and callers cannot set it.** `Command.List` renders
    `role: "listbox", …, id: listId` after spreading its props, so a passed `id` is overwritten;
    `listId` comes from `cmdk`'s internal context, which is not exported (`cmdk@1.1.1`,
    `dist/index.mjs`). Its search input already points at it with `aria-controls`. Pointing
    `SelectTrigger`'s `aria-controls` at the listbox is therefore a planning risk, not a one-liner.
13. **Without a registered trigger, clicking an open popover's own trigger closes and reopens it.**
    Light dismiss exempts a click only on the popover's _trigger_, which the browser knows about only
    through `popovertarget` or `showPopover({ source })`; both set the same trigger
    ([HTML, popover](https://html.spec.whatwg.org/multipage/popover.html)). DD-8 opens with plain
    `showPopover()`, so pressing the trigger light-dismisses on pointer-down and the click handler
    then reopens it. Focus return on close does **not** depend on a trigger: the spec restores focus
    for the first auto popover in the stack either way, so discovery's "focus returns natively"
    holds. The `source` option is Chrome 137 / Firefox 144 / Safari 26
    ([browser-compat-data](https://github.com/mdn/browser-compat-data/blob/main/api/HTMLElement.json)),
    above DD-5's Chrome 125 floor.
14. **A native `popover="auto"` close cannot be refused, and synthetic input does not close it.**
    Measured 2026-09-11 in Chromium 148 (the desktop app's browser), on a bare `popover="auto"`
    opened with `showPopover({ source })`:

    | Probe | Popover afterwards |
    | --- | --- |
    | `beforetoggle` for closing | fires with `cancelable: false`; `preventDefault()` does nothing, `hidePopover()` still closes |
    | Real click outside | closes |
    | Real click outside, with `pointerdown` / `mousedown` / `pointerup` / `mouseup` all `preventDefault()`ed in capture | **still closes** |
    | Synthetic `KeyboardEvent('keydown', { key: 'Escape' })` | stays open, no `beforetoggle` |
    | Synthetic `pointerdown` / `pointerup` / `click` outside | stays open, no `beforetoggle` |
    | Focus moved to an element outside | stays open |

    So discovery's "Cancellable close — `beforetoggle` + `preventDefault()`" row is wrong, and
    requirement 14's veto cannot be built for light dismiss on `popover="auto"`. Synthetic input —
    what `storybook/test`'s `userEvent` dispatches — reaches neither Escape nor light dismiss, so a
    `play()` cannot exercise either natively; `18` hit the same wall with `<dialog>` Escape. A real
    Escape could not be tested: the browser tool's key press did not close even an unguarded popover,
    so that result is inconclusive and not recorded as behaviour.

## Open Questions

The spec's four open questions:

| Question | Answer |
| --- | --- |
| Which element hosts the `popover` attribute? | ADR-12 — always `PopoverContent`'s own wrapper |
| Does `beforetoggle` fire for synthetic events? | No (fact 14). Escape needs its own keyboard path, as `18`'s `<dialog>` did (`useDialogElement.ts:124-133`), and so does any `play()` that clicks outside |
| Does `collisionPadding` survive? | ADR-11 — no, and `avoidCollisions` goes with it |
| Is `Popover.mdx` written here? | ADR-10 — no, it waits for the `ui-overlays` docs session |

The pre-planning checks raised at the end of grilling, closed 2026-09-11:

| Check | Resolution |
| --- | --- |
| Synthetic Escape in the test environment | Measured — does not close (fact 14) |
| How `SelectTrigger` learns `cmdk`'s listbox id (fact 12) | Not blocking: the id is in the DOM once open. Which way to read it is the implementation plan's call |
| Does the registered trigger (ADR-16) provide the anchor in all engines? | Not blocking: ADR-8's generated anchor names work regardless. Using the implicit anchor instead is an optional simplification for the plan |
| Escape in a popover inside a modal `Dialog` | Not a question — required behaviour. Becomes an acceptance criterion: it closes the popover only |

Fact 14 raised one more: can a popover close be refused at all? **No** — ADR-17. Nothing on
behaviour or API remains open.

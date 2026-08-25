# Context: A common overlay API (18)

Vocabulary, decisions and open questions for [`18-overlay-api`](spec.md). Written during grilling;
updated as answers land. The spec states *what* is built; this file records *why*, and what the
words mean.

## Vocabulary

**Overlay** — in this deliverable, the two _modal content surfaces_: `Dialog` and `Sheet`.
`Popover` is anchored and non-modal and is out of scope; `DropdownMenu` and `HoverCard` are menus,
not surfaces.

**Compound sub-components** — the exported parts (`DialogHeader`, `SheetTitle`, `DialogFooter`…)
that callers assemble by hand today. Requirement 5 keeps them; the new props are an alternative,
not a replacement. Under the native primitive they also **register themselves** into the overlay's
context, which is what makes "did anything name this?" answerable (ADR-5).

**Content component** — `DialogContent` / `SheetContent`. The element the spec puts
`title` / `description` / `footer` on.

**Imperative ref API** — `open()` / `close()` / `toggle()` / `isOpen`, added to `Sheet` under
[`11`](../11-correctness-bugs/plan.md). Must route through the one state path, never a second copy
of it.

**Veto** — refusing a close. `onRequestClose(event)` plus `event.preventDefault()`, covering
Escape, the close button and backdrop dismissal (ADR-8). Possible only on the native element.

## Architecture Decisions

### ADR-1 — The new props live on the content component; the root keeps the trigger (2026-08-23)

**Status**: Decided.

**Decision**: `title` / `description` / `footer` go on `DialogContent` / `SheetContent`. The root
component is not given a `trigger` prop. A composed overlay is therefore three elements — root,
trigger, content — not one.

**Rationale**: The caller's job is reduced to the parts that genuinely vary by call site: the
trigger, the body, and the footer's contents. Everything invariant — header structure, the
title/description elements, the ARIA wiring — is built internally, which is the whole point of the
deliverable. Hoisting the trigger to a root prop would not remove an obligation, only relocate one,
and would make `asChild` trigger composition harder to express.

**Consequence**: Goal 1's wording ("one component with props, not seven elements") overstates the
target and should be reworded to name three. AC1 is unaffected.

### ADR-2 — Popover is out of scope entirely (2026-08-23, revised 2026-08-24)

**Status**: Superseded. Originally decided as "Popover takes the same props, without becoming a
modal"; reversed when the deliverable merged with the primitive swap.

**Decision**: `Popover` gets neither the props nor the ref API here, and stays on Radix. The work is
deferred to [`20`](../20-popover-semantics/spec.md). The single exception is where it *portals
to* inside a modal, which the swap forces —
[DD-6](discovery.md#dd-6--anchored-overlays-portal-into-the-dialog-element) — and which changes no
public API.

**Why it was originally included**: the spec's stated reason for excluding it — that Popover "does
not carry `role="dialog"` by default" — is **false**. Verified in `@radix-ui/react-popover@1.1.15`:
`Popover.Content` sets `role: "dialog"` unconditionally. A dialog role with no accessible name is an
axe `aria-dialog-name` failure, which is exactly the nine failures
[`17`](../17-command-list-nesting/plan.md#the-a11y-gate-and-what-it-surfaced) suppressed. **That
finding stands and is the reason Popover needs its own work** — it is a real, currently-shipping
defect.

**Why it moved out**: a modal content surface and an anchored non-modal one are different concepts,
and this deliverable became the native-`<dialog>` swap. Popover cannot follow it there, so keeping it
in would mean one deliverable spanning two primitives and two ideas. Its labelling story also differs
in kind: Radix Popover ships no `Title` / `Description` primitives, so it would need wiring built by
hand and used nowhere else here.

### ADR-3 — No `description` means no `aria-describedby`, even though it silences Radix (2026-08-23)

**Status**: Decided.

**Decision**: When no `description` is supplied, the content component passes
`aria-describedby={undefined}` to the Radix primitive, so no attribute is emitted. Radix's
"Missing `Description`" console warning is knowingly given up.

**Rationale**: A description is optional for `role="dialog"` under both ARIA and the
[APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) — only
the accessible *name* is required. Radix's default is to emit `aria-describedby` pointing at an id
that may not exist, which is a reference to nothing. The warning is a nag aimed at the hand-assembly
this deliverable replaces; once the component owns the wiring it already knows whether a description
was given.

**Alternative considered**: keep the warning and accept the dangling attribute (the spec's original
edge case). Rejected — but note the cost was overstated during grilling: axe-core 4.10.3 grades a
dangling id reference as *needs review*, not a violation, so this was never a red build. The
argument is honesty of the a11y tree, not the gate.

**Consequence**: The spec's edge-case bullet forbidding `aria-describedby={undefined}` contradicted
AC3 and has been rewritten. The compound path is no longer a gap: under the native primitive
`DialogDescription` registers itself into the overlay's context (ADR-5), so "did anything describe
this?" is answerable whichever route the caller used.

### ADR-4 — The primitive swap is part of this deliverable, not a separate one (2026-08-23, revised 2026-08-24)

**Status**: Decided. Originally "pause `18` pending a native `<dialog>` discovery pass"; the pass ran
and became [`discovery.md`](discovery.md), briefly as its own deliverable `19`, then merged back in.

**Decision**: one deliverable. The plan phases it — primitive first, API second — but there is one
spec, one set of decisions and one review.

**Rationale**: the swap was first raised mid-grilling as a way to make the overlays "more accessible
out of the box", a premise that turned out to be wrong: native supplies no accessible name, and Radix
already renders a correct accessibility tree. The reasons that survived are different ones —
top-layer stacking, the semantic element, and a cancelable close. Splitting was then justified on
"the API survives either primitive", which held for the props and failed for the behaviour: ADR-3,
ADR-5 and ADR-8 are all unbuildable on Radix. See
[Why this is one deliverable](discovery.md#why-this-is-one-deliverable).

**Consequence**: grilling resumed and completed — ADR-5 to ADR-8 below answer every question this
ADR listed as outstanding. AC8 did not survive: DD-1 accepts that animations will differ, and the
spec's acceptance criteria were renumbered around it.

### ADR-5 — Naming without a visible heading uses `aria-label`, and a dev warning catches the gap (2026-08-23)

**Status**: Decided. Answers requirement 8 and the Q4 raised during grilling.

**Decision**: no `hideTitle` prop. An overlay that needs a name but no visible heading is given
`aria-label`. `CommandDialog` becomes `<DialogContent aria-label='Command Palette'>`, with no
`sr-only` markup — which is what requirement 8's acceptance test asks for. Requirement 4 already
makes caller-supplied ARIA win, so no new precedence rule is needed.

**Rationale**: it matches how the library already handles the identical problem. An icon-only
`Button` has no text to name it, so the caller supplies `aria-label` and the component warns when
nothing does — [`Button.tsx:72`](../../packages/ui-core/src/components/Button/Button.tsx#L72). Using
the same idiom for an overlay with no visible heading keeps one answer to "how do I name a control
that shows no text", rather than two.

**Rejected**: a `hideTitle` boolean, and making `title` nullable. The latter cannot work at all:
`title` is already optional, so `null` and omitted already mean *no name*, and there is no value of
`title` that distinguishes "unnamed" from "named but not painted".

**Consequence — and it recovers something the primitive swap gives up.** `DialogContent` warns,
non-throwing, when an overlay has no accessible name from any route. Because
[the swap](discovery.md) makes us the owner of the primitive, the compound parts can register their
ids into the overlay's context, so the check is a context read rather than Radix's
`document.getElementById`. That also resolves ADR-3's deferred sub-question: a compound
`DialogDescription` in `children` becomes detectable, so suppressing `aria-describedby` can be
conditioned on nothing having registered.

### ADR-6 — The prop wins when both a `title` prop and a compound title are supplied (2026-08-23)

**Status**: Decided.

**Decision**: if a caller passes `title` *and* puts a `DialogTitle` in `children`, both headings
render, `aria-labelledby` points at the **prop's**, and a non-throwing `console.warn` reports the
duplicate.

**Rationale**: the props path is the documented one, so it wins. Neither heading can be suppressed
honestly — removing a `DialogTitle` from `children` would mean walking the tree, which is fragile —
so the mistake is left visible on screen, where it is noticed before anyone reads the console. Same
shape as [`Button`](../../packages/ui-core/src/components/Button/Button.tsx#L72).

**The narrowness is deliberate.** The props path exists so a caller does not have to wire anything
up; the compound parts remain as the escape hatch for genuinely custom markup (requirement 5). Being
restrictive about mixing the two is the feature, not a limitation to design around.

### ADR-7 — `title`, `description` and `footer` are all plain `ReactNode` slots (2026-08-23)

**Status**: Decided.

**Decision**: `footer?: React.ReactNode`. No object form carrying content plus per-part props.

**Rationale**: nothing in the current stories restyles a footer, so the richer shape would be paid
for by every caller and used by none. A call site that genuinely needs custom footer markup or
styling uses the compound `DialogFooter` (requirement 5) — that is what the escape hatch is for.

### ADR-8 — `Dialog` and `Sheet` can veto a close; `Popover` cannot (2026-08-23)

**Status**: Decided. Answers the spec's first open question.

**Decision**: `DialogContent` and `SheetContent` take a handler that can block closing —
`onRequestClose(event)`, cancelled with `event.preventDefault()`. Every close route (Escape, the
`X`, backdrop dismissal) goes through it. The motivating case is a dirty form: attempting to leave
is blocked and an alert dialog asks for confirmation.

**Rationale**: only possible because [the primitive swap](discovery.md) moves these to the native
element, whose `cancel` event is cancelable. Radix's `onOpenChange` reports a close and cannot veto
one, which is why this was an open question rather than a feature.

**Consequence — a documented hole in goal 3.** `Popover` stays on Radix and cannot veto, so
`onRequestClose` is not part of the shared API. "Knowing one means knowing all three" holds for
`title` / `description` / `footer` and the ref API, and stops here.

**Consequence — a cross-deliverable dependency.** The confirmation half of the flow wants the alert
dialog, which is sequenced *after* this. Until it exists, `Sheet.stories.tsx`'s
`WithConfirmationDialog` demonstrates the veto with a nested `Dialog`. Its description must be
corrected regardless: it currently claims the `X` triggers the confirmation, and today it does not.

### Resolved without a decision — AC8

"How is AC8 verified, given screenshots are unreliable in this environment?" is moot.
[DD-1](discovery.md) accepts that animations will differ, so AC8's "appearance and animation
unchanged, including every Sheet side" cannot survive as written and is replaced by
[discovery.md's success criterion 7](discovery.md#success-criteria): animations present and close to
today's, confirmed by eye once.

## Facts established about Radix (verified, not assumed)

Checked against the installed versions in the main checkout, `react-dialog@1.1.15` and
`react-popover@1.1.15`. Facts 2 and 3 describe constraints this deliverable **escapes** by leaving
Radix; they are kept because they explain why earlier decisions were shaped the way they were, and
because `Popover` still lives under them.

1. **`Popover.Content` always sets `role="dialog"`.** See ADR-2 — a currently-shipping defect, and
   the reason Popover needs its own deliverable.
2. **Radix Dialog `console.error`s unless an element with the generated `titleId` is in the DOM.**
   An `aria-label` on the content does not satisfy it — the check is
   `document.getElementById(titleId)`, nothing more. This forced a visually hidden title while on
   Radix, and is why ADR-5's `aria-label` answer only became available once the primitive changed.
3. **Radix Dialog's description warning fires only when `aria-describedby` is present and dangling**
   (`if (descriptionId && describedById)`). Content sets `aria-describedby` to the generated id by
   default, so omitting a description gives you a dangling reference *and* a warning; the only way
   to emit no attribute is to pass `aria-describedby={undefined}`.
4. **axe-core 4.10.3 grades a dangling `aria-describedby` as "needs review", not a violation** — the
   `aria-valid-attr-value` message is _"ARIA attribute element ID does not exist on the page"_ under
   `needsReview`. So `a11y: { test: 'error' }` would not have caught it.
5. **`OverlayCloseButton` already carries an accessible name** (`<span className='sr-only'>Close</span>`),
   including when the caller supplies a custom `icon`. No work needed there.
6. **These packages have no i18n.** `accessibility-standards` requires ARIA strings to come from
   translation keys; that clause does not apply here, and overlay strings stay hardcoded.

## Open Questions

**None on the API.** Grilling completed 2026-08-24; every question it raised is answered by ADR-1 to
ADR-8 above:

| Question | Answer |
| --- | --- |
| How much collapses — one element or three? | ADR-1 — three |
| Does `Popover` take the props? | ADR-2 — no, deferred out |
| Emit a dangling `aria-describedby` or lose Radix's warning? | ADR-3 — lose the warning |
| Radix or native? Two deliverables or one? | ADR-4 — native, one |
| How is an overlay named with no visible heading? | ADR-5 — `aria-label`, plus a warning |
| `title` prop *and* a compound title — which wins? | ADR-6 — the prop, and warn |
| Is `footer` a node or an object? | ADR-7 — a node |
| Can a close be refused? | ADR-8 — yes, on `Dialog` and `Sheet` only |

What remains open is behavioural and belongs to the primitive half — cross-browser exit animations,
`closedby` support, clipping under DD-6. See
[`discovery.md`](discovery.md#open-questions).

## Follow-ups this grilling surfaced

Neither is part of this deliverable; both are corrections owed to the codebase.

- **`Sheet.stories.tsx`'s `WithConfirmationDialog` prose is wrong.** It claims the close button
  triggers its confirmation; the `X` closes immediately. Requirement 10 makes the claim true, but the
  wording needs fixing regardless.
- **`Dialog.stories.tsx:242`'s `AlertDialog` story is not an alert dialog** — `role="dialog"`,
  freely dismissible. Rename it, or let the [alert dialog deliverable](../19-alert-dialog/spec.md)
  replace it.

# Feature: A common overlay API

## Problem

**Building an overlay takes seven elements, and getting one of them wrong is silent.** A Sheet with a
heading, a body and a footer currently reads:

```tsx
<Sheet>
	<SheetTrigger asChild>
		<Button>Edit profile</Button>
	</SheetTrigger>
	<SheetContent side='right'>
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>Update your details.</SheetDescription>
		</SheetHeader>
		<SheetInnerContent>
			<ProfileForm />
		</SheetInnerContent>
		<SheetFooter>
			<Button type='submit'>Save</Button>
		</SheetFooter>
	</SheetContent>
</Sheet>
```

Every call site reassembles the same structure, and the assembly carries obligations the caller has
no way to discover. Omit the `SheetTitle` and the overlay ships with no accessible name. Put it
outside `SheetContent` and Radix does not portal it, so the name is lost even though the markup looks
right — which is exactly what `CommandDialog` did.

**Two overlays, two different amounts of API.** `Sheet` has an imperative ref
(`open()` / `close()` / `toggle()` / `isOpen`) added under
[`11-correctness-bugs`](../11-correctness-bugs/plan.md). `Dialog` has none, so a caller who needs to
open one from an event handler has to hold their own state. The `Sheet` shape is the good one; it is
simply not available anywhere else.

**Nothing links a title to the thing it names.** No component in `ui-overlays` sets
`aria-labelledby` or `aria-describedby`. The link works only when Radix infers it, and only for the
compound arrangement.

**And a close cannot be refused.** Radix's `onOpenChange` reports a close; it cannot veto one. A
dirty form in a Sheet has no way to stop the `X` discarding it.

[`14-component-consolidation`](../14-component-consolidation/spec.md) unifies what Dialog and Sheet
share internally and makes a missing accessible name fail the test suite. It deliberately stops
short of changing the public API. This deliverable is that change — and, because three of the
decisions behind it cannot be built on Radix at all, the primitive swap underneath it. See
[`discovery.md`](discovery.md#why-this-is-one-deliverable) for why the two are one piece of work.

## Goals

1. The common overlay — heading, body, footer — is three elements with props, not seven.
2. An overlay is correctly labelled and described by default, without the caller doing anything.
3. One idiom across `Dialog` and `Sheet`, so knowing one means knowing the other.
4. Custom markup stays possible.
5. `Dialog` and `Sheet` are built on the platform's `<dialog>` element rather than a `div` annotated
   with ARIA.

## Scope

- **Included**: rebuilding `Dialog` and `Sheet` on native `<dialog>` per [`discovery.md`](discovery.md);
  `title` / `description` / `footer` props on their content components, with the header, body and
  footer built internally; automatic `aria-labelledby` / `aria-describedby` wiring; the imperative
  ref API on both; a close that can be vetoed; migrating the existing stories onto the new API.
- **Not included**: `Popover`, which keeps its current API and primitive — the one exception is
  where it portals to when opened inside a modal, which the swap forces
  ([DD-6](discovery.md#dd-6--anchored-overlays-portal-into-the-dialog-element)). Removing the
  compound sub-components. `DropdownMenu` and `HoverCard`, which are menus rather than content
  surfaces.

## Non-Goals

- An `AlertDialog`. It is [Planned](../planned.md#alert-dialog) as its own deliverable, sequenced
  after this one.
- Reworking `Popover`'s semantics or API — [Planned](../planned.md#popover-semantics) separately.
- Pixel-identical animations. [DD-1](discovery.md) accepts that they will differ.
- A schema- or config-driven overlay.
- Reducing the public export surface.

## Requirements

1. Each overlay's content component accepts `title`, `description` and `footer` and renders them in
   the same structure the compound parts produce today.
2. `children` is the body, and receives the scrolling treatment the inner content component applies
   today.
3. When a `title` is supplied, the overlay is labelled by it automatically. When a `description` is
   supplied, the overlay is described by it automatically. The caller writes no ARIA attributes.
4. A caller-supplied `aria-label`, `aria-labelledby` or `aria-describedby` always wins over the
   generated one.
5. The compound sub-components remain exported and keep working, for call sites needing custom
   header or footer markup.
6. `Dialog` and `Sheet` expose the same imperative ref API, and it works in both controlled and
   uncontrolled modes.
7. Existing behaviour is unchanged for call sites that do not adopt the new props — excepting
   animation, per DD-1.
8. An overlay can be named **without rendering a visible heading**, and doing so requires no
   hand-built hidden markup.
9. An overlay warns, without throwing, when nothing gives it an accessible name.
10. A close can be refused. Every route out — Escape, the close button, backdrop dismissal — passes
    through one cancelable handler.

## The call site that proves requirement 8

`CommandDialog` is a command palette: the search input is the visible affordance, and a heading above
it would be noise. But it still needs a name. Today it satisfies that with a hand-built
`<DialogHeader className='sr-only'>` wrapping a `DialogTitle` — and until
[`14`](../14-component-consolidation/plan.md) it had that header _outside_ `DialogContent`, where
Radix never carried it into the portal, so the dialog shipped with no name at all. The pattern is
easy to get wrong precisely because it is hand-built.

Under this deliverable that whole block collapses to `<DialogContent aria-label='Command Palette'>`,
with no `sr-only` markup at the call site — see [ADR-5](CONTEXT.md). Treat `CommandDialog` as the
acceptance test for requirement 8: if it still needs a hand-written hidden header afterwards, the API
has not solved the problem.

## Edge Cases & Error Handling

- **Generated ids must be stable across server and client render** and unique per instance. Two
  overlays open at once must not collide.
- **A caller may supply both a `title` prop and a compound title in `children`.** Both render, the
  prop wins the accessible name, and a warning reports the duplicate — [ADR-6](CONTEXT.md).
- **`aria-describedby` pointing at nothing is worse than absent.** If no description is supplied by
  either route, no attribute is emitted — [ADR-3](CONTEXT.md). Because the compound parts register
  themselves into the overlay's context, "either route" is genuinely detectable.
- **The imperative ref must not drive internal state directly**, or it becomes a no-op in controlled
  mode. That was the `11` bug; do not reintroduce it in `Dialog`.
- **`showModal()` throws `InvalidStateError` on an already-open dialog.** The bridge from the `open`
  prop must check first.
- **A closing dialog stays in the DOM while it animates out.** Assert on state, not mere presence.
- **A vetoed close must leave the dialog genuinely open**, not visually open but internally closed —
  the state bridge and the veto share one path.

## Acceptance Criteria

The primitive half's criteria are in [`discovery.md`](discovery.md#success-criteria). These cover the
API.

- **AC1** — `DialogContent` and `SheetContent` accept `title`, `description` and `footer`, and
  produce the same structure the compound parts produce today.
- **AC2** — An overlay given only a `title` is labelled by it, verified against the accessibility
  tree rather than the markup.
- **AC3** — An overlay given a `description` is described by it; one given none emits no
  `aria-describedby`.
- **AC4** — A caller-supplied `aria-label` / `aria-labelledby` / `aria-describedby` overrides the
  generated value, covered by a test.
- **AC5** — `Dialog` and `Sheet` expose the same imperative ref API, each covered in controlled and
  uncontrolled modes.
- **AC6** — The compound sub-components are still exported and still work, demonstrated by at least
  one story per overlay that keeps using them.
- **AC7** — The existing Dialog and Sheet stories are migrated to the new props, and the interaction
  suite is green with `a11y: { test: 'error' }` enabled on both.
- **AC8** — `CommandDialog` names itself with `aria-label` and contains no `sr-only` markup.
- **AC9** — An overlay with no accessible name from any route logs a warning and still renders.
- **AC10** — A vetoed close is covered by a test for each route: Escape, the close button, and
  backdrop dismissal.

## Open Questions

All of the spec's original open questions are answered; the decisions and their reasoning are in
[CONTEXT.md](CONTEXT.md) (ADR-1 to ADR-8) and [`discovery.md`](discovery.md) (DD-1 to DD-8). What
remains is listed as open in [`discovery.md`](discovery.md#open-questions) and is behavioural rather
than design — cross-browser exit animations, `closedby` support, and clipping under DD-6.

One correction owed to the codebase regardless of this deliverable: `Sheet.stories.tsx`'s
`WithConfirmationDialog` description claims the close button triggers its confirmation. It does not
— the `X` closes immediately. Requirement 10 makes the claim true; the prose needs fixing either
way.

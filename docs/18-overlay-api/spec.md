# Feature: A common overlay API

## Problem

**Building an overlay takes seven elements, and getting one of them wrong is silent.** A Sheet with a
heading, a body and a footer currently reads:

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Edit profile</Button></SheetTrigger>
  <SheetContent side='right'>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Update your details.</SheetDescription>
    </SheetHeader>
    <SheetInnerContent><ProfileForm /></SheetInnerContent>
    <SheetFooter><Button type='submit'>Save</Button></SheetFooter>
  </SheetContent>
</Sheet>
```

Every call site reassembles the same structure, and the assembly carries obligations the caller has
no way to discover. Omit the `SheetTitle` and the overlay ships with no accessible name. Put it
outside `SheetContent` and Radix does not portal it, so the name is lost even though the markup looks
right — which is exactly what `CommandDialog` did.

**Three overlays, three different amounts of API.** `Sheet` has an imperative ref
(`open()` / `close()` / `toggle()` / `isOpen`) added under
[`11-correctness-bugs`](../11-correctness-bugs/plan.md). `Dialog` and `Popover` have none, so a
caller who needs to open one from an event handler has to hold their own state. The `Sheet` shape is
the good one; it is simply not available anywhere else.

**Nothing links a title to the thing it names.** No component in `ui-overlays` sets
`aria-labelledby` or `aria-describedby`. The link works only when Radix infers it, and only for the
compound arrangement.

[`14-component-consolidation`](../14-component-consolidation/spec.md) unifies what Dialog and Sheet
share internally and makes a missing accessible name fail the test suite. It deliberately stops
short of changing the public API. This deliverable is that change.

## Goals

1. The common overlay — heading, body, footer — is one component with props, not seven elements.
2. An overlay is correctly labelled and described by default, without the caller doing anything.
3. One overlay idiom across `Dialog`, `Sheet` and `Popover`, so knowing one means knowing all three.
4. Custom markup stays possible.

## Scope

- **Included**: `title` / `description` / `footer` props on each overlay's content component, with
  the header, body and footer built internally; automatic `aria-labelledby` / `aria-describedby`
  wiring; extending the imperative ref API to `Dialog` and `Popover`; migrating the existing stories
  onto the new API.
- **Not included**: changing any overlay's animation or visual design. Removing the compound
  sub-components. `DropdownMenu` and `HoverCard`, which are menus rather than content surfaces and
  should be judged separately.

## Non-Goals

- Replacing the Radix primitives. Native `<dialog>` is recorded separately under **Planned** in
  [the roadmap](../README.md) and needs its own discovery.
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
6. `Dialog`, `Sheet` and `Popover` expose the same imperative ref API, and it works in both
   controlled and uncontrolled modes.
7. Existing behaviour and rendered appearance are unchanged for call sites that do not adopt the new
   props.

## Edge Cases & Error Handling

- **Generated ids must be stable across server and client render** and unique per instance. Two
  overlays open at once must not collide.
- **A caller may supply both a `title` prop and a compound title in `children`.** Decide which wins
  and make it consistent, rather than emitting two.
- **`aria-describedby` pointing at nothing is worse than absent.** If `description` is omitted, no
  attribute should be emitted at all.
- **Radix warns when a Dialog has no `Description`.** Suppressing that warning by passing
  `aria-describedby={undefined}` is a real signal being discarded; do not.
- **Popover is not a modal.** It has no focus trap and does not carry `role="dialog"` by default, so
  the labelling story differs from Dialog and Sheet. Verify what the accessibility tree actually
  reports rather than assuming the Dialog behaviour transfers.
- **The imperative ref must go through `onOpenChange`, not internal state**, or it becomes a no-op
  in controlled mode. That was the `11` bug; do not reintroduce it in `Dialog` or `Popover`.
- **Radix keeps closed overlay DOM mounted during exit animations.** Assert on state, not mere
  presence.

## Acceptance Criteria

- [ ] `Dialog`, `Sheet` and `Popover` content components accept `title`, `description` and `footer`,
      and produce the same structure the compound parts produce today.
- [ ] An overlay given only a `title` is labelled by it, verified against the accessibility tree
      rather than the markup.
- [ ] An overlay given a `description` is described by it; one given none emits no
      `aria-describedby`.
- [ ] A caller-supplied `aria-label` / `aria-labelledby` / `aria-describedby` overrides the generated
      value, covered by a test.
- [ ] All three overlays expose the same imperative ref API, each covered in controlled and
      uncontrolled modes.
- [ ] The compound sub-components are still exported and still work, demonstrated by at least one
      story per overlay that keeps using them.
- [ ] The existing Dialog, Sheet and Popover stories are migrated to the new props, and the
      interaction suite is green with `a11y: { test: 'error' }` enabled on all three.
- [ ] Animation and rendered appearance are unchanged, including every Sheet side.

## Open Questions

- Should `footer` be a `ReactNode`, or an object carrying both content and per-part props? The
  simpler shape is proposed above; the richer one only earns its cost if call sites routinely need
  to restyle the footer.
- Does `Popover` want `title` / `description` at all, or only the ref API? A popover is often a bare
  content surface with no heading, and adding the props may invite headings where none belong.

# Feature: Focus indicators

## Problem

See [`discovery.md`](./discovery.md).

In short: every focusable element in the library indicates focus with the same `--ring` colour,
with no way to vary it per component or per region without editing the library. Measuring the ring
to answer that surfaced a larger defect — **the indicator as rendered today is between 1.44:1 and
1.91:1 against the page background, against a 3:1 requirement**, because the utilities apply
`--ring` at 20–50% alpha. Three unrelated focus idioms coexist across the four packages, two
components use `focus:` instead of `focus-visible:` (so they ring on mouse click), and
`SliderThumb` hardcodes raw palette colours that respond to no token at all.

Configurability and contrast are the same decision — both are "what colour is the indicator" — so
they are specified together.

## Goals

1. Make the focus indicator's colour overridable through a CSS custom property, at an element or
   any ancestor, with no new React prop and no library edit.
2. Bring every shipped default up to the agreed contrast bar, demonstrated by computed values.
3. Reduce the three ring idioms to one, keeping the menu-item background idiom as a deliberate
   second pattern.
4. Remove hardcoded palette colours from focus styling.
5. Ensure focus rings appear only for keyboard users (`focus-visible` throughout).

## Scope

- **Included**: a themeable focus-indicator colour resolved from a CSS custom property; a single
  ring treatment shared by every ring-indicated control across `ui-core`, `ui-forms`,
  `ui-overlays` and `ui-command`; correcting the `focus:`→`focus-visible:` and off-token cases
  identified in discovery; a documented way for a composite component to opt out because its
  container indicates on its behalf.
- **Not included**: see Non-Goals.
- **Can be delivered independently**: yes. It depends on no other pending deliverable. It does
  supersede the focus styling `Button` currently carries — [`02-button-enhancements`](../02-button-enhancements/spec.md)
  deliberately left focus untouched, so there is no conflict, only a later replacement.

## Non-Goals

- **Converting menu items to rings.** `DropdownMenu`'s `focus:bg-accent` treatment is the correct
  convention for roving-focus menu items and stays as it is.
- **Restyling hover, active or pressed states.** The pressed treatment shipped with
  [`02-button-enhancements`](../02-button-enhancements/spec.md) and is not revisited.
- **Fixing unrelated accessibility debt** surfaced while working through the components.
- **Per-component focus colours as a design exercise.** The mechanism must support variation; which
  variants actually ship a non-default colour is a design decision that can follow later without
  another spec.
- **Making `@storybook/addon-a11y` blocking beyond its current scope.**

## Requirements

### Functional

- The focus indicator's colour resolves from a **CSS custom property with a documented name and a
  library-provided default**. Setting that property on an element, or on any ancestor, changes the
  focus colour of everything beneath it that has not set its own.
- The property is the _only_ configuration surface. No component gains a React prop for it.
- Every ring-indicated focusable control across the four packages uses one shared treatment —
  same geometry, same trigger, same colour resolution.
- Focus rings appear on keyboard focus only, never on pointer interaction.
- A component whose focus is indicated by an ancestor can suppress its own indicator, and doing so
  must remain possible after the rollout (`Search`'s inner input is the existing case).
- No focus styling references a raw colour outside the theme tokens.

### UI/UX

- **The ring sits outside the element's own bounds** (offset from the control, on the surface
  behind it) rather than inset over its fill. This is the decision the rest of the requirements
  depend on — see Decisions.
- The indicator is visually distinct from the pressed and hover treatments already in place.
- Theme switching changes the indicator appropriately without a page reload.
- Where an element sits on a non-page surface (inside a card, a popover, a filled parent), the
  indicator remains visible against _that_ surface.

### Accessibility

- The focus indicator meets **WCAG 2.2 SC 2.4.11 (Focus Appearance)** at AA: at least 3:1 contrast
  between the indicator and adjacent colours, and an indicator area at least equal to a 2 CSS px
  perimeter of the control. (Confirm this target — see Open Questions.)
- Contrast is demonstrated by **computed values from the theme tokens**, for every shipped default,
  in both light and dark themes, against every surface the control is documented to sit on. Visual
  judgement is not sufficient — the current 1.56:1 ring looks fine to the eye.
- Any default that cannot meet the bar is either changed until it does or not shipped.
- Focus order and focusability are unchanged by this work — this is a styling deliverable.

### Integration

- The default lives with the other theme tokens in `@repo/tailwind-config`, which all four packages
  already consume. No new cross-package dependency.
- Consumers overriding the property need no import and no build change.

## Edge Cases & Error Handling

- **Element on a matching surface**: a control whose focus colour resolves to the same colour as
  the surface behind it produces a 1:1 indicator — invisible. Discovery measured exactly this for
  self-tinted rings. The shipped defaults must not contain such a pairing.
- **Nested overrides**: a control inside a subtree that sets the property, which itself sets it,
  uses its own value. Inheritance is last-one-wins down the tree.
- **Consumer sets an unreadable colour**: the library cannot prevent this. It is the consumer's
  responsibility, and the documentation must say so alongside the 3:1 requirement.
- **Focus while disabled**: a disabled native control is not focusable; an `aria-disabled` element
  may still be. The indicator must still be visible in that case rather than dimmed into
  invisibility by the disabled opacity treatment.
- **Element clipped by an `overflow: hidden` ancestor**: an offset ring drawn outside the element's
  box can be clipped away entirely. Any control that lives inside a scroll container or a clipped
  parent must still show a complete indicator.
- **Focus arriving during an animation or transition** (a dialog opening, a popover positioning):
  the indicator must settle in the correct place rather than tracking a mid-animation position.
- **Composite controls**: where several focusable elements sit inside one visual control, only the
  element that actually has focus indicates.

## Success Criteria

- **SC1** — Every Acceptance Criterion below passes.
- **SC2** — No focus-related visual regression in existing stories beyond the intended change.
- **SC3** — `pnpm build` / `pnpm lint` / `pnpm test` stay green.
- **SC4** — A grep for focus utilities across `packages/*/src` returns one ring idiom and the
  menu-item idiom, and nothing else.

## Acceptance Criteria

**Configurability**

- **AC1** — Given a control with default focus styling, when it receives keyboard focus, then its
  indicator uses the library default colour.
- **AC2** — Given an ancestor element that sets the focus-colour property, when a descendant control
  receives keyboard focus, then its indicator uses the ancestor's value.
- **AC3** — Given a control that sets the property on itself inside a subtree that also sets it,
  when it receives keyboard focus, then its own value wins.
- **AC4** — Given a consumer application, when it overrides the property in its own stylesheet, then
  no library file needs changing and no component needs a new prop.

**Trigger**

- **AC5** — Given any ring-indicated control, when it is clicked with a pointer, then no focus ring
  appears.
- **AC6** — Given the same control, when it is reached with the keyboard, then a focus ring appears.

**Contrast**

- **AC7** — Given every shipped default focus colour, when its contrast against each adjacent
  surface is computed in both light and dark themes, then every value is at least 3:1.
- **AC8** — Given the focus indicator on any control, when its rendered area is measured, then it is
  at least equivalent to a 2 CSS px perimeter of that control.

**Consistency**

- **AC9** — Given any focusable control that indicates with a ring, when its focus styling is
  inspected, then it resolves through the shared treatment rather than a component-local one.
- **AC10** — Given `SliderThumb`, when it receives keyboard focus, then its indicator is
  theme-derived and adapts to dark mode.
- **AC11** — Given the `Dialog` and `Sheet` close buttons, when clicked with a pointer, then no ring
  appears.

**Opt-out**

- **AC12** — Given a composite whose container indicates focus on its behalf, when the inner control
  receives focus, then only one indicator is visible.

**Regression**

- **AC13** — Given `DropdownMenu` items, when navigated with the keyboard, then they continue to
  indicate with a background change and gain no ring.

## Decisions

- **The ring is offset, not inset.** Discovery measured a self-tinted ring on its own fill at
  1.00:1, which looked like an argument against per-variant colour entirely. It is really an
  argument against _inset_ rings: an offset ring sits on the surface behind the control, so its
  contrast is a single check per surface rather than one per variant fill, and varying the colour
  per variant stops being dangerous. This one choice is what makes the original ask — variation —
  compatible with the contrast requirement. Cost: offset rings are vulnerable to clipping by
  `overflow: hidden` ancestors, hence the edge case above.
- **Variation is a capability, not a shipped palette.** The requirement is that the colour _can_
  vary and cascades correctly. Shipping a different default per variant is a design decision that
  can be made later, per variant, once the mechanism exists — and each one has to pass the same
  contrast check. This deliberately keeps the deliverable small.
- **Menu items keep their background indication.** Two indicator shapes is the correct answer for
  this library, not an inconsistency to be resolved.
- **Alpha is the root cause and is not carried forward.** The existing 20–50% alphas are what turn
  a 2.63:1 token into a 1.56:1 indicator. Whatever colour ships, the contrast requirement is
  measured on the composited result.

## Open Questions

1. **Is WCAG 2.2 SC 2.4.11 the target?** The library committed to WCAG 2.1 AA in
   [`02-button-enhancements`](../02-button-enhancements/spec.md); 2.4.11 is the 2.2-level successor specific to
   focus. Under 2.1 AA alone the contrast bar is materially weaker and some current styling might
   pass. **Settle this before design** — it determines how much of the rollout is a colour change
   versus a geometry change.
2. **How far does "all interactive elements" reach?** Everything focusable in all four packages, or
   the controls that carry a ring today? The second is smaller and covers the complaint; the first
   is more thorough and will surface more off-pattern cases like `SliderThumb`.
3. **Do `--ring`'s own values change?** The token is 2.63:1 in light at full opacity — passable once
   the alpha is removed, but not generous. Retuning it affects anything else referencing `--ring`.

## Design References

- Current idioms and their locations: discovery doc, "Three unrelated focus idioms are in use".
- The base-class-carries-shape / variant-carries-colour pattern established for the pressed state:
  `packages/ui-core/src/components/Button/variants.ts`.
- The legitimate opt-out case: `packages/ui-core/src/components/Search/Search.variants.ts:20`.

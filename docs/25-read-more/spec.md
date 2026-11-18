# Feature: ReadMore

## Problem

The app's `ReadMore` collapses long text to a fixed height and shows a "Read More" button that
expands it. It has one call site, the person biography in `ViewPersonResource.tsx` _(measured
2026-11-16)_. It has these problems:

- **The button says nothing about state.** It has no `aria-expanded` and no `aria-controls`, so a
  screen reader user hears "Read More, button" and cannot tell what it controls or whether it is
  open.
- **It only works for one child.** It measures `children[0].scrollHeight`, so content with more than
  one paragraph is measured wrong.
- **It depends on its parent.** The button is `absolute bottom-0 right-0`. It only lands in the right
  place because the call site's `<section>` happens to be `relative`.
- **It breaks in dark mode.** The fade over the cut-off text is a gradient to `#fff` in
  `ReadMore.scss`, and the button has `bg-white`. That `.scss` file is the app's only component-level
  stylesheet.
- **It ignores reduced motion.** The expand runs a one-second `max-height` transition every time.
- **It is cut by pixels, not lines.** The default of 215px can cut a line of text in half.
- **It measures once.** Overflow is checked on mount and when the height prop changes. A resize or
  late-loading content leaves it wrong.

This is C05 in [`component-inventory.md`](../component-inventory.md).

## Goals

1. Long content collapses, and one control expands and collapses it.
2. The control's state is clear to everyone, including screen reader users.
3. The component works anywhere, with no layout demands on its parent.
4. Correct in both colour schemes, and respects reduced motion.

## Scope

**Included**: a `ReadMore` component in `ui-core`, with consumer-facing Storybook documentation.

**Not included**: migrating the biography call site. That happens when the app is set up again.

**Independently deliverable**: yes.

## Non-Goals

- **Truncating by character count.** The collapsed size is a visual limit, not an edit of the text.
- **Remembering the expanded state** across navigation.
- **Expand-only behaviour.** Once expanded, the content can always be collapsed again.

## Requirements

### Functional

1. The component accepts any content, not only a single paragraph.
2. The caller sets the collapsed size as a number of lines. A default is provided. The collapsed
   content always ends on a whole line.
3. When the content fits in the collapsed size, it renders in full and no control appears.
4. When the content does not fit, it is collapsed and a control appears to expand it.
5. Activating the control expands the content. Activating it again collapses it.
6. Whether the content fits is checked again when the available width changes or the content
   changes.

### UI/UX

7. While collapsed, the cut-off edge shows that more content follows.
8. The control's label says what it will do. The default labels are "Read more" and "Read less", and
   the caller can replace them.
9. The control sits after the content in the normal flow. It does not depend on the parent's
   positioning.
10. The fade and the control use theme tokens and are correct in both colour schemes.
11. Expanding and collapsing animate the height in every supported browser, as the current
    component does. With a reduced-motion preference the height changes at once and the newly
    revealed text fades in, following the library's motion rule.

### Accessibility

12. The control is a button that reports whether the content is expanded and identifies the content
    it controls.
13. Activating the control does not move focus.
14. Collapsing the content leaves focus on the control.

### Integration

15. The component is exported from `ui-core` and follows the package's existing conventions.
16. It takes the same `className` escape hatch as every other `ui-core` component.
17. It adds no component-level stylesheet.

## Edge Cases & Error Handling

- **Content that only just overflows.** If a few pixels overflow, it still counts as overflowing.
  The control must never appear when expanding would reveal nothing.
- **Content that changes while expanded.** It stays expanded.
- **Content that shrinks until it fits.** The control disappears and the content renders in full.
- **Empty content.** Nothing renders, and no control.
- **Images or other late-loading content.** Overflow is checked again once they change the content's
  size.

## Success Criteria

- SC1: A screen reader user can tell what the control does and whether the content is open.
- SC2: The component renders correctly with no positioning on its parent.
- SC3: The app no longer needs `ReadMore.scss`.

## Acceptance Criteria

- AC1: Given content taller than the collapsed size, when it renders, then it is collapsed and a
  button is shown that reports collapsed.
- AC2: Given content shorter than the collapsed size, when it renders, then the full content is shown
  and there is no button.
- AC3: Given collapsed content, when the button is activated, then the full content is shown, the
  button reports expanded, and focus stays on the button.
- AC4: Given expanded content, when the button is activated, then the content collapses, the button
  reports collapsed, and focus stays on the button.
- AC5: Given the button, when the accessibility tree is inspected, then it identifies the content it
  controls.
- AC6: Given content with several paragraphs, when it renders, then overflow is decided from all of
  the content, not only the first child.
- AC7: Given content that fits at one width, when the container narrows until it no longer fits,
  then the content collapses and the button appears.
- AC8: Given a reduced-motion preference, when the content expands or collapses, then the height
  changes at once with no height animation.
- AC13: Given no motion preference, when the content expands or collapses in Chrome, Firefox and
  Safari, then the height animates in each.
- AC9: Given each colour scheme, including a scheme set by the app rather than the OS, when the
  collapsed fade and the button are inspected, then both match the scheme.
- AC10: Given a parent with no positioning, when the component renders, then the button sits directly
  after the content.
- AC11: Given caller-supplied labels, when the button renders in each state, then it shows those
  labels.
- AC12: Given a collapsed size of N lines, when the content is collapsed, then exactly N whole lines
  are visible and no line is cut through.

## Decisions

- **The control follows the content in the flow.** That removes the dependency on a positioned
  parent.
- **The content is checked again when it or its width changes.** Checking once on mount is how the
  current component goes wrong.
- **No focus movement.** The button stays where the user put focus.
- **No scroll correction on collapse** _(decided 2026-11-18)_. Collapsing long expanded content
  shrinks the page above the button, so the button can end up off-screen while it keeps focus. That
  is accepted: it is not a WCAG failure, and the next Tab scrolls back to the content after the
  button. Revisit if it proves disorienting in use.
- **The cut-off text stays in the accessibility tree** _(decided 2026-11-16)_. The clamp is visual
  only, so a screen reader reads the full content without pressing the button. The current
  component already behaves this way, by accident. This reverses the inventory's note on C05. Hiding
  the text would mean not rendering it, which makes screen reader users press a button to hear text
  they could otherwise read straight through.
- **The collapsed size is a number of lines** _(decided 2026-11-16)_. A height cuts the last line
  wherever it lands. Today's 215px is 8.96 lines at a 24px line height. Lines always stop on a
  whole line and follow the font size. **Fallback:** if planning or implementation shows lines
  can't meet the requirements (for example, content that isn't text), fall back to a maximum
  height, which is what the current component uses. Record why in `plan.md`.

- **The height animates in every browser** _(decided 2026-11-18)_. Clamping by lines can't be
  animated in CSS, because a clamp is on or off. `interpolate-size` would animate it, but only in
  Chromium, and an expand that animates in one browser and snaps in another looks broken. So the
  height is measured and animated the way the current component does it.

## Open Questions

None.

## Design References

- The current component: `apps/the-open-movie-database/src/components/Core/ReadMore/`.
- Its call site: `apps/the-open-movie-database/src/components/Templates/ViewPersonResource/ViewPersonResource.tsx`.
- The disclosure pattern:
  [WAI-ARIA APG, Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).
- Scope decisions: [`component-inventory.md`](../component-inventory.md), C05.

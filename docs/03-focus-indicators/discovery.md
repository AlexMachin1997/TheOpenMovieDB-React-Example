# Discovery: Focus indicators

## Problem Statement

Two complaints, one root cause.

The stated ask was cosmetic: every interactive element in the library focuses to the same
`--ring` colour, with no way for a consumer to vary it, and no way to tune it per component or per
region of a page without editing the library.

Measuring the current ring to answer that turned up something larger. **The focus indicator as
rendered today fails WCAG 2.2 SC 2.4.11 (Focus Appearance, AA) in both themes.** The requirement is
3:1 contrast between the indicator and adjacent colours. Measured against the page background:

| Indicator, as actually rendered                              | Light      | Dark       |
| ------------------------------------------------------------ | ---------- | ---------- |
| `ring-ring/50` (the library default, 10 components)          | **1.56:1** | **1.83:1** |
| `ring-destructive/20` / `/40` (Button's destructive variant) | **1.44:1** | **1.91:1** |
| `border-ring` (1px, full alpha, applied alongside)           | **2.63:1** | 4.17:1     |

The alpha is what kills it. `--ring` at full opacity is 2.63:1 in light and 4.17:1 in dark — the
dark theme would pass on its own — but the utilities apply it at 20–50%, which composites down to
under 2:1 everywhere. The accompanying 1px `border-ring` is the only part carrying real contrast,
and at 1px it is below SC 2.4.11's minimum-area threshold anyway.

So the variation the ask wants and the contrast the spec needs are the same piece of work: both are
decisions about what colour the indicator is, and neither can be settled without the other.

## Context

### Three unrelated focus idioms are in use

Grepping `packages/*/src` for focus utilities (excluding stories and MDX) turns up three distinct
patterns that have never been reconciled:

| Idiom                                                                                   | Where                 | Count                                             |
| --------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `focus-visible:border-ring` + `focus-visible:ring-ring/50` + `focus-visible:ring-[3px]` | `ui-core`, `ui-forms` | 10 components                                     |
| `focus:ring-ring` + `focus:ring-2` + `focus:ring-offset-2` + `ring-offset-background`   | `ui-overlays`         | 2 (`DialogContent.tsx:31`, `SheetContent.tsx:30`) |
| `focus:bg-accent` + `focus:text-accent-foreground` (no ring at all)                     | `ui-overlays`         | 4 (`DropdownMenu.tsx:67,85,110,173`)              |

The third is not a defect — menu items under roving focus conventionally indicate with a background
change rather than a ring, and that pattern is correct. It does mean "one focus indicator for
everything" is the wrong goal; the library has at least two legitimate indicator _shapes_.

The second is the older shadcn idiom, and it uses `focus:` rather than `focus-visible:` — so those
close buttons show a focus ring on mouse click, which the rest of the library deliberately does not.

### One component is entirely off-token

`packages/ui-forms/src/components/Slider/components/SliderThumb.tsx:9`:

```
block w-4 h-4 bg-white border border-gray-300 rounded-full shadow
hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400
```

Raw Tailwind palette colours (`white`, `gray-300`, `blue-100`, `blue-400`), no theme tokens, and
`focus:` again rather than `focus-visible:`. It will not respond to any token change, and it does
not adapt to dark mode at all.

### One suppression is legitimate and must survive

`packages/ui-core/src/components/Search/Search.variants.ts:20` sets `focus-visible:ring-0` on the
inner input deliberately: `Search` is a composite where the _wrapper_ carries the focus treatment,
so an inner ring would double up. Any uniform rollout has to keep supporting "this element opts out
because its container indicates on its behalf."

### The self-tint trap

The obvious reading of "vary the focus colour per variant" is to tint each variant's ring with its
own colour. Measured, that is exactly the wrong move: a `primary`-tinted ring on a `primary`-filled
button is **1.00:1** — literally invisible. Same for destructive on destructive. Any per-variant
colouring has to be checked against the surface the ring actually sits on, which for an inset ring
is the button and for an offset ring is the page.

### Prior art in the repo

`Button` gained a pressed-state treatment in the deliverable immediately before this one
([`02-button-enhancements`](../02-button-enhancements/spec.md)) which deliberately left focus styling
untouched. That work established the pattern this one would extend: a base class carrying the
_shape_ of a state, and per-variant classes carrying the _colour_.

## Constraints

- **Four packages.** `ui-core`, `ui-forms`, `ui-overlays`, `ui-command` all render focusable
  elements. The dependency flow is one-way (`core → ui-core → ui-overlays → ui-forms`), so any
  shared token or utility has to originate at or below `ui-core` — in practice
  `@repo/tailwind-config`, which every package already consumes for `globals.css`.
- **No new React props.** The stated requirement is CSS-variable configurability. A prop would not
  cascade to a subtree, and would need adding to every component individually.
- **Tailwind v4, token-based.** Theme values live in `packages/tailwind-config/src/globals.css`
  under `:root` and `.dark`. Anything new belongs there rather than in a component.
- **`@storybook/addon-a11y` is available but only blocking for Button.** axe can detect some focus
  issues but **cannot** evaluate SC 2.4.11 contrast automatically — indicator contrast has to be
  computed from the tokens rather than scanned for.
- **Pre-existing violations elsewhere are out of scope.** The library has other a11y debt; this
  deliverable is about focus indicators only.

## Assumptions

- The contrast figures above are computed from the OKLCH token values in `globals.css` via the
  standard WCAG relative-luminance formula, compositing alpha in gamma-encoded sRGB as browsers do.
  They describe the tokens, not a rendered screenshot — a component placed on a non-`--background`
  surface (inside a `card`, a `popover`, a `destructive` fill) will differ, which is itself part of
  the problem.
- SC 2.4.11 is treated as the bar because the Button deliverable already committed the library to
  WCAG 2.1 AA and 2.4.11 is the 2.2-level successor for focus specifically. If the project only
  wants 2.1 AA, the contrast requirement is weaker — worth confirming.
- Menu-item-style background indication (`DropdownMenu`) is correct as-is and is not being converted
  to rings.
- Nobody is currently relying on the exact focus appearance in a visual-regression baseline.

## Open Questions (carried into the spec)

1. **Should the indicator colour vary by variant at all**, or vary only by _context_ (a consumer
   setting it for a region)? The measured self-tint result argues that per-variant colouring is
   mostly a trap; the ask may be satisfied by making it configurable without shipping per-variant
   defaults.
2. **Inset ring or offset ring?** An offset ring sits on the page background, where contrast is
   predictable and a single token can be verified once. An inset ring sits on the component, so it
   must be verified against every fill. This is the single decision that most affects how much
   contrast work the rollout needs.
3. **How far does "all interactive elements" reach?** Every focusable element in all four packages,
   or the form controls and buttons that carry a ring today?
4. **Do the two `ui-overlays` close buttons and `SliderThumb` get fixed here**, or are they tracked
   as separate defects? They are off-pattern rather than un-configurable.
5. **Is WCAG 2.2 SC 2.4.11 the target**, per the assumption above?

## Success Criteria

- Focus indication is consistent: one idiom for ring-indicated controls, one for
  background-indicated menu items, and no third.
- The indicator colour is overridable through a CSS custom property, at the element and at any
  ancestor, without touching the library or passing a prop.
- Every shipped default combination meets the agreed contrast bar, demonstrated by computed values
  rather than by eye.
- No component still hardcodes a raw palette colour for focus.
- `focus-visible` throughout, so pointer users do not see rings.

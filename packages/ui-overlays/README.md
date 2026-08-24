# @repo/ui-overlays

Layered surfaces — anything that floats above the page.

> 📖 **Back to [Main README](../../README.md)**

## At a glance

- **6 component folders**, 45 runtime exports, 8 direct dependencies (four of them Radix).
- **Depends on `@repo/ui-core` for exactly one component: `Icon`**, used by Dialog's close button,
  DropdownMenu's chevron and Sheet's close button.
- Single entry point: `import { Dialog } from '@repo/ui-overlays'`.
- Conventions are documented once in
  [`@repo/ui-core`](../ui-core/README.md#conventions); the rules enforcing them live in
  [`@repo/eslint-config`](../eslint-config/README.md).

## What is in here

| Component      | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `Dialog`       | Modal, centred, focus-trapped. A native `<dialog>`          |
| `Sheet`        | The same component pinned to an edge instead of centred     |
| `Popover`      | Non-modal surface anchored to a trigger                     |
| `DropdownMenu` | Menu with items, checkboxes, radios, sub-menus              |
| `HoverCard`    | Preview surface shown on hover                              |
| `Overlay`      | **Internal.** Shared surface and close button, not exported |

## Worth knowing

- **`Dialog` and `Sheet` are one component.** They share the state bridge, the imperative ref, the
  veto, the close button, the scroll lock and the animation mechanism. The only difference is which
  `side` variant they pass: `center` is a Dialog, the four edges are a Sheet. Nothing behavioural
  may live in one and not the other.
- **They are a real `<dialog>` element**, opened with `showModal()`, not a `div` wearing ARIA. The
  element itself is the dim backdrop and the panel is its child, which is what keeps the existing
  fade classes working and makes a backdrop click detectable as "the event landed on the dialog".
- **Anchored surfaces portal into an open modal.** A modal `<dialog>` paints in the top layer and
  makes everything outside it inert, so `Popover`, `DropdownMenu` and `HoverCard` read a context and
  parent themselves to the dialog when there is one. Without it a `Select` or date picker inside a
  Sheet would render behind the backdrop and refuse every click.
- **`Overlay/` is a shared internal, not a component.** It holds `OverlaySurface`,
  `OverlayCloseButton` and the hooks behind them — what `Dialog` and `Sheet` are both built on —
  rather than an `Overlay.tsx`. It is named individually in the folder-structure rule's schema for
  that reason.
- **`SheetRef` has no `I` prefix, deliberately.** It is an imperative handle
  (`open` / `close` / `toggle` / `isOpen`), not a prop type, and the prefix exists to stop a prop
  type colliding with the component it describes. It carries an inline `eslint-disable` saying so.
  `DialogRef` is the same handle under a second name.
- **Both can be driven imperatively** via that ref, as well as with a controlled `open` prop. The
  ref writes through the same path the prop does, so it still works when the overlay is controlled.
- **`Popover`, `DropdownMenu` and `HoverCard` wrap Radix primitives**, so their props extend the
  Radix ones. `Dialog` and `Sheet` no longer do — their props are hand-written, and `DialogPortal`,
  `SheetPortal`, `DialogOverlay` and `SheetOverlay` are deprecated shims kept for source
  compatibility: a native dialog needs no portal and is its own backdrop.

## Dependency direction

`core → ui-core → ui-overlays → ui-command → ui-forms`. One way only; never import a package to your
right.

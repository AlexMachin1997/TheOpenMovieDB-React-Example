# @repo/ui-overlays

Layered surfaces — anything that floats above the page.

> 📖 **Back to [Main README](../../README.md)**

## At a glance

- **6 component folders**, 44 runtime exports, 8 direct dependencies (four of them Radix).
- **Depends on `@repo/ui-core` for exactly one component: `Icon`**, used by Dialog's close button,
  DropdownMenu's chevron and Sheet's close button.
- Single entry point: `import { Dialog } from '@repo/ui-overlays'`.
- Conventions are documented once in
  [`@repo/ui-core`](../ui-core/README.md#conventions); the rules enforcing them live in
  [`@repo/eslint-config`](../eslint-config/README.md).

## What is in here

| Component      | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `Dialog`       | Modal, centred, focus-trapped                               |
| `Sheet`        | Modal panel sliding in from any of the four edges           |
| `Popover`      | Non-modal surface anchored to a trigger                     |
| `DropdownMenu` | Menu with items, checkboxes, radios, sub-menus              |
| `HoverCard`    | Preview surface shown on hover                              |
| `Overlay`      | **Internal.** Shared surface and close button, not exported |

## Worth knowing

- **`Overlay/` is a shared internal, not a component.** It holds `OverlaySurface` and
  `OverlayCloseButton` — what `Dialog` and `Sheet` are both built on — rather than an `Overlay.tsx`.
  It is named individually in the folder-structure rule's schema for that reason.
- **`SheetRef` has no `I` prefix, deliberately.** It is an imperative handle
  (`open` / `close` / `toggle` / `isOpen`), not a prop type, and the prefix exists to stop a prop
  type colliding with the component it describes. It carries an inline `eslint-disable` saying so.
- **`Sheet` can be driven imperatively** via that ref, as well as with a controlled `open` prop.
- All five public components wrap Radix primitives, so their props extend the Radix ones — anything
  the primitive accepts, ours does too.

## Dependency direction

`core → ui-core → ui-overlays → ui-command → ui-forms`. One way only; never import a package to your
right.

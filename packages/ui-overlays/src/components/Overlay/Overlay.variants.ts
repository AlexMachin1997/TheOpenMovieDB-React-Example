import { cva } from 'class-variance-authority';

/**
 * Variants shared by every modal overlay, all of which are a native `<dialog>` element.
 *
 * Dialog and Sheet are the same component wearing different clothes: the same primitive, the same
 * backdrop, the same close affordance, differing only in where the surface sits and how it arrives.
 * Keeping that here is what makes a change to overlay behaviour reach both — these strings
 * previously existed twice and had already drifted apart.
 */

/** The dim itself, with no motion of its own. `overlayDialogVariants` adds the fade. */
export const overlayBackdropVariants = cva('fixed inset-0 z-50 bg-black/50');

/**
 * Position and icon sizing for the floating close affordance. Everything else — the hover and
 * pressed treatment, the focus ring, disabled handling — comes from `Button`, so the overlay's X
 * behaves like every other button in the library rather than like a one-off.
 *
 * The `[&_svg…]` rule pairs with the explicit `size='xl'` on the default icon. See
 * `OverlayCloseButton` for why that is load-bearing rather than decorative.
 */
export const overlayCloseButtonVariants = cva(
	"absolute top-4 right-4 [&_svg:not([class*='size-'])]:size-6"
);

/**
 * The `<dialog>` element itself, which is both the top-layer host and the dim behind the panel.
 *
 * Making the dialog the dim rather than a sibling is what keeps the fade below working: it is an
 * ordinary utility and cannot reach `::backdrop`. It also makes a backdrop click detectable as "the
 * event landed on the dialog element", since the panel is a child.
 *
 * **The fade is a transition, and must never become a keyframe animation.** `tw-animate-css` builds
 * every `animate-in` / `animate-out` on one pair of keyframes that always animate `translate3d(…)`,
 * so a dialog asked only to fade still carries a transform for the length of that fade — and a
 * transformed ancestor is the containing block for `position: fixed` descendants. The panel would
 * resolve against the dialog while the fade ran and against the viewport once it finished, changing
 * containing block partway through its own slide. `starting:` supplies the entry value a transition
 * has no other way to get, since a closed `<dialog>` is `display: none` and so has no previous
 * style to leave.
 *
 * Everything after the dim undoes the user-agent stylesheet, which gives `dialog` a border, `1em`
 * of padding, `margin: auto`, `width: fit-content` and `background: canvas` — and paints
 * `::backdrop` at `rgba(0, 0, 0, 0.1)`, which would darken every overlay and compound on stacked
 * ones. None of these are decorative.
 */
export const overlayDialogVariants = cva(
	`${overlayBackdropVariants()} transition-opacity duration-150 ease-out starting:opacity-0 data-[state=closed]:opacity-0 m-0 h-full max-h-none w-full max-w-none border-0 p-0 text-inherit [&::backdrop]:bg-transparent`
);

/**
 * Layout shared by both overlay footers, which is all of it bar padding and borders.
 *
 * Keyed on the panel's own width through `@container` rather than the viewport's, because a Sheet
 * is narrow on every screen: `w-3/4 sm:max-w-sm` is 384px on a phone and 384px on a desktop. A
 * viewport breakpoint would put its buttons in a row inside a panel with no room for one, which is
 * exactly the bug `sm:flex-row` used to have here.
 *
 * `@md` is 28rem, so a Sheet's 24rem panel stacks and a Dialog's 32rem one does not — including on
 * a phone, where the Dialog is narrower than its own breakpoint and stacks too.
 */
export const overlayFooterVariants = cva(
	'flex flex-col-reverse gap-2 @md:flex-row @md:justify-end'
);

// Every edge-anchored side shares its motion. Held here rather than repeated across the four so a
// change to how a Sheet arrives is made once; the `center` surface animates differently, by design.
//
// `animation-duration-*` rather than `duration-*`, and no bare `transition` utility. Both matter:
// `transition` sets `transition-property` to a list that includes `transform`, and `duration-*` sets
// `transition-duration` — and with `transition-property` left at its initial `all`, dropping only
// the `transition` utility still leaves `transition: all 500ms` armed on the panel.
//
// A transition and a keyframe animation on the same property is what made a Sheet appear to open
// partway, stall, then finish arriving. `animation-duration-*` is tw-animate-css's own utility and
// touches nothing but the animation.
const SHEET_MOTION =
	'gap-4 ease-in-out data-[state=closed]:animation-duration-300 data-[state=open]:animation-duration-500';

/**
 * The overlay surface itself — the only part that genuinely differs between Dialog and Sheet.
 *
 * `center` is Dialog: a panel pinned to the middle of the viewport, arriving by fade and zoom. The
 * four edge values are Sheet, which is therefore literally a variant of the same base rather than a
 * parallel implementation of it.
 *
 * **`fixed`, and it has to stay `fixed`.** Anchoring the panel to its parent `<dialog>` with
 * `absolute` looks equivalent — the dialog is `fixed inset-0` at the size of the viewport, and at
 * rest the two resolve to an identical rectangle — but a `right` or `bottom` panel then arrives
 * with no visible slide at all. The panel must position against the viewport, which in turn is why
 * `overlayDialogVariants` may never let the dialog take a transform: a transformed ancestor would
 * capture a `fixed` child and hand it a different containing block partway through its entrance.
 */
export const overlaySurfaceVariants = cva(
	// `fill-mode-forwards` on the exit: without it the panel finishes sliding or fading out and then
	// snaps back to full opacity for the frame before the dialog closes, because `tw-animate-css`
	// defaults `animation-fill-mode` to `none` and we deliberately hold the element open through its
	// exit rather than unmounting on `animationend` the way Radix did.
	// `@container` so the footer can lay itself out against the panel's width rather than the
	// viewport's. It carries `contain: layout inline-size`, which would make the panel a containing
	// block for any `position: fixed` descendant — nothing inside is fixed today, and the anchored
	// content DD-6 portals into an overlay lands on the `<dialog>`, a sibling of this box, not
	// inside it. No side's width comes from its contents either, so inline-size containment changes
	// no measurement.
	'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards @container fixed z-50 flex flex-col shadow-lg',
	{
		variants: {
			side: {
				center:
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 top-[50%] left-[50%] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border animation-duration-200 sm:max-w-lg max-h-[90vh]',
				top: `${SHEET_MOTION} data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b`,
				right: `${SHEET_MOTION} data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm`,
				bottom: `${SHEET_MOTION} data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t`,
				left: `${SHEET_MOTION} data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm`
			}
		},
		defaultVariants: {
			side: 'center'
		}
	}
);

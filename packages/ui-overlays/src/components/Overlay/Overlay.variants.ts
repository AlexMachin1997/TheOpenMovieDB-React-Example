import { cva } from 'class-variance-authority';

/**
 * Variants shared by every modal overlay, all of which are a native `<dialog>` element.
 *
 * Dialog and Sheet are the same component wearing different clothes: the same primitive, the same
 * backdrop, the same close affordance, differing only in where the surface sits and how it arrives.
 * Keeping that here is what makes a change to overlay behaviour reach both — these strings
 * previously existed twice and had already drifted apart.
 */

/**
 * The dimmed, fading backdrop behind an open overlay.
 *
 * `fill-mode-forwards` on the exit is load-bearing. `tw-animate-css` defaults `animation-fill-mode`
 * to `none`, so a finished exit animation drops the element straight back to its base styles — fully
 * opaque — and it stays that way until the element is actually closed a frame or two later. The
 * result is a fade-out followed by a flash back to full visibility. Radix never showed this because
 * it unmounted on `animationend`; we deliberately hold the element open through its exit, so the end
 * state has to stick.
 */
export const overlayBackdropVariants = cva(
	'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:fill-mode-forwards fixed inset-0 z-50 bg-black/50'
);

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
 * Making the dialog the dim rather than a sibling is what keeps the fade classes above working:
 * they are ordinary utilities and cannot reach `::backdrop`. It also makes a backdrop click
 * detectable as "the event landed on the dialog element", since the panel is a child.
 *
 * Everything after the backdrop classes undoes the user-agent stylesheet, which gives `dialog` a
 * border, `1em` of padding, `margin: auto`, `width: fit-content` and `background: canvas` — and
 * paints `::backdrop` at `rgba(0, 0, 0, 0.1)`, which would darken every overlay and compound on
 * stacked ones. None of these are decorative.
 */
export const overlayDialogVariants = cva(
	`${overlayBackdropVariants()} m-0 h-full max-h-none w-full max-w-none border-0 p-0 text-inherit [&::backdrop]:bg-transparent`
);

// Every edge-anchored side shares its motion. Held here rather than repeated across the four so a
// change to how a Sheet arrives is made once; the `center` surface animates differently, by design.
const SHEET_MOTION =
	'gap-4 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500';

/**
 * The overlay surface itself — the only part that genuinely differs between Dialog and Sheet.
 *
 * `center` is Dialog: a panel pinned to the middle of the viewport, arriving by fade and zoom. The
 * four edge values are Sheet, which is therefore literally a variant of the same base rather than a
 * parallel implementation of it.
 */
export const overlaySurfaceVariants = cva(
	// `fill-mode-forwards` on the exit for the same reason as the backdrop above: without it the
	// panel finishes sliding or fading out and then snaps back to full opacity for the frame before
	// the dialog closes.
	'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards fixed z-50 flex flex-col shadow-lg',
	{
		variants: {
			side: {
				center:
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 top-[50%] left-[50%] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border duration-200 sm:max-w-lg max-h-[90vh]',
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

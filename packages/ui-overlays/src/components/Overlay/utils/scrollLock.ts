/**
 * Stop the page behind a modal from scrolling.
 *
 * A native `<dialog>` opened with `showModal()` makes the page inert but leaves it scrollable, so
 * the library owns this. Radix got it from `react-remove-scroll`; the part that matters is small
 * enough to keep here, and the padding compensation below is the half that hand-rolled locks
 * usually miss.
 *
 * Known gap: `overflow: hidden` on `body` does not reliably stop touch scrolling on iOS Safari.
 * Fixing that means `position: fixed` plus a saved scroll offset, which is worth adding only if it
 * turns out to matter — nothing in the test suite can tell us.
 */

// Module-level, so nested overlays share one lock. The count matters: a Dialog opened over a Sheet
// must not release the page when only the Dialog closes.
let locks = 0;
let restore: (() => void) | null = null;

export const lockScroll = () => {
	locks += 1;
	if (locks > 1) return;

	const { body, documentElement } = document;
	const previousOverflow = body.style.overflow;
	const previousPaddingRight = body.style.paddingRight;

	// The scrollbar is about to disappear. Replace its width with padding or the whole page jumps
	// sideways the instant an overlay opens.
	const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
	const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

	body.style.overflow = 'hidden';
	if (scrollbarWidth > 0) {
		body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
	}

	restore = () => {
		body.style.overflow = previousOverflow;
		body.style.paddingRight = previousPaddingRight;
	};
};

export const unlockScroll = () => {
	locks = Math.max(0, locks - 1);
	if (locks > 0) return;

	restore?.();
	restore = null;
};

const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]';

/**
 * Put focus where a caller would expect it when a modal opens.
 *
 * `showModal()` focuses the first *focusable* descendant, which includes anything carrying
 * `tabindex="-1"`. Radix focused the first *tabbable* one, and that difference is not academic: a
 * command palette wraps its input in a `tabindex="-1"` container, so native focus lands on the
 * wrapper and the caret never reaches the search box. Keyboard selection then does nothing at all.
 *
 * An explicit `autofocus` still wins, and a panel with nothing tabbable in it falls back to the
 * dialog element, which is what the browser would have done.
 */
export const focusInitialElement = (dialog: HTMLDialogElement, panel: HTMLElement | null) => {
	const scope = panel ?? dialog;

	const requested = scope.querySelector<HTMLElement>('[autofocus]');

	const firstTabbable = [...scope.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].find(
		(element) =>
			element.tabIndex >= 0 &&
			!element.hasAttribute('disabled') &&
			// Cheaper and more reliable than `offsetParent`, which is null for anything positioned
			// `fixed` — which the panel itself is.
			element.getClientRects().length > 0
	);

	// `preventScroll` matters: at this point the panel is mid-entry-animation and may be translated
	// off-screen, and the browser's default scroll-into-view fights the animation — the overlay
	// appears to start, stall, then finish arriving.
	(requested ?? firstTabbable ?? dialog).focus({ preventScroll: true });
};

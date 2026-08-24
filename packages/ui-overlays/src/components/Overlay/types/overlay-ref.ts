/**
 * @description Imperative handle for driving an overlay from outside its own tree.
 * @see Dialog
 * @see Sheet
 */
// The `I` prefix exists so a component's props can be named after the component without colliding
// with its export. This is an imperative handle rather than a prop interface, so the convention it
// encodes does not apply here.
// eslint-disable-next-line @typescript-eslint/naming-convention -- see above
interface OverlayRef {
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: boolean;
}

/** Why every close was requested, so a caller can veto some routes and not others. */
type OverlayCloseSource = 'escape' | 'close-button' | 'backdrop' | 'close-part';

/**
 * Passed to `onRequestClose`. Calling `preventDefault()` refuses the close, and the overlay stays
 * genuinely open — the element is never closed, not closed-then-reopened.
 */
interface IOverlayCloseEvent {
	/** Which route out the user took. */
	source: OverlayCloseSource;

	/** The DOM event behind it, where there was one. Absent for a programmatic close. */
	nativeEvent?: Event;

	/** Whether `preventDefault()` has been called. */
	defaultPrevented: boolean;

	/** Refuse the close. */
	preventDefault: () => void;
}

export type { OverlayRef, OverlayCloseSource, IOverlayCloseEvent };

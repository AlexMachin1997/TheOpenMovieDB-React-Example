import * as React from 'react';

interface IUseControllableOpen {
	/** Controlled open state. Supplying this makes the overlay controlled. */
	open?: boolean;

	/** Initial state when uncontrolled. */
	defaultOpen?: boolean;

	/** Called on every open and close, controlled or not. */
	onOpenChange?: (open: boolean) => void;
}

/**
 * One open state for every overlay, controlled or uncontrolled.
 *
 * Moved here from `Sheet` so `Dialog` gets the same behaviour rather than a second implementation of
 * it. The two comments below record bugs this shape already fixed once; both are easy to reintroduce.
 */
export const useControllableOpen = ({
	open: openProp,
	defaultOpen = false,
	onOpenChange: onOpenChangeProp
}: IUseControllableOpen) => {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : internalOpen;

	// Uncontrolled has to do both: move the internal state the render actually reads, *and* notify
	// the caller. Branching to one or the other drops whichever the caller did not expect — an
	// uncontrolled Sheet with an `onOpenChange` prop once never opened at all for this reason.
	const setOpen = React.useCallback(
		(next: boolean) => {
			if (!isControlled) {
				setInternalOpen(next);
			}

			onOpenChangeProp?.(next);
		},
		[isControlled, onOpenChangeProp]
	);

	return { open, setOpen, isControlled };
};

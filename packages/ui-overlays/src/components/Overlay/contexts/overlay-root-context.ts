import * as React from 'react';

interface IOverlayRootContext {
	/** Whether the overlay is open. Drives `aria-expanded` on the trigger. */
	open: boolean;

	/** The single write path into open state. */
	setOpen: (open: boolean) => void;

	/** `'dialog'` or `'sheet'`, used to build `data-slot` names. */
	slot: string;
}

/**
 * Internal. What a trigger needs, provided by `Dialog` and `Sheet` themselves.
 *
 * Separate from the content context because the two have different lifetimes: this one exists
 * whenever the root is rendered, the content one only while the overlay is mounted.
 */
export const OverlayRootContext = React.createContext<IOverlayRootContext | null>(null);

export type { IOverlayRootContext };

import * as React from 'react';

import type { OverlayCloseSource } from '~/components/Overlay/types/overlay-ref';

interface IOverlayContentContext {
	/** `'dialog'` or `'sheet'`, used to build `data-slot` names. */
	slot: string;

	/** The single close path. Every route out goes through it, so one veto covers all of them. */
	requestClose: (source: OverlayCloseSource, nativeEvent?: Event) => void;

	/** Called by a title to lend the overlay its id. Returns the matching unregister. */
	registerTitle: (id: string) => () => void;

	/** Called by a description to lend the overlay its id. Returns the matching unregister. */
	registerDescription: (id: string) => () => void;
}

/**
 * Internal. What the parts rendered *inside* an overlay need.
 *
 * Registration is why this exists rather than the overlay reading the DOM. Owning the primitive
 * means "did anything name this?" is a question the component can answer from state, instead of
 * Radix's `document.getElementById` guess.
 */
export const OverlayContentContext = React.createContext<IOverlayContentContext | null>(null);

export type { IOverlayContentContext };

import * as React from 'react';

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * React warns about `useLayoutEffect` during server rendering, where it cannot run at all. Anything
 * that has to read or write the DOM before paint needs this rather than the bare hook — the
 * overlays call `showModal()` in the same commit that applies `data-state='open'`, and the command
 * list measures its scroll container.
 */
export const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

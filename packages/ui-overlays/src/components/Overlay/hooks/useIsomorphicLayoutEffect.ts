import * as React from 'react';

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * The overlays need layout effects: `showModal()` has to run in the same commit that applied
 * `data-state='open'`, or the entry animation starts a frame late. React warns about
 * `useLayoutEffect` during SSR, where it cannot run at all, so this swaps it out there.
 */
export const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

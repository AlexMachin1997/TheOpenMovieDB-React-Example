import * as React from 'react';

/**
 * `useLayoutEffect` on the client, `useEffect` on the server, where the former warns.
 */
export const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

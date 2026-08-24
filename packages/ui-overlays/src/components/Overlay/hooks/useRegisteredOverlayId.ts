import * as React from 'react';

import { useIsomorphicLayoutEffect } from '@repo/ui-core';
import { useOverlayContentContext } from '~/components/Overlay/hooks/useOverlayContentContext';

/**
 * Give a title or description an id and lend it to the overlay around it.
 *
 * A caller-supplied id wins and `useId` is the fallback, matching `Field`. Registering rather than
 * letting the surface search the DOM is what makes the link work for markup the surface never sees.
 */
export const useRegisteredOverlayId = (
	id: string | undefined,
	part: 'title' | 'description'
): string => {
	const fallbackId = React.useId();
	const resolvedId = id ?? fallbackId;

	const content = useOverlayContentContext();
	const register = part === 'title' ? content?.registerTitle : content?.registerDescription;

	useIsomorphicLayoutEffect(() => register?.(resolvedId), [register, resolvedId]);

	return resolvedId;
};

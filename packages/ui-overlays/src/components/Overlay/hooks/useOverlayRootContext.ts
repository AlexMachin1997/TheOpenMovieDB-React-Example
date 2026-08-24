import { use } from 'react';
import { OverlayRootContext } from '~/components/Overlay/contexts/overlay-root-context';

/** Read the open state a trigger or surface needs. Throws outside a `Dialog` or `Sheet` root. */
export const useOverlayRootContext = () => {
	const context = use(OverlayRootContext);

	if (!context) {
		throw new Error(
			'[ui-overlays] An overlay part was rendered outside its root. Wrap it in a `Dialog` or `Sheet`.'
		);
	}

	return context;
};

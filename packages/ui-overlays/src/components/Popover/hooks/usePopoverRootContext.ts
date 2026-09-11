import { use } from 'react';
import { PopoverRootContext } from '~/components/Popover/contexts/popover-root-context';

/** Read what a popover's trigger and content share. Throws outside a `Popover` root. */
export const usePopoverRootContext = () => {
	const context = use(PopoverRootContext);

	if (!context) {
		throw new Error(
			'[ui-overlays] A popover part was rendered outside its root. Wrap it in a `Popover`.'
		);
	}

	return context;
};

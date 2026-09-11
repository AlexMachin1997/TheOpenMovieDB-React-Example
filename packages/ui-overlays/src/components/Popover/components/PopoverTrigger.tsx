import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { IPopoverTrigger } from '~/components/Popover/Popover.types';

export const PopoverTrigger = ({ ...props }: IPopoverTrigger) => {
	// Radix defaults `aria-haspopup` to "dialog", and no popover is one. The key has to be present to
	// override that default; a caller's own value, or an `asChild` child's, still wins.
	return (
		<PopoverPrimitive.Trigger data-slot='popover-trigger' aria-haspopup={undefined} {...props} />
	);
};

import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { IPopoverTrigger } from '~/components/Popover/Popover.types';

export const PopoverTrigger = ({ ...props }: IPopoverTrigger) => {
	return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
};

import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { IPopover } from '~/components/Popover/Popover.types';

export const PopoverProvider = ({ ...props }: IPopover) => {
	return <PopoverPrimitive.Root data-slot='popover' {...props} />;
};

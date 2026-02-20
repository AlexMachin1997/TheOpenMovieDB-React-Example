import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@repo/tailwind-config';

import type { IPopoverAnchor } from '~/components/Popover/Popover.types';

export const PopoverAnchor = ({ className, ...props }: IPopoverAnchor) => {
	return <PopoverPrimitive.Anchor className={cn(className)} {...props} />;
};

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

type IPopoverTrigger = React.ComponentProps<typeof PopoverPrimitive.Trigger>;

export const PopoverTrigger = ({ ...props }: IPopoverTrigger) => {
	return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
};

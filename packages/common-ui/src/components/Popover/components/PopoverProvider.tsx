import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

type IPopoverProvider = React.ComponentProps<typeof PopoverPrimitive.Root>;

export const PopoverProvider = ({ ...props }: IPopoverProvider) => {
	return <PopoverPrimitive.Root data-slot='popover' {...props} />;
};

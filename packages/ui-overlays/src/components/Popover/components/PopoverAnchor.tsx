import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@repo/ui-core';

interface IPopoverAnchor extends React.ComponentProps<typeof PopoverPrimitive.Anchor> {
	className?: string;
}

export const PopoverAnchor = ({ className, ...props }: IPopoverAnchor) => {
	return <PopoverPrimitive.Anchor className={cn(className)} {...props} />;
};

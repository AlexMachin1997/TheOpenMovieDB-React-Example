import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/** Properties for the Popover root component. */
export interface IPopover extends React.ComponentProps<typeof PopoverPrimitive.Root> {}

/** Properties for PopoverTrigger. */
export interface IPopoverTrigger extends React.ComponentProps<typeof PopoverPrimitive.Trigger> {}

/** Properties for PopoverContent. */
export interface IPopoverContent extends React.ComponentProps<typeof PopoverPrimitive.Content> {
	className?: string;
}

/** Properties for PopoverAnchor. */
export interface IPopoverAnchor extends React.ComponentProps<typeof PopoverPrimitive.Anchor> {}

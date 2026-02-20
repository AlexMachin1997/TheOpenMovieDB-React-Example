import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

/** Properties for the TooltipProvider component. */
export interface ITooltipProvider extends React.ComponentProps<typeof TooltipPrimitive.Provider> {}

/** Properties for the Tooltip root component. */
export interface ITooltip extends React.ComponentProps<typeof TooltipPrimitive.Root> {}

/** Properties for the TooltipTrigger sub-component. */
export interface ITooltipTrigger extends React.ComponentProps<typeof TooltipPrimitive.Trigger> {}

/**
 * Properties for the TooltipContent sub-component.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Helpful information</TooltipContent>
 * </Tooltip>
 * ```
 */
export interface ITooltipContent extends React.ComponentProps<typeof TooltipPrimitive.Content> {
	/** Custom class name for the tooltip arrow. */
	arrowClassName?: string;
}

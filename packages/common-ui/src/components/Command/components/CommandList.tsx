import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

/**
 * Props for the CommandList component
 *
 * @interface ICommandList
 * @extends React.ComponentProps<typeof CommandPrimitive.List>
 */
export interface ICommandList extends React.ComponentProps<typeof CommandPrimitive.List> {
	/** Additional CSS classes to apply to the command list */
	className?: string;
}

/**
 * Scrollable list container for command items
 *
 * This component provides a scrollable container for command items with
 * consistent styling and behavior. It extends the cmdk Command.List primitive
 * with additional styling for proper overflow handling and scrolling.
 *
 * Features:
 * - Scrollable container with fixed maximum height
 * - Proper overflow handling for both axes
 * - Consistent styling with command palette design
 * - Integration with cmdk for accessibility and keyboard navigation
 * - Customizable styling through className prop
 *
 * The component automatically:
 * - Sets a maximum height of 300px to prevent excessive growth
 * - Enables vertical scrolling when content exceeds the height
 * - Hides horizontal overflow to maintain layout
 * - Provides smooth scrolling with proper scroll padding
 * - Maintains accessibility features from cmdk
 *
 * Styling includes:
 * - Fixed maximum height for consistent UI
 * - Proper scroll behavior and padding
 * - Overflow handling for both directions
 * - Integration with design system colors and spacing
 *
 * @component
 * @param props - The command list configuration props
 * @returns The rendered command list container component
 */
export const CommandList = ({ className, ...props }: ICommandList) => {
	return (
		<CommandPrimitive.List
			data-slot='command-list'
			className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
			{...props}
		/>
	);
};

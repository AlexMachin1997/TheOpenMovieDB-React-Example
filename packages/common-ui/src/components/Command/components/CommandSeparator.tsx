import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

/**
 * Props for the CommandSeparator component
 *
 * @interface ICommandSeparator
 * @extends React.ComponentProps<typeof CommandPrimitive.Separator>
 */
export interface ICommandSeparator extends React.ComponentProps<typeof CommandPrimitive.Separator> {
	/** Additional CSS classes to apply to the command separator */
	className?: string;
}

/**
 * Visual separator component for command lists
 *
 * This component provides a horizontal line separator to visually divide
 * sections within command lists. It extends the cmdk Command.Separator
 * primitive with consistent styling that matches the design system.
 *
 * Features:
 * - Horizontal line separator with consistent styling
 * - Proper spacing and positioning within command lists
 * - Integration with cmdk for accessibility
 * - Customizable styling through className prop
 * - Responsive design that adapts to container width
 *
 * The component automatically:
 * - Uses border color for consistent theming
 * - Extends slightly beyond container bounds for visual impact
 * - Maintains proper height and positioning
 * - Integrates with command palette styling
 * - Provides accessibility features from cmdk
 *
 * Styling characteristics:
 * - 1px height for subtle visual separation
 * - Border color for consistent theming
 * - Negative margins for extended visual impact
 * - Responsive to container width changes
 *
 * Common use cases:
 * - Separating different command categories
 * - Dividing search results from recent items
 * - Creating visual hierarchy in command lists
 * - Separating grouped items from ungrouped items
 *
 * @component
 * @param props - The command separator configuration props
 * @returns The rendered command separator component
 */
export const CommandSeparator = ({ className, ...props }: ICommandSeparator) => {
	return (
		<CommandPrimitive.Separator
			data-slot='command-separator'
			className={cn('bg-border -mx-1 h-px', className)}
			{...props}
		/>
	);
};

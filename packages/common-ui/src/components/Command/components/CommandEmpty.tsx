import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

/**
 * Props for the CommandEmpty component
 *
 * @interface ICommandEmpty
 * @extends React.ComponentProps<typeof CommandPrimitive.Empty>
 */
interface ICommandEmpty extends React.ComponentProps<typeof CommandPrimitive.Empty> {
	/** Additional CSS classes to apply to the empty state */
	className?: string;
}

/**
 * Empty state component for command lists
 *
 * This component displays when there are no items to show in a command list,
 * typically when search results are empty or no options are available.
 * It extends the cmdk Command.Empty primitive with consistent styling.
 *
 * Features:
 * - Centered layout with proper spacing
 * - Consistent typography and colors
 * - Integration with cmdk for proper state management
 * - Customizable styling through className prop
 * - Proper accessibility support
 *
 * The component automatically:
 * - Centers content both horizontally and vertically
 * - Provides adequate padding for visual balance
 * - Uses consistent text sizing and colors
 * - Integrates with command palette styling
 * - Maintains accessibility features from cmdk
 *
 * Common use cases:
 * - No search results found
 * - No options available for selection
 * - Loading state placeholder
 * - Error state display
 *
 * @component
 * @param props - The command empty state configuration props
 * @returns The rendered command empty state component
 */
export const CommandEmpty = ({ className, ...props }: ICommandEmpty) => {
	return (
		<CommandPrimitive.Empty
			data-slot='command-empty'
			className={cn('py-6 text-center text-sm', className)}
			{...props}
		/>
	);
};

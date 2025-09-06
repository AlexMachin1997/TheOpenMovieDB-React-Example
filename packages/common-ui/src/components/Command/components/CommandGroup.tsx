import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';

/**
 * Props for the CommandGroup component
 *
 * @interface ICommandGroup
 * @extends React.ComponentProps<typeof CommandPrimitive.Group>
 */
export interface ICommandGroup extends React.ComponentProps<typeof CommandPrimitive.Group> {
	/** Additional CSS classes to apply to the command group */
	className?: string;
	/** Heading text for the group */
	heading?: string;
}

/**
 * Grouping container for command items
 *
 * This component provides a way to organize command items into logical groups
 * with optional headings. It extends the cmdk Command.Group primitive with
 * consistent styling for group headings and item organization.
 *
 * Features:
 * - Logical grouping of related command items
 * - Optional group headings with consistent styling
 * - Proper spacing and typography for group structure
 * - Integration with cmdk for accessibility and navigation
 * - Customizable styling through className prop
 *
 * The component automatically:
 * - Provides proper padding and spacing for group content
 * - Styles group headings with muted colors and smaller text
 * - Handles overflow within groups appropriately
 * - Maintains accessibility features from cmdk
 * - Integrates with command palette design system
 *
 * Group heading styling:
 * - Muted text color for visual hierarchy
 * - Smaller font size (text-xs) for subtlety
 * - Medium font weight for readability
 * - Proper padding for visual separation
 *
 * Common use cases:
 * - Organizing commands by category (File, Edit, View)
 * - Grouping search results by type
 * - Separating different types of options
 * - Creating visual hierarchy in command lists
 *
 * @component
 * @param props - The command group configuration props
 * @returns The rendered command group container component
 */
export const CommandGroup = ({ className, ...props }: ICommandGroup) => {
	return (
		<CommandPrimitive.Group
			data-slot='command-group'
			className={cn(
				'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
				className
			)}
			{...props}
		/>
	);
};

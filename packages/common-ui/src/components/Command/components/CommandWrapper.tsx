import * as React from 'react';
import { Command } from '~/components/Command/components/Command';
import { CommandSearch } from '~/components/Command/components/CommandSearch';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandEmpty } from '~/components/Command/components/CommandEmpty';
import { ICommandSearchProps, IEmptyStateConfig } from '~/components/Command/types';

/**
 * Props for the CommandWrapper component
 *
 * @interface ICommandWrapper
 * @extends React.ComponentPropsWithoutRef<typeof Command>
 */
interface ICommandWrapper extends React.ComponentPropsWithoutRef<typeof Command> {
	/** Child components to render within the command wrapper */
	children?: React.ReactNode;
	/** Empty state configuration */
	emptyState?: IEmptyStateConfig;
	/** Search configuration */
	searchConfig?: ICommandSearchProps;
}

/**
 * Centralized wrapper component for command functionality
 *
 * This component provides a unified interface for wrapping Command components
 * with search and empty state functionality. It can be used by both Selects
 * and Command packages to avoid code duplication.
 *
 * Features:
 * - Configurable search functionality (enabled/disabled)
 * - Automatic empty state handling with customizable messages
 * - Optional wrapper component (e.g., PopoverContent for selects)
 * - Integration with Command components for consistent behavior
 * - Proper accessibility and keyboard navigation
 * - Consistent styling with the design system
 *
 * The component automatically:
 * - Provides search input when enabled
 * - Shows empty state when no items are available
 * - Maintains proper focus management and keyboard navigation
 * - Uses empty state configuration from CommandProvider context
 * - Applies wrapper component when provided
 *
 * Search functionality:
 * - Configurable via searchConfig prop
 * - Uses CommandInput for consistent styling and behavior
 * - Integrates with command context for filtering
 * - Provides customizable placeholder and empty messages
 *
 * Empty state handling:
 * - Automatically detects when no options are available
 * - Uses CommandProvider context for empty state configuration
 * - Supports custom empty state configuration
 * - Provides intelligent message selection based on search state
 *
 * Wrapper support:
 * - Optional wrapper component (e.g., PopoverContent)
 * - Customizable wrapper className
 * - Maintains proper component hierarchy
 *
 * @component
 * @param props - The command wrapper configuration props
 * @returns The rendered command wrapper component
 */
export const CommandWrapper = ({
	searchConfig,
	children,
	emptyState,
	...props
}: ICommandWrapper) => {
	return (
		<Command {...props}>
			<CommandSearch {...searchConfig} />
			<CommandList>{children}</CommandList>
			<CommandEmpty {...emptyState} />
		</Command>
	);
};

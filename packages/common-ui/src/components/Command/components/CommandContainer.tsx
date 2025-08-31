import * as React from 'react';
import { CommandWrapper } from '~/components/Command/components/CommandWrapper';
import { ICommandSearchProps, IEmptyStateConfig } from '~/components/Command/types';

/**
 * Props for the CommandContainer component
 *
 * @interface ICommandContainer
 * @extends React.ComponentPropsWithoutRef<typeof CommandWrapper>
 */
interface ICommandContainer extends React.ComponentPropsWithoutRef<typeof CommandWrapper> {
	/** Search configuration */
	searchConfig?: ICommandSearchProps;
	/** Child components to render within the command container */
	children?: React.ReactNode;
	/** Empty state configuration */
	emptyState?: IEmptyStateConfig;
}

/**
 * Container component for command functionality
 *
 * This component provides the main container for command functionality,
 * combining Command components to create a searchable and accessible
 * command interface.
 *
 * Features:
 * - Always enabled search functionality with customizable placeholder
 * - Automatic empty state handling with customizable messages
 * - Integration with Command components for consistent behavior
 * - Proper accessibility and keyboard navigation
 * - Consistent styling with the design system
 *
 * The component automatically:
 * - Provides search input (always enabled for command usage)
 * - Shows empty state when no items are available
 * - Maintains proper focus management and keyboard navigation
 * - Uses empty state configuration from CommandProvider context
 *
 * Search functionality:
 * - Always enabled for command usage
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
 * @component
 * @param props - The command container configuration props
 * @returns The rendered command container component
 */
export const CommandContainer = ({
	searchConfig,
	children,
	emptyState,
	...props
}: ICommandContainer) => {
	return (
		<CommandWrapper searchConfig={searchConfig} emptyState={emptyState} {...props}>
			{children}
		</CommandWrapper>
	);
};

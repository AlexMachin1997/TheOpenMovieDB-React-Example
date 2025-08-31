import { CommandInterface } from '~/components/Command/components/CommandInterface';
import { PopoverContent } from '~/components/Popover/Popover';
import { ICommandSearchProps, IEmptyStateConfig } from '~/components/Command/types';

/**
 * Props for the SelectInterface component
 *
 * @interface ISelectInterface
 * @extends React.ComponentPropsWithoutRef<typeof CommandInterface>
 */
interface ISelectInterface extends React.ComponentPropsWithoutRef<typeof CommandInterface> {
	/** Child components to render within the select interface */
	children: React.ReactNode;
	/** Empty state configuration */
	emptyState?: IEmptyStateConfig;
	/** Search configuration */
	searchConfig?: ICommandSearchProps;
}

/**
 * Complete select interface component for select dropdown functionality
 *
 * This component provides the main container for select dropdown functionality,
 * combining PopoverContent with Command components to create a searchable
 * and accessible select interface.
 *
 * Features:
 * - Popover positioning with automatic width matching
 * - Optional search functionality with customizable placeholder
 * - Automatic empty state handling with customizable messages
 * - Integration with Command components for consistent behavior
 * - Proper accessibility and keyboard navigation
 * - Consistent styling with the design system
 *
 * The component automatically:
 * - Sets the popover width to match the trigger width
 * - Disables command filtering (handled by select context)
 * - Provides search input when search configuration is provided
 * - Shows empty state when no items are available
 * - Maintains proper focus management and keyboard navigation
 * - Uses empty state configuration from CommandProvider context
 *
 * Search functionality:
 * - Only enabled when search configuration is provided
 * - Uses CommandInput for consistent styling and behavior
 * - Integrates with select context for filtering
 * - Provides customizable placeholder and empty messages
 *
 * Empty state handling:
 * - Automatically detects when no options are available
 * - Uses CommandProvider context for empty state configuration
 * - Supports legacy emptyMessage prop for backward compatibility
 * - Provides intelligent message selection based on search state
 *
 * @component
 * @param props - The select interface configuration props
 * @returns The rendered select interface container component
 */
export const SelectInterface = ({
	searchConfig,
	children,
	emptyState,
	...props
}: ISelectInterface) => {
	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<CommandInterface searchConfig={searchConfig} emptyState={emptyState} {...props}>
				{children}
			</CommandInterface>
		</PopoverContent>
	);
};

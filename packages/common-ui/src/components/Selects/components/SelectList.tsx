import { CommandWrapper } from '~/components/Command/components/CommandWrapper';
import { PopoverContent } from '~/components/Popover/Popover';
import { ICommandSearchProps, IEmptyStateConfig } from '~/components/Command/types';

/**
 * Props for the SelectList component
 *
 * @interface ISelectList
 * @extends React.ComponentPropsWithoutRef<typeof CommandWrapper>
 */
interface ISelectList extends React.ComponentPropsWithoutRef<typeof CommandWrapper> {
	/** Child components to render within the select list */
	children: React.ReactNode;
	/** Empty state configuration */
	emptyState?: IEmptyStateConfig;
	/** Search configuration */
	searchConfig?: ICommandSearchProps;
}

/**
 * Container component for select dropdown content
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
 * @param props - The select list configuration props
 * @returns The rendered select list container component
 */
export const SelectList = ({ searchConfig, children, emptyState, ...props }: ISelectList) => {
	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<CommandWrapper searchConfig={searchConfig} emptyState={emptyState} {...props}>
				{children}
			</CommandWrapper>
		</PopoverContent>
	);
};

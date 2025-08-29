import { Command, CommandList, CommandInput, CommandEmpty } from '~/components/Command/Command';
import { PopoverContent } from '~/components/Popover/Popover';

/**
 * Props for the SelectList component
 *
 * @interface ISelectList
 * @extends React.ComponentPropsWithoutRef<typeof Command>
 */
interface ISelectList extends React.ComponentPropsWithoutRef<typeof Command> {
	/** Configuration for search functionality within the select list */
	search?: {
		/** Placeholder text for the search input */
		placeholder?: string;
		/** Message to display when no items match the search */
		emptyMessage?: string;
	};
	/** Child components to render within the select list */
	children: React.ReactNode;
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
 * - Empty state handling with customizable messages
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
 *
 * Search functionality:
 * - Only enabled when search configuration is provided
 * - Uses CommandInput for consistent styling and behavior
 * - Integrates with select context for filtering
 * - Provides customizable placeholder and empty messages
 *
 * @component
 * @param props - The select list configuration props
 * @returns The rendered select list container component
 */
export const SelectList = ({ search, children, ...props }: ISelectList) => {
	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<Command {...props} shouldFilter={false}>
				{typeof search !== 'undefined' && <CommandInput placeholder={search.placeholder} />}
				<CommandList>
					<CommandEmpty>{search?.emptyMessage ?? 'No items found'}</CommandEmpty>
					{children}
				</CommandList>
			</Command>
		</PopoverContent>
	);
};

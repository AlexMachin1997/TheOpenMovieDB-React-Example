import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '~/utils/className';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

/**
 * Props for the CommandEmpty component
 *
 * @interface ICommandEmpty
 * @extends React.ComponentProps<typeof CommandPrimitive.Empty>
 */
export interface ICommandEmpty extends React.ComponentProps<typeof CommandPrimitive.Empty> {
	/** Additional CSS classes to apply to the empty state */
	className?: string;
	/** Custom message to show when no search is provided and no options are available (overrides context) */
	noOptionsMessage?: string;
	/** Custom message to show when there's a search term but no matching options (overrides context) */
	noSearchResultsMessage?: string;
	/** Function to customize the search term display in the no search results message (overrides context) */
	formatSearchTerm?: (searchTerm: string) => string;
}

/**
 * Empty state component for command lists
 *
 * This component displays when there are no items to show in a command list,
 * typically when search results are empty or no options are available.
 * It extends the cmdk Command.Empty primitive with consistent styling and
 * intelligent message handling based on search state.
 *
 * Features:
 * - Centered layout with proper spacing
 * - Consistent typography and colors
 * - Integration with cmdk for proper state management
 * - Customizable styling through className prop
 * - Proper accessibility support
 * - Intelligent message selection based on search state
 * - Customizable messages for different empty states
 * - Search term highlighting in no results message
 * - Configuration from CommandProvider context with prop overrides
 *
 * The component automatically:
 * - Centers content both horizontally and vertically
 * - Provides adequate padding for visual balance
 * - Uses consistent text sizing and colors
 * - Integrates with command palette styling
 * - Maintains accessibility features from cmdk
 * - Detects whether there's an active search term
 * - Shows appropriate message based on context
 * - Highlights search terms in no results messages
 * - Uses empty state configuration from CommandProvider context
 * - Allows prop overrides for component-specific customization
 *
 * Message behavior:
 * - When no search term: Shows "No options currently available" (or custom message)
 * - When search term exists: Shows "No options for '{search term}'" (or custom message)
 * - Search terms are automatically highlighted and formatted
 * - Messages are fully customizable through context or props
 * - Props override context configuration for component-specific customization
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
export const CommandEmpty = ({
	className,
	noOptionsMessage = 'No options currently available',
	noSearchResultsMessage = 'No options for {searchTerm}',
	formatSearchTerm,
	children,
	...props
}: ICommandEmpty) => {
	const { searchValue, filteredOptions } = useCommandContext();

	// Determine the appropriate message based on search state
	const emptyMessage = React.useMemo(() => {
		if (searchValue.trim().length > 0) {
			const finalFormatSearchTerm = formatSearchTerm || ((term) => `"${term}"`);
			const formattedSearchTerm = finalFormatSearchTerm(searchValue.trim());
			return noSearchResultsMessage.replace('{searchTerm}', formattedSearchTerm);
		}

		return noOptionsMessage;
	}, [searchValue, noOptionsMessage, noSearchResultsMessage, formatSearchTerm]);

	if (filteredOptions.length > 0) return null;

	return (
		<CommandPrimitive.Empty
			data-slot='command-empty'
			className={cn('py-6 text-center text-sm', className)}
			{...props}
		>
			{emptyMessage}
		</CommandPrimitive.Empty>
	);
};

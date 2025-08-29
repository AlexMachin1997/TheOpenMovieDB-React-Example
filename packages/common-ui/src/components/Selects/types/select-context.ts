import { Option } from '~/types/Option';

/**
 * Context value interface for select functionality
 *
 * This interface defines the shape of the context value provided by SelectProvider.
 * It includes all the state and functions needed for select operations including
 * single and multi-select modes.
 *
 * Note: This context extends CommandContext functionality with select-specific features.
 * Generic filtering logic (optionsMap, filteredOptions, searchValue, onSearchChange)
 * is now provided by the CommandContext.
 *
 * @interface SelectContext
 */
export type SelectContext = {
	/** Set of currently selected values */
	selectedValues: Set<string>;
	/** Function to toggle a value's selection state */
	toggleValue: (value: string) => void;
	/** Map of option values to their display labels for efficient lookups (from CommandContext) */
	optionsMap: Map<string, string>;
	/** Current search value for filtering options (from CommandContext) */
	searchValue: string;
	/** Function to update the search value (from CommandContext) */
	onSearchChange: (value: string) => void;
	/** Array of options filtered by the current search value (from CommandContext) */
	filteredOptions: Option[];
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
};

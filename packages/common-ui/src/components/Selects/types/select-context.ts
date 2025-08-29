import { Option } from '~/types/Option';

/**
 * Context value interface for select functionality
 *
 * This interface defines the shape of the context value provided by SelectProvider.
 * It includes all the state and functions needed for select operations including
 * single and multi-select modes.
 *
 * @interface SelectContext
 */
export type SelectContext = {
	/** Set of currently selected values */
	selectedValues: Set<string>;
	/** Function to toggle a value's selection state */
	toggleValue: (value: string) => void;
	/** Map of option values to their display labels for efficient lookups */
	optionsMap: Map<string, string>;
	/** Current search value for filtering options */
	searchValue: string;
	/** Function to update the search value */
	onSearchChange: (value: string) => void;
	/** Array of options filtered by the current search value */
	filteredOptions: Option[];
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
};

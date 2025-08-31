import { Option } from '~/types/Option';

/**
 * Base context value interface for command-like functionality
 *
 * This interface defines the core shape of context values for components
 * that provide search, filtering, and selection capabilities. It includes
 * all the fundamental state and functions needed for command palette
 * and select operations.
 *
 * @interface IBaseCommandContext
 */
export interface IBaseCommandContext {
	/** Whether the command interface is currently open */
	open: boolean;
	/** Current search value for filtering items */
	searchValue: string;
	/** Whether to automatically close when an item is selected */
	closeOnSelect?: boolean;
	/** Function to close the command interface */
	close: () => void;
	/** Function to open the command interface */
	openMenu: () => void;
	/** Function to toggle the open/close state */
	toggle: () => void;
	/** Function to set the open state */
	setOpen: (open: boolean) => void;
	/** Function to handle search value changes */
	onSearchChange?: (value: string) => void;
	/** Generic options for filtering */
	options: Option[];
	/** Map of option values to their display labels for efficient lookups */
	optionsMap: Map<string, string>;
	/** Array of options filtered by the current search value */
	filteredOptions: Option[];
}

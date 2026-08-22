import type { Option } from '@repo/core';

/**
 * Common properties for command-like components
 *
 * This interface defines the basic properties that are shared
 * across all command-related components.
 *
 * @interface ICommonCommandProps
 */
export interface ICommonCommandProps {
	/** Additional CSS classes to apply to the component */
	className?: string;
}

/**
 * Common properties for virtualized list components
 *
 * This interface defines properties related to virtualization
 * that are shared across virtualized command interfaces.
 *
 * @interface IVirtualizationProps
 */
export interface IVirtualizationProps {
	/** Estimated size of each item in pixels for virtualization calculations */
	estimateSize?: number;
	/** Number of items to render outside the visible area for smooth scrolling */
	overscan?: number;
}

/**
 * Render function type for virtualized list items
 *
 * This type defines the signature of a render function that
 * receives an item and returns a React node.
 *
 * @type RenderFunction
 */
export type RenderFunction = (props: { item: Option }) => React.ReactNode;
/**
 * Common properties for components that render children functions
 *
 * This interface defines the common pattern for components that
 * accept render functions as children.
 *
 * @interface IRenderProps
 */
export interface IRenderProps {
	/** Render function that receives item data and returns React nodes */
	children: RenderFunction;
}

/**
 * Common properties for components that render children functions with index
 *
 * This interface defines the common pattern for components that
 * accept render functions as children with additional index information.
 *
 * @interface IRenderWithIndex
 */
export interface IRenderWithIndex {
	/** Render function that receives item data and index, returns React nodes */
	children: (props: { item: Option; index: number }) => React.ReactNode;
}

/**
 * Base context value interface for command-like functionality
 *
 * This interface defines the core shape of context values for components
 * that provide search, filtering, and selection capabilities. It includes
 * all the fundamental state and functions needed for command palette
 * and select operations.
 *
 * @interface ICommandContext
 */
export interface ICommandContext {
	/** Whether the command interface is currently open */
	open: boolean;
	/** Current search value for filtering items */
	searchValue: string;
	/** Whether to automatically close when an item is selected */
	closeOnSelect?: boolean;
	/** Function to close the command interface */
	close: () => void;
	/** Function to toggle the open/close state */
	toggle: () => void;
	/** Function to set the open state — accepts a boolean or an updater, like a `useState` setter */
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	/** Function to handle search value changes */
	onSearchChange?: (value: string) => void;
	/** Generic options for filtering */
	options: Option[];
	/** Map of option values to their display labels for efficient lookups */
	optionsMap: Map<string, string>;
	/** Array of options filtered by the current search value */
	filteredOptions: Option[];
	/** Configuration for empty state messages */
	emptyState?: IEmptyStateConfig;
}

/**
 * Base provider props interface for command-like components
 *
 * This interface defines the common props that providers for command-like
 * components should accept. It includes the essential configuration for
 * managing state and behavior.
 *
 * @interface ICommandProvider
 */
export interface ICommandProvider {
	/** React children to be wrapped by the provider */
	children: React.ReactNode;
	/** Whether the interface is currently open */
	open: boolean;
	/** Function to set the open state — accepts a boolean or an updater, like a `useState` setter */
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	/** Whether to close automatically when an item is selected */
	closeOnSelect?: boolean;
	/** Default search value to start with */
	defaultSearchValue?: string;
	/** Array of options for filtering */
	options: Option[];
	/** Configuration for empty state messages */
	emptyState?: IEmptyStateConfig;
	/** Search props */
	searchConfig?: ICommandSearchConfig;
}

/**
 * Command search configuration interface
 *
 * This interface defines the configuration for search functionality
 * in command-like components.
 *
 * @interface ICommandSearchConfig
 */
export interface ICommandSearchConfig {
	/** Whether search functionality is enabled */
	enabledSearch?: boolean;
	/** Search placeholder text */
	searchPlaceholder?: string;
	/** Debounce delay in milliseconds for search input changes */
	debounceMs?: number;
	/** Whether to show the clear button */
	showClearButton?: boolean;
}

/**
 * Empty state configuration interface
 *
 * This interface defines the configuration for empty state messages
 * that can be customized through the CommandProvider.
 *
 * @interface IEmptyStateConfig
 */
export interface IEmptyStateConfig {
	/** Message to display when no options are available (no search) */
	noOptionsMessage?: string;
	/** Message to display when search returns no results */
	noSearchResultsMessage?: string;
	/** Function to customize the search term display in the no search results message */
	formatSearchTerm?: (searchTerm: string) => string;
}

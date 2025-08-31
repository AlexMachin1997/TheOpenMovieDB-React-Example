import { Option } from '~/types/Option';

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

export interface ICommandSearchProps {
	/** Whether search functionality is enabled */
	enabledSearch?: boolean;
	/** Search placeholder text */
	searchPlaceholder?: string;
}

/**
 * Base provider props interface for command-like components
 *
 * This interface defines the common props that providers for command-like
 * components should accept. It includes the essential configuration for
 * managing state and behavior.
 *
 * @interface IBaseCommandProvider
 */
export interface IBaseCommandProvider {
	/** React children to be wrapped by the provider */
	children: React.ReactNode;
	/** Whether the interface is currently open */
	open: boolean;
	/** Function to set the open state */
	setOpen: (open: boolean) => void;
	/** Whether to close automatically when an item is selected */
	closeOnSelect?: boolean;
	/** Default search value to start with */
	defaultSearchValue?: string;
	/** Array of options for filtering */
	options: Option[];
	/** Configuration for empty state messages */
	emptyState?: IEmptyStateConfig;
	/** Search props */
	searchConfig?: ICommandSearchProps;
}

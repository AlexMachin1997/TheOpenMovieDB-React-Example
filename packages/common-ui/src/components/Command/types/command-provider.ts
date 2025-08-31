import { Option } from '~/types/Option';

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
}

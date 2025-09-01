import { IBaseCommandProvider } from '~/components/Command/types';

/**
 * Base context value interface for select functionality
 *
 * This interface defines select-specific functionality without extending
 * the command context. Command functionality should be accessed directly
 * through useCommandContext when needed.
 *
 * @interface IBaseSelectContextValue
 */
export interface IBaseSelectContextValue {
	/** Set of currently selected values */
	selectedValues: Set<string>;
	/** Function to toggle a value's selection state */
	toggleValue: (value: string) => void;
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
}

/**
 * Base provider props interface for select components
 *
 * This interface extends the base command provider props with select-specific
 * configuration like selection mode and initial values.
 *
 * @interface IBaseSelectProviderProps
 * @extends IBaseCommandProvider
 */
export interface IBaseSelectProviderProps extends IBaseCommandProvider {
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
	/** Initial selected values */
	initialSelectedValues?: string[];
	/** Callback when selection changes */
	onSelectionChange?: (selectedValues: string[]) => void;
}

/**
 * Props for select value display components
 *
 * This interface defines common props for components that display
 * selected values in select interfaces.
 *
 * @interface BaseSelectValueProps
 */
export interface BaseSelectValueProps extends React.ComponentPropsWithoutRef<'ul'> {
	/** Placeholder text shown when no items are selected */
	placeholder?: string;
}

/**
 * Props for single select value display components
 *
 * This interface extends the base select value props with single-select
 * specific functionality.
 *
 * @interface SingleSelectValueProps
 * @extends BaseSelectValueProps
 */
export interface SingleSelectValueProps extends BaseSelectValueProps {
	/** Whether to show a clear button for removing the selected value */
	showClearButton?: boolean;
}

/**
 * Props for multi select value display components
 *
 * This interface extends the base select value props with multi-select
 * specific functionality.
 *
 * @interface MultiSelectValueProps
 * @extends BaseSelectValueProps
 */
export interface MultiSelectValueProps extends BaseSelectValueProps {
	/** Whether to show a clear button for removing the selected value */
	showClearButton?: boolean;
	/** How to handle overflow when there are many selected items */
	overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff';
}

/**
 * Props for select item components
 *
 * This interface defines common props for individual selectable items
 * within select interfaces.
 *
 * @interface BaseSelectItemProps
 */
export interface BaseSelectItemProps
	extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
	/** Value associated with this item */
	value: string;
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Whether the item is currently selected */
	selected?: boolean;
	/** Callback when the item is selected */
	onSelect?: (value: string) => void;
}

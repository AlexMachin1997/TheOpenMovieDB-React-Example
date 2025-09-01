import { IBaseCommandProvider } from '~/components/Command/types';

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
 * Context value interface for select functionality
 *
 * This interface defines select-specific functionality without extending
 * the command context. Command functionality should be accessed directly
 * through useCommandContext when needed.
 *
 * Select-specific properties:
 * - selectedValues: Set of currently selected values
 * - toggleValue: Function to toggle a value's selection state
 * - mode: Selection mode ('single' or 'multiple')
 *
 * Command functionality (search, filtering, options mapping) is provided
 * by the CommandContext and should be accessed via useCommandContext.
 *
 * @interface SelectContext
 */
export interface ISelectContext {
	/** Set of currently selected values */
	selectedValues: Set<string>;
	/** Function to toggle a value's selection state */
	toggleValue: (value: string) => void;
	/** Selection mode - either 'single' or 'multiple' */
	mode: 'single' | 'multiple';
}

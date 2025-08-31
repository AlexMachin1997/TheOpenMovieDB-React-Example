import { IBaseSelectContextValue } from '~/components/Selects/types/base-select-types';

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
export type SelectContext = IBaseSelectContextValue & {
	// Select-specific properties can be added here in the future
};

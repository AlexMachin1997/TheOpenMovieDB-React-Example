import * as React from 'react';
import { SelectContext } from '~/components/Selects/contexts/select-context';

/**
 * Hook to access select context throughout the component tree
 *
 * This hook provides access to the SelectContext, which contains select-specific
 * state and functions. It includes error handling to ensure the hook is used
 * within a SelectProvider.
 *
 * The hook returns select-specific context values:
 * - Selected values and toggle function
 * - Selection mode (single/multiple)
 *
 * Note: Command functionality (search, filtering, options mapping) should be
 * accessed via useCommandContext when needed.
 *
 * @throws {Error} When used outside of a SelectProvider
 * @returns The select context value with select-specific state and functions
 *
 * @example
 * ```tsx
 * const { selectedValues, toggleValue, mode } = useSelectContext();
 * const { optionsMap, filteredOptions } = useCommandContext();
 *
 * // Check if a value is selected
 * const isSelected = selectedValues.has('some-value');
 *
 * // Toggle a value
 * toggleValue('some-value');
 *
 * // Get the label for a value
 * const label = optionsMap.get('some-value');
 *
 * // Check the selection mode
 * if (mode === 'multiple') {
 *   // Handle multi-select logic
 * }
 * ```
 */
export const useSelectContext = () => {
	const context = React.useContext(SelectContext);

	if (context == null) {
		throw new Error('useSelectContext must be used within a SelectContext');
	}

	return context;
};

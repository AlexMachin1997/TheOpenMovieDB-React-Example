import * as React from 'react';
import { SelectContext } from '~/components/Selects/contexts/select-context';

/**
 * Hook to access select context throughout the component tree
 *
 * This hook provides access to the SelectContext, which contains all the state
 * and functions needed for select functionality. It includes error handling
 * to ensure the hook is used within a SelectProvider.
 *
 * The hook returns the complete select context value including:
 * - Selected values and toggle function
 * - Options mapping for efficient lookups
 * - Search functionality
 * - Selection mode (single/multiple)
 * - Filtered options based on search
 *
 * @throws {Error} When used outside of a SelectProvider
 * @returns The select context value with all state and functions
 *
 * @example
 * ```tsx
 * const { selectedValues, toggleValue, optionsMap, mode } = useSelectContext();
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

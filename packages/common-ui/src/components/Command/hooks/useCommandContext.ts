import * as React from 'react';
import { CommandContext } from '~/components/Command/contexts/command-context';

/**
 * Hook to access command palette context
 *
 * This hook provides access to the CommandContext throughout the component tree.
 * It includes error handling to ensure the hook is used within a CommandProvider.
 *
 * The hook returns the complete command context value including:
 * - Open/close state and control functions
 * - Search value and change handler
 * - Items array and setter
 * - Configuration options like closeOnSelect
 *
 * @throws {Error} When used outside of a CommandProvider
 * @returns The command context value with all state and functions
 *
 * @example
 * ```tsx
 * const { open, close, searchValue, onSearchChange } = useCommandContext();
 *
 * // Use the context values
 * if (open) {
 *   // Command palette is open
 * }
 *
 * // Close the palette
 * close();
 *
 * // Update search
 * onSearchChange('new search term');
 * ```
 */
export const useCommandContext = () => {
	const context = React.useContext(CommandContext);

	if (context == null) {
		throw new Error('useCommandContext must be used within a CommandProvider');
	}

	return context;
};

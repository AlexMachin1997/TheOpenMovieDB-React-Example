import { useContext } from 'react';
import { CommandContext } from '~/components/Command/contexts/command-context';

/**
 * Hook to access command context throughout the component tree
 *
 * This hook provides access to the CommandContext, which contains command-specific
 * state and functions. It includes error handling to ensure the hook is used
 * within a CommandProvider.
 */
export const useCommandContext = () => {
	const context = useContext(CommandContext);

	if (!context) {
		throw new Error('useCommandContext must be used within a CommandProvider');
	}

	return context;
};

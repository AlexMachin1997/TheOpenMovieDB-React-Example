import { useContext } from 'react';
import { CommandContext, CommandContextValue } from '~/components/Command/contexts/command-context';

export const useCommand = (): CommandContextValue => {
	const context = useContext(CommandContext);

	if (!context) {
		throw new Error('useCommand must be used within a CommandProvider');
	}

	return context;
};

import * as React from 'react';
import { CommandContext } from '~/components/Command/contexts/command-context';

export const useCommandContext = () => {
	const context = React.useContext(CommandContext);

	if (context == null) {
		throw new Error('useCommandContext must be used within a CommandProvider');
	}

	return context;
};

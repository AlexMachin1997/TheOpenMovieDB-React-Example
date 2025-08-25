import * as React from 'react';
import { SelectContext } from '~/components/Selects/core/contexts/select-context';

export const useSelectContext = () => {
	const context = React.useContext(SelectContext);

	if (context == null) {
		throw new Error('useSelectContext must be used within a SelectContext');
	}

	return context;
};

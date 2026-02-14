import { use } from 'react';
import { SelectContext } from '~/components/Selects/contexts/select-context';

/**
 * Hook to access select context throughout the component tree
 *
 * @throws {Error} When used outside of a SelectProvider
 * @returns The select context value with select-specific state and functions
 */
export const useSelectContext = () => {
	const context = use(SelectContext);

	if (context == null) {
		throw new Error('useSelectContext must be used within a SelectContext');
	}

	return context;
};

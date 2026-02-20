import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@repo/tailwind-config';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

import type { ICommandEmpty } from '~/components/Command/Command.types';

export const CommandEmpty = ({
	className,
	noOptionsMessage = 'No options currently available',
	noSearchResultsMessage = 'No options for {searchTerm}',
	formatSearchTerm,
	...props
}: ICommandEmpty) => {
	const { searchValue, filteredOptions } = useCommandContext();

	const emptyMessage = React.useMemo(() => {
		if (searchValue.trim().length > 0) {
			const finalFormatSearchTerm = formatSearchTerm || ((term) => `"${term}"`);
			const formattedSearchTerm = finalFormatSearchTerm(searchValue.trim());
			return noSearchResultsMessage.replace('{searchTerm}', formattedSearchTerm);
		}

		return noOptionsMessage;
	}, [searchValue, noOptionsMessage, noSearchResultsMessage, formatSearchTerm]);

	if (filteredOptions.length > 0) return null;

	return (
		<CommandPrimitive.Empty
			data-slot='command-empty'
			className={cn('py-6 text-center text-sm', className)}
			{...props}
		>
			{emptyMessage}
		</CommandPrimitive.Empty>
	);
};

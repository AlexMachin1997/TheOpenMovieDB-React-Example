import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { Search } from '@repo/ui-core';

import type { ICommandSearch } from '~/components/Command/Command.types';

/**
 * Search input component for command palette functionality
 *
 * @component
 */
export const CommandSearch = ({
	debounceMs = 300,
	className,
	enabledSearch = true,
	searchPlaceholder = 'Search',
	showClearButton = false,
	...props
}: ICommandSearch) => {
	const { onSearchChange, searchValue } = useCommandContext();

	// Value state strictly controls what is synced upstream vs what is typed.
	// We rely purely on the underlying `<Search>` to handle debouncing and emit changes through `onValueChange`
	const [value, setValue] = React.useState(searchValue || '');

	// Sync with external context updates (e.g., cleared programmatically by other components)
	React.useEffect(() => {
		if (searchValue !== value) {
			setValue(searchValue || '');
		}
	}, [searchValue]);

	if (!enabledSearch) return null;

	const handleSearchChange = React.useCallback(
		(val: string) => {
			setValue(val);
			onSearchChange?.(val);
		},
		[onSearchChange]
	);

	return (
		<div data-slot='command-input-wrapper' className={cn('bg-background', className)}>
			<Search
				{...props}
				value={value}
				onValueChange={handleSearchChange}
				debounceMs={debounceMs}
				placeholder={searchPlaceholder}
				showClearButton={showClearButton}
				className='border-b-0 px-3' // Strip outer borders so it fits seamlessly inside the command palette
			/>
		</div>
	);
};

CommandSearch.displayName = 'CommandSearch';

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

	// Sync with external context updates (e.g., cleared programmatically by other components).
	// Intentionally keyed only on `searchValue`: adding `value` would clobber what the user is
	// mid-typing. The proper fix (extract a `useDebouncedValue` hook) is tracked as D3.
	React.useEffect(() => {
		if (searchValue !== value) {
			setValue(searchValue || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	const handleSearchChange = React.useCallback(
		(val: string) => {
			setValue(val);
			onSearchChange?.(val);
		},
		[onSearchChange]
	);

	// Early return must come AFTER all hooks (react-hooks/rules-of-hooks): returning above the
	// hooks made the hook count vary between renders and would crash when `enabledSearch` toggled.
	if (!enabledSearch) return null;

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

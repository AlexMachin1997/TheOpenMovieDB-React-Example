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

	// `Search` already owns its own controlled/uncontrolled sync (via useDebouncedValue),
	// so there's no need to mirror `searchValue` in local state here — binding straight to
	// the context value is safe because `searchValue` only changes after `Search`'s debounce
	// settles or via an explicit external clear, never while the user is mid-typing.
	const handleSearchChange = React.useCallback(
		(val: string) => {
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
				value={searchValue}
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

import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@repo/tailwind-config';

import { useDebouncedValue } from '~/hooks';
import { DebouncableInput } from '~/components/DebouncableInput';
import { Button } from '~/components/Button';
import { searchWrapperVariants, searchClearButtonVariants, searchDebouncableInputVariants } from '~/components/Search/Search.variants';
import type { ISearch } from '~/components/Search/Search.types';

/**
 * Enhanced Search input component combining `DebouncableInput`, a static `SearchIcon`,
 * and an optional clear text button.
 *
 * @component
 */
export const Search = ({
	showClearButton = false,
	className,
	value: externalValue,
	defaultValue,
	onValueChange,
	ref,
	...props
}: ISearch) => {
	// debounceMs is intentionally NOT passed here — that's forwarded to the child
	// DebouncableInput below, which owns the one real debounce delay. This hook call only
	// mirrors DebouncableInput's already-settled value (synchronous pass-through) so the
	// clear button can read it without duplicating a second state/sync-effect implementation.
	const { value: localValue, setValue: setLocalValue } = useDebouncedValue({
		value: externalValue !== undefined ? String(externalValue) : undefined,
		defaultValue: defaultValue !== undefined ? String(defaultValue) : undefined,
		debounceMs: 0,
		onValueChange
	});

	const handleClear = () => {
		setLocalValue('');
	};

	const isClearVisible = showClearButton && localValue.length > 0;

	return (
		<div data-slot='search-wrapper' className={cn(searchWrapperVariants(), className)}>
			<SearchIcon className='size-4 shrink-0 opacity-50' aria-hidden='true' />
			<DebouncableInput
				ref={ref}
				value={localValue}
				onValueChange={setLocalValue}
				className={cn(searchDebouncableInputVariants())}
				{...props}
			/>
			{showClearButton && (
				<Button
					data-slot='search-clear-button'
					variant='ghost'
					size='icon'
					onClick={handleClear}
					className={searchClearButtonVariants({ visible: isClearVisible })}
					aria-label='Clear search'
					aria-hidden={!isClearVisible}
				>
					<XIcon className='size-3 shrink-0' aria-hidden='true' />
				</Button>
			)}
		</div>
	);
};

Search.displayName = 'Search';

import { cn } from '@repo/tailwind-config';

import { useDebouncedValue } from '~/hooks';
import { DebouncableInput } from '~/components/DebouncableInput';
import { Button } from '~/components/Button';
import { Icon } from '~/components/Icon';
import { searchWrapperVariants, searchClearButtonVariants, searchDebouncableInputVariants } from '~/components/Search/Search.variants';
import type { ISearch } from '~/components/Search/Search.types';

/**
 * Enhanced Search input component combining `DebouncableInput`, a static search `Icon`,
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
			<Icon name='search' className='opacity-50' />
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
					<Icon name='x' size='xs' />
				</Button>
			)}
		</div>
	);
};

Search.displayName = 'Search';

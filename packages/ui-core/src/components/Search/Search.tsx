import * as React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@repo/tailwind-config';

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
	// We track the internal state explicitly to conditionally render the clear button immediately
	// without waiting for the debounce loop to fire external state updates back to us.
	const [localValue, setLocalValue] = React.useState<string>(
		externalValue !== undefined ? String(externalValue) : defaultValue !== undefined ? String(defaultValue) : ''
	);

	React.useEffect(() => {
		if (externalValue !== undefined) {
			setLocalValue(String(externalValue));
		}
	}, [externalValue]);

	const handleValueChange = (val: string) => {
		setLocalValue(val);
		onValueChange(val);
	};

	const handleClear = () => {
		setLocalValue('');
		onValueChange('');
	};

	const isClearVisible = showClearButton && localValue.length > 0;

	return (
		<div data-slot='search-wrapper' className={cn(searchWrapperVariants(), className)}>
			<SearchIcon className='size-4 shrink-0 opacity-50' aria-hidden='true' />
			<DebouncableInput
				ref={ref}
				value={localValue}
				onValueChange={handleValueChange}
				className={cn(
					searchDebouncableInputVariants(),
					className
				)}
				{...props}
			/>
			{showClearButton && (
				<Button
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

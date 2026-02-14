import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon, XIcon } from 'lucide-react';
import { useDebounce } from 'react-use';
import { cn } from '@repo/ui-core';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommandSearchConfig } from '~/components/Command/types/core';
import { Button } from '@repo/ui-core';

interface ICommandSearch
	extends React.ComponentProps<typeof CommandPrimitive.Input>,
		ICommandSearchConfig {}

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
	const { onSearchChange } = useCommandContext();
	const [inputValue, setInputValue] = React.useState('');

	const handleDebouncedValueChange = React.useCallback(() => {
		onSearchChange?.(inputValue);
	}, [inputValue, onSearchChange]);

	useDebounce(handleDebouncedValueChange, debounceMs, [inputValue]);

	if (!enabledSearch) return null;

	return (
		<div data-slot='command-input-wrapper' className='flex items-center gap-2 border-b px-3'>
			<SearchIcon className='size-4 shrink-0 opacity-50' />
			<CommandPrimitive.Input
				data-slot='command-input'
				className={cn(
					'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				value={inputValue}
				placeholder={searchPlaceholder}
				onValueChange={setInputValue}
				{...props}
			/>
			{showClearButton && inputValue && (
				<Button
					variant='outline'
					size='icon'
					onClick={() => setInputValue('')}
					className='p-0'
					aria-label='Clear search'
				>
					<XIcon className='size-3 shrink-0' />
				</Button>
			)}
		</div>
	);
};

CommandSearch.displayName = 'CommandSearch';

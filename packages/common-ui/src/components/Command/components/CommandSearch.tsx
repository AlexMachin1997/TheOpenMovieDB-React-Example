import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon, XIcon } from 'lucide-react';
import { useDebounce } from 'react-use';
import { cn } from '~/utils/className';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommandSearchConfig } from '~/components/Command/types/core';
import { Button } from '~/components/Button/Button';

/**
 * Props for the CommandSearch component
 *
 * @interface ICommandSearch
 * @extends React.ComponentProps<typeof CommandPrimitive.Input>
 * @extends ICommandSearchConfig
 */
interface ICommandSearch
	extends React.ComponentProps<typeof CommandPrimitive.Input>,
		ICommandSearchConfig {}

/**
 * Search input component for command palette functionality
 *
 * This component provides a search input field with debounced value changes
 * and integration with the command context. It includes a search icon and
 * proper styling for command palette interfaces.
 *
 * Features:
 * - Debounced search input to prevent excessive API calls
 * - Search icon for visual clarity
 * - Integration with CommandContext for state management
 * - Proper accessibility and keyboard navigation
 * - Consistent styling with command palette design
 * - Configurable debounce delay
 *
 * The component uses a two-stage state management approach:
 * 1. Local input value for immediate UI feedback
 * 2. Debounced value that triggers context updates
 *
 * This prevents performance issues when users type quickly while ensuring
 * the search functionality remains responsive.
 *
 * @component
 * @param props - The search input configuration props
 * @returns The rendered search input component
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
			{showClearButton && (
				<Button variant='outline' size='icon' onClick={() => setInputValue('')} className='p-0'>
					<XIcon className='size-3 shrink-0' />
				</Button>
			)}
		</div>
	);
};

CommandSearch.displayName = 'CommandSearch';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from 'react-use';
import { cn } from '~/utils/className';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

/**
 * Props for the CommandSearch component
 *
 * @interface CommandSearchProps
 * @extends React.ComponentProps<typeof CommandPrimitive.Input>
 */
export interface CommandSearchProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
	/** Debounce delay in milliseconds for search input changes */
	debounceMs?: number;
}

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
export const CommandSearch = ({ debounceMs = 300, className, ...props }: CommandSearchProps) => {
	const { onSearchChange } = useCommandContext();
	const [inputValue, setInputValue] = React.useState('');

	const handleDebouncedValueChange = React.useCallback(() => {
		onSearchChange?.(inputValue);
	}, [inputValue, onSearchChange]);

	const debounceDependencies = React.useMemo(() => {
		return [inputValue];
	}, [inputValue]);

	useDebounce(handleDebouncedValueChange, debounceMs, debounceDependencies);

	return (
		<div data-slot='command-input-wrapper' className='flex h-9 items-center gap-2 border-b px-3'>
			<SearchIcon className='size-4 shrink-0 opacity-50' />
			<CommandPrimitive.Input
				data-slot='command-input'
				className={cn(
					'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				value={inputValue}
				onValueChange={setInputValue}
				{...props}
			/>
		</div>
	);
};

CommandSearch.displayName = 'CommandSearch';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from 'react-use';
import { cn } from '~/utils/className';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';

export interface CommandSearchProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
	debounceMs?: number;
}

export const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>(
	({ debounceMs = 300, className, ...props }, ref) => {
		const { setSearchValue } = useSelectContext();
		const [inputValue, setInputValue] = React.useState('');

		const handleDebouncedValueChange = React.useCallback(() => {
			setSearchValue(inputValue);
		}, [inputValue, setSearchValue]);

		const debounceDependencies = React.useMemo(() => {
			return [inputValue];
		}, [inputValue]);

		useDebounce(handleDebouncedValueChange, debounceMs, debounceDependencies);

		return (
			<div data-slot='command-input-wrapper' className='flex h-9 items-center gap-2 border-b px-3'>
				<SearchIcon className='size-4 shrink-0 opacity-50' />
				<CommandPrimitive.Input
					ref={ref}
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
	}
);

CommandSearch.displayName = 'CommandSearch';

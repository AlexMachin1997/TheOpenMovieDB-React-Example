import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { CommandItem } from '~/components/command/command';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { cn } from '~/utils/className';

export const SelectListItem = ({
	value,
	onSelect,
	disabled = false,
	...props
}: {
	value: string;
} & Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'>) => {
	const { toggleValue, selectedValues, optionsMap } = useSelectContext();

	return (
		<CommandItem
			{...props}
			value={optionsMap.get(value)}
			onSelect={() => {
				toggleValue(value);
				onSelect?.(value);
			}}
			disabled={disabled}
		>
			<CheckIcon
				className={cn('mr-2 size-4', selectedValues.has(value) ? 'opacity-100' : 'opacity-0')}
			/>
			<span className='min-w-0 flex-1 truncate'>{optionsMap.get(value)}</span>
		</CommandItem>
	);
};

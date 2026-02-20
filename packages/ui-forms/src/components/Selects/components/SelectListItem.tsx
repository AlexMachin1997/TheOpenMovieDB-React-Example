import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@repo/tailwind-config';
import { CommandItem, useCommandContext } from '@repo/ui-command';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';

export interface SelectListItemProps
	extends Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'> {
	value: string;
}

export const SelectListItem = ({ value, children, ...props }: SelectListItemProps) => {
	const { toggleValue, selectedValues } = useSelectContext();
	const { optionsMap } = useCommandContext();

	const isSelected = selectedValues.has(value);

	const handleSelectItem = React.useCallback(() => {
		toggleValue(value);
	}, [toggleValue, value]);

	return (
		<CommandItem {...props} value={optionsMap.get(value)} onSelect={handleSelectItem}>
			<CheckIcon className={cn('mr-2 size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
			{children}
			<p>{optionsMap.get(value)}</p>
		</CommandItem>
	);
};

import * as React from 'react';
import { Icon } from '@repo/ui-core';
import { cn } from '@repo/tailwind-config';
import { CommandItem, useCommandContext } from '@repo/ui-command';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';

export interface ISelectListItemProps
	extends Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, 'value'> {
	value: string;
}

export const SelectListItem = ({ value, children, ...props }: ISelectListItemProps) => {
	const { toggleValue, selectedValues } = useSelectContext();
	const { optionsMap } = useCommandContext();

	const isSelected = selectedValues.has(value);

	const handleSelectItem = React.useCallback(() => {
		toggleValue(value);
	}, [toggleValue, value]);

	return (
		<CommandItem {...props} value={optionsMap.get(value)} onSelect={handleSelectItem}>
			<Icon name='check' className={cn('mr-2', isSelected ? 'opacity-100' : 'opacity-0')} />
			{children}
			<p>{optionsMap.get(value)}</p>
		</CommandItem>
	);
};

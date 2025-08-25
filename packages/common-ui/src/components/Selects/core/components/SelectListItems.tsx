import * as React from 'react';
import { CommandList } from '~/components/Command/Command';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/Selects/core/hooks/useSelectContext';
import { SelectItemsRenderer } from './SelectItemsRenderer';

export interface SelectListItemsProps {
	children: (props: { item: Option }) => React.ReactNode;
	className?: string;
}

export const SelectListItems = React.memo(({ children, className }: SelectListItemsProps) => {
	const { filteredOptions } = useSelectContext();

	return (
		<CommandList className={className}>
			<SelectItemsRenderer items={filteredOptions}>
				{({ item }) => children({ item })}
			</SelectItemsRenderer>
		</CommandList>
	);
});

SelectListItems.displayName = 'SelectListItems';

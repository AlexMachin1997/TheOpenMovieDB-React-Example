import * as React from 'react';
import { CommandList } from '~/components/command/command';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/selects/core/hooks/useSelectContext';
import { SelectItemsRenderer } from './select-items-renderer';

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

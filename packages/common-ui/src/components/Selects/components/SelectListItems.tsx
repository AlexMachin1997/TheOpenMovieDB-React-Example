import * as React from 'react';
import { CommandList } from '~/components/Command/Command';
import { Option } from '~/types/Option';
import { useSelectContext } from '~/components/Selects/hooks/useSelectContext';

export interface SelectListItemsProps {
	children: (props: { item: Option }) => React.ReactNode;
	className?: string;
}

export const SelectListItems = React.memo(({ children, className }: SelectListItemsProps) => {
	const { filteredOptions } = useSelectContext();

	return (
		<CommandList className={className}>
			{filteredOptions.map((item) => (
				<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
			))}
		</CommandList>
	);
});

SelectListItems.displayName = 'SelectListItems';

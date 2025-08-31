import * as React from 'react';
import { CommandList } from '~/components/Command/Command';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommonCommandProps, IRenderProps } from '~/components/Command/types';

export interface ISelectListItemsProps extends ICommonCommandProps, IRenderProps {
	className?: string;
}

export const SelectListItems = ({ className, children, ...props }: ISelectListItemsProps) => {
	const { filteredOptions } = useCommandContext();

	return (
		<CommandList className={className} {...props}>
			{filteredOptions.map((item) => (
				<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
			))}
		</CommandList>
	);
};

SelectListItems.displayName = 'SelectListItems';

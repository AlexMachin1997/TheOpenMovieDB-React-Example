import * as React from 'react';
import {
	CommandList,
	useCommandContext,
	ICommonCommandProps,
	IRenderProps
} from '@repo/ui-command';

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

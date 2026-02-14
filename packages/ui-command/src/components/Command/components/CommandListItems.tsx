import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { ICommonCommandProps, IRenderProps } from '~/components/Command/types';

export interface ICommandListItems extends ICommonCommandProps, IRenderProps {}

export const CommandListItems = ({ children, className }: ICommandListItems) => {
	const { filteredOptions } = useCommandContext();

	return (
		<CommandList className={className}>
			{filteredOptions.map((item) => (
				<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
			))}
		</CommandList>
	);
};

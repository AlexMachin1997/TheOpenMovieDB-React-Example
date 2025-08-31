import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { Option } from '~/types/Option';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';

interface ICommandListItems {
	children: (props: { item: Option }) => React.ReactNode;
	className?: string;
}

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

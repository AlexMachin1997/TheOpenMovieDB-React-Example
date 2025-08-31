import * as React from 'react';
import { CommandList } from '~/components/Command/components/CommandList';
import { Option } from '~/types/Option';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { CommandEmpty } from '~/components/Command/components/CommandEmpty';

interface ICommandListItems {
	children: (props: { item: Option }) => React.ReactNode;
	className?: string;
}

export const CommandListItems = React.memo(({ children, className }: ICommandListItems) => {
	const { filteredOptions } = useCommandContext();

	if (filteredOptions.length === 0)
		return (
			<CommandList className={className}>
				<CommandEmpty />
			</CommandList>
		);

	return (
		<CommandList className={className}>
			{filteredOptions.map((item) => (
				<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
			))}
		</CommandList>
	);
});

CommandListItems.displayName = 'CommandListItems';

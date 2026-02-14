import * as React from 'react';
import { Command } from '~/components/Command/components/Command';
import { CommandSearch } from '~/components/Command/components/CommandSearch';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandEmpty } from '~/components/Command/components/CommandEmpty';
import { ICommandSearchConfig, IEmptyStateConfig } from '~/components/Command/types';

export interface ICommandInterface extends React.ComponentPropsWithoutRef<typeof Command> {
	children?: React.ReactNode;
	emptyState?: IEmptyStateConfig;
	searchConfig?: ICommandSearchConfig;
}

export const CommandInterface = ({
	searchConfig,
	children,
	emptyState,
	...props
}: ICommandInterface) => {
	return (
		<Command {...props}>
			<CommandSearch {...searchConfig} />
			<CommandList>{children}</CommandList>
			<CommandEmpty {...emptyState} />
		</Command>
	);
};

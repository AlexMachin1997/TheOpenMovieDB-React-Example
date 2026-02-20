import { Command } from '~/components/Command/components/Command';
import { CommandSearch } from '~/components/Command/components/CommandSearch';
import { CommandList } from '~/components/Command/components/CommandList';
import { CommandEmpty } from '~/components/Command/components/CommandEmpty';
import type { ICommandInterface } from '~/components/Command/Command.types';

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

import { CommandVirtualizedList } from '~/components/Command/components/CommandVirtualizedList';
import { ICommandVirtualizedListProps } from '~/components/Command/types';

export const CommandVirtualizedListItems = ({
	children,
	...props
}: ICommandVirtualizedListProps) => {
	return <CommandVirtualizedList {...props}>{children}</CommandVirtualizedList>;
};

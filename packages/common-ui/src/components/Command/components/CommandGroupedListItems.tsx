import { CommandGroupedList } from '~/components/Command/components/CommandGroupedList';
import { IGroupedListProps } from '~/components/Command/types';

export const CommandGroupedListItems = ({ children, ...props }: IGroupedListProps) => {
	return <CommandGroupedList {...props}>{children}</CommandGroupedList>;
};

CommandGroupedListItems.displayName = 'CommandGroupedListItems';

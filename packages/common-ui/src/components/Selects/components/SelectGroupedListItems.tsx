import { CommandGroupedList } from '~/components/Command/components/CommandGroupedList';
import { ICommandGroupedListProps } from '~/components/Command/types';

export const SelectGroupedListItems = (props: ICommandGroupedListProps) => {
	return <CommandGroupedList {...props} />;
};

SelectGroupedListItems.displayName = 'SelectGroupedListItems';

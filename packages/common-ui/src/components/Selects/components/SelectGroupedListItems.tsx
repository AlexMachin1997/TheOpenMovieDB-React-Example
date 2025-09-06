import { CommandGroupedList } from '~/components/Command/components/CommandGroupedList';
import { ICommandGroupedList } from '~/components/Command/types';

export const SelectGroupedListItems = (props: ICommandGroupedList) => {
	return <CommandGroupedList {...props} />;
};

SelectGroupedListItems.displayName = 'SelectGroupedListItems';

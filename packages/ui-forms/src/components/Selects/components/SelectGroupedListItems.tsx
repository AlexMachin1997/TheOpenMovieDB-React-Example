import { CommandGroupedList, ICommandGroupedList } from '@repo/ui-command';

export const SelectGroupedListItems = (props: ICommandGroupedList) => {
	return <CommandGroupedList {...props} />;
};

SelectGroupedListItems.displayName = 'SelectGroupedListItems';

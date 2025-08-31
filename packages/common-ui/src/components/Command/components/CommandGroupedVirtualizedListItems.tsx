import { CommandGroupedVirtualizedList } from '~/components/Command/components/CommandGroupedVirtualizedList';
import { IBaseCommandGroupedVirtualizedList } from '~/components/Command/types';

export const CommandGroupedVirtualizedListItems = ({
	children,
	...props
}: IBaseCommandGroupedVirtualizedList) => {
	return <CommandGroupedVirtualizedList {...props}>{children}</CommandGroupedVirtualizedList>;
};

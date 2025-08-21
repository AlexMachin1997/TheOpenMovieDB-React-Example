import * as React from 'react';
import { Option } from '~/types/Option';

export interface SelectItemsRendererProps<T extends Option = Option> {
	items: T[];
	children: (props: { item: T }) => React.ReactNode;
}

export const SelectItemsRenderer = React.memo(
	<T extends Option>({ items, children }: SelectItemsRendererProps<T>) => {
		return items.map((item) => <React.Fragment key={item.id}>{children({ item })}</React.Fragment>);
	}
);

SelectItemsRenderer.displayName = 'SelectItemsRenderer';

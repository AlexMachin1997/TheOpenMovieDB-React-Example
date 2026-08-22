import * as React from 'react';
import { useCommandContext } from '~/components/Command/hooks/useCommandContext';
import { IRenderProps } from '~/components/Command/types';

export interface ICommandListItems extends IRenderProps {}

/**
 * Renders the filtered options as list items.
 *
 * Items only — the surrounding `CommandList` belongs to whoever composes the palette, which is
 * `CommandInterface` unless you are composing by hand.
 */
export const CommandListItems = ({ children }: ICommandListItems) => {
	const { filteredOptions } = useCommandContext();

	return filteredOptions.map((item) => (
		<React.Fragment key={item.id}>{children({ item })}</React.Fragment>
	));
};

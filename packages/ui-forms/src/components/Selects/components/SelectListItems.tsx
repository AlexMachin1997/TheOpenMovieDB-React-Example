import { CommandListItems, IRenderProps } from '@repo/ui-command';

export interface ISelectListItemsProps extends IRenderProps {}

/**
 * Renders the filtered options as select items.
 *
 * A named alias for `CommandListItems` — `SelectInterface` renders the surrounding `CommandList`,
 * so this contributes items only.
 */
export const SelectListItems = ({ children }: ISelectListItemsProps) => {
	return <CommandListItems>{children}</CommandListItems>;
};

SelectListItems.displayName = 'SelectListItems';

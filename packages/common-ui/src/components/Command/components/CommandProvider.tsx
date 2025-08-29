import * as React from 'react';
import { Popover } from '~/components/Popover/Popover';
import { CommandContext, CommandContextValue } from '~/components/Command/contexts/command-context';
import { CommandProviderProps } from '~/components/Command/types/command-provider';

export const CommandProvider = ({
	children,
	items,
	setItems,
	closeOnSelect = true,
	open,
	setOpen,
	defaultSearchValue = ''
}: CommandProviderProps) => {
	const [searchValue, setSearchValue] = React.useState(defaultSearchValue);

	const handleSearchChange = React.useCallback((value: string) => {
		setSearchValue(value);
	}, []);

	const contextValue: CommandContextValue = React.useMemo(
		() => ({
			open,
			searchValue,
			items,
			setItems,
			closeOnSelect,
			close: () => setOpen(false),
			openMenu: () => setOpen(true),
			toggle: () => setOpen(!open),
			setOpen: setOpen,
			onSearchChange: handleSearchChange
		}),
		[open, searchValue, items, setItems, closeOnSelect, setOpen, handleSearchChange]
	);

	return (
		<CommandContext.Provider value={contextValue}>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</CommandContext.Provider>
	);
};

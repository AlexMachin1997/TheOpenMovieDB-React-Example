import * as React from 'react';
import { Popover } from '@repo/ui-overlays';
import { CommandContext, CommandContextValue } from '~/components/Command/contexts/command-context';
import { filterOptions } from '~/components/Command/utils/filtering';
import { ICommandProvider } from '~/components/Command/types/core';
import type { Option } from '@repo/core';

/**
 * Provider component that manages the state and behavior of command palette functionality
 *
 * @component
 */
export const CommandProvider = ({
	children,
	closeOnSelect = true,
	open,
	setOpen,
	defaultSearchValue = '',
	options,
	emptyState
}: ICommandProvider) => {
	const [searchValue, setSearchValue] = React.useState(defaultSearchValue);

	const handleSearchChange = React.useCallback((value: string) => {
		setSearchValue(value);
	}, []);

	const filteredOptions = React.useMemo(
		() => filterOptions(options, searchValue),
		[options, searchValue]
	);

	const contextValue: CommandContextValue = React.useMemo(
		() => ({
			open,
			searchValue,
			closeOnSelect,
			close: () => setOpen(false),
			toggle: () => setOpen(!open),
			setOpen: setOpen,
			onSearchChange: handleSearchChange,
			options,
			optionsMap: new Map(options.map((option: Option) => [option.value, option.label])),
			filteredOptions,
			emptyState
		}),
		[
			open,
			searchValue,
			closeOnSelect,
			setOpen,
			handleSearchChange,
			options,
			filteredOptions,
			emptyState
		]
	);

	return (
		<CommandContext.Provider value={contextValue}>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</CommandContext.Provider>
	);
};

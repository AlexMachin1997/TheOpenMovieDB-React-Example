import * as React from 'react';
import { Popover } from '@repo/ui-overlays';
import { CommandContext, CommandContextValue } from '~/components/Command/contexts/command-context';
import { filterOptions } from '~/components/Command/utils/filtering';
import { buildOptionsMap } from '~/components/Command/utils/optionsMap';
import { ICommandProvider } from '~/components/Command/types/core';

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

	const optionsMap = React.useMemo(() => {
		return buildOptionsMap(options);
	}, [options]);

	const close = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const toggle = React.useCallback(() => {
		setOpen((prev) => !prev);
	}, [setOpen]);

	const contextValue: CommandContextValue = React.useMemo(
		() => ({
			open,
			searchValue,
			closeOnSelect,
			close: close,
			toggle: toggle,
			setOpen: setOpen,
			onSearchChange: handleSearchChange,
			options,
			optionsMap,
			filteredOptions,
			emptyState
		}),
		[
			open,
			searchValue,
			closeOnSelect,
			close,
			toggle,
			setOpen,
			handleSearchChange,
			options,
			optionsMap,
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

import * as React from 'react';
import { Popover } from '~/components/Popover/Popover';
import { CommandContext, CommandContextValue } from '~/components/Command/contexts/command-context';
import { ICommandProvider } from '~/components/Command/types/core';
import { Option } from '~/types/Option';

/**
 * Provider component that manages the state and behavior of command palette functionality
 *
 * This component serves as the central state manager for command palette operations,
 * providing context values for search, selection, and navigation. It wraps the
 * command interface in a Popover component and manages the open/close state.
 *
 * Key responsibilities:
 * - Manages search value state with debounced updates
 * - Controls open/close state of the command palette
 * - Provides context for child components to access shared state
 * - Handles automatic closing behavior on selection
 * - Integrates with Popover component for positioning
 *
 * The provider creates a context that includes:
 * - Current search value and change handler
 * - Open/close state and control functions
 * - Configuration for close-on-select behavior
 *
 * @component
 * @param props - The provider configuration props
 * @returns The provider component with context and popover wrapper
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

	const filteredOptions = React.useMemo(() => {
		if (!options) return [];
		if (!searchValue.trim()) return options;

		const searchLower = searchValue.toLowerCase();

		return options.filter((option) => option.label.toLowerCase().includes(searchLower));
	}, [options, searchValue]);

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

import * as React from 'react';
import { useCommandContext } from '~/components/Command';
import { CommandProvider } from '~/components/Command/components/CommandProvider';
import { SelectContext } from '~/components/Selects/contexts/select-context';
import { Option } from '~/types/Option';

interface ISelectProviderCommonOptions {
	/** Available options for selection */
	options: Option[];
	/** Whether to close the dropdown when an option is selected */
	closeOnSelect?: boolean;
	/** Child components to render */
	children: React.ReactNode;
	/** Currently selected value(s) */
	values?: string[];
}

/**
 * Props for single-select mode
 *
 * @interface SingleSelectProviderProps
 */
interface SingleSelectProviderProps extends ISelectProviderCommonOptions {
	/** Selection mode - must be 'single' */
	mode: 'single';
	/** Callback when selection changes - receives single string value */
	onValuesChange: (values: string) => void;
}

/**
 * Props for multi-select mode
 *
 * @interface MultiSelectProviderProps
 */
interface MultiSelectProviderProps extends ISelectProviderCommonOptions {
	/** Selection mode - must be 'multiple' */
	mode: 'multiple';
	/** Callback when selection changes - receives array of string values */
	onValuesChange: (values: string[]) => void;
}

/**
 * Props for the SelectProvider component
 *
 * @interface SelectProviderProps
 */
type SelectProviderProps = SingleSelectProviderProps | MultiSelectProviderProps;

/**
 * Inner provider component that manages select-specific state and logic
 *
 * This component handles the core select functionality including:
 * - Option filtering based on search value
 * - Value toggling logic for single/multi select modes
 * - Options mapping for efficient lookups
 * - Integration with CommandContext for search functionality
 *
 * @param props - The select provider configuration props
 * @returns The select context provider with computed values
 */
const SelectProviderInner = (props: SelectProviderProps) => {
	const { searchValue, onSearchChange, optionsMap, filteredOptions } = useCommandContext();

	const toggleValue = (value: string) => {
		const currentValues = new Set(props.values);

		if (props.mode === 'single') {
			if (currentValues.has(value)) {
				props.onValuesChange('');
			} else {
				props.onValuesChange(value);
			}
		}

		if (props.mode === 'multiple') {
			// For multi select, toggle the value
			if (currentValues.has(value)) {
				currentValues.delete(value);
			} else {
				currentValues.add(value);
			}
			props.onValuesChange(Array.from(currentValues));
		}
	};

	return (
		<SelectContext.Provider
			value={{
				selectedValues: new Set(props.values),
				toggleValue,
				optionsMap,
				searchValue,
				onSearchChange,
				filteredOptions,
				mode: props.mode
			}}
		>
			{props.children}
		</SelectContext.Provider>
	);
};

/**
 * Provider component that combines Command and Select functionality
 *
 * This component serves as the main provider for select components, combining
 * the CommandProvider functionality with select-specific state management.
 * It supports both single and multi-select modes with different behaviors.
 *
 * Key features:
 * - Single and multi-select mode support
 * - Search functionality with option filtering
 * - Automatic option mapping for efficient lookups
 * - Configurable close-on-select behavior
 * - Integration with Command palette functionality
 *
 * The provider creates a layered context structure:
 * 1. CommandProvider - handles search, open/close state, and command functionality
 * 2. SelectProviderInner - handles select-specific logic and state
 *
 * Single-select mode:
 * - Only one value can be selected at a time
 * - Selecting a value deselects the previous selection
 * - onValuesChange receives a single string value
 *
 * Multi-select mode:
 * - Multiple values can be selected simultaneously
 * - Values are toggled on/off when clicked
 * - onValuesChange receives an array of string values
 *
 * @component
 * @param props - The provider configuration props
 * @returns The combined command and select provider
 */
export const SelectProvider = (props: SelectProviderProps) => {
	const [items, setItems] = React.useState<unknown[]>([]);
	const [open, setOpen] = React.useState(false);

	return (
		<CommandProvider
			items={items}
			setItems={setItems}
			closeOnSelect={props.closeOnSelect}
			open={open}
			setOpen={setOpen}
			options={props.options}
		>
			<SelectProviderInner {...props} />
		</CommandProvider>
	);
};

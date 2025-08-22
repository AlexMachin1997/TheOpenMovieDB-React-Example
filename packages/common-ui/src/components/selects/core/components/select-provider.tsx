import * as React from 'react';
import { Popover } from '~/components/popover/popover';
import { SelectContext } from '~/components/selects/core/contexts/select-context';
import { Option } from '~/types/Option';

/**
 * Props for the SelectProvider component
 *
 * @interface SelectProviderProps
 */
interface SelectProviderProps {
	/** Child components that will have access to the select context */
	children: React.ReactNode;
	/** Array of currently selected values */
	values?: string[];
	/** Array of available options to select from */
	options?: Option[];
	/** Callback fired when selected values change */
	onValuesChange?: (values: string[]) => void;
	mode?: 'single' | 'multiple';
}

export const SelectProvider = ({
	children,
	values = [],
	options = [],
	onValuesChange,
	mode = 'single'
}: SelectProviderProps) => {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const optionsMap = React.useMemo(() => {
		return new Map(options.map((option) => [option.value, option.label]));
	}, [options]);

	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return options;

		const searchLower = searchValue.toLowerCase();
		return options.filter((option) => option.label.toLowerCase().includes(searchLower));
	}, [options, searchValue]);

	const toggleValue = (value: string) => {
		const currentValues = new Set(values);

		// If the mode is single, clear the current values and add the new value
		if (mode === 'single') {
			currentValues.clear();
			currentValues.add(value);
		}

		// If the mode is multiple and the value is already in the current values, delete it
		if (mode === 'multiple' && currentValues.has(value)) {
			currentValues.delete(value);
		}

		// If the mode is multiple and the value is not in the current values, add it
		if (mode === 'multiple' && !currentValues.has(value)) {
			currentValues.add(value);
		}

		onValuesChange?.(Array.from(currentValues));
	};

	return (
		<SelectContext.Provider
			value={{
				open,
				setOpen,
				selectedValues: new Set(values),
				toggleValue,
				optionsMap,
				searchValue,
				setSearchValue,
				filteredOptions
			}}
		>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</SelectContext.Provider>
	);
};

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
}

export const SelectProvider = ({
	children,
	values = [],
	options = [],
	onValuesChange
}: SelectProviderProps) => {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const optionsMap = React.useMemo(() => {
		return new Map(options.map((option) => [option.value, option.label]));
	}, [options]);

	// Filter options based on search value
	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return options;

		const searchLower = searchValue.toLowerCase();
		return options.filter((option) => option.label.toLowerCase().includes(searchLower));
	}, [options, searchValue]);

	function toggleValue(value: string) {
		const newValues = new Set(values);

		if (newValues.has(value)) {
			newValues.delete(value);
		} else {
			newValues.add(value);
		}

		onValuesChange?.([...newValues]);
	}

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

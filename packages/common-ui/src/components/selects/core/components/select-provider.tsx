import * as React from 'react';
import { Popover } from '~/components/popover/popover';
import { SelectContext } from '~/components/selects/core/contexts/select-context';
import { Option } from '~/types/Option';

export const SelectProvider = ({
	children,
	values = [],
	options = [],
	onValuesChange
}: {
	children: React.ReactNode;
	values?: string[];
	options?: Option[];
	onValuesChange?: (values: string[]) => void;
}) => {
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

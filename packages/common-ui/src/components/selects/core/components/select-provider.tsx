import * as React from 'react';
import { Popover } from '~/components/popover/popover';
import { SelectContext } from '~/components/selects/core/contexts/select-context';
import { Option } from '~/types/Option';

interface SingleSelectProviderProps {
	mode: 'single';
	children: React.ReactNode;
	values?: string[];
	options?: Option[];
	onValuesChange?: (values: string) => void;
}

interface MultiSelectProviderProps {
	mode: 'multiple';
	children: React.ReactNode;
	values?: string[];
	options?: Option[];
	onValuesChange?: (values: string[]) => void;
}

/**
 * Props for the SelectProvider component
 *
 * @interface SelectProviderProps
 */
type SelectProviderProps = SingleSelectProviderProps | MultiSelectProviderProps;

export const SelectProvider = (props: SelectProviderProps) => {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const optionsMap = React.useMemo(() => {
		return new Map(props.options?.map((option) => [option.value, option.label]));
	}, [props.options]);

	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return props.options;

		const searchLower = searchValue.toLowerCase();
		return props.options?.filter((option) => option.label.toLowerCase().includes(searchLower));
	}, [props.options, searchValue]);

	const toggleValue = (value: string) => {
		const currentValues = new Set(props.values);

		// If the mode is single, clear the current values and add the new value
		if (props.mode === 'single') {
			currentValues.clear();
			currentValues.add(value);
			props.onValuesChange?.(value);
		}

		if (props.mode === 'multiple') {
			// If the mode is multiple and the value is already in the current values, delete it
			if (currentValues.has(value)) {
				currentValues.delete(value);
			}

			// If the mode is multiple and the value is not in the current values, add it
			if (!currentValues.has(value)) {
				currentValues.add(value);
			}

			props.onValuesChange?.(Array.from(currentValues));
		}
	};

	return (
		<SelectContext.Provider
			value={{
				open,
				setOpen,
				selectedValues: new Set(props.values),
				toggleValue,
				optionsMap,
				searchValue,
				setSearchValue,
				filteredOptions: filteredOptions ?? []
			}}
		>
			<Popover open={open} onOpenChange={setOpen}>
				{props.children}
			</Popover>
		</SelectContext.Provider>
	);
};

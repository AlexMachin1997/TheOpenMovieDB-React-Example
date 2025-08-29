import * as React from 'react';
import { useCommandContext } from '~/components/Command';
import { CommandProvider } from '~/components/Command/components/CommandProvider';
import { SelectContext } from '~/components/Selects/contexts/select-context';
import { Option } from '~/types/Option';

interface SingleSelectProviderProps {
	mode: 'single';
	children: React.ReactNode;
	values?: string[];
	options?: Option[];
	onValuesChange: (values: string) => void;
	closeOnSelect?: boolean;
}

interface MultiSelectProviderProps {
	mode: 'multiple';
	children: React.ReactNode;
	values: string[];
	options: Option[];
	onValuesChange: (values: string[]) => void;
	closeOnSelect?: boolean;
}

/**
 * Props for the SelectProvider component
 *
 * @interface SelectProviderProps
 */
type SelectProviderProps = SingleSelectProviderProps | MultiSelectProviderProps;

const SelectProviderInner = (props: SelectProviderProps) => {
	const { searchValue, onSearchChange } = useCommandContext();

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
				filteredOptions: filteredOptions ?? [],
				mode: props.mode
			}}
		>
			{props.children}
		</SelectContext.Provider>
	);
};

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
		>
			<SelectProviderInner {...props} />
		</CommandProvider>
	);
};

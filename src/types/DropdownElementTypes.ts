export type SelectOption = { value: string; label: string };

export type ListboxProps = {
	options?: SelectOption[];
	value?: null | SelectOption | SelectOption[];
	onChange?: null | ((data: { value: SelectOption | SelectOption[] | null }) => void);
	isMultiSelect?: boolean;
	name: string;
	defaultValue?: null | SelectOption | SelectOption[];
	disabled?: boolean;
	noOptionsAvailableMessage?: string;
	displayLimit?: number;
};

export type VirtualizedListProps = Pick<
	ListboxProps,
	'options' | 'noOptionsAvailableMessage' | 'isMultiSelect'
>;

export interface ListboxDisplayValueProps
	extends Pick<ListboxProps, 'value' | 'isMultiSelect' | 'onChange' | 'displayLimit'> {
	showMultiDeleteButton?: boolean;
}

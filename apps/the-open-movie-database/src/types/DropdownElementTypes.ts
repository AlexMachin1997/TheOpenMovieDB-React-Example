export type SelectOption = { value: string; label: string };

export type CheckboxOption = {
	label: string;
	id: string;
	value: string;
	order: number;
	name: string;
	disabled?: boolean;
};

type BaseDropdownProps = {
	options?: SelectOption[];
	value?: null | SelectOption | SelectOption[];
	onChange?:
		| null
		| ((data: { value: SelectOption | SelectOption[] | null; options?: SelectOption[] }) => void);
	isMultiSelect?: boolean;
	name: string;
	defaultValue?: null | SelectOption | SelectOption[];
	disabled?: boolean;
	noOptionsAvailableMessage?: string;
	displayLimit?: number;
	placeholder?: string;
	truncateText?: boolean;
};

export type ListboxProps = BaseDropdownProps;

export type VirtualizedListProps = Pick<
	ListboxProps,
	'options' | 'noOptionsAvailableMessage' | 'isMultiSelect' | 'truncateText'
>;

export interface ListboxDisplayValueProps
	extends Pick<
		ListboxProps,
		'value' | 'isMultiSelect' | 'onChange' | 'displayLimit' | 'placeholder'
	> {
	showMultiDeleteButton?: boolean;
}

export interface ComboboxProps extends BaseDropdownProps {
	flipIconPosition?: boolean;
	defaultQuery?: string;
	canAddCustomItems?: boolean;
	noOptionsForSearchTermMessage?: string;
	containerClassName?: string;
}

export interface ComboboxVirtualizedProps
	extends Pick<
		ComboboxProps,
		| 'options'
		| 'noOptionsAvailableMessage'
		| 'canAddCustomItems'
		| 'noOptionsForSearchTermMessage'
		| 'isMultiSelect'
	> {
	query: string;
}

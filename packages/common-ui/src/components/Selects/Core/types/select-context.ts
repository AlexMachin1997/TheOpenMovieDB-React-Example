import { Option } from '~/types/Option';

export type SelectContext = {
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedValues: Set<string>;
	toggleValue: (value: string) => void;
	optionsMap: Map<string, string>;
	searchValue: string;
	setSearchValue: (value: string) => void;
	filteredOptions: Option[];
};

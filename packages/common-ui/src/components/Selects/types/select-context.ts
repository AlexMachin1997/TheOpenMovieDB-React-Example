import { Option } from '~/types/Option';

export type SelectContext = {
	selectedValues: Set<string>;
	toggleValue: (value: string) => void;
	optionsMap: Map<string, string>;
	searchValue: string;
	onSearchChange: (value: string) => void;
	filteredOptions: Option[];
	mode: 'single' | 'multiple';
};

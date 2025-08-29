import { Option } from '~/types/Option';

export interface GroupedOptions<T extends Option = Option> {
	groups: Map<string | undefined, T[]>;
	sortedGroupNames: (string | undefined)[];
}

export interface GroupOptionsParams<T extends Option = Option> {
	options: T[];
	groupOrder?: string[];
	ungroupedPosition?: 'top' | 'bottom';
}

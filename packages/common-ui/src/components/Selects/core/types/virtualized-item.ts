import { Option } from '~/types/Option';

export type VirtualizedItem =
	| { type: 'separator'; id: string }
	| { type: 'group-header'; id: string; groupName: string }
	| { type: 'option'; id: string; option: Option };

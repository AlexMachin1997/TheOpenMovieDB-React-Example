import { Option } from '~/types/Option';

/**
 * Represents different types of items in a virtualized grouped list
 *
 * This type is used for virtualization of grouped lists where we need to
 * represent separators, group headers, and actual options in a flat array
 * for efficient rendering.
 */
export type VirtualizedItem =
	| {
			type: 'separator';
			id: string;
	  }
	| {
			type: 'group-header';
			id: string;
			groupName: string;
	  }
	| {
			type: 'option';
			id: string;
			option: Option;
	  };

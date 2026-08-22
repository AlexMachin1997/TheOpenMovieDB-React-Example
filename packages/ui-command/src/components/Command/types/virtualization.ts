import type { Option } from '@repo/core';
import {
	ICommonCommandProps,
	IVirtualizationProps,
	IRenderProps,
	IRenderWithIndex
} from '~/components/Command/types/core';
import { IGrouping } from '~/components/Command/types/grouping';

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

/**
 * Props for grouped virtualized list components
 *
 * This interface defines the props for virtualized list components
 * that support grouping functionality.
 *
 * @interface ICommandGroupedVirtualizedList
 */
export interface ICommandGroupedVirtualizedList
	extends ICommonCommandProps,
		IGrouping,
		IVirtualizationProps,
		IRenderProps {}

/**
 * Props for command grouped list components
 *
 * This interface defines the props for list components that support
 * grouping functionality without virtualization.
 *
 * @interface ICommandGroupedList
 */
export interface ICommandGroupedList extends IGrouping, IRenderProps {}

/**
 * Props for command virtualized list components
 *
 * This interface defines the props for virtualized list components
 * that render items with index information.
 *
 * @interface ICommandVirtualizedList
 */
export interface ICommandVirtualizedList
	extends ICommonCommandProps,
		IVirtualizationProps,
		IRenderWithIndex {}

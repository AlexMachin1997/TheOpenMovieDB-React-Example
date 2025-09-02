import {
	ICommonCommandProps,
	IGroupingProps,
	IVirtualizationProps,
	IRenderProps,
	IRenderWithIndexProps
} from '~/components/Command/types/common-props';

/**
 * Props for grouped virtualized list components
 *
 * This interface defines the props for virtualized list components
 * that support grouping functionality.
 *
 * @interface IBaseCommandGroupedVirtualizedList
 */
export interface IBaseCommandGroupedVirtualizedList
	extends ICommonCommandProps,
		IGroupingProps,
		IVirtualizationProps,
		IRenderProps {}

/**
 * Props for command grouped list components
 *
 * This interface defines the props for list components that support
 * grouping functionality without virtualization.
 *
 * @interface ICommandGroupedListProps
 */
export interface ICommandGroupedListProps
	extends ICommonCommandProps,
		IGroupingProps,
		IRenderProps {}

/**
 * Props for command virtualized list components
 *
 * This interface defines the props for virtualized list components
 * that render items with index information.
 *
 * @interface ICommandVirtualizedListProps
 */
export interface ICommandVirtualizedListProps
	extends ICommonCommandProps,
		IVirtualizationProps,
		IRenderWithIndexProps {
	/** Maximum height of the virtualized list container */
	maxHeight?: string;
}

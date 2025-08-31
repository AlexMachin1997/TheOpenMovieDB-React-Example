import { Option } from '~/types/Option';

/**
 * Common properties for command-like components
 *
 * This interface defines the basic properties that are shared
 * across all command-related components.
 *
 * @interface ICommonCommandProps
 */
export interface ICommonCommandProps {
	/** Additional CSS classes to apply to the component */
	className?: string;
}

/**
 * Common properties for components that support grouping functionality
 *
 * This interface defines properties related to grouping behavior
 * that are shared across multiple command interfaces.
 *
 * @interface IGroupingProps
 */
export interface IGroupingProps {
	/** Array of group names defining the order in which groups should appear */
	groupOrder?: string[];
	/** Position for ungrouped items relative to grouped items */
	ungroupedPosition?: 'top' | 'bottom';
}

/**
 * Common properties for virtualized list components
 *
 * This interface defines properties related to virtualization
 * that are shared across virtualized command interfaces.
 *
 * @interface IVirtualizationProps
 */
export interface IVirtualizationProps {
	/** Estimated size of each item in pixels for virtualization calculations */
	estimateSize?: number;
	/** Number of items to render outside the visible area for smooth scrolling */
	overscan?: number;
}

/**
 * Common properties for components that render children functions
 *
 * This interface defines the common pattern for components that
 * accept render functions as children.
 *
 * @interface IRenderProps
 */
export interface IRenderProps {
	/** Render function that receives item data and returns React nodes */
	children: (props: { item: Option }) => React.ReactNode;
}

/**
 * Common properties for components that render children functions with index
 *
 * This interface defines the common pattern for components that
 * accept render functions as children with additional index information.
 *
 * @interface IRenderWithIndexProps
 */
export interface IRenderWithIndexProps {
	/** Render function that receives item data and index, returns React nodes */
	children: (props: { item: Option; index: number }) => React.ReactNode;
}

/**
 * Combined properties for grouped list components
 *
 * This interface combines common props, grouping props, and render props
 * for components that display grouped lists.
 *
 * @interface IGroupedListProps
 */
export interface IGroupedListProps extends ICommonCommandProps, IGroupingProps, IRenderProps {}

/**
 * Combined properties for virtualized list components
 *
 * This interface combines common props, virtualization props, and render props with index
 * for components that display virtualized lists.
 *
 * @interface IVirtualizedListProps
 */
export interface IVirtualizedListProps
	extends ICommonCommandProps,
		IVirtualizationProps,
		IRenderWithIndexProps {
	/** Array of items to render */
	items: Option[];
	/** Maximum height of the virtualized list container */
	maxHeight?: string;
}

/**
 * Combined properties for grouped virtualized list components
 *
 * This interface combines common props, grouping props, virtualization props, and render props
 * for components that display grouped virtualized lists.
 *
 * @interface IGroupedVirtualizedListProps
 */
export interface IGroupedVirtualizedListProps
	extends ICommonCommandProps,
		IGroupingProps,
		IVirtualizationProps,
		IRenderProps {}

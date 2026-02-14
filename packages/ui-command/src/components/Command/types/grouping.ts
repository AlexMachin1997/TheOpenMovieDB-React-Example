import type { Option } from '@repo/core';

/**
 * Configuration options for grouping behavior
 *
 * This interface defines the configuration for organizing items into groups
 * with configurable ordering and positioning.
 *
 * @interface IGrouping
 */
export interface IGrouping {
	/** Array of group names defining the order in which groups should appear */
	groupOrder?: string[];
	/** Position for ungrouped items relative to grouped items */
	ungroupedPosition?: 'top' | 'bottom';
}

/**
 * Result of grouping options into organized collections
 *
 * This interface defines the structure returned by grouping operations,
 * providing both the sorted group names and the organized groups.
 *
 * @interface IGroupedOptions
 */
export interface IGroupedOptions {
	/** Map of group names to arrays of options */
	groups: Map<string | undefined, Option[]>;
	/** Array of group names in the desired order */
	sortedGroups: (string | undefined)[];
}

/**
 * Parameters for grouping options into organized collections
 *
 * This interface defines the parameters required for grouping operations,
 * including the options to group and the grouping configuration.
 *
 * @interface IGroupOptionsParams
 */
export interface IGroupOptionsParams extends IGrouping {
	/** Array of options to group */
	options: Option[];
}

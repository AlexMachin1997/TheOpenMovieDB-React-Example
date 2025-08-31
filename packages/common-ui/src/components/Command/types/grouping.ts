/**
 * Configuration options for grouping behavior
 *
 * This interface defines the configuration for organizing items into groups
 * with configurable ordering and positioning.
 *
 * @interface IBaseGroupedCommand
 */
export interface IBaseGroupedCommand {
	/** Array of group names defining the order in which groups should appear */
	groupOrder?: string[];
	/** Position for ungrouped items relative to grouped items */
	ungroupedPosition?: 'top' | 'bottom';
}

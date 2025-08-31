import { Option } from '~/types/Option';
import { IGroupingProps } from './common-props';

/**
 * Result of grouping options into organized collections
 *
 * This interface defines the structure returned by grouping operations,
 * providing both the sorted group names and the organized groups.
 *
 * @interface GroupedOptions
 */
export interface GroupedOptions {
	/** Map of group names to arrays of options */
	groups: Map<string | undefined, Option[]>;
	/** Array of group names in the desired order */
	sortedGroupNames: (string | undefined)[];
}

/**
 * Parameters for grouping options into organized collections
 *
 * This interface defines the parameters required for grouping operations,
 * including the options to group and the grouping configuration.
 *
 * @interface GroupOptionsParams
 */
export interface GroupOptionsParams extends IGroupingProps {
	/** Array of options to group */
	options: Option[];
}

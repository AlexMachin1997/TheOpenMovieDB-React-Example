import type { Option } from '@repo/core';

/**
 * Builds a lookup Map from each option's `value` to its `label`.
 *
 * @param options - Options to index
 * @returns Map of option value → label (last wins on duplicate values)
 */
export const buildOptionsMap = (options: Option[]): Map<string, string> =>
	new Map(options.map((option) => [option.value, option.label]));

import type { Option } from '@repo/core';

/**
 * Filters options by a search query, matching case-insensitively against the option label.
 *
 * @param options - Options to filter (nullish is treated as an empty list)
 * @param searchValue - Search query; blank/whitespace-only returns all options
 * @returns The options whose label contains the (case-insensitive) search value
 */
export const filterOptions = (options: Option[] | undefined, searchValue: string): Option[] => {
	if (!options) return [];
	if (!searchValue.trim()) return options;

	const searchLower = searchValue.toLowerCase();

	return options.filter((option) => option.label.toLowerCase().includes(searchLower));
};

/**
 * Parameters for building the command empty-state message.
 *
 * @interface IGetEmptyMessageParams
 */
export interface IGetEmptyMessageParams {
	/** Current search query */
	searchValue: string;
	/** Message shown when there are no options at all */
	noOptionsMessage: string;
	/** Message shown when a search yields no results; `{searchTerm}` is replaced with the term */
	noSearchResultsMessage: string;
	/** Optional formatter for the search term; defaults to wrapping it in double quotes */
	formatSearchTerm?: (searchTerm: string) => string;
}

/**
 * Builds the empty-state message for the command palette.
 *
 * When there is an active search, returns `noSearchResultsMessage` with the `{searchTerm}`
 * placeholder replaced by the (formatted) trimmed search term. Otherwise returns
 * `noOptionsMessage`.
 *
 * @param params - The messages, current search value, and optional term formatter
 * @returns The resolved empty-state message
 */
export const getEmptyMessage = ({
	searchValue,
	noOptionsMessage,
	noSearchResultsMessage,
	formatSearchTerm
}: IGetEmptyMessageParams): string => {
	if (searchValue.trim().length > 0) {
		const finalFormatSearchTerm = formatSearchTerm || ((term) => `"${term}"`);
		const formattedSearchTerm = finalFormatSearchTerm(searchValue.trim());
		return noSearchResultsMessage.replace('{searchTerm}', formattedSearchTerm);
	}

	return noOptionsMessage;
};

import { getEmptyMessage } from './emptyMessage';

const baseParams = {
	noOptionsMessage: 'No options currently available',
	noSearchResultsMessage: 'No options for {searchTerm}'
};

describe('getEmptyMessage', () => {
	it('returns the no-options message when the search value is blank or whitespace only', () => {
		expect(getEmptyMessage({ ...baseParams, searchValue: '' })).toBe(baseParams.noOptionsMessage);
		expect(getEmptyMessage({ ...baseParams, searchValue: '   ' })).toBe(
			baseParams.noOptionsMessage
		);
	});

	it('substitutes the search term and quotes it via the default formatter', () => {
		expect(getEmptyMessage({ ...baseParams, searchValue: 'react' })).toBe('No options for "react"');
	});

	it('trims the search term before formatting', () => {
		expect(getEmptyMessage({ ...baseParams, searchValue: '  react  ' })).toBe(
			'No options for "react"'
		);
	});

	it('honours a custom formatSearchTerm', () => {
		expect(
			getEmptyMessage({
				...baseParams,
				searchValue: 'react',
				formatSearchTerm: (term) => `<${term}>`
			})
		).toBe('No options for <react>');
	});
});

import type { Option } from '@repo/core';
import { filterOptions } from './filtering';

const createOption = (overrides?: Partial<Option>): Option => ({
	label: 'Label',
	id: 'id',
	value: 'value',
	...overrides
});

describe('filterOptions', () => {
	it('returns an empty array when options are nullish', () => {
		expect(filterOptions(undefined, 'react')).toEqual([]);
	});

	it('returns all options when the search value is blank or whitespace only', () => {
		const options = [
			createOption({ id: '1', value: '1', label: 'React' }),
			createOption({ id: '2', value: '2', label: 'Vue' })
		];

		expect(filterOptions(options, '')).toBe(options);
		expect(filterOptions(options, '   ')).toBe(options);
	});

	it('matches labels case-insensitively as a substring', () => {
		const react = createOption({ id: '1', value: '1', label: 'React' });
		const preact = createOption({ id: '2', value: '2', label: 'Preact' });
		const vue = createOption({ id: '3', value: '3', label: 'Vue' });

		expect(filterOptions([react, preact, vue], 'ReAcT')).toEqual([react, preact]);
	});

	it('returns an empty array when nothing matches', () => {
		const options = [createOption({ id: '1', value: '1', label: 'React' })];

		expect(filterOptions(options, 'svelte')).toEqual([]);
	});
});

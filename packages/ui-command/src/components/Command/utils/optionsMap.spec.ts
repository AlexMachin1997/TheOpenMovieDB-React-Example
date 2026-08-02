import type { Option } from '@repo/core';
import { buildOptionsMap } from './optionsMap';

const createOption = (overrides?: Partial<Option>): Option => ({
	label: 'Label',
	id: 'id',
	value: 'value',
	...overrides
});

describe('buildOptionsMap', () => {
	it('maps each option value to its label', () => {
		const map = buildOptionsMap([
			createOption({ id: '1', value: 'react', label: 'React' }),
			createOption({ id: '2', value: 'vue', label: 'Vue' })
		]);

		expect(map.get('react')).toBe('React');
		expect(map.get('vue')).toBe('Vue');
		expect(map.size).toBe(2);
	});
});

import { renderHook } from '@testing-library/react';
import type { Option } from '@repo/core';
import { useCommandGroupedOptions } from './useCommandGroupedOptions';

const createOption = (overrides?: Partial<Option>): Option => ({
	label: 'Label',
	id: 'id',
	value: 'value',
	...overrides
});

describe('useCommandGroupedOptions', () => {
	it('groups options via groupOptions, keeping ungrouped under the undefined key', () => {
		const ungrouped = createOption({ id: 'u1', value: 'u1' });
		const grouped = createOption({ id: 'g1', value: 'g1', group: 'Frontend' });

		const { result } = renderHook(() =>
			useCommandGroupedOptions([ungrouped, grouped], { ungroupedPosition: 'top' })
		);

		expect(result.current.sortedGroups).toEqual([undefined, 'Frontend']);
		expect(result.current.groups.get(undefined)).toEqual([ungrouped]);
	});

	it('returns a stable reference across re-renders when inputs are unchanged', () => {
		const options = [createOption({ id: '1', value: '1', group: 'Frontend' })];

		const { result, rerender } = renderHook(
			({ opts }) => useCommandGroupedOptions(opts, { ungroupedPosition: 'top' }),
			{ initialProps: { opts: options } }
		);

		const first = result.current;
		rerender({ opts: options });

		// Memoized: omitting groupOrder must not defeat the memo (regression guard for the
		// old `groupOrder = []` default, which created a new array reference every render).
		expect(result.current).toBe(first);
	});

	it('recomputes when the options reference changes', () => {
		const optionsA = [createOption({ id: '1', value: '1', group: 'Frontend' })];
		const optionsB = [createOption({ id: '2', value: '2', group: 'Backend' })];

		const { result, rerender } = renderHook(
			({ opts }) => useCommandGroupedOptions(opts, { ungroupedPosition: 'top' }),
			{ initialProps: { opts: optionsA } }
		);

		const first = result.current;
		rerender({ opts: optionsB });

		expect(result.current).not.toBe(first);
		expect(result.current.sortedGroups).toEqual(['Backend']);
	});

	it('reacts to filtered options (e.g. from a search input)', () => {
		// Full list before filtering
		const react = createOption({ id: 'r1', value: 'r1', label: 'React', group: 'Frontend' });
		const vue = createOption({ id: 'v1', value: 'v1', label: 'Vue', group: 'Frontend' });
		const express = createOption({ id: 'e1', value: 'e1', label: 'Express', group: 'Backend' });
		const fullOptions = [react, vue, express];

		const { result, rerender } = renderHook(
			({ opts }) => useCommandGroupedOptions(opts, { ungroupedPosition: 'top' }),
			{ initialProps: { opts: fullOptions } }
		);

		// Initial state: both Frontend and Backend groups exist
		expect(result.current.sortedGroups).toContain('Frontend');
		expect(result.current.sortedGroups).toContain('Backend');
		expect(result.current.groups.get('Frontend')).toHaveLength(2);

		// User types "React" → parent filters to matching options only
		const filteredOptions = [react];
		rerender({ opts: filteredOptions });

		// Hook recomputes: only React remains, Backend group is gone
		expect(result.current.sortedGroups).toEqual(['Frontend']);
		expect(result.current.groups.get('Frontend')).toHaveLength(1);
		expect(result.current.groups.get('Backend')).toBeUndefined();
	});
});

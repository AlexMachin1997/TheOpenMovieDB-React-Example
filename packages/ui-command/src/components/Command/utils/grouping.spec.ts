import type { Option } from '@repo/core';
import type { VirtualizedItem } from '~/components/Command/types';
import { groupOptions, getVirtualizedItems, getEstimatedItemHeight } from './grouping';

const createOption = (overrides?: Partial<Option>): Option => ({
	label: 'Label',
	id: 'id',
	value: 'value',
	...overrides
});

describe('groupOptions', () => {
	it('keeps ungrouped options under the undefined key with ungroupedPosition top', () => {
		const ungrouped = createOption({ id: 'u1', value: 'u1' });
		const grouped = createOption({ id: 'g1', value: 'g1', group: 'Frontend' });

		const { groups, sortedGroups } = groupOptions({
			options: [ungrouped, grouped],
			ungroupedPosition: 'top'
		});

		expect(groups.get(undefined)).toEqual([ungrouped]);
		expect(groups.get('Frontend')).toEqual([grouped]);
		expect(sortedGroups).toEqual([undefined, 'Frontend']);
	});

	it('places the ungrouped block last with ungroupedPosition bottom', () => {
		const ungrouped = createOption({ id: 'u1', value: 'u1' });
		const grouped = createOption({ id: 'g1', value: 'g1', group: 'Frontend' });

		const { groups, sortedGroups } = groupOptions({
			options: [ungrouped, grouped],
			ungroupedPosition: 'bottom'
		});

		expect(groups.get(undefined)).toEqual([ungrouped]);
		expect(sortedGroups).toEqual(['Frontend', undefined]);
	});

	it('orders groups by groupOrder first, then remaining named groups alphabetically', () => {
		const options = [
			createOption({ id: '1', value: '1', group: 'Zeta' }),
			createOption({ id: '2', value: '2', group: 'Alpha' }),
			createOption({ id: '3', value: '3', group: 'Backend' }),
			createOption({ id: '4', value: '4', group: 'Frontend' })
		];

		const { sortedGroups } = groupOptions({ options, groupOrder: ['Frontend', 'Backend'] });

		expect(sortedGroups).toEqual(['Frontend', 'Backend', 'Alpha', 'Zeta']);
	});

	it('sorts groups alphabetically when no groupOrder is provided', () => {
		const options = [
			createOption({ id: '1', value: '1', group: 'Charlie' }),
			createOption({ id: '2', value: '2', group: 'Alpha' }),
			createOption({ id: '3', value: '3', group: 'Bravo' })
		];

		const { sortedGroups } = groupOptions({ options });

		expect(sortedGroups).toEqual(['Alpha', 'Bravo', 'Charlie']);
	});

	it('does not add an undefined key when every option has a group', () => {
		const options = [
			createOption({ id: '1', value: '1', group: 'Frontend' }),
			createOption({ id: '2', value: '2', group: 'Backend' })
		];

		const { groups, sortedGroups } = groupOptions({ options });

		expect(groups.has(undefined)).toBe(false);
		expect(sortedGroups).not.toContain(undefined);
	});

	it('returns empty groups and sortedGroups for an empty options array', () => {
		const { groups, sortedGroups } = groupOptions({ options: [] });

		expect(groups.size).toBe(0);
		expect(sortedGroups).toEqual([]);
	});

	it('guards against nullish options', () => {
		// The signature is Option[], but the runtime guard defends against nullish input —
		// the cast exercises that guard, which the types alone would forbid.
		const { groups, sortedGroups } = groupOptions({
			options: undefined as unknown as Option[]
		});

		expect(groups.size).toBe(0);
		expect(sortedGroups).toEqual([]);
	});
});

describe('getVirtualizedItems', () => {
	it('inserts a separator before every group except the first', () => {
		const options = [
			createOption({ id: '1', value: '1', group: 'Frontend' }),
			createOption({ id: '2', value: '2', group: 'Backend' })
		];

		const items = getVirtualizedItems({ options, groupOrder: ['Frontend', 'Backend'] });

		expect(items.filter((item) => item.type === 'separator')).toHaveLength(1);
		// The first emitted item is the first group's header, never a leading separator.
		expect(items[0]?.type).toBe('group-header');
	});

	it('emits a group-header for named groups but not for the ungrouped block', () => {
		const options = [
			createOption({ id: 'u1', value: 'u1' }),
			createOption({ id: 'g1', value: 'g1', group: 'Frontend' })
		];

		const items = getVirtualizedItems({ options, ungroupedPosition: 'top' });

		const headers = items.filter((item) => item.type === 'group-header');
		expect(headers).toHaveLength(1);
		expect(headers[0]).toMatchObject({ type: 'group-header', groupName: 'Frontend' });
	});

	it('produces header-then-options per group, carrying the original option', () => {
		const frontend1 = createOption({ id: 'g1', value: 'g1', group: 'Frontend' });
		const frontend2 = createOption({ id: 'g2', value: 'g2', group: 'Frontend' });

		const items = getVirtualizedItems({ options: [frontend1, frontend2] });

		expect(items).toEqual([
			{ type: 'group-header', id: 'header-Frontend', groupName: 'Frontend' },
			{ type: 'option', id: 'g1', option: frontend1 },
			{ type: 'option', id: 'g2', option: frontend2 }
		]);
	});

	it('returns no items for an empty options array', () => {
		expect(getVirtualizedItems({ options: [] })).toEqual([]);
	});
});

describe('getEstimatedItemHeight', () => {
	it('returns fixed heights for separators and headers and the default size for options', () => {
		const separator: VirtualizedItem = { type: 'separator', id: 'sep' };
		const header: VirtualizedItem = { type: 'group-header', id: 'h', groupName: 'Frontend' };
		const option: VirtualizedItem = { type: 'option', id: '1', option: createOption() };

		expect(getEstimatedItemHeight(separator, 40)).toBe(1);
		expect(getEstimatedItemHeight(header, 40)).toBe(32);
		expect(getEstimatedItemHeight(option, 40)).toBe(40);
		expect(getEstimatedItemHeight(undefined, 40)).toBe(40);
	});
});

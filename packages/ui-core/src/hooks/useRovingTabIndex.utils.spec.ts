import {
	NO_INDEX,
	findEdgeEnabledIndex,
	findNextEnabledIndex,
	resolveInitialTabStop
} from './useRovingTabIndex.utils';

/** Builds an `isDisabled` predicate from the indices that should be disabled. */
const disabledAt =
	(...indices: number[]) =>
	(index: number) =>
		indices.includes(index);

const nothingDisabled = () => false;
const everythingDisabled = () => true;

describe('findNextEnabledIndex', () => {
	it('moves to the adjacent index in either direction', () => {
		const options = { count: 4, isDisabled: nothingDisabled, loop: true };

		expect(findNextEnabledIndex({ ...options, from: 1, step: 1 })).toBe(2);
		expect(findNextEnabledIndex({ ...options, from: 1, step: -1 })).toBe(0);
	});

	it('skips a disabled item', () => {
		const options = { count: 4, isDisabled: disabledAt(1), loop: true };

		expect(findNextEnabledIndex({ ...options, from: 0, step: 1 })).toBe(2);
		expect(findNextEnabledIndex({ ...options, from: 2, step: -1 })).toBe(0);
	});

	it('skips a run of adjacent disabled items', () => {
		const options = { count: 5, isDisabled: disabledAt(1, 2, 3), loop: true };

		expect(findNextEnabledIndex({ ...options, from: 0, step: 1 })).toBe(4);
		expect(findNextEnabledIndex({ ...options, from: 4, step: -1 })).toBe(0);
	});

	it('wraps around both ends when looping', () => {
		const options = { count: 3, isDisabled: nothingDisabled, loop: true };

		expect(findNextEnabledIndex({ ...options, from: 2, step: 1 })).toBe(0);
		expect(findNextEnabledIndex({ ...options, from: 0, step: -1 })).toBe(2);
	});

	it('wraps past a disabled item sitting at the far edge', () => {
		// Walking forward off the end lands on 0, which is disabled, so it must continue to 1.
		expect(
			findNextEnabledIndex({ from: 2, step: 1, count: 3, isDisabled: disabledAt(0), loop: true })
		).toBe(1);
	});

	it('stops at the ends when not looping', () => {
		const options = { count: 3, isDisabled: nothingDisabled, loop: false };

		expect(findNextEnabledIndex({ ...options, from: 2, step: 1 })).toBe(NO_INDEX);
		expect(findNextEnabledIndex({ ...options, from: 0, step: -1 })).toBe(NO_INDEX);
	});

	it('returns NO_INDEX when every item is disabled, rather than looping forever', () => {
		const options = { count: 4, isDisabled: everythingDisabled, loop: true };

		expect(findNextEnabledIndex({ ...options, from: 0, step: 1 })).toBe(NO_INDEX);
		expect(findNextEnabledIndex({ ...options, from: 0, step: -1 })).toBe(NO_INDEX);
	});

	it('returns NO_INDEX for an empty group', () => {
		expect(
			findNextEnabledIndex({ from: 0, step: 1, count: 0, isDisabled: nothingDisabled, loop: true })
		).toBe(NO_INDEX);
	});

	it('stays put in a single-item group, since it is the only candidate', () => {
		const options = { count: 1, isDisabled: nothingDisabled, loop: true };

		expect(findNextEnabledIndex({ ...options, from: 0, step: 1 })).toBe(0);
		expect(findNextEnabledIndex({ ...options, from: 0, step: -1 })).toBe(0);
	});

	it('returns NO_INDEX for a single disabled item', () => {
		expect(
			findNextEnabledIndex({
				from: 0,
				step: 1,
				count: 1,
				isDisabled: everythingDisabled,
				loop: true
			})
		).toBe(NO_INDEX);
	});
});

describe('findEdgeEnabledIndex', () => {
	it('finds the first and last index', () => {
		const options = { count: 4, isDisabled: nothingDisabled };

		expect(findEdgeEnabledIndex({ ...options, edge: 'first' })).toBe(0);
		expect(findEdgeEnabledIndex({ ...options, edge: 'last' })).toBe(3);
	});

	it('skips a disabled item at either edge', () => {
		const options = { count: 4, isDisabled: disabledAt(0, 3) };

		expect(findEdgeEnabledIndex({ ...options, edge: 'first' })).toBe(1);
		expect(findEdgeEnabledIndex({ ...options, edge: 'last' })).toBe(2);
	});

	it('skips a run of disabled items at either edge', () => {
		const options = { count: 5, isDisabled: disabledAt(0, 1, 4) };

		expect(findEdgeEnabledIndex({ ...options, edge: 'first' })).toBe(2);
		expect(findEdgeEnabledIndex({ ...options, edge: 'last' })).toBe(3);
	});

	it('returns NO_INDEX when every item is disabled', () => {
		const options = { count: 3, isDisabled: everythingDisabled };

		expect(findEdgeEnabledIndex({ ...options, edge: 'first' })).toBe(NO_INDEX);
		expect(findEdgeEnabledIndex({ ...options, edge: 'last' })).toBe(NO_INDEX);
	});

	it('returns NO_INDEX for an empty group', () => {
		const options = { count: 0, isDisabled: nothingDisabled };

		expect(findEdgeEnabledIndex({ ...options, edge: 'first' })).toBe(NO_INDEX);
		expect(findEdgeEnabledIndex({ ...options, edge: 'last' })).toBe(NO_INDEX);
	});
});

describe('resolveInitialTabStop', () => {
	it('prefers the checked item over the first one', () => {
		expect(
			resolveInitialTabStop({
				count: 4,
				isDisabled: nothingDisabled,
				isChecked: (index) => index === 2
			})
		).toBe(2);
	});

	it('prefers the first checked item when several are checked', () => {
		// A checkbox group can have more than one selection, unlike a radio group.
		expect(
			resolveInitialTabStop({
				count: 4,
				isDisabled: nothingDisabled,
				isChecked: (index) => index === 1 || index === 3
			})
		).toBe(1);
	});

	it('falls back to the first enabled item when nothing is checked', () => {
		expect(
			resolveInitialTabStop({ count: 3, isDisabled: disabledAt(0), isChecked: () => false })
		).toBe(1);
	});

	it('ignores a checked item that is disabled', () => {
		expect(
			resolveInitialTabStop({
				count: 3,
				isDisabled: disabledAt(1),
				isChecked: (index) => index === 1
			})
		).toBe(0);
	});

	it('returns NO_INDEX when every item is disabled, so the group is skipped by Tab', () => {
		expect(
			resolveInitialTabStop({ count: 3, isDisabled: everythingDisabled, isChecked: () => true })
		).toBe(NO_INDEX);
	});

	it('returns NO_INDEX for an empty group', () => {
		expect(
			resolveInitialTabStop({ count: 0, isDisabled: nothingDisabled, isChecked: () => false })
		).toBe(NO_INDEX);
	});
});

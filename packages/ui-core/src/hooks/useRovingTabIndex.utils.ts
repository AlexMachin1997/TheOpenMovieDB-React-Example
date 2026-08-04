/**
 * The index arithmetic behind `useRovingTabIndex`, kept separate from the hook.
 *
 * Every one of these is pure, and the off-by-one cases (wrapping, disabled items at the edges, a
 * group where everything is disabled) are exactly where a roving-focus implementation goes wrong.
 * Testing them directly is far cheaper than driving a rendered group through a browser to reach the
 * same branch.
 *
 * `NO_INDEX` rather than `null`: every one of these feeds straight into an array lookup or a
 * `tabIndex`, and a single sentinel keeps the callers free of null checks.
 */
export const NO_INDEX = -1;

/** Whether the item at `index` cannot be focused. */
type IsDisabled = (index: number) => boolean;

interface FindNextEnabledIndexOptions {
	/** Where to start from. Not itself considered a candidate. */
	from: number;
	/** `1` to walk forwards, `-1` to walk backwards. */
	step: 1 | -1;
	/** Total number of items in the group. */
	count: number;
	isDisabled: IsDisabled;
	/** Whether to wrap around at the ends. */
	loop: boolean;
}

/**
 * The next enabled index in `step`'s direction, skipping disabled items.
 *
 * Returns `NO_INDEX` when there is no such item — an empty group, a group where everything else is
 * disabled, or walking off the end with `loop` off.
 */
export const findNextEnabledIndex = ({
	from,
	step,
	count,
	isDisabled,
	loop
}: FindNextEnabledIndexOptions): number => {
	if (count <= 0) return NO_INDEX;

	// At most one full lap. Without this bound, a group of entirely disabled items would spin
	// forever once `loop` is on.
	for (let offset = 1; offset <= count; offset++) {
		let candidate = from + step * offset;

		if (loop) {
			// `%` keeps the sign of the dividend in JS, so a bare `candidate % count` returns a
			// negative index when walking backwards past zero.
			candidate = ((candidate % count) + count) % count;
		} else if (candidate < 0 || candidate >= count) {
			return NO_INDEX;
		}

		if (!isDisabled(candidate)) return candidate;
	}

	return NO_INDEX;
};

interface FindEdgeEnabledIndexOptions {
	/** Which end of the group to reach for. */
	edge: 'first' | 'last';
	count: number;
	isDisabled: IsDisabled;
}

/**
 * The first or last enabled index — what `Home`/`PageUp` and `End`/`PageDown` move to.
 *
 * Note this is the first *enabled* item, not simply index `0`: a disabled option sitting at either
 * end must be skipped rather than focused.
 */
export const findEdgeEnabledIndex = ({
	edge,
	count,
	isDisabled
}: FindEdgeEnabledIndexOptions): number => {
	if (count <= 0) return NO_INDEX;

	if (edge === 'first') {
		for (let index = 0; index < count; index++) {
			if (!isDisabled(index)) return index;
		}

		return NO_INDEX;
	}

	for (let index = count - 1; index >= 0; index--) {
		if (!isDisabled(index)) return index;
	}

	return NO_INDEX;
};

interface ResolveInitialTabStopOptions {
	count: number;
	isDisabled: IsDisabled;
	/** Whether the item at `index` is currently selected. */
	isChecked: (index: number) => boolean;
}

/**
 * Which item owns the group's single tab stop before anything has been focused.
 *
 * Mirrors Radix's `RovingFocusGroup.Item active={checked}`: the checked item, so tabbing into a
 * group lands on the current selection rather than always on the first option. Falls back to the
 * first enabled item, and to `NO_INDEX` when every item is disabled — in which case the group is
 * skipped by Tab entirely, which is also what Radix does.
 */
export const resolveInitialTabStop = ({
	count,
	isDisabled,
	isChecked
}: ResolveInitialTabStopOptions): number => {
	if (count <= 0) return NO_INDEX;

	for (let index = 0; index < count; index++) {
		if (!isDisabled(index) && isChecked(index)) return index;
	}

	return findEdgeEnabledIndex({ edge: 'first', count, isDisabled });
};

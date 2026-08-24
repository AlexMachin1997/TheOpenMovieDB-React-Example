import * as React from 'react';
import { defaultRangeExtractor, type Range } from '@tanstack/react-virtual';
import { useIsomorphicLayoutEffect } from '@repo/ui-core';

/**
 * Keeps the active option inside a virtualizer's rendered range.
 *
 * cmdk points `aria-activedescendant` at the active option's id and recomputes it only when the
 * selected *value* changes. A virtualizer evicting that option's node on scroll therefore leaves
 * the attribute naming an element that no longer exists. cmdk's own recovery runs only if the
 * removed node happened to be the selected one and was still attached at unmount — and when it does
 * run it moves the selection to the first item, so the user's choice changes because they scrolled.
 * Both outcomes are wrong.
 *
 * This is not sticky positioning: the row keeps its own offset, far outside the viewport, and is
 * simply not evicted. At most one extra row, and none while the active option is on screen.
 *
 * The index is read back from the `data-index` the rows already carry — an option must be rendered
 * once to become selectable, which is exactly when its index becomes knowable.
 *
 * @param sizerRef - a ref to the element wrapping the virtual rows
 * @returns a `rangeExtractor` for `useVirtualizer`
 */
export const useKeepActiveOptionRendered = (sizerRef: React.RefObject<HTMLElement | null>) => {
	const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

	useIsomorphicLayoutEffect(() => {
		// role/aria-selected rather than cmdk's own `cmdk-item` marker: that is ARIA, which any
		// listbox implementation has to emit, not a detail of the library underneath.
		const active = sizerRef.current?.querySelector('[role="option"][aria-selected="true"]');
		const index = active?.closest('[data-index]')?.getAttribute('data-index');

		// Absent means the active option is currently evicted — keep the last index we saw, which is
		// the one that has to stay rendered.
		if (index != null) setActiveIndex(Number(index));
	});

	return React.useCallback(
		(range: Range) => {
			const indexes = defaultRangeExtractor(range);

			// A stale index survives a filter change until the next render re-reads the DOM
			if (activeIndex === null || activeIndex >= range.count) return indexes;
			if (indexes.includes(activeIndex)) return indexes;

			return [activeIndex, ...indexes].sort((a, b) => a - b);
		},
		[activeIndex]
	);
};

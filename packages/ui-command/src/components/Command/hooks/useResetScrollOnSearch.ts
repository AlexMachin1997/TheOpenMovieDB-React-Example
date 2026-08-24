import { useIsomorphicLayoutEffect } from '@repo/ui-core';

/**
 * Scrolls a virtualized list back to the top when the search term changes.
 *
 * Filtering does not move the scroll position, so a search issued while the list is scrolled leaves
 * it wherever it was. If the new result set is still taller than the viewport the browser has no
 * reason to clamp the offset to zero, so the first matches sit above the window — and because they
 * are virtualized they are never rendered at all. cmdk selects the first match but cannot scroll it
 * into view, because the node does not exist.
 *
 * Layout, not passive, so the correction happens before paint rather than as a visible jump.
 *
 * Only the search term resets the position. A caller replacing `options` — appending a page of
 * results, say — keeps its place, which is the behaviour that case wants.
 */
export const useResetScrollOnSearch = (
	virtualizer: { scrollToOffset: (offset: number) => void },
	searchValue: string
) => {
	useIsomorphicLayoutEffect(() => {
		virtualizer.scrollToOffset(0);
	}, [virtualizer, searchValue]);
};

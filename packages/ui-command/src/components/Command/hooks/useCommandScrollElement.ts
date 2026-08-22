import * as React from 'react';

const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

/**
 * Resolves the scroll container a virtualized list measures against.
 *
 * List variants render items only — the surrounding `CommandList` belongs to whoever composes the
 * palette, so a virtualizer cannot hold a ref to it. A ref passed down from that ancestor would not
 * work either: React attaches refs children-first, so an ancestor's ref is still `null` while a
 * descendant's layout effect runs, and a ref assignment schedules no re-render to correct it.
 *
 * The DOM is already connected by then, though, so the node can simply be looked up.
 *
 * **Call this before `useVirtualizer`.** Effects fire in hook-declaration order, and
 * `useVirtualizer` reads `getScrollElement()` from a layout effect of its own. Declared second,
 * this hook populates the ref after that read and the list renders empty.
 *
 * @param ref - a ref to any element rendered inside the list
 * @returns a stable `getScrollElement` callback for `useVirtualizer`
 */
export const useCommandScrollElement = (ref: React.RefObject<HTMLElement | null>) => {
	const scrollElementRef = React.useRef<HTMLElement | null>(null);

	useIsomorphicLayoutEffect(() => {
		scrollElementRef.current = ref.current?.closest('[data-slot="command-list"]') ?? null;
	});

	return React.useCallback(() => scrollElementRef.current, []);
};

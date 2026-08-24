import { lockScroll, unlockScroll } from '~/components/Overlay/utils/scrollLock';
import { useIsomorphicLayoutEffect } from '~/components/Overlay/hooks/useIsomorphicLayoutEffect';

/**
 * Hold the scroll lock for as long as `enabled` is true.
 *
 * Pass "mounted", not "open". Releasing on `open` would unlock the page while the overlay is still
 * animating out, and the scrollbar reappearing mid-exit shifts everything sideways.
 */
export const useScrollLock = (enabled: boolean) => {
	useIsomorphicLayoutEffect(() => {
		if (!enabled) return;

		lockScroll();
		return unlockScroll;
	}, [enabled]);
};

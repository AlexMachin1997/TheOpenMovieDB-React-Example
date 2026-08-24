import * as React from 'react';

import { useIsomorphicLayoutEffect } from '@repo/ui-core';

/**
 * Track whether a scroll container is actually scrolling anything.
 *
 * An `overflow-y: auto` region that a keyboard user cannot reach is a region they cannot scroll,
 * which is what `scrollable-region-focusable` is about — but that only applies once the content
 * genuinely overflows. Making the box a tab stop unconditionally gives every dialog a focus ring
 * around its body and, because the body sits before the footer in the DOM, hands it the initial
 * focus as well.
 *
 * So the tab stop is conditional. Measured on every commit (content changes size when children do)
 * and on resize (the box changes size when the viewport does).
 */
export const useScrollableRegion = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [isScrollable, setIsScrollable] = React.useState(false);

	// No dependency array on purpose: children can change height without changing this component's
	// props, and a re-measure is two property reads.
	useIsomorphicLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const measure = () => {
			setIsScrollable(element.scrollHeight > element.clientHeight);
		};

		measure();

		const observer = new ResizeObserver(measure);
		observer.observe(element);

		return () => observer.disconnect();
	});

	return { ref, isScrollable };
};

import type * as React from 'react';

import type { PopoverAlign, PopoverSide } from '~/components/Popover/Popover.types';

/** The one distance between every popover and its trigger. */
const GAP = '0.25rem';

/**
 * `position-area` for each side and alignment. `start` spans from the trigger towards the far edge,
 * so the two leading edges line up; `end` is its mirror. `center` spans all three tracks, which
 * centres the popover on the trigger.
 */
const POSITION_AREA: Record<PopoverSide, Record<PopoverAlign, string>> = {
	top: { start: 'top span-right', center: 'top', end: 'top span-left' },
	bottom: { start: 'bottom span-right', center: 'bottom', end: 'bottom span-left' },
	left: { start: 'left span-bottom', center: 'left', end: 'left span-top' },
	right: { start: 'right span-bottom', center: 'right', end: 'right span-top' }
};

/**
 * The gap sits on the side facing the trigger, and the first fallback is the opposite side. The
 * `flip-*` tactics mirror margins along with the area, so a flipped popover keeps its gap. Flipping
 * across the other axis swaps `start` for `end`, which is what stands in for sliding along the edge.
 */
const SIDE_STYLE: Record<PopoverSide, React.CSSProperties> = {
	top: {
		marginBottom: GAP,
		positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline'
	},
	bottom: {
		marginTop: GAP,
		positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline'
	},
	left: {
		marginRight: GAP,
		positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline'
	},
	right: {
		marginLeft: GAP,
		positionTryFallbacks: 'flip-inline, flip-block, flip-block flip-inline'
	}
};

/**
 * Inline positioning for a popover anchored to `anchorName`. All of it is CSS, so the browser keeps
 * it attached through scrolling and resizing with no measurement in script.
 */
export const getPopoverPosition = (
	anchorName: string,
	side: PopoverSide,
	align: PopoverAlign
): React.CSSProperties => ({
	positionAnchor: anchorName,
	positionArea: POSITION_AREA[side][align],
	...SIDE_STYLE[side]
});

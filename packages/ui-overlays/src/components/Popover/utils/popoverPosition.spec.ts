import { describe, expect, it } from 'vitest';

import { getPopoverPosition } from '~/components/Popover/utils/popoverPosition';

describe('getPopoverPosition', () => {
	it('positions against the anchor it is given', () => {
		expect(getPopoverPosition('--popover-r0', 'bottom', 'center').positionAnchor).toBe(
			'--popover-r0'
		);
	});

	it.each([
		['top', 'start', 'top span-right'],
		['top', 'center', 'top'],
		['top', 'end', 'top span-left'],
		['bottom', 'start', 'bottom span-right'],
		['bottom', 'center', 'bottom'],
		['bottom', 'end', 'bottom span-left'],
		['left', 'start', 'left span-bottom'],
		['left', 'center', 'left'],
		['left', 'end', 'left span-top'],
		['right', 'start', 'right span-bottom'],
		['right', 'center', 'right'],
		['right', 'end', 'right span-top']
	] as const)('puts side %s, align %s in the `%s` area', (side, align, area) => {
		expect(getPopoverPosition('--anchor', side, align).positionArea).toBe(area);
	});

	it.each([
		['top', 'marginBottom'],
		['bottom', 'marginTop'],
		['left', 'marginRight'],
		['right', 'marginLeft']
	] as const)('puts the gap for side %s on %s, the edge facing the trigger', (side, margin) => {
		expect(getPopoverPosition('--anchor', side, 'center')[margin]).toBe('0.25rem');
	});

	it.each([
		['top', 'flip-block', '--popover-shrink-top', '--popover-shrink-bottom'],
		['bottom', 'flip-block', '--popover-shrink-bottom', '--popover-shrink-top'],
		['left', 'flip-inline', '--popover-shrink-left', '--popover-shrink-right'],
		['right', 'flip-inline', '--popover-shrink-right', '--popover-shrink-left']
	] as const)(
		'for side %s, tries the opposite side first and shrinking last, its own side before the other',
		(side, firstFlip, ownShrink, oppositeShrink) => {
			const fallbacks = String(getPopoverPosition('--anchor', side, 'center').positionTryFallbacks)
				.split(',')
				.map((option) => option.trim());

			expect(fallbacks[0]).toBe(firstFlip);
			expect(fallbacks.slice(-2)).toEqual([ownShrink, oppositeShrink]);
		}
	);
});

import { expect } from 'storybook/test';

/**
 * Returns the open popover's surface.
 *
 * Found by its `data-slot`, a published contract, because a date picker's popover has no name and
 * therefore no role to find it by.
 */
export const getPopoverSurface = () => {
	const surface = document.querySelector<HTMLElement>('[data-slot="popover-content"]:popover-open');

	if (!surface) throw new Error('No popover is open');

	return surface;
};

/**
 * Asserts `surface` sits directly below `trigger`, or directly above it if it flipped. A popover
 * whose anchor failed to resolve still renders — somewhere else entirely.
 *
 * Throws rather than resolving, so it can sit inside `waitFor` while a sheet finishes sliding in.
 */
export const expectAnchoredTo = (surface: HTMLElement, trigger: HTMLElement) => {
	const surfaceBox = surface.getBoundingClientRect();
	const triggerBox = trigger.getBoundingClientRect();

	const gap = Math.min(
		Math.abs(surfaceBox.top - triggerBox.bottom),
		Math.abs(triggerBox.top - surfaceBox.bottom)
	);

	expect(gap).toBeLessThanOrEqual(8);
};

/**
 * Asserts a real click at the centre of `element` would land on it. A popover painted behind a
 * modal still renders and still reads correctly; only hit-testing gives it away.
 */
export const expectHitTarget = (element: HTMLElement) => {
	const { left, top, width, height } = element.getBoundingClientRect();

	expect(element.contains(document.elementFromPoint(left + width / 2, top + height / 2))).toBe(
		true
	);
};

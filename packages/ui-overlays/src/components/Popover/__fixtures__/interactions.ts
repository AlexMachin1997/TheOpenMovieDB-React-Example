import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { IPopoverContent } from '~/components/Popover/Popover.types';

export type Side = NonNullable<IPopoverContent['side']>;

export const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];

export const OPPOSITE: Record<Side, Side> = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
};

/**
 * Open a story's popover and return its content element.
 *
 * Resolved through the trigger's `aria-controls` rather than by role, because an unnamed popover has
 * no role to query by.
 */
export const openPopover = async (container: HTMLElement, trigger: RegExp) => {
	const button = within(container).getByRole('button', { name: trigger });

	await userEvent.click(button);
	await expect(button).toHaveAttribute('aria-expanded', 'true');

	return waitFor(() => {
		const content = document.getElementById(button.getAttribute('aria-controls') ?? '');
		if (!content?.matches(':popover-open')) throw new Error('The trigger opened no popover');
		return content;
	});
};

/** Wait until a trigger reports its popover closed. */
export const expectClosed = (trigger: HTMLElement) =>
	waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

/**
 * Asserts the popover sits on `side` of its trigger, clear of it and entirely on screen.
 *
 * Measured rather than read from styles: the browser picks among the fallback positions itself, and
 * nothing exposes which one it chose. Throws rather than resolving, so it can sit inside `waitFor` —
 * the choice is made at the next layout, not when the popover opens.
 */
export const expectPlacedOn = (surface: HTMLElement, trigger: HTMLElement, side: Side) => {
	const box = surface.getBoundingClientRect();
	const anchor = trigger.getBoundingClientRect();

	const gap = {
		top: anchor.top - box.bottom,
		right: box.left - anchor.right,
		bottom: box.top - anchor.bottom,
		left: anchor.left - box.right
	}[side];

	// A negative gap is a popover covering its own trigger.
	expect(Math.round(gap)).toBeGreaterThanOrEqual(0);
	expect(Math.round(gap)).toBeLessThanOrEqual(8);

	expect(Math.round(box.left)).toBeGreaterThanOrEqual(0);
	expect(Math.round(box.top)).toBeGreaterThanOrEqual(0);
	expect(Math.round(box.right)).toBeLessThanOrEqual(window.innerWidth);
	expect(Math.round(box.bottom)).toBeLessThanOrEqual(window.innerHeight);
};

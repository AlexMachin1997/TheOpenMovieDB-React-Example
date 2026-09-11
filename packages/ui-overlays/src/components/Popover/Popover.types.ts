import * as React from 'react';

/** Which side of the trigger a popover opens on, before it flips for lack of room. */
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';

/** How a popover lines up with its trigger along that side. */
export type PopoverAlign = 'start' | 'center' | 'end';

/** Properties for the Popover root component. */
export interface IPopover {
	/** Controlled open state. Supplying this makes the popover controlled. */
	open?: boolean;

	/** Initial state when uncontrolled. */
	defaultOpen?: boolean;

	/**
	 * Called on every open and close, whichever route closed it: Escape, a click outside, focus
	 * moving outside, the trigger, or the close button. A popover's close cannot be refused.
	 */
	onOpenChange?: (open: boolean) => void;

	children?: React.ReactNode;
}

/** Properties for PopoverTrigger. */
export interface IPopoverTrigger extends Omit<React.ComponentProps<'button'>, 'ref'> {
	/** Render the child element instead of a `button`, merging props onto it. */
	asChild?: boolean;
}

/** Properties for PopoverContent. */
export interface IPopoverContent
	// `role` is removed because the component alone decides it: `group` when the popover has a name,
	// none when it does not. `title` is an HTML attribute that would otherwise mean two things, and
	// `popover` and `ref` are the component's own.
	extends Omit<React.ComponentProps<'div'>, 'role' | 'title' | 'popover' | 'ref'> {
	/**
	 * Visible text that names the popover, announced as it is entered. Rendered as plain text, not a
	 * heading: the right heading level depends on the page around the trigger, which the popover
	 * cannot see.
	 *
	 * Pass one for a popover holding content of its own — a form, a set of filters. A `Select` or a
	 * date picker announces itself through its contents and needs none. With no visible title, name
	 * the popover with `aria-label` instead; `aria-labelledby` and `aria-label` both outrank this.
	 */
	title?: React.ReactNode;

	/** Supporting text under the title. Supplying it describes the popover. */
	description?: React.ReactNode;

	/**
	 * Which side of the trigger to open on. The popover flips to the opposite side when there is no
	 * room, and every popover sits the same distance from its trigger.
	 *
	 * When neither side has room, it stays on this side and shrinks to the space there, scrolling
	 * inside. That fallback needs `@repo/ui-overlays/styles.css` imported once by the app; without
	 * it the popover still flips, but slides over its trigger when nothing fits.
	 * @default 'bottom'
	 */
	side?: PopoverSide;

	/**
	 * How the popover lines up with the trigger along that side. `start` lines up their leading
	 * edges, which suits a popover wider than its trigger.
	 * @default 'center'
	 */
	align?: PopoverAlign;

	/**
	 * Whether to show a close (X) button. Escape, a click outside and focus moving away close the
	 * popover whether or not it has one.
	 * @default false
	 */
	showCloseButton?: boolean;
}

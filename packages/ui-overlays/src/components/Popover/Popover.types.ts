import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/** Properties for the Popover root component. */
export interface IPopover extends React.ComponentProps<typeof PopoverPrimitive.Root> {}

/** Properties for PopoverTrigger. */
export interface IPopoverTrigger extends React.ComponentProps<typeof PopoverPrimitive.Trigger> {}

/** Properties for PopoverContent. */
export interface IPopoverContent
	// `role` is removed because the component alone decides it: `group` when the popover has a name,
	// none when it does not. `title` is an HTML attribute that would otherwise mean two things.
	extends Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, 'role' | 'title'> {
	className?: string;

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
}

import * as React from 'react';

interface IPopoverRootContext {
	/** Whether the popover is open. Drives `aria-expanded` on the trigger. */
	open: boolean;

	/** The single write path into open state. */
	setOpen: (open: boolean) => void;

	/** The content element's id, which the trigger's `aria-controls` points at. */
	contentId: string;

	/** The `<dashed-ident>` the trigger publishes as `anchor-name` and the content positions against. */
	anchorName: string;

	/** The trigger element: the popover's `source` when shown, and exempt from dismissal. */
	triggerNode: HTMLElement | null;

	setTriggerNode: (node: HTMLElement | null) => void;

	/** Called with `true` when a pointer presses the trigger, and `false` when it lets go. */
	setPressingTrigger: (pressing: boolean) => void;

	/** Whether a pointer is pressing the trigger right now. */
	isPressingTrigger: () => boolean;
}

/**
 * Internal. What a popover's trigger and content share. They are siblings, so neither can hand the
 * other anything directly.
 */
export const PopoverRootContext = React.createContext<IPopoverRootContext | null>(null);

export type { IPopoverRootContext };

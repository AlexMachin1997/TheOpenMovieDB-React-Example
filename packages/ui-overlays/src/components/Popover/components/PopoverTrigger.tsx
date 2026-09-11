import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { usePopoverRootContext } from '~/components/Popover/hooks/usePopoverRootContext';

import type { IPopoverTrigger } from '~/components/Popover/Popover.types';

export const PopoverTrigger = ({
	asChild = false,
	style,
	onClick,
	onPointerDown,
	onPointerUp,
	onPointerCancel,
	onPointerLeave,
	...props
}: IPopoverTrigger) => {
	const { open, setOpen, contentId, anchorName, triggerNode, setTriggerNode, setPressingTrigger } =
		usePopoverRootContext();

	// `popovertarget` below only works on a `<button>`. On anything else the trigger loses its
	// exemption from light dismiss, and clicking it while the popover is open closes the popover and
	// reopens it — which looks like a popover bug, so it is said out loud.
	React.useEffect(() => {
		if (!triggerNode || triggerNode instanceof HTMLButtonElement) return;

		console.warn(
			`[ui-overlays] PopoverTrigger: the trigger is a <${triggerNode.tagName.toLowerCase()}>, not a <button>. Clicking it while its popover is open will close the popover and reopen it. Render a button, or pass one through \`asChild\`.`
		);
	}, [triggerNode]);

	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='popover-trigger'
			// `type` is only meaningful on a real button, and defaulting it stops a trigger inside a
			// form submitting it. With `asChild` the child owns its own element and its own type.
			type={asChild ? undefined : 'button'}
			aria-expanded={open}
			aria-controls={contentId}
			// What exempts a press on this trigger from the browser's light dismiss. Without it, clicking
			// an open popover's trigger closes it on the press and the click reopens it. Registering the
			// trigger as `showPopover()`'s `source` does not do this: measured in Chrome 148, only
			// `popovertarget` does. It needs a `<button>`, so an `asChild` child of any other element
			// loses the exemption.
			popoverTarget={contentId}
			{...props}
			ref={setTriggerNode}
			// The anchor the content positions against, named per popover.
			style={{ anchorName, ...style }}
			onPointerDown={(event) => {
				onPointerDown?.(event);
				setPressingTrigger(true);
			}}
			onPointerUp={(event) => {
				onPointerUp?.(event);
				setPressingTrigger(false);
			}}
			onPointerCancel={(event) => {
				onPointerCancel?.(event);
				setPressingTrigger(false);
			}}
			onPointerLeave={(event) => {
				onPointerLeave?.(event);
				setPressingTrigger(false);
			}}
			// A toggle, so clicking an open popover's trigger closes it. The caller's handler runs
			// first, and `preventDefault()` is how a call site opts out for one interaction.
			onClick={(event) => {
				onClick?.(event);
				const optedOut = event.defaultPrevented;

				// Always cancelled, which stops `popovertarget` toggling the element itself: open state
				// belongs to React, and the element follows it.
				event.preventDefault();

				if (!optedOut) setOpen(!open);
			}}
		/>
	);
};

PopoverTrigger.displayName = 'PopoverTrigger';

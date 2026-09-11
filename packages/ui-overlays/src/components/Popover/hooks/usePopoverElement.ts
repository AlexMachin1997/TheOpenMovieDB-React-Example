import * as React from 'react';

import { useIsomorphicLayoutEffect } from '@repo/ui-core';
import { focusInitialElement } from '~/components/Overlay/utils/focusInitialElement';
import { waitForExit } from '~/components/Overlay/utils/waitForExit';

declare global {
	// Augments the DOM's own interface, whose name is not ours to prefix. `source` shipped in Chrome
	// 137, Firefox 144 and Safari 26, and is not in TypeScript's DOM lib yet.
	// eslint-disable-next-line @typescript-eslint/naming-convention -- see above
	interface HTMLElement {
		showPopover(options?: { source?: HTMLElement | undefined }): void;
	}
}

interface IUsePopoverElement {
	/** The React-side open state. */
	open: boolean;

	/** The single write path back into it. */
	setOpen: (open: boolean) => void;

	/** The trigger, which is the popover's source and never counts as outside it. */
	triggerNode: HTMLElement | null;

	/** Whether a pointer is pressing the trigger right now. */
	isPressingTrigger: () => boolean;
}

/**
 * Drive a native `popover="auto"` element from React state, and report every close back to it.
 *
 * The browser owns most of the closing — Escape, light dismiss, another popover taking the stack —
 * and none of it can be refused. So every route, the browser's and ours alike, ends in the element
 * being hidden, and one `beforetoggle` listener tells React. That is what makes `onOpenChange(false)`
 * fire exactly once whichever route got there first: hiding a popover that is already hidden
 * dispatches nothing.
 */
export const usePopoverElement = ({
	open,
	setOpen,
	triggerNode,
	isPressingTrigger
}: IUsePopoverElement) => {
	// State, not a ref: the effects below have to run again when the node arrives.
	const [popoverNode, setPopoverNode] = React.useState<HTMLDivElement | null>(null);

	// Children exist from the commit after the element is shown until its exit fade has finished.
	const [present, setPresent] = React.useState(false);

	// Set around our own `hidePopover()`, so the listener can tell React closing the element from
	// anything else closing it. `beforetoggle` dispatches synchronously, so the flag never outlives
	// the call.
	const selfClosing = React.useRef(false);

	const dismiss = React.useCallback(() => {
		popoverNode?.hidePopover();
	}, [popoverNode]);

	useIsomorphicLayoutEffect(() => {
		if (!popoverNode) return;

		// A native listener rather than React's `onBeforeToggle`: React calls a handler on every
		// ancestor with the prop, so a popover nested in this one closing would report as this one
		// closing too — the bug `useDialogElement` hit with `onClose`.
		const onBeforeToggle = (event: ToggleEvent) => {
			if (event.newState !== 'closed' || selfClosing.current) return;

			setOpen(false);
		};

		popoverNode.addEventListener('beforetoggle', onBeforeToggle);
		return () => popoverNode.removeEventListener('beforetoggle', onBeforeToggle);
	}, [popoverNode, setOpen]);

	useIsomorphicLayoutEffect(() => {
		if (!popoverNode) return;

		if (open) {
			// `showPopover()` throws `InvalidStateError` on a popover already showing, which reopening
			// mid-exit or a StrictMode double effect both reach. `:popover-open` is live, so it cannot
			// go stale.
			if (!popoverNode.matches(':popover-open')) {
				// The trigger as `source` makes it the popover's invoker, which is how the browser nests a
				// popover opened from inside another. It does not exempt the trigger from light dismiss:
				// `popovertarget` on the trigger does that.
				popoverNode.showPopover({ source: triggerNode ?? undefined });
			}

			// Children mount a commit after the element shows, not alongside it. React focuses an
			// `autoFocus` element as it mounts, and an element inside a hidden popover cannot take
			// focus. A layout effect, so both commits land before the browser paints.
			setPresent(true);
			return;
		}

		if (popoverNode.matches(':popover-open')) {
			selfClosing.current = true;
			popoverNode.hidePopover();
			selfClosing.current = false;
		}
	}, [open, popoverNode, triggerNode]);

	useIsomorphicLayoutEffect(() => {
		if (!open || !present || !popoverNode) return;

		// An `autoFocus` child already took focus as it mounted. Leave it there.
		if (popoverNode.contains(document.activeElement)) return;

		focusInitialElement(popoverNode, null);
	}, [open, present, popoverNode]);

	useIsomorphicLayoutEffect(() => {
		if (open || !present || !popoverNode) return;

		const controller = new AbortController();

		// The fade is a CSS transition on `:popover-open`, so it runs whoever closed the element.
		// Children stay until it ends, which is what fades them out rather than an empty box.
		void waitForExit([popoverNode], controller.signal).then(() => {
			if (controller.signal.aborted) return;

			setPresent(false);
		});

		return () => controller.abort();
	}, [open, present, popoverNode]);

	React.useEffect(() => {
		if (!open || !popoverNode) return;

		const isInside = (target: EventTarget | null) =>
			target instanceof Node && popoverNode.contains(target);

		const isOnTrigger = (target: EventTarget | null) =>
			target instanceof Node && Boolean(triggerNode?.contains(target));

		// The browser's own light dismiss ignores synthetic input, which is all a `play()` can
		// produce, so this closes on a press outside for both. On a real press the browser may get
		// there first, and hiding a hidden popover does nothing. The trigger is exempt because its
		// click is the toggle.
		const onPointerDown = (event: PointerEvent) => {
			if (isInside(event.target) || isOnTrigger(event.target)) return;

			dismiss();
		};

		// Focus arriving somewhere outside, not merely leaving: switching tabs or clicking empty
		// space sends focus nowhere, and that is not the user moving on. Tab past the last element
		// lands here too, which is how Tab out of a popover closes it.
		const onFocusIn = (event: FocusEvent) => {
			if (isInside(event.target)) return;

			// A press on the trigger focuses it before its click toggles the popover shut. Closing
			// here as well would hand that click a closed popover to reopen.
			if (isOnTrigger(event.target) && isPressingTrigger()) return;

			dismiss();
		};

		document.addEventListener('pointerdown', onPointerDown, true);
		document.addEventListener('focusin', onFocusIn);

		return () => {
			document.removeEventListener('pointerdown', onPointerDown, true);
			document.removeEventListener('focusin', onFocusIn);
		};
	}, [open, popoverNode, triggerNode, dismiss, isPressingTrigger]);

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== 'Escape' || event.defaultPrevented) return;

		// A synthetic Escape never reaches the browser's close watcher, so without this Escape is
		// untestable. `preventDefault()` also stops a dialog around the popover, or a popover it is
		// nested in, closing on the same press.
		event.preventDefault();
		dismiss();
	};

	return { popoverRef: setPopoverNode, present, dismiss, onKeyDown };
};

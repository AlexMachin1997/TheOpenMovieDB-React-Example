import * as React from 'react';

import { useIsomorphicLayoutEffect } from '~/components/Overlay/hooks/useIsomorphicLayoutEffect';
import { focusInitialElement } from '~/components/Overlay/utils/focusInitialElement';
import { waitForExit } from '~/components/Overlay/utils/waitForExit';

import type {
	IOverlayCloseEvent,
	OverlayCloseSource
} from '~/components/Overlay/types/overlay-ref';

interface IUseDialogElement {
	/** The React-side open state. */
	open: boolean;

	/** The single write path back into it. */
	setOpen: (open: boolean) => void;

	/** Given the chance to refuse every close. */
	onRequestClose?: (event: IOverlayCloseEvent) => void;
}

/**
 * Drive a native `<dialog>` from React state, and route every close back through one handler.
 *
 * Native dialogs are imperative — `showModal()` and `close()` — while everything around them is
 * declarative, and keeping the two in step is the whole job of this hook.
 */
export const useDialogElement = ({ open, setOpen, onRequestClose }: IUseDialogElement) => {
	// State, not a ref: an anchored overlay reading this node through context has to re-render when
	// it arrives, and a ref assignment does not trigger one.
	const [dialogNode, setDialogNode] = React.useState<HTMLDialogElement | null>(null);
	const panelRef = React.useRef<HTMLDivElement | null>(null);

	// Children exist from the commit `open` flips true until the exit animation has finished. Both
	// halves matter: mounting a commit late would start the entry animation on an empty box, and
	// leaving them mounted while closed would make `queryByText` find a hidden dialog's contents.
	const [present, setPresent] = React.useState(open);
	if (open && !present) {
		setPresent(true);
	}

	// Set immediately before our own `close()` so the element's `close` event can tell that apart
	// from something else closing it. The event is queued rather than dispatched synchronously, so
	// the flag is cleared by the handler and not by the caller.
	const selfClosing = React.useRef(false);

	useIsomorphicLayoutEffect(() => {
		if (!dialogNode) return;

		if (open) {
			// `showModal()` throws `InvalidStateError` on a dialog that is already open, which a
			// double-clicked trigger, a StrictMode double effect, or reopening mid-exit all reach.
			// `open` is a live DOM property, so this guard cannot go stale.
			if (!dialogNode.open) {
				dialogNode.showModal();
				focusInitialElement(dialogNode, panelRef.current);
			}

			return;
		}

		if (!dialogNode.open) {
			setPresent(false);
			return;
		}

		const controller = new AbortController();

		// `data-state='closed'` was applied in this same commit, so the exit animation is already
		// running. Holding the element open until it finishes keeps it in the top layer for the
		// whole exit, which is exactly what the Chromium-only `overlay` property exists to provide.
		void waitForExit([dialogNode, panelRef.current], controller.signal).then(() => {
			if (controller.signal.aborted) return;

			selfClosing.current = true;
			dialogNode.close();
			setPresent(false);
		});

		return () => controller.abort();
	}, [open, dialogNode]);

	const requestClose = React.useCallback(
		(source: OverlayCloseSource, nativeEvent?: Event) => {
			if (!open) return;

			let prevented = false;

			const event: IOverlayCloseEvent = {
				source,
				nativeEvent,
				get defaultPrevented() {
					return prevented;
				},
				preventDefault: () => {
					prevented = true;
				}
			};

			onRequestClose?.(event);

			// Nothing closed the element, so a refusal leaves it genuinely open rather than visually
			// open and internally closed.
			if (prevented) return;

			setOpen(false);
		},
		[open, onRequestClose, setOpen]
	);

	const onCancel = (event: React.SyntheticEvent<HTMLDialogElement, Event>) => {
		// Always refuse the browser's own close, then decide separately. Letting it through would
		// skip both the veto and the exit animation.
		event.preventDefault();
		requestClose('escape', event.nativeEvent);
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key !== 'Escape' || event.defaultPrevented) return;

		// A synthetic Escape is untrusted, and Chromium's CloseWatcher ignores untrusted input, so
		// no `cancel` event fires and `onCancel` above never runs. Without this, Escape is
		// untestable. `preventDefault()` also stops a trusted press firing through both paths, and
		// the `defaultPrevented` check means a nested dialog closes only itself.
		event.preventDefault();
		requestClose('escape', event.nativeEvent);
	};

	const onClick = (event: React.MouseEvent<HTMLDialogElement>) => {
		// The panel is a child, so anything landing on the dialog element itself is the backdrop.
		if (event.target !== event.currentTarget) return;

		requestClose('backdrop', event.nativeEvent);
	};

	const onClose = () => {
		// Anything can close a native dialog without asking React: a `<form method='dialog'>`
		// submit, devtools, a future `closedby`. Pushing it back into state here is what makes the
		// DOM and React unable to disagree about whether the overlay is open.
		if (selfClosing.current) {
			selfClosing.current = false;
			return;
		}

		setOpen(false);
	};

	return {
		dialogRef: setDialogNode,
		dialogNode,
		panelRef,
		present,
		state: open ? ('open' as const) : ('closed' as const),
		requestClose,
		dialogHandlers: { onCancel, onKeyDown, onClick, onClose }
	};
};

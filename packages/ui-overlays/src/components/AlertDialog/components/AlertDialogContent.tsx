import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@repo/ui-core';

import { AlertDialogClose } from '~/components/AlertDialog/components/AlertDialogClose';
import { DialogContent } from '~/components/Dialog/components/DialogContent';

import type { IAlertDialogContent } from '~/components/AlertDialog/AlertDialog.types';

/**
 * Internal. Wraps the `cancel` node in the two things naming the slot buys: a dismissal the caller
 * did not have to wire, and the overlay's initial focus.
 */
const CancelAction = ({ children }: { children: React.ReactNode }) => {
	const ref = React.useRef<HTMLButtonElement | null>(null);

	useIsomorphicLayoutEffect(() => {
		// The real lowercase attribute, set by hand, because neither alternative works.
		// `focusInitialElement` honours `[autofocus]` before falling back to the first tabbable
		// element, and React's `autoFocus` prop never reaches the DOM: react-dom skips it while
		// setting attributes and calls `.focus()` at mount instead — inside a `<dialog>` that is
		// still `display: none`, so it focuses nothing. Writing `autofocus` in JSX would set the
		// attribute and log an "Invalid DOM property" warning on every render.
		//
		// A layout effect so the attribute is in place before the surface's own layout effect calls
		// `showModal()`: a child's effects flush before its parent's in the same commit.
		ref.current?.setAttribute('autofocus', '');
	}, []);

	return (
		<AlertDialogClose asChild ref={ref}>
			{children}
		</AlertDialogClose>
	);
};

/**
 * The surface: `DialogContent` with no close button, an `alertdialog` role, a refused backdrop and
 * two required actions.
 *
 * Everything it adds is a guarantee a caller cannot make by hand, and nothing else. There is no
 * busy prop, no promise contract and no error region — a slow or failed action is the caller's, and
 * `AlertDialog`'s stories show both patterns.
 *
 * **Holding it open through a slow action** is the `onRequestClose` veto plus `disabled` on your own
 * button. Both halves are needed: requirement 5 makes cancel dismiss automatically, so without the
 * veto a user can cancel out from under a request already in flight.
 *
 * ```tsx
 * <AlertDialogContent
 *   onRequestClose={(event) => {
 *     if (isDeleting) event.preventDefault();
 *   }}
 *   confirm={<Button disabled={isDeleting} onClick={handleDelete}>Delete</Button>}
 * />
 * ```
 *
 * `ref.close()` and `open={false}` bypass `onRequestClose` entirely, so the veto does not protect
 * against a caller closing their own overlay.
 *
 * **Reporting a failure** is yours too, and the dialog deliberately stays open: the user confirmed
 * something destructive, it failed, and an overlay that vanished would read as success. Put the
 * message in a live region that is mounted *before* it has anything to say — `FormError` in
 * `@repo/ui-forms` is the shape — rather than swapping `description`, which assistive technology
 * never re-reads because `aria-describedby` resolves when focus arrives, not on mutation.
 */
export const AlertDialogContent = ({
	title,
	description,
	cancel,
	confirm,
	onRequestClose,
	...props
}: IAlertDialogContent) => {
	return (
		<DialogContent
			{...props}
			title={title}
			description={description}
			// After the spread, so nothing a caller passes can reach either. The prop type omits
			// `role`, `showCloseButton` and `icon` as well — this is the second lock, not the only one.
			role='alertdialog'
			showCloseButton={false}
			onRequestClose={(event) => {
				// One route refused, with no prop to configure it. A native `<dialog>` opened with
				// `showModal()` does not dismiss on a backdrop click; the shared surface added that by
				// hand, and an alert dialog opts back out. Escape is left alone: it is deliberate, has
				// a visible cancel behind it, and the APG pattern mandates it.
				//
				// Refusing here rather than on the element's own `onClick` is what keeps a caller's
				// `onClick` and `onKeyDown` theirs.
				if (event.source === 'backdrop') event.preventDefault();

				onRequestClose?.(event);
			}}
			footer={
				<>
					<CancelAction>{cancel}</CancelAction>
					{confirm}
				</>
			}
		/>
	);
};

AlertDialogContent.displayName = 'AlertDialogContent';

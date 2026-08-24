import * as React from 'react';
import { cn } from '@repo/tailwind-config';

import { OverlayCloseButton } from '~/components/Overlay/OverlayCloseButton';
import { OverlayContainerContext } from '~/components/Overlay/contexts/overlay-container-context';
import { OverlayContentContext } from '~/components/Overlay/contexts/overlay-content-context';
import { overlayDialogVariants } from '~/components/Overlay/Overlay.variants';
import { useDialogElement } from '~/components/Overlay/hooks/useDialogElement';
import { useOverlayRootContext } from '~/components/Overlay/hooks/useOverlayRootContext';
import { useScrollLock } from '~/components/Overlay/hooks/useScrollLock';

import type { IOverlayCloseEvent } from '~/components/Overlay/types/overlay-ref';

export interface IOverlaySurface
	// `title`, `open`, `onCancel` and `onClose` are all real `<dialog>` attributes, and all four
	// collide with something this component owns. Removing them here is what stops `title` meaning
	// two different things.
	extends Omit<React.ComponentProps<'dialog'>, 'title' | 'open' | 'onCancel' | 'onClose'> {
	/** The owning overlay's slot prefix, e.g. `'dialog'` or `'sheet'`. */
	slot: string;

	/** Whether to show the close (X) button. Defaults to `true`. */
	showCloseButton?: boolean;

	/** Custom icon to replace the default X icon. */
	icon?: React.ReactNode;

	/**
	 * Called before every close, whatever the route. Call `event.preventDefault()` to refuse it and
	 * the overlay stays genuinely open.
	 */
	onRequestClose?: (event: IOverlayCloseEvent) => void;
}

/**
 * Internal. The `<dialog>` element, the panel inside it, and the close button. What every modal
 * overlay repeats.
 *
 * `className` lands on the *panel*, because that is the part that genuinely differs: Dialog centres
 * it, Sheet pins it to an edge. The dialog element around it is identical for both.
 */
export const OverlaySurface = ({
	slot,
	className,
	children,
	showCloseButton = true,
	icon,
	onRequestClose,
	'aria-label': ariaLabel,
	'aria-labelledby': ariaLabelledBy,
	'aria-describedby': ariaDescribedBy,
	...props
}: IOverlaySurface) => {
	const { open, setOpen } = useOverlayRootContext();

	const { dialogRef, dialogNode, panelRef, present, state, requestClose, dialogHandlers } =
		useDialogElement({ open, setOpen, onRequestClose });

	// Keyed on `present`, not `open`: releasing the page while the overlay is still animating out
	// brings the scrollbar back mid-exit and shifts everything sideways.
	useScrollLock(present);

	// Titles and descriptions lend the overlay their ids rather than the overlay hunting for them in
	// the DOM. Owning the primitive is what makes that possible, and it is also what will let the
	// component answer "did anything name this?" when the props land.
	const [titleIds, setTitleIds] = React.useState<string[]>([]);
	const [descriptionIds, setDescriptionIds] = React.useState<string[]>([]);

	const registerTitle = React.useCallback((id: string) => {
		setTitleIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
		return () => setTitleIds((ids) => ids.filter((existing) => existing !== id));
	}, []);

	const registerDescription = React.useCallback((id: string) => {
		setDescriptionIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
		return () => setDescriptionIds((ids) => ids.filter((existing) => existing !== id));
	}, []);

	const contentContext = React.useMemo(
		() => ({ slot, requestClose, registerTitle, registerDescription }),
		[slot, requestClose, registerTitle, registerDescription]
	);

	// A caller-supplied value always wins, and an `aria-label` suppresses the generated
	// `aria-labelledby` so the two cannot fight over the name.
	const labelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : titleIds.join(' ') || undefined);

	// Nothing described it means no attribute at all. An `aria-describedby` pointing at an id that
	// does not exist is worse than its absence.
	const describedBy = ariaDescribedBy ?? (descriptionIds.join(' ') || undefined);

	return (
		<OverlayContentContext.Provider value={contentContext}>
			<dialog
				{...props}
				ref={dialogRef}
				data-slot={`${slot}-overlay`}
				data-state={state}
				className={cn(overlayDialogVariants())}
				aria-label={ariaLabel}
				aria-labelledby={labelledBy}
				aria-describedby={describedBy}
				{...dialogHandlers}
			>
				{present ? (
					<OverlayContainerContext.Provider value={dialogNode}>
						<div
							ref={panelRef}
							data-slot={`${slot}-content`}
							data-state={state}
							className={className}
						>
							{children}
							{showCloseButton ? <OverlayCloseButton slot={slot} icon={icon} /> : null}
						</div>
					</OverlayContainerContext.Provider>
				) : null}
			</dialog>
		</OverlayContentContext.Provider>
	);
};

OverlaySurface.displayName = 'OverlaySurface';

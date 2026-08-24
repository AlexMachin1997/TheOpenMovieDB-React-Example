import * as React from 'react';
import { cn } from '@repo/tailwind-config';

import { OverlayCloseButton } from '~/components/Overlay/OverlayCloseButton';
import { OverlayContainerContext } from '~/components/Overlay/contexts/overlay-container-context';
import { OverlayContentContext } from '~/components/Overlay/contexts/overlay-content-context';
import { overlayDialogVariants } from '~/components/Overlay/Overlay.variants';
import { useDialogElement } from '~/components/Overlay/hooks/useDialogElement';
import { useOverlayLabelling } from '~/components/Overlay/hooks/useOverlayLabelling';
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

	/** Id of the heading the content component rendered from its `title` prop, if it did. */
	titleId?: string;

	/** Id of the paragraph the content component rendered from its `description` prop, if it did. */
	descriptionId?: string;
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
	titleId,
	descriptionId,
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

	const { registerTitle, registerDescription, labelledBy, describedBy } = useOverlayLabelling({
		slot,
		open,
		ariaLabel,
		ariaLabelledBy,
		ariaDescribedBy,
		titleId,
		descriptionId
	});

	const contentContext = React.useMemo(
		() => ({ slot, requestClose, registerTitle, registerDescription }),
		[slot, requestClose, registerTitle, registerDescription]
	);

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

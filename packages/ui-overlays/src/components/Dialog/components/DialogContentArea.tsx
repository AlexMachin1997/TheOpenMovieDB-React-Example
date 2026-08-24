import { cn } from '@repo/tailwind-config';
import { useScrollableRegion } from '~/components/Overlay/hooks/useScrollableRegion';
import type { IDialogContentArea } from '~/components/Dialog/Dialog.types';

export const DialogContentArea = ({ className, ...props }: IDialogContentArea) => {
	const { ref, isScrollable } = useScrollableRegion();

	return (
		<div
			ref={ref}
			data-slot='dialog-content-area'
			// A tab stop only once there is something to scroll. Arrow keys move the focused
			// element's scroll container, so a long body needs to be focusable — but a body that
			// fits would just be a focus ring around the content and, being before the footer in
			// the DOM, would take the dialog's initial focus for itself.
			tabIndex={isScrollable ? 0 : undefined}
			className={cn('flex-1 overflow-y-auto p-6 py-4', className)}
			{...props}
		/>
	);
};

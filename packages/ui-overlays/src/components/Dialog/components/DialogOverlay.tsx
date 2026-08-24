import { cn } from '@repo/tailwind-config';

import { overlayBackdropVariants } from '~/components/Overlay/Overlay.variants';

import type { IDialogOverlay } from '~/components/Dialog/Dialog.types';

/**
 * @deprecated `DialogContent` renders its own `<dialog>`, which is the backdrop. Kept because a
 * caller who rendered this got a dim panel and still does.
 */
export const DialogOverlay = ({ className, ...props }: IDialogOverlay) => {
	return (
		<div
			data-slot='dialog-overlay'
			className={cn(overlayBackdropVariants(), className)}
			{...props}
		/>
	);
};

DialogOverlay.displayName = 'DialogOverlay';

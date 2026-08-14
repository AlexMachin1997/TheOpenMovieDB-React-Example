import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import { overlayBackdropVariants } from '~/components/Overlay/Overlay.variants';
import type { IDialogOverlay } from '~/components/Dialog/Dialog.types';

export const DialogOverlay = ({ className, ...props }: IDialogOverlay) => {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(overlayBackdropVariants(), className)}
			{...props}
		/>
	);
};

DialogOverlay.displayName = 'DialogOverlay';

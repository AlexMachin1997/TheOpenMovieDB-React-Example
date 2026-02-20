import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import type { IDialogClose } from '~/components/Dialog/Dialog.types';

export const DialogClose = ({ className, ...props }: IDialogClose) => {
	return (
		<DialogPrimitive.Close
			className={cn('cursor-pointer', className)}
			data-slot='dialog-close'
			{...props}
		/>
	);
};

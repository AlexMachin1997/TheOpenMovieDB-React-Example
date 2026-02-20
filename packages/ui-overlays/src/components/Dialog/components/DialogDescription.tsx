import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import type { IDialogDescription } from '~/components/Dialog/Dialog.types';

export const DialogDescription = ({ className, ...props }: IDialogDescription) => {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

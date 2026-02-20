import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import type { IDialogTitle } from '~/components/Dialog/Dialog.types';

export const DialogTitle = ({ className, ...props }: IDialogTitle) => {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			className={cn('text-lg leading-none font-semibold', className)}
			{...props}
		/>
	);
};

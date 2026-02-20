import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import type { IDialogTrigger } from '~/components/Dialog/Dialog.types';

export const DialogTrigger = ({ className, ...props }: IDialogTrigger) => {
	return (
		<DialogPrimitive.Trigger
			data-slot='dialog-trigger'
			className={cn('cursor-pointer', className)}
			{...props}
		/>
	);
};

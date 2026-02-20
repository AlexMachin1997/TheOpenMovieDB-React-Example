import { cn } from '@repo/tailwind-config';
import type { IDialogContentArea } from '~/components/Dialog/Dialog.types';

export const DialogContentArea = ({ className, ...props }: IDialogContentArea) => {
	return (
		<div
			data-slot='dialog-content-area'
			className={cn('flex-1 overflow-y-auto p-6 py-4', className)}
			{...props}
		/>
	);
};

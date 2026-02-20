import { cn } from '@repo/tailwind-config';
import type { IDialogFooter } from '~/components/Dialog/Dialog.types';

export const DialogFooter = ({ className, ...props }: IDialogFooter) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end p-6 pt-4 border-t bg-background',
				className
			)}
			{...props}
		/>
	);
};

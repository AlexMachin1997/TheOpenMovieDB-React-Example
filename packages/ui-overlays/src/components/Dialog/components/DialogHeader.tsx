import { cn } from '@repo/tailwind-config';
import type { IDialogHeader } from '~/components/Dialog/Dialog.types';

export const DialogHeader = ({ className, ...props }: IDialogHeader) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn(
				'flex flex-col gap-2 text-center sm:text-left p-6 pb-4 border-b bg-background',
				className
			)}
			{...props}
		/>
	);
};

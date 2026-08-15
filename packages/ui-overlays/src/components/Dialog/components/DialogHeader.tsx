import { cn } from '@repo/tailwind-config';
import type { IDialogHeader } from '~/components/Dialog/Dialog.types';

export const DialogHeader = ({ className, ...props }: IDialogHeader) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn(
				// Deliberately no background. An opaque band only earns one when content scrolls
				// beneath it, and nothing does here: this is a flex sibling of `DialogContentArea`,
				// which clips its own scrolling content. A background here paints a square corner
				// over `DialogContent`'s `rounded-lg` and squares off the top of the dialog.
				'flex flex-col gap-2 text-center sm:text-left p-6 pb-4 border-b',
				className
			)}
			{...props}
		/>
	);
};

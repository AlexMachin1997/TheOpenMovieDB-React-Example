import { cn } from '@repo/tailwind-config';
import type { IDialogFooter } from '~/components/Dialog/Dialog.types';

export const DialogFooter = ({ className, ...props }: IDialogFooter) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				// No background, for the same reason as `DialogHeader` — nothing scrolls beneath it,
				// and an opaque band squares off the bottom of `DialogContent`'s `rounded-lg`.
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end p-6 pt-4 border-t',
				// The header's `border-b` and this `border-t` each separate their band from the
				// content between them. With no content — a dialog that is just a question and two
				// answers — the two borders land on the same pixel and read as one doubled line, so
				// drop ours when we directly follow the header.
				'[[data-slot=dialog-header]+&]:border-t-0',
				className
			)}
			{...props}
		/>
	);
};

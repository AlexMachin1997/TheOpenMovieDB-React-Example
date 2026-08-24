import { cn } from '@repo/tailwind-config';
import type { IDialogContentArea } from '~/components/Dialog/Dialog.types';

export const DialogContentArea = ({ className, ...props }: IDialogContentArea) => {
	return (
		<div
			data-slot='dialog-content-area'
			// A scrolling region a keyboard user cannot reach is a scrolling region they cannot
			// scroll: arrow keys move the focused element's scroll container, and without a tab stop
			// there is nothing focused inside a long dialog body. This costs a tab stop on every
			// dialog that has one, which is the trade the rule is asking for.
			tabIndex={0}
			className={cn('flex-1 overflow-y-auto p-6 py-4', className)}
			{...props}
		/>
	);
};

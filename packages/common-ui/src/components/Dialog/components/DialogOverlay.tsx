import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

interface IDialogOverlay extends React.ComponentProps<typeof DialogPrimitive.Overlay> {
	className?: string;
}

export const DialogOverlay = ({ className, ...props }: IDialogOverlay) => {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className
			)}
			{...props}
		/>
	);
};

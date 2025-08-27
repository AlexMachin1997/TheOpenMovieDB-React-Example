import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

interface IDialogClose extends React.ComponentProps<typeof DialogPrimitive.Close> {
	className?: string;
}

export const DialogClose = ({ className, ...props }: IDialogClose) => {
	return (
		<DialogPrimitive.Close
			className={cn('cursor-pointer', className)}
			data-slot='dialog-close'
			{...props}
		/>
	);
};

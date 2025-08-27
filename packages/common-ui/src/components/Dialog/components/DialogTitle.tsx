import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

interface IDialogTitle extends React.ComponentProps<typeof DialogPrimitive.Title> {
	className?: string;
}

export const DialogTitle = ({ className, ...props }: IDialogTitle) => {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			className={cn('text-lg leading-none font-semibold', className)}
			{...props}
		/>
	);
};

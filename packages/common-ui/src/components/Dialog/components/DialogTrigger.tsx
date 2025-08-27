import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/className';

interface IDialogTrigger extends React.ComponentProps<typeof DialogPrimitive.Trigger> {
	className?: string;
}

export const DialogTrigger = ({ className, ...props }: IDialogTrigger) => {
	return (
		<DialogPrimitive.Trigger
			data-slot='dialog-trigger'
			className={cn('cursor-pointer', className)}
			{...props}
		/>
	);
};

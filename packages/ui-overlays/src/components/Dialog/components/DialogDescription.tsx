import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/ui-core';

interface IDialogDescription extends React.ComponentProps<typeof DialogPrimitive.Description> {
	className?: string;
}

export const DialogDescription = ({ className, ...props }: IDialogDescription) => {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

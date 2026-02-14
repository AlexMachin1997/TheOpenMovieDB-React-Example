import * as React from 'react';
import { cn } from '@repo/ui-core';

interface IDialogFooter extends React.ComponentProps<'div'> {
	className?: string;
}

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

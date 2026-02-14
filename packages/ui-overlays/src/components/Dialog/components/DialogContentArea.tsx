import * as React from 'react';
import { cn } from '@repo/ui-core';

interface IDialogContentArea extends React.ComponentProps<'div'> {
	className?: string;
}

export const DialogContentArea = ({ className, ...props }: IDialogContentArea) => {
	return (
		<div
			data-slot='dialog-content-area'
			className={cn('flex-1 overflow-y-auto p-6 py-4', className)}
			{...props}
		/>
	);
};

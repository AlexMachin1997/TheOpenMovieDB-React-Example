import * as React from 'react';
import { cn } from '@repo/ui-core';

interface IDialogHeader extends React.ComponentProps<'div'> {
	className?: string;
}

export const DialogHeader = ({ className, ...props }: IDialogHeader) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn(
				'flex flex-col gap-2 text-center sm:text-left p-6 pb-4 border-b bg-background',
				className
			)}
			{...props}
		/>
	);
};

import * as React from 'react';
import { cn } from '~/utils/className';

type SheetFooterProps = React.ComponentProps<'div'>;

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => {
	return (
		<div
			data-slot='sheet-footer'
			className={cn('mt-auto flex flex-col gap-2 p-6 pt-0', className)}
			{...props}
		/>
	);
};

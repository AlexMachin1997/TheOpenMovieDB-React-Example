import * as React from 'react';
import { cn } from '~/utils/className';

type SheetHeaderProps = React.ComponentProps<'div'>;

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => {
	return (
		<div
			data-slot='sheet-header'
			className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
			{...props}
		/>
	);
};

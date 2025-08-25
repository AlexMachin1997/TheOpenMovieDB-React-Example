import * as React from 'react';
import { cn } from '~/utils/className';

type SheetInnerContentProps = React.HTMLAttributes<HTMLDivElement>;

export const SheetInnerContent = ({ className, children, ...props }: SheetInnerContentProps) => {
	return (
		<div className={cn('flex-1 overflow-y-auto p-6', className)} {...props}>
			{children}
		</div>
	);
};

SheetInnerContent.displayName = 'SheetInnerContent';

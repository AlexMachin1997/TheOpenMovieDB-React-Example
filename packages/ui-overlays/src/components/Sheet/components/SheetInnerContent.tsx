import { cn } from '@repo/tailwind-config';

import type { ISheetInnerContent } from '~/components/Sheet/Sheet.types';

export const SheetInnerContent = ({ className, children, ...props }: ISheetInnerContent) => {
	return (
		<div className={cn('flex-1 overflow-y-auto p-6', className)} {...props}>
			{children}
		</div>
	);
};

SheetInnerContent.displayName = 'SheetInnerContent';

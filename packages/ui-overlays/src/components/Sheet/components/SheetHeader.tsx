import { cn } from '@repo/tailwind-config';

import type { ISheetHeader } from '~/components/Sheet/Sheet.types';

export const SheetHeader = ({ className, ...props }: ISheetHeader) => {
	return (
		<div
			data-slot='sheet-header'
			className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
			{...props}
		/>
	);
};

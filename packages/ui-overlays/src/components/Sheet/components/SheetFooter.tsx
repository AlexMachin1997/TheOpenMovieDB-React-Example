import { cn } from '@repo/tailwind-config';

import type { ISheetFooter } from '~/components/Sheet/Sheet.types';

export const SheetFooter = ({ className, ...props }: ISheetFooter) => {
	return (
		<div
			data-slot='sheet-footer'
			className={cn('mt-auto flex flex-col gap-2 p-6 pt-0', className)}
			{...props}
		/>
	);
};

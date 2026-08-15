import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetTrigger } from '~/components/Sheet/Sheet.types';

export const SheetTrigger = ({ className, ...props }: ISheetTrigger) => {
	return (
		<SheetPrimitive.Trigger
			data-slot='sheet-trigger'
			className={cn('cursor-pointer', className)}
			{...props}
		/>
	);
};

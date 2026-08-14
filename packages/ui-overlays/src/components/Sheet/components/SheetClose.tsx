import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetClose } from '~/components/Sheet/Sheet.types';

export const SheetClose = ({ className, ...props }: ISheetClose) => {
	return (
		<SheetPrimitive.Close
			data-slot='sheet-close'
			tabIndex={0}
			className={cn('cursor-pointer', className)}
			{...props}
		/>
	);
};

SheetClose.displayName = 'SheetClose';

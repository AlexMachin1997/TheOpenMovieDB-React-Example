import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetTitle } from '~/components/Sheet/Sheet.types';

export const SheetTitle = ({ className, ...props }: ISheetTitle) => {
	return (
		<SheetPrimitive.Title
			data-slot='sheet-title'
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
};

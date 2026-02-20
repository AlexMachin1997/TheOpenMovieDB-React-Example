import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetDescription } from '~/components/Sheet/Sheet.types';

export const SheetDescription = ({ className, ...props }: ISheetDescription) => {
	return (
		<SheetPrimitive.Description
			data-slot='sheet-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

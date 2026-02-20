import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';

import type { ISheetOverlay } from '~/components/Sheet/Sheet.types';

export const SheetOverlay = ({ className, ...props }: ISheetOverlay) => {
	return (
		<SheetPrimitive.Overlay
			data-slot='sheet-overlay'
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className
			)}
			{...props}
		/>
	);
};

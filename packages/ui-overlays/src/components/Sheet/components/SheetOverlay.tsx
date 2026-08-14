import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import { overlayBackdropVariants } from '~/components/Overlay/Overlay.variants';

import type { ISheetOverlay } from '~/components/Sheet/Sheet.types';

export const SheetOverlay = ({ className, ...props }: ISheetOverlay) => {
	return (
		<SheetPrimitive.Overlay
			data-slot='sheet-overlay'
			className={cn(overlayBackdropVariants(), className)}
			{...props}
		/>
	);
};

SheetOverlay.displayName = 'SheetOverlay';

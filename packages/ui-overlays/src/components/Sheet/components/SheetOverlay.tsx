import { cn } from '@repo/tailwind-config';

import { overlayBackdropVariants } from '~/components/Overlay/Overlay.variants';

import type { ISheetOverlay } from '~/components/Sheet/Sheet.types';

/**
 * @deprecated SheetContent renders its own dialog element, which is the backdrop. Kept because a
 * caller who rendered this got a dim panel and still does.
 */
export const SheetOverlay = ({ className, ...props }: ISheetOverlay) => {
	return (
		<div
			data-slot='sheet-overlay'
			className={cn(overlayBackdropVariants(), className)}
			{...props}
		/>
	);
};

SheetOverlay.displayName = 'SheetOverlay';

import { cn } from '@repo/tailwind-config';

import { overlayFooterVariants } from '~/components/Overlay/Overlay.variants';

import type { ISheetFooter } from '~/components/Sheet/Sheet.types';

export const SheetFooter = ({ className, ...props }: ISheetFooter) => {
	return (
		<div
			data-slot='sheet-footer'
			// `mt-auto` is the one genuine difference from `DialogFooter`: a Sheet fills the height of
			// the viewport, so its footer has to be pushed to the bottom rather than sitting under
			// whatever content there happens to be.
			className={cn(overlayFooterVariants(), 'mt-auto p-6 pt-0', className)}
			{...props}
		/>
	);
};

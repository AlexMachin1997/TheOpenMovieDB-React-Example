import { cn } from '@repo/tailwind-config';

import { useRegisteredOverlayId } from '~/components/Overlay/hooks/useRegisteredOverlayId';

import type { ISheetTitle } from '~/components/Sheet/Sheet.types';

export const SheetTitle = ({ className, id, ...props }: ISheetTitle) => {
	// Lends its id to the surface, which is what names the sheet. Nothing at the call site wires it.
	const titleId = useRegisteredOverlayId(id, 'title');

	return (
		<h2
			id={titleId}
			data-slot='sheet-title'
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
};

SheetTitle.displayName = 'SheetTitle';

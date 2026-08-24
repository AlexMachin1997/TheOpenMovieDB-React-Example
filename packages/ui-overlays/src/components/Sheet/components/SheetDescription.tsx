import { cn } from '@repo/tailwind-config';

import { useRegisteredOverlayId } from '~/components/Overlay/hooks/useRegisteredOverlayId';

import type { ISheetDescription } from '~/components/Sheet/Sheet.types';

export const SheetDescription = ({ className, id, ...props }: ISheetDescription) => {
	const descriptionId = useRegisteredOverlayId(id, 'description');

	return (
		<p
			id={descriptionId}
			data-slot='sheet-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

SheetDescription.displayName = 'SheetDescription';

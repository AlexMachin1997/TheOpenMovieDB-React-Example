import { cn } from '@repo/tailwind-config';

import { useRegisteredOverlayId } from '~/components/Overlay/hooks/useRegisteredOverlayId';

import type { IDialogDescription } from '~/components/Dialog/Dialog.types';

export const DialogDescription = ({ className, id, ...props }: IDialogDescription) => {
	const descriptionId = useRegisteredOverlayId(id, 'description');

	return (
		<p
			id={descriptionId}
			data-slot='dialog-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

DialogDescription.displayName = 'DialogDescription';

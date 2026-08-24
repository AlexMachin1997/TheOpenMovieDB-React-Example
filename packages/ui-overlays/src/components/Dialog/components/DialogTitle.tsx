import { cn } from '@repo/tailwind-config';

import { useRegisteredOverlayId } from '~/components/Overlay/hooks/useRegisteredOverlayId';

import type { IDialogTitle } from '~/components/Dialog/Dialog.types';

export const DialogTitle = ({ className, id, ...props }: IDialogTitle) => {
	// Lends its id to the surface, which is what names the dialog. Nothing at the call site wires it.
	const titleId = useRegisteredOverlayId(id, 'title');

	return (
		<h2
			id={titleId}
			data-slot='dialog-title'
			className={cn('text-lg leading-none font-semibold', className)}
			{...props}
		/>
	);
};

DialogTitle.displayName = 'DialogTitle';

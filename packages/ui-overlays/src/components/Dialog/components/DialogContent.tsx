import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { OverlaySurface } from '~/components/Overlay/OverlaySurface';
import { overlaySurfaceVariants } from '~/components/Overlay/Overlay.variants';
import { DialogContentArea } from '~/components/Dialog/components/DialogContentArea';
import { DialogDescription } from '~/components/Dialog/components/DialogDescription';
import { DialogFooter } from '~/components/Dialog/components/DialogFooter';
import { DialogHeader } from '~/components/Dialog/components/DialogHeader';
import { DialogTitle } from '~/components/Dialog/components/DialogTitle';
import type { IDialogContent } from '~/components/Dialog/Dialog.types';

export const DialogContent = ({
	className,
	children,
	title,
	description,
	footer,
	showCloseButton = true,
	icon,
	...props
}: IDialogContent) => {
	const titleId = React.useId();
	const descriptionId = React.useId();

	// Supplying any of the three says "children is the body". Supplying none says "children is the
	// whole assembly", which is how the compound parts keep working untouched. There is no third
	// reading of `children` available, and guessing from its shape would mean walking the tree.
	const composed = title !== undefined || description !== undefined || footer !== undefined;

	return (
		<OverlaySurface
			slot='dialog'
			className={cn(overlaySurfaceVariants({ side: 'center' }), className)}
			showCloseButton={showCloseButton}
			icon={icon}
			titleId={title === undefined ? undefined : titleId}
			descriptionId={description === undefined ? undefined : descriptionId}
			{...props}
		>
			{composed ? (
				<>
					{/*
					 * Each part is conditional rather than always rendered. `DialogFooter` drops its
					 * `border-t` only when it *directly* follows the header, so an empty body div
					 * between them would silently restore the doubled border that selector exists to
					 * prevent.
					 *
					 * These are the real `DialogHeader` / `DialogContentArea` / `DialogFooter`, not
					 * inlined copies of their markup, so "the same structure the compound parts
					 * produce" is true by construction rather than by having been kept in sync.
					 */}
					{(title !== undefined || description !== undefined) && (
						<DialogHeader>
							{title !== undefined && <DialogTitle id={titleId}>{title}</DialogTitle>}
							{description !== undefined && (
								<DialogDescription id={descriptionId}>{description}</DialogDescription>
							)}
						</DialogHeader>
					)}
					{children !== undefined && <DialogContentArea>{children}</DialogContentArea>}
					{footer !== undefined && <DialogFooter>{footer}</DialogFooter>}
				</>
			) : (
				children
			)}
		</OverlaySurface>
	);
};

DialogContent.displayName = 'DialogContent';

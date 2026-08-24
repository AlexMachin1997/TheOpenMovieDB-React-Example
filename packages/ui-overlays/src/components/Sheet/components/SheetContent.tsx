import * as React from 'react';
import { cn } from '@repo/tailwind-config';
import { OverlaySurface } from '~/components/Overlay/OverlaySurface';
import { overlaySurfaceVariants } from '~/components/Overlay/Overlay.variants';
import { SheetDescription } from '~/components/Sheet/components/SheetDescription';
import { SheetFooter } from '~/components/Sheet/components/SheetFooter';
import { SheetHeader } from '~/components/Sheet/components/SheetHeader';
import { SheetInnerContent } from '~/components/Sheet/components/SheetInnerContent';
import { SheetTitle } from '~/components/Sheet/components/SheetTitle';

import type { ISheetContent } from '~/components/Sheet/Sheet.types';

export const SheetContent = ({
	className,
	children,
	title,
	description,
	footer,
	side = 'right',
	showCloseButton = true,
	icon,
	...props
}: ISheetContent) => {
	const titleId = React.useId();
	const descriptionId = React.useId();

	// Same rule as `DialogContent`: any of the three means `children` is the body, none means
	// `children` is the whole assembly. The assembly below is written out rather than shared with
	// Dialog because the parts genuinely differ — Sheet's header has no border and no responsive
	// alignment, its footer is `mt-auto` and never goes horizontal, and its body is
	// `SheetInnerContent` rather than `DialogContentArea`. Parameterising four components to hide
	// twelve lines would obscure which classes apply where.
	const composed = title !== undefined || description !== undefined || footer !== undefined;

	return (
		<OverlaySurface
			slot='sheet'
			className={cn(overlaySurfaceVariants({ side }), className)}
			showCloseButton={showCloseButton}
			icon={icon}
			titleId={title === undefined ? undefined : titleId}
			descriptionId={description === undefined ? undefined : descriptionId}
			{...props}
		>
			{composed ? (
				<>
					{(title !== undefined || description !== undefined) && (
						<SheetHeader>
							{title !== undefined && <SheetTitle id={titleId}>{title}</SheetTitle>}
							{description !== undefined && (
								<SheetDescription id={descriptionId}>{description}</SheetDescription>
							)}
						</SheetHeader>
					)}
					{children !== undefined && <SheetInnerContent>{children}</SheetInnerContent>}
					{footer !== undefined && <SheetFooter>{footer}</SheetFooter>}
				</>
			) : (
				children
			)}
		</OverlaySurface>
	);
};

SheetContent.displayName = 'SheetContent';

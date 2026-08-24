import { Slot } from '@radix-ui/react-slot';
import { cn } from '@repo/tailwind-config';

import { useOverlayContentContext } from '~/components/Overlay/hooks/useOverlayContentContext';
import { useOverlayRootContext } from '~/components/Overlay/hooks/useOverlayRootContext';

import type { ISheetClose } from '~/components/Sheet/Sheet.types';

export const SheetClose = ({ className, asChild = false, onClick, ...props }: ISheetClose) => {
	const { setOpen } = useOverlayRootContext();
	const content = useOverlayContentContext();

	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='sheet-close'
			tabIndex={0}
			className={cn('cursor-pointer', className)}
			type={asChild ? undefined : 'button'}
			onClick={(event) => {
				onClick?.(event);
				if (event.defaultPrevented) return;

				// Through the surface where there is one, so onRequestClose gets to refuse this route
				// too. Outside a content component there is nothing to veto, so close directly.
				if (content) {
					content.requestClose('close-part', event.nativeEvent);
					return;
				}

				setOpen(false);
			}}
			{...props}
		/>
	);
};

SheetClose.displayName = 'SheetClose';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@repo/tailwind-config';

import { useOverlayContainer } from '~/components/Overlay/hooks/useOverlayContainer';

import type { IPopoverContent } from '~/components/Popover/Popover.types';

export const PopoverContent = ({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: IPopoverContent) => {
	// Inside a modal, `document.body` is behind the top layer and inert, so a popover portalled
	// there is both invisible and unclickable. This puts it inside the dialog instead. Outside a
	// modal the container is undefined and Radix falls back to the body, unchanged.
	const container = useOverlayContainer();

	return (
		<PopoverPrimitive.Portal container={container}>
			<PopoverPrimitive.Content
				data-slot='popover-content'
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
					className
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
};

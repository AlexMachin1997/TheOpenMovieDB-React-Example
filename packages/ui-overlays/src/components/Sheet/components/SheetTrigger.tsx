import { Slot } from '@radix-ui/react-slot';
import { cn } from '@repo/tailwind-config';

import { useOverlayRootContext } from '~/components/Overlay/hooks/useOverlayRootContext';

import type { ISheetTrigger } from '~/components/Sheet/Sheet.types';

export const SheetTrigger = ({ className, asChild = false, onClick, ...props }: ISheetTrigger) => {
	const { open, setOpen } = useOverlayRootContext();

	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='sheet-trigger'
			className={cn('cursor-pointer', className)}
			aria-haspopup='dialog'
			aria-expanded={open}
			// `type` is only meaningful on a real button, and defaulting it stops a trigger inside a
			// form submitting it. With asChild the child owns its own element and its own type.
			type={asChild ? undefined : 'button'}
			// The caller's handler runs first, so preventDefault() is how a call site opts out of
			// opening for one interaction.
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) setOpen(true);
			}}
			{...props}
		/>
	);
};

SheetTrigger.displayName = 'SheetTrigger';

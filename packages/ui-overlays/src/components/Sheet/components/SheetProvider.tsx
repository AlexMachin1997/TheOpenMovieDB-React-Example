import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { SheetRef } from '~/components/Sheet/types/sheet-ref';

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root> & {
	ref?: React.RefObject<SheetRef | undefined>;
};

export const Sheet = ({ ref, ...props }: SheetProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	React.useImperativeHandle(
		ref,
		() => ({
			open: () => setIsOpen(true),
			close: () => setIsOpen(false),
			toggle: () => setIsOpen((prev) => !prev),
			get isOpen() {
				return isOpen;
			}
		}),
		[isOpen]
	);

	const isControlled = props.open !== undefined;
	const open = isControlled ? props.open : isOpen;
	const onOpenChange = isControlled ? props.onOpenChange : setIsOpen;

	return (
		<SheetPrimitive.Root data-slot='sheet' open={open} onOpenChange={onOpenChange} {...props} />
	);
};

Sheet.displayName = 'Sheet';
